// Runs inside a rendered figma-D*.html page: turns every .phone into a standalone SVG
// (rounded rects, shadows, real <text> lines, inline svg figures/icons as vector groups)
// and writes them as JSON into a pre#svg-out element for the caller to collect.
(async () => {
  await document.fonts.ready;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const px = (v) => parseFloat(v) || 0;
  const r1 = (n) => Math.round(n * 100) / 100;
  const col = (c) => {
    if (!c || c === 'transparent') return null;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return { c, a: 1 };
    const p = m[1].split(/[,\s/]+/).filter(Boolean);
    const a = p[3] !== undefined ? parseFloat(p[3]) : 1;
    if (a <= 0.001) return null;
    return { c: `rgb(${p[0]},${p[1]},${p[2]})`, a };
  };
  const fill = (k, c) => (c ? ` ${k}="${c.c}"${c.a < 1 ? ` ${k}-opacity="${r1(c.a)}"` : ''}` : ` ${k}="none"`);
  const splitTop = (s) => { const o = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { o.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) o.push(cur.trim()); return o; };
  const shadows = (v) => (v && v !== 'none' ? splitTop(v).map((s) => {
    const inset = /inset/.test(s); const c = (s.match(/rgba?\([^)]+\)|#[0-9a-f]+/i) || ['rgb(0,0,0)'])[0];
    const n = s.replace(/rgba?\([^)]+\)|inset/g, '').trim().split(/\s+/).map(px);
    return { inset, x: n[0] || 0, y: n[1] || 0, blur: n[2] || 0, spread: n[3] || 0, c: col(c) };
  }) : []);
  const roundPath = (x, y, w, h, [tl, tr, br, bl]) => `M${r1(x + tl)},${r1(y)}H${r1(x + w - tr)}${tr ? `A${tr},${tr} 0 0 1 ${r1(x + w)},${r1(y + tr)}` : ''}V${r1(y + h - br)}${br ? `A${br},${br} 0 0 1 ${r1(x + w - br)},${r1(y + h)}` : ''}H${r1(x + bl)}${bl ? `A${bl},${bl} 0 0 1 ${r1(x)},${r1(y + h - bl)}` : ''}V${r1(y + tl)}${tl ? `A${tl},${tl} 0 0 1 ${r1(x + tl)},${r1(y)}` : ''}Z`;
  const shape = (x, y, w, h, rad, attrs) => {
    const cap = Math.min(w, h) / 2; const rr = rad.map((r) => Math.min(r, cap));
    if (rr.every((r) => r === rr[0])) return `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}"${rr[0] ? ` rx="${r1(rr[0])}"` : ''}${attrs}/>`;
    return `<path d="${roundPath(x, y, w, h, rr)}"${attrs}/>`;
  };
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;left:-9999px;top:0;white-space:nowrap';
  document.body.appendChild(probe);
  const baseCache = new Map();
  const baselineOffset = (cs) => { // distance from a line rect's top to its baseline
    const key = cs.fontFamily + cs.fontSize + cs.fontWeight;
    if (baseCache.has(key)) return baseCache.get(key);
    probe.style.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    probe.innerHTML = 'Hg<i style="display:inline-block;width:0;height:0;vertical-align:baseline"></i>';
    const rg = document.createRange(); rg.selectNodeContents(probe.firstChild);
    const t = rg.getClientRects()[0].top, b = probe.lastChild.getBoundingClientRect().top;
    baseCache.set(key, b - t); return b - t;
  };
  const family = (cs) => { const f = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(); return /apple|system|SF Pro/i.test(f) ? 'Inter' : f; };

  const out = [];
  for (const ph of document.querySelectorAll('.phone')) {
    const P = ph.getBoundingClientRect(); const ox = P.left, oy = P.top;
    let defs = '', fid = 0;
    const filter = (s) => { const id = 'f' + fid++; defs += `<filter id="${id}" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="${s.x}" dy="${s.y}" stdDeviation="${r1(s.blur / 2)}" flood-color="${s.c.c}" flood-opacity="${r1(s.c.a)}"/></filter>`; return id; };

    const textOf = (node, cs) => {
      const t = node.textContent; if (!t.trim()) return '';
      const rg = document.createRange(); const words = []; const re = /\S+/g; let m;
      while ((m = re.exec(t))) { rg.setStart(node, m.index); rg.setEnd(node, m.index + m[0].length); const rs = rg.getClientRects(); if (!rs.length) continue; words.push({ w: m[0], x: rs[0].left, top: rs[0].top }); }
      const lines = [];
      for (const w of words) { const L = lines[lines.length - 1]; if (L && Math.abs(L.top - w.top) < 3) L.w.push(w.w); else lines.push({ top: w.top, x: w.x, w: [w.w] }); }
      const c = col(cs.color); const ls = cs.letterSpacing === 'normal' ? 0 : px(cs.letterSpacing); const off = baselineOffset(cs);
      return lines.map((L) => `<text x="${r1(L.x - ox)}" y="${r1(L.top + off - oy)}" font-family="${family(cs)}" font-size="${px(cs.fontSize)}" font-weight="${cs.fontWeight}"${ls ? ` letter-spacing="${r1(ls)}"` : ''}${fill('fill', c)} xml:space="preserve">${esc(L.w.join(' '))}</text>`).join('');
    };

    const walk = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return '';
      let pre = '', post = '';
      const op = px(cs.opacity); if (op < 1) { pre += `<g opacity="${op}">`; post = '</g>' + post; }
      const tf = cs.transform;
      if (tf && tf !== 'none' && el.tagName !== 'svg') {
        const [a, b] = tf.match(/matrix\(([^)]+)\)/)[1].split(',').map(parseFloat);
        const ang = Math.atan2(b, a) * 180 / Math.PI;
        if (Math.abs(ang) > 0.01) {
          el.style.transform = 'none'; const rr = el.getBoundingClientRect();
          pre += `<g transform="rotate(${r1(ang)} ${r1(rr.left + rr.width / 2 - ox)} ${r1(rr.top + rr.height / 2 - oy)})">`; post = '</g>' + post;
        }
      }
      if (el.tagName.toLowerCase() === 'svg') {
        const r = el.getBoundingClientRect(); const vb = el.viewBox.baseVal;
        const vw = vb && vb.width ? vb.width : r.width, vh = vb && vb.height ? vb.height : r.height;
        const s = Math.min(r.width / vw, r.height / vh);
        const dx = r.left - ox + (r.width - vw * s) / 2 - (vb ? vb.x : 0) * s, dy = r.top - oy + (r.height - vh * s) / 2 - (vb ? vb.y : 0) * s;
        const c = col(cs.color); const cc = c ? c.c : '#000';
        const inner = el.innerHTML.replace(/currentColor/g, cc);
        const top = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'].map((k) => el.getAttribute(k) ? ` ${k}="${el.getAttribute(k).replace('currentColor', cc)}"` : '').join('');
        return `${pre}<g transform="translate(${r1(dx)} ${r1(dy)}) scale(${r1(s * 1000) / 1000})"${top}>${inner}</g>${post}`;
      }
      const r = el.getBoundingClientRect(); const x = r.left - ox, y = r.top - oy, w = r.width, h = r.height;
      const rad = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(px);
      let body = '';
      const sh = shadows(cs.boxShadow);
      // outer spread rings (no blur) sit behind, largest first
      sh.filter((s) => !s.inset && !s.blur && s.spread && s.c).sort((a, b) => b.spread - a.spread).forEach((s) => { body += shape(x - s.spread, y - s.spread, w + 2 * s.spread, h + 2 * s.spread, rad.map((q) => q + s.spread), fill('fill', s.c)); });
      const bg = col(cs.backgroundColor);
      const drop = sh.filter((s) => !s.inset && s.blur && s.c).sort((a, b) => b.blur - a.blur)[0];
      if (bg || drop) body += shape(x, y, w, h, rad, `${fill('fill', bg || { c: 'rgb(255,255,255)', a: bg ? 1 : 0.001 })}${drop ? ` filter="url(#${filter(drop)})"` : ''}`);
      sh.filter((s) => s.inset && s.spread && s.c).forEach((s) => { body += shape(x + s.spread / 2, y + s.spread / 2, w - s.spread, h - s.spread, rad.map((q) => Math.max(0, q - s.spread / 2)), ` fill="none"${fill('stroke', s.c)} stroke-width="${s.spread}"`); });
      const bw = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(px);
      const bc = col(cs.borderTopColor);
      if (bc && bw.every((v) => v > 0 && v === bw[0])) body += shape(x + bw[0] / 2, y + bw[0] / 2, w - bw[0], h - bw[0], rad.map((q) => Math.max(0, q - bw[0] / 2)), ` fill="none"${fill('stroke', bc)} stroke-width="${bw[0]}"`);
      else if (bc && bw[0] > 0) body += `<line x1="${r1(x)}" y1="${r1(y + bw[0] / 2)}" x2="${r1(x + w)}" y2="${r1(y + bw[0] / 2)}"${fill('stroke', bc)} stroke-width="${bw[0]}"${cs.borderTopStyle === 'dashed' ? ` stroke-dasharray="${bw[0] * 3} ${bw[0] * 3}"` : ''}/>`;
      for (const ch of el.childNodes) {
        if (ch.nodeType === 3) body += textOf(ch, cs);
        else if (ch.nodeType === 1) body += walk(ch);
      }
      if (tf && tf !== 'none') el.style.transform = '';
      return pre + body + post;
    };
    const inner = [...ph.children].map(walk).join('');
    const bg = col(getComputedStyle(ph.firstElementChild && ph.firstElementChild.style.inset ? ph.firstElementChild : ph).backgroundColor) || col(getComputedStyle(ph).backgroundColor);
    out.push({ name: ph.dataset.name, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844"><title>${esc(ph.dataset.name)}</title><defs>${defs}</defs><rect width="390" height="844"${fill('fill', bg)}/>${inner}</svg>` });
  }
  const pre = document.createElement('pre'); pre.id = 'svg-out'; pre.textContent = JSON.stringify(out); document.body.appendChild(pre);
})();
