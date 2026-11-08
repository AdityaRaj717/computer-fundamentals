// Hairline-style isometric line figures as static SVG.
// Theme t: { plate, hi, edge, mid, lo, accent, text, text2, font }
const C30 = Math.cos(Math.PI / 6);
const f = (n) => Math.round(n * 10) / 10;
export const iso = (ox, oy, u) => (x, y, z = 0) => [ox + (x - y) * C30 * u, oy + (x + y) * 0.5 * u - z * u];
const pts = (a) => a.map((p) => `${f(p[0])},${f(p[1])}`).join(' ');
const line = (a, b, s, w = 0.9, extra = '') =>
  `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;

export function box(P, t, x, y, z, w, d, h, o = {}) {
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const left = [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)];
  const right = [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)];
  const hex = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z), P(x, y + d, z + h)];
  const sil = o.lit ? t.hi : o.edge || t.edge;
  const inner = o.lit ? t.hi : t.mid;
  const sw = o.lit ? 1.4 : 0.9;
  const topFill = o.topFill || t.plate;
  const sideFill = o.sideFill || t.plate;
  return `<g>
<polygon points="${pts(left)}" fill="${sideFill}"/><polygon points="${pts(right)}" fill="${sideFill}"/><polygon points="${pts(top)}" fill="${topFill}"/>
${line(P(x + w, y + d, z + h), P(x, y + d, z + h), inner, sw)}${line(P(x + w, y + d, z + h), P(x + w, y, z + h), inner, sw)}${h > 1.5 ? line(P(x + w, y + d, z + h), P(x + w, y + d, z), inner, sw) : ''}
<polygon points="${pts(hex)}" fill="none" stroke="${sil}" stroke-width="${sw}" stroke-linejoin="round"/>
</g>`;
}

export function dots(P, t, x0, y0, x1, y1, step) {
  let s = '';
  for (let x = x0; x <= x1; x += step)
    for (let y = y0; y <= y1; y += step) {
      const p = P(x, y, 0);
      s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="0.9" fill="${t.lo}"/>`;
    }
  return `<g>${s}</g>`;
}

const txt = (t, x, y, s, o = {}) =>
  `<text x="${f(x)}" y="${f(y)}" font-family="${o.font || t.font}" font-size="${o.size || 11}" font-weight="${o.weight || 500}" fill="${o.fill || t.text2}" text-anchor="${o.anchor || 'start'}" ${o.extra || ''}>${s}</text>`;

export const LAYERS = ['Physical', 'Data link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'];

// L1: till tablet and printer layer stacks, packet on Transport, gap opened above it.
export function osiFigure(t, o = {}) {
  const W = o.w || 358, H = o.h || 300;
  const P = iso(o.ox || 150, o.oy || 112, o.u || 1.62);
  const S = 44, G = 11, open = 18, active = 3;
  const zOf = (i) => i * G + (i > active ? open : 0);
  let g = dots(P, t, -20, -20, 170, 70, 14);
  // left stack
  const stack = (x0, lit) => {
    let s = '';
    for (let i = 0; i < 7; i++) {
      s += box(P, t, x0, 0, zOf(i), S, S, 3, lit && i === active ? { lit: true, topFill: t.litFill || t.plate } : {});
      if (lit && i === active) {
        s += box(P, t, x0 + 15, 15, zOf(i) + 3, 13, 13, 7, { lit: true, topFill: t.accent, sideFill: t.accentSide || t.accent });
      }
    }
    return s;
  };
  g += stack(0, true);
  // cable with slack
  g += `<polyline points="${pts([P(44, 26, 1.5), P(60, 34, 0), P(84, 34, 0), P(100, 26, 1.5)])}" fill="none" stroke="${t.edge}" stroke-width="1.6" stroke-linejoin="round"/>`;
  g += stack(100, false);
  // labels on left of left stack
  for (let i = 0; i < 7; i++) {
    const p = P(0, S, zOf(i) + 1.5);
    const isA = i === active;
    g += txt(t, p[0] - 8, p[1] + 4, `${i + 1}${isA || o.allNames ? ' ' + LAYERS[i] : ''}`, { anchor: 'end', size: isA ? 11.5 : 10.5, weight: isA ? 700 : 500, fill: isA ? t.text : t.text2 });
  }
  const a = P(22, 44, -10), b = P(122, 44, -10);
  g += txt(t, a[0], a[1] + 16, 'Till tablet', { anchor: 'middle', size: 11, fill: t.text2 });
  g += txt(t, b[0], b[1] + 16, 'Printer', { anchor: 'middle', size: 11, fill: t.text2 });
  if (o.overlay) g += o.overlay(P, { zOf, S });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two layer stacks, till tablet and printer, joined by a cable. The print job sits on layer 4, Transport, of the tablet.">${g}</svg>`;
}

// Practice: one stack with drop slots for three faults.
export function dropFigure(t, o = {}) {
  const W = o.w || 358, H = o.h || 318;
  const P = iso(o.ox || 62, o.oy || 182, o.u || 1.45);
  const S = 46, G = 18;
  let g = dots(P, t, -14, -14, 60, 60, 12);
  const slots = { 0: o.s1, 2: o.s3, 6: o.s7 };
  for (let i = 0; i < 7; i++) g += box(P, t, 0, 0, i * G, S, S, 3.5, o.hot === i ? { lit: true } : {});
  for (let i = 0; i < 7; i++) {
    const r = P(S, 0, i * G + 1.75);
    const y = r[1], x = r[0] + 16;
    g += line([r[0] + 3, y], [x - 3, y], o.hot === i ? t.hi : t.lo, 0.9);
    const has = i in slots;
    if (has) {
      const v = slots[i], hot = o.hot === i, sw = W - x - 4;
      g += `<rect x="${f(x)}" y="${f(y - 14)}" width="${f(sw)}" height="28" rx="${t.r}" fill="${hot ? t.slotHot : 'none'}" stroke="${hot ? t.hi : t.mid}" stroke-width="${hot ? 1.3 : 1}" ${v ? '' : 'stroke-dasharray="3 3"'}/>`;
      if (v) { const cw = v.length * 6.6 + 20; g += `<rect x="${f(x + sw - cw - 3)}" y="${f(y - 11)}" width="${f(cw)}" height="22" rx="${t.r}" fill="${t.chipFill}"/>` + txt(t, x + sw - cw / 2 - 3, y + 4, v, { size: 11, weight: 650, fill: t.chipText, anchor: 'middle' }); }
      else g += txt(t, x + sw - 8, y + 4, hot ? 'Drop here' : 'Empty', { size: 10.5, fill: t.text2, anchor: 'end' });
    }
    g += txt(t, x + (has ? 8 : 0), y + 4, `${i + 1} ${LAYERS[i]}`, { size: 11, fill: has || o.hot === i ? t.text : t.text2, weight: has ? 650 : 500 });
  }
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A seven-layer stack with drop slots beside layers 1, 3 and 7.">${g}</svg>`;
}

// Mistake replay: payment gateway behind a firewall; the card terminal in front. Door 80 open, 443 has no rule.
export function firewallFigure(t, o = {}) {
  const W = o.w || 358, H = o.h || 232;
  const P = iso(o.ox || 92, o.oy || 80, o.u || 1.6);
  let g = dots(P, t, -6, -12, 132, 58, 13);
  // gateway server (back left)
  g += box(P, t, 0, 0, 0, 34, 34, 30);
  for (let k = 0; k < 3; k++) g += line(P(34, 6, 23 - k * 7), P(34, 28, 23 - k * 7), t.mid, 0.9);
  // wall
  g += box(P, t, 62, -14, 0, 5, 74, 34);
  const door = (y0, y1, closed) => {
    const q = [P(67, y0, 24), P(67, y1, 24), P(67, y1, 6), P(67, y0, 6)];
    return `<polygon points="${pts(q)}" fill="${closed ? t.lo : t.plate}" stroke="${closed ? t.edge : t.hi}" stroke-width="${closed ? 0.9 : 1.3}"/>` +
      (closed ? line(P(67, y0 + 1, 15), P(67, y1 - 1, 15), t.edge, 1.6) : '');
  };
  g += door(2, 14, false) + door(38, 50, true);
  const d80 = P(67, 8, 24), d443 = P(67, 44, 6);
  g += line([d80[0], d80[1] - 3], [d80[0], d80[1] - 30], t.mid, 0.9) + txt(t, d80[0], d80[1] - 36, '80 · allowed', { size: 10.5, anchor: 'middle', fill: t.text2 });
  g += line([d443[0], d443[1] + 3], [d443[0], d443[1] + 22], t.hi, 0.9) + txt(t, d443[0], d443[1] + 34, '443 · no rule', { size: 10.5, anchor: 'middle', weight: 700, fill: t.text });
  // counter + card terminal (front right)
  g += box(P, t, 96, 8, 0, 32, 36, 3);
  g += box(P, t, 106, 18, 3, 12, 16, 9);
  g += box(P, t, 107, 19, 12, 9, 6, 0.5, { topFill: t.lo });
  const sv = P(0, 0, 30), tm = P(112, 44, 0);
  g += txt(t, sv[0], sv[1] - 10, 'Payment gateway', { size: 10.5, anchor: 'middle', fill: t.text2 });
  g += txt(t, tm[0] + 6, tm[1] + 22, 'Card terminal', { size: 10.5, anchor: 'middle', fill: t.text2 });
  // payment path from terminal to the 443 door, blocked
  const a = P(106, 26, 9), c = P(68, 44, 15);
  g += `<polyline points="${pts([a, P(88, 36, 13), c])}" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round"/>`;
  g += box(P, t, 84, 34, 10, 7, 7, 5, { lit: true, topFill: t.accent, sideFill: t.accentSide || t.accent });
  g += `<g stroke="${t.err}" stroke-width="2.2" stroke-linecap="round"><line x1="${f(c[0] - 6)}" y1="${f(c[1] - 6)}" x2="${f(c[0] + 6)}" y2="${f(c[1] + 6)}"/><line x1="${f(c[0] + 6)}" y1="${f(c[1] - 6)}" x2="${f(c[0] - 6)}" y2="${f(c[1] + 6)}"/></g>`;
  if (o.overlay) g += o.overlay(P);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A card payment leaves the terminal on port 443 and is dropped at the firewall, which only allows port 80.">${g}</svg>`;
}

// Subnet: a /24 block exploded into four /26 slabs, the second one raised.
export function subnetFigure(t, o = {}) {
  const W = o.w || 358, H = o.h || 236;
  const P = iso(o.ox || 70, o.oy || 40, o.u || 1.32);
  let g = dots(P, t, -8, -8, 170, 50, 14);
  const ranges = o.ids || ['.0', '.64', '.128', '.192'];
  for (let i = 0; i < 4; i++) {
    const lit = i === (o.lit ?? 1);
    const x = i * 40;
    g += box(P, t, x, 0, lit ? 12 : 0, 36, 34, 7, lit ? { lit: true, topFill: t.accentSoft || t.plate } : {});
    // address ticks on top
    for (let k = 1; k < 4; k++) g += line(P(x + k * 9, 4, (lit ? 12 : 0) + 7), P(x + k * 9, 30, (lit ? 12 : 0) + 7), lit ? t.hi : t.lo, 0.7);
    const lp = P(x + 18, 34, 0);
    g += txt(t, lp[0], lp[1] + 17, ranges[i], { size: 10.5, anchor: 'middle', weight: lit ? 700 : 500, fill: lit ? t.text : t.text2 });
  }
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 192.168.10.0/24 block split into four /26 networks of 64 addresses. The second, .64 to .127, is raised for the new branch.">${g}</svg>`;
}

// Café network: router, tablet, printer, card terminal on one floor plate.
export function cafeFigure(t, o = {}) {
  const W = o.w || 358, H = o.h || 220;
  const P = iso(o.ox || 168, o.oy || 30, o.u || 1.3);
  let g = '';
  g += box(P, t, 0, 0, 0, 130, 96, 3);
  g += dots(P, t, 7, 7, 126, 90, 13).replace(/<g>/, '<g transform="translate(0,-3.9)">');
  const Z = 3;
  const cable = (a, b) => `<polyline points="${pts([P(a[0], a[1], Z), P(b[0], a[1], Z), P(b[0], b[1], Z)])}" fill="none" stroke="${t.mid}" stroke-width="1" stroke-dasharray="3 3"/>`;
  g += cable([30, 30], [96, 24]) + cable([30, 30], [30, 70]) + cable([30, 30], [92, 66]);
  // router
  g += box(P, t, 18, 22, Z, 24, 16, 7, o.litRouter ? { lit: true } : {});
  g += line(P(22, 24, Z + 7), P(20, 22, Z + 24), t.edge, 0.9) + line(P(38, 24, Z + 7), P(40, 22, Z + 24), t.edge, 0.9);
  // printer
  g += box(P, t, 86, 14, Z, 22, 20, 13, o.litPrinter ? { lit: true } : {});
  g += box(P, t, 90, 17, Z + 13, 14, 10, 1.5);
  // till tablet on stand
  g += box(P, t, 24, 62, Z, 12, 12, 4);
  g += box(P, t, 22, 60, Z + 4, 16, 14, 1.4, o.litTablet ? { lit: true, topFill: t.accent } : {});
  // card terminal
  g += box(P, t, 86, 60, Z, 10, 12, 6);
  g += box(P, t, 87, 61, Z + 6, 8, 5, 0.4, { topFill: t.lo });
  const lab = (x, y, z, s) => { const p = P(x, y, z); return txt(t, p[0], p[1], s, { size: 10, anchor: 'middle', fill: t.text2 }); };
  g += lab(30, 30, 34, 'Router') + lab(97, 24, 26, 'Printer') + lab(30, 82, -12, 'Till tablet') + lab(91, 74, -12, 'Card terminal');
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Brew and Byte café network: a router cabled to a printer, a till tablet and a card terminal.">${g}</svg>`;
}

// Server as a building with numbered doors (ports).
export function doorsFigure(t, o = {}) {
  const W = o.w || 160, H = o.h || 140;
  const P = iso(o.ox || 70, o.oy || 30, o.u || 1.25);
  let g = box(P, t, 0, 0, 0, 44, 50, 56);
  const ports = o.ports || ['22', '53', '443', '3389'];
  ports.forEach((n, k) => {
    const y0 = 5 + k * 11.5, y1 = y0 + 8;
    const lit = o.lit === n;
    const q = [P(44, y0, 18), P(44, y1, 18), P(44, y1, 3), P(44, y0, 3)];
    g += `<polygon points="${pts(q)}" fill="${lit ? t.accent : t.plate}" stroke="${lit ? t.hi : t.mid}" stroke-width="${lit ? 1.3 : 0.9}"/>`;
    const lp = P(44, (y0 + y1) / 2, 24);
    if (!o.noLabels) g += txt(t, lp[0], lp[1], n, { size: 8.5, anchor: 'middle', weight: lit ? 700 : 500, fill: lit ? t.text : t.text2 });
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A server drawn as a building with numbered doors, one per port.">${g}</svg>`;
}

export const ICON = {
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  share: '<path d="M12 4v11M7.5 8.5L12 4l4.5 4.5M5 13v6h14v-6"/>',
  flag: '<path d="M6 21V4M6 4h11l-2.5 4L17 12H6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  replay: '<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/>',
  timer: '<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 3h5"/>',
  xray: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16M4 14h16M9 4v16"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1"/><path d="M4 7l8 6 8-6"/>',
  play: '<path d="M8 5.5v13l10-6.5z"/>',
  minus: '<path d="M6 12h12"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  slider: '<path d="M4 12h16"/>',
};
export const icon = (n, size = 20, sw = 1.6, color = 'currentColor') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

export const statusBar = (color) => `<div class="sb" style="color:${color}"><span>9:41</span><svg width="64" height="12" viewBox="0 0 64 12" fill="${color}" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx=".5"/><rect x="5" y="5" width="3" height="7" rx=".5"/><rect x="10" y="3" width="3" height="9" rx=".5"/><rect x="15" y="1" width="3" height="11" rx=".5"/><path d="M27 4.5a8 8 0 0 1 11 0l-1.4 1.4a6 6 0 0 0-8.2 0zM29.8 7.3a4 4 0 0 1 5.4 0L32.5 10z"/><rect x="42" y="1.5" width="19" height="9" rx="2" fill="none" stroke="${color}" stroke-width="1"/><rect x="44" y="3.5" width="12" height="5" rx="1"/><rect x="62" y="4.5" width="1.5" height="3" rx=".5"/></svg></div>`;
