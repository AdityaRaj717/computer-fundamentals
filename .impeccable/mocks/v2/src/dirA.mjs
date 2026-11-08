// Direction A: Field Guide. Cool paper, plates with field marks, thumb-index tabs per objective.
import * as F from './figs.mjs';
import * as K from './content.mjs';

const T = {
  ground: '#EEF0E9', paper: '#FAFBF7', ink: '#1A1C19', ink2: '#4B5047', rule: '#D5D9CE', err: '#A1322A',
  o: { '1.1': '#2F5D3A', '1.4': '#8A570C', '1.7': '#34557F', '5.1': '#9E3F27' },
};
const fig = (accent, extra = {}) => ({
  plate: T.paper, hi: T.ink, edge: '#62675E', mid: '#A2A79B', lo: '#CDD1C5', accent, accentSide: accent,
  text: T.ink, text2: T.ink2, font: 'Hanken Grotesk', err: T.err, r: 2,
  chipFill: T.ink, chipStroke: T.ink, chipText: T.paper, slotHot: '#E4E8DE', litFill: '#E9EDE3', ...extra,
});

export const css = `
.A{--g:${T.ground};--p:${T.paper};--i:${T.ink};--i2:${T.ink2};--r:${T.rule};font-family:'Hanken Grotesk',sans-serif;color:var(--i);background:var(--g)}
.A .serif{font-family:'Source Serif 4',serif}
.A .bar{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 20px}
.A .bar .mid{font-size:13px;color:var(--i2);font-variant-numeric:tabular-nums}
.A .ib{width:44px;height:44px;display:grid;place-items:center;color:var(--i)}
.A .wm{font-family:'Source Serif 4',serif;font-weight:600;font-size:17px;letter-spacing:-.01em}
.A .pad{padding:0 30px 0 20px}
.A h1{font-family:'Source Serif 4',serif;font-weight:600;font-size:31px;line-height:34px;letter-spacing:-.02em;margin:0}
.A h2{font-family:'Source Serif 4',serif;font-weight:600;font-size:21px;line-height:26px;letter-spacing:-.01em;margin:0}
.A p{margin:0}
.A .sub{font-size:14px;line-height:20px;color:var(--i2);margin-top:8px}
.A .plate{background:var(--p);border:1px solid var(--r);margin:0 30px 0 20px;position:relative}
.A .plate .cap{display:flex;justify-content:space-between;align-items:center;font-size:12px;line-height:16px;color:var(--i2);padding:0 12px 10px}
.A .plate .cap b{color:var(--i);font-weight:600}
.A .tab{position:absolute;right:0;width:20px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums}
.A .tab span{transform:rotate(90deg);white-space:nowrap}
.A .tab.thin{width:8px}
.A .row{position:relative;display:grid;grid-template-columns:44px 1fr;gap:10px;padding:11px 30px 11px 20px;border-top:1px solid var(--r)}
.A .row .d{font-size:12px;line-height:16px;color:var(--i2);font-variant-numeric:tabular-nums}
.A .row .d b{display:block;color:var(--i);font-size:14px;font-weight:600}
.A .row .h{font-family:'Source Serif 4',serif;font-size:16px;line-height:21px;font-weight:600}
.A .row .m{font-size:13px;line-height:18px;color:var(--i2);display:flex;align-items:center;gap:5px;margin-top:2px}
.A .row.on{background:var(--p)}
.A .ticks{display:flex;gap:3px;margin-top:7px}
.A .ticks i{flex:1;height:4px;background:var(--r)}
.A .ticks i.f{background:var(--i)}
.A .btm{position:absolute;left:0;right:0;bottom:0;padding:12px 30px 30px 20px;background:var(--g);border-top:1px solid var(--r);display:flex;gap:10px}
.A .btn{height:50px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:15px;font-weight:600;border-radius:2px;padding:0 18px;white-space:nowrap}
.A .btn.pri{background:var(--i);color:var(--p);flex:1}
.A .btn.sec{border:1px solid #A9AE9F;color:var(--i);background:var(--p)}
.A .btn.dis{background:#DADDD4;color:#5F645A;flex:1}
.A .opts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.A .opt{height:46px;border:1px solid #B5BAAC;background:var(--p);border-radius:2px;display:flex;align-items:center;padding:0 12px;font-size:14px;font-weight:500;gap:8px}
.A .opt.sel{border:1.5px solid var(--i);font-weight:650;background:#fff}
.A .dl{display:grid;grid-template-columns:96px 1fr;font-size:14px;line-height:20px}
.A .dl>*{padding:9px 0;border-top:1px solid var(--r)}
.A .dl dt{color:var(--i2)}
.A .dl dd{margin:0;font-weight:600;font-variant-numeric:tabular-nums;display:flex;align-items:center;gap:6px}
.A .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 10px}
.A .tile{height:54px;border:1px solid #B5BAAC;background:var(--p);border-radius:2px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;font-size:16px;font-weight:600;font-variant-numeric:tabular-nums}
.A .tile.num{font-family:'Source Serif 4',serif;font-size:22px}
.A .tile.done{background:transparent;border-color:var(--r);color:#6E7369}
.A .tile.sel{border:2px solid var(--i);background:#fff}
.A .tile.wrong{border:2px solid ${T.err};color:${T.err}}
.A .obj{position:relative;padding:12px 30px 12px 20px;border-top:1px solid var(--r)}
.A .obj .t{display:flex;justify-content:space-between;font-size:14px;line-height:20px}
.A .obj .t b{font-weight:600}
.A .obj .v{font-variant-numeric:tabular-nums;color:var(--i2)}
.A .obj .v strong{color:var(--i);font-size:16px;margin-left:6px}
.A .track{height:6px;background:var(--r);margin-top:8px}
.A .field{height:46px;border:1px solid #A9AE9F;background:#fff;border-radius:2px;display:flex;align-items:center;padding:0 12px;font-size:14px;color:#6A6F64;flex:1}
.A .rate{display:flex;gap:6px}
.A .rate span{width:44px;height:44px;border:1px solid #B5BAAC;display:grid;place-items:center;font-weight:600;background:var(--p);border-radius:2px}
.A .note{font-size:12px;line-height:17px;color:var(--i2)}
.A .chip{position:absolute;background:var(--i);color:var(--p);font-size:12.5px;font-weight:600;padding:0 12px;height:32px;display:flex;align-items:center;border-radius:2px}
`;

const tab = (obj, top, h, label = true) =>
  `<div class="tab${label ? '' : ' thin'}" style="top:${top}px;height:${h}px;background:${T.o[obj]}">${label ? `<span>${obj}</span>` : ''}</div>`;
const sb = () => F.statusBar(T.ink);
const tbar = (left, mid, right) => `<div class="bar">${left}<div class="mid">${mid}</div>${right}</div>`;
const ib = (n) => `<div class="ib">${F.icon(n, 22)}</div>`;

function home() {
  const rows = K.TICKETS.map((t) => {
    const st = t.status === 'closed' ? `${F.icon('check', 15, 2, T.o[t.obj])}${t.topic} · Closed`
      : t.status === 'open' ? `${t.topic} · In progress` : `${t.topic} · Not started`;
    const ticks = t.status === 'open' ? `<div class="ticks">${Array.from({ length: t.steps }, (_, i) => `<i class="${i < t.step ? 'f' : ''}"></i>`).join('')}</div><div class="m" style="margin-top:5px">Step 5 of 11 · about 4 minutes left</div>` : '';
    return `<div class="row${t.status === 'open' ? ' on' : ''}"><div class="d">${t.day}<b>${t.no}</b></div><div><div class="h">${t.hook}</div><div class="m">${st}</div>${ticks}</div>${tab(t.obj, 0, 0)}</div>`;
  });
  return `${sb()}${tbar('<div class="wm">Under the Hood</div>', '', ib('menu'))}
<div class="pad" style="margin-top:8px"><h1>${K.MODULE}</h1><p class="sub">Brew &amp; Byte · four tickets · Network+ N10-009</p></div>
<div class="plate" style="margin-top:16px">${F.cafeFigure(fig(T.o['1.7']), { w: 338, h: 150, u: 1.06, ox: 152, oy: 22 })}<div class="cap"><span><b>Plate 1.</b> The café network you look after this week</span></div></div>
<div style="margin-top:18px">${rows.join('').replace(/style="top:0px;height:0px;/g, 'style="top:6px;bottom:6px;')}</div>
<div class="btm"><div class="btn sec">Review · 4 due</div><div class="btn pri">Resume ticket 1043 ${F.icon('arrow', 18, 1.8)}</div></div>`;
}

function step() {
  const s = K.STEP;
  const overlay = (P, { zOf }) => {
    // field mark: numbered marker on the packet with a leader
    const p = P(21, 21, zOf(3) + 10);
    return `<line x1="${p[0]}" y1="${p[1]}" x2="${p[0] + 64}" y2="${p[1] - 36}" stroke="${T.ink}" stroke-width=".9"/><circle cx="${p[0] + 72}" cy="${p[1] - 41}" r="9" fill="${T.ink}"/><text x="${p[0] + 72}" y="${p[1] - 37.5}" font-family="Hanken Grotesk" font-size="10.5" font-weight="700" fill="${T.paper}" text-anchor="middle">a</text><text x="${p[0] + 86}" y="${p[1] - 37}" font-family="Hanken Grotesk" font-size="11" font-weight="600" fill="${T.ink}">Print job · port 9100</text>`;
  };
  return `${sb()}${tbar(ib('close'), `Ticket ${s.ticket} · Step ${s.n} of ${s.of}`, ib('flag'))}
<div class="pad"><div class="ticks" style="margin-top:0">${Array.from({ length: s.of }, (_, i) => `<i class="${i < s.n ? 'f' : ''}"></i>`).join('')}</div></div>
${tab('1.1', 112, 64)}
<div class="plate" style="margin-top:12px">${F.osiFigure(fig(T.o['1.1']), { w: 338, h: 250, u: 1.3, ox: 132, oy: 128, overlay })}<div class="cap"><span><b>Plate 4.</b> Layer 4 of 7, Transport</span><span style="display:flex;align-items:center;gap:5px;color:${T.ink};font-weight:600">${F.icon('xray', 15)} X-ray the packet</span></div></div>
<div class="pad" style="margin-top:16px"><h2>${s.head}</h2><p style="font-size:15px;line-height:22px;margin-top:6px">${s.body}</p>
<p style="font-size:15px;line-height:21px;font-weight:650;margin-top:14px">Predict: ${s.q}</p>
<div class="opts">${s.opts.map((o, i) => `<div class="opt${i === s.pick ? ' sel' : ''}">${i === s.pick ? F.icon('check', 16, 2.2) : ''}${o}</div>`).join('')}</div></div>
<div class="btm"><div class="btn sec">${F.icon('back', 18)} Back</div><div class="btn pri">${F.icon('play', 16, 1.8)} Play it</div></div>`;
}

function drag() {
  const d = K.DRAG;
  return `${sb()}${tbar(ib('close'), `Practice ${d.n} of ${d.of} · Objective 1.1`, ib('flag'))}
${tab('1.1', 100, 64)}
<div class="pad" style="margin-top:4px"><h2>${d.q}</h2><p class="sub" style="margin-top:4px">Or tap a fault, then tap a layer.</p></div>
<div class="plate" style="margin-top:14px;height:300px">${F.dropFigure(fig(T.o['1.1']), { w: 338, h: 300, ox: 66, oy: 196, u: 1.45, s1: d.placed, s3: null, s7: null, hot: 2 })}
<div class="chip" style="left:204px;top:146px;transform:rotate(-3deg);box-shadow:0 10px 24px rgba(26,28,25,.22)">${d.moving}</div></div>
<div class="pad" style="margin-top:16px"><p style="font-size:13px;color:${T.ink2}">Still to place</p>
<div style="display:flex;gap:8px;margin-top:8px"><div class="opt" style="height:40px;font-weight:600">${d.tray}</div><div class="opt" style="height:40px;border-style:dashed;color:${T.ink2};background:transparent">${d.moving}</div></div></div>
<div class="btm"><div class="btn dis">Check answer · 2 faults left</div></div>`;
}

function replay() {
  const r = K.REPLAY;
  const t = fig(T.o['1.4']);
  return `${sb()}${tbar(ib('close'), `Practice ${r.n} of ${r.of} · Objective 1.4`, ib('flag'))}
${tab('1.4', 100, 64)}
<div class="pad" style="margin-top:4px"><h2>Not quite. Here is what your rule does.</h2>
<dl class="dl" style="margin-top:12px"><dt>Your answer</dt><dd>${F.icon('close', 15, 2.2, T.err)}${r.yours}</dd><dt>Correct</dt><dd>${F.icon('check', 15, 2.2, T.o['1.1'])}${r.right}</dd></dl></div>
<div class="plate" style="margin-top:14px">${F.firewallFigure(t, { w: 338, h: 232, ox: 96, oy: 82, u: 1.6 })}<div class="cap"><span><b>Replay 1 of 2.</b> Your rule, played out</span><span>0:04 / 0:06</span></div></div>
<div class="pad" style="margin-top:14px"><p style="font-size:15px;line-height:22px">${r.body}</p></div>
<div class="btm"><div class="btn sec">${F.icon('replay', 18)} Replay</div><div class="btn pri">Show the right answer</div></div>`;
}

function ports() {
  const L = K.PAIRS, R = K.RIGHT;
  const st = (n) => (L.find((p) => p.n === n) || {}).st;
  const cells = L.map((p, i) => {
    const rn = R[i];
    const rs = st(rn);
    const lc = p.st === 'done' ? 'done' : p.st === 'sel' ? 'sel' : p.st === 'wrong' ? 'wrong' : '';
    const rc = rs === 'done' ? 'done' : '';
    return `<div class="tile num ${lc}">${p.p}${p.st === 'done' ? F.icon('check', 16, 2) : ''}</div><div class="tile ${rc}${rn === 'RDP' ? ' wrong' : ''}">${rn}${rs === 'done' ? F.icon('check', 16, 2) : ''}</div>`;
  });
  return `${sb()}${tbar(ib('back'), 'Drill · Objective 1.4', `<div class="ib" style="width:auto;padding:0 8px;gap:6px;display:flex;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums">${F.icon('timer', 18)}0:31</div>`)}
${tab('1.4', 100, 64)}
<div class="pad" style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:2px"><div><h1 style="font-size:30px">Port Match</h1><p class="sub">7 of 12 matched · best 0:52</p></div>${F.doorsFigure(fig(T.o['1.4']), { w: 110, h: 110, ox: 52, oy: 66, u: 0.92, lit: '443', noLabels: true })}</div>
<div class="pad" style="margin-top:14px"><div style="display:flex;justify-content:space-between;font-size:12px;color:${T.ink2};margin-bottom:8px"><span>Port</span><span style="width:calc(50% - 5px)">Protocol</span></div><div class="grid">${cells.join('')}</div>
<div style="display:flex;gap:8px;align-items:flex-start;margin-top:14px;padding:12px;background:#F4E6E2;border-radius:2px;font-size:14px;line-height:20px;color:#5C1F19">${F.icon('close', 18, 2.2, T.err)}<span><b>25 is SMTP</b>, for sending mail. RDP, remote desktop, is 3389.</span></div>
<p class="note" style="margin-top:12px">Missed ports come back more often in your next round.</p></div>
<div class="btm"><div class="btn sec">${F.icon('timer', 18)} Turn timer off</div><div class="btn sec" style="flex:1">End round</div></div>`;
}

function summary() {
  const rows = K.SUMMARY.map((s) => {
    const p = K.pct(s.right, s.of);
    return `<div class="obj"><div class="t"><b>${s.obj} ${K.OBJ[s.obj]}</b><span class="v">${s.right} of ${s.of}<strong>${p}%</strong></span></div><div class="track"><div style="width:${p}%;height:6px;background:${T.o[s.obj]}"></div></div>${tab(s.obj, 8, 0, false).replace('height:0px;', 'bottom:8px;')}</div>`;
  });
  return `${sb()}${tbar(ib('back'), 'Week summary', ib('share'))}
<div class="pad" style="margin-top:6px"><h1>Week one, closed.</h1><p class="sub">Four tickets · 52 practice questions · 39 right first time, 75%</p></div>
<div style="margin-top:18px">${rows.join('')}</div>
<div class="pad" style="border-top:1px solid ${T.rule};padding-top:14px"><p style="font-size:15px;line-height:22px"><b>Start with 1.7 next.</b> Five subnetting misses are waiting in your review list.</p>
<p class="note" style="margin-top:6px">Port Match best 0:48 · Subnet Sprint best 4 of 5</p>
<p style="font-size:14px;font-weight:600;margin-top:20px">How was this week?</p><div class="rate" style="margin-top:8px">${[1, 2, 3, 4, 5].map((n) => `<span>${n}</span>`).join('')}</div>
<p style="font-size:14px;font-weight:600;margin-top:18px">Get week two when it ships</p><div style="display:flex;gap:8px;margin-top:8px"><div class="field">you@example.com</div><div class="btn pri" style="flex:none;height:46px">Notify me</div></div>
<p class="note" style="margin-top:6px">Used only for this. Unsubscribe in one tap.</p></div>`;
}

function shared() {
  const s = K.SHARE;
  const t = fig(T.o['1.7'], { accentSoft: '#DCE4EE' });
  const marks = ['/24', '/25', '/26', '/27'];
  return `${sb()}<div class="bar"><div class="wm">Under the Hood</div><div class="mid">Network+ · Objective 1.7</div></div>
<div class="pad" style="margin-top:10px"><h1 style="font-size:29px">${s.title}</h1><p style="font-size:15px;line-height:22px;margin-top:10px">${s.body}</p></div>
<div class="plate" style="margin-top:16px">${F.subnetFigure(t, { w: 338, h: 214, ox: 76, oy: 44, u: 1.72 })}
<div style="padding:4px 14px 14px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;font-variant-numeric:tabular-nums"><span>Mask</span><span>/26 · 4 networks of 64</span></div>
<div style="position:relative;height:30px;margin-top:6px"><div style="position:absolute;left:0;right:0;top:14px;height:2px;background:${T.rule}"></div><div style="position:absolute;left:0;width:66.6%;top:14px;height:2px;background:${T.o['1.7']}"></div><div style="position:absolute;left:calc(66.6% - 13px);top:2px;width:26px;height:26px;border-radius:13px;background:#fff;border:2px solid ${T.o['1.7']};box-shadow:0 2px 6px rgba(0,0,0,.12)"></div></div>
<div style="display:flex;justify-content:space-between;font-size:12px;color:${T.ink2};font-variant-numeric:tabular-nums">${marks.map((m) => `<span>${m}</span>`).join('')}</div></div>
<div class="cap"><span><b>Plate.</b> 192.168.10.0/24 at /26</span><span>Drag the mask</span></div></div>
<div class="pad" style="margin-top:18px"><div class="btn pri" style="width:100%">Do the full ticket ${F.icon('arrow', 18, 1.8)}</div><p class="note" style="margin-top:8px;text-align:center">Ticket 1043: The new branch needs its own network. 7 minutes, no sign-up.</p></div>
<div class="pad" style="position:absolute;bottom:22px"><p class="note">Last reviewed 8 Nov 2026 · Report an error</p><p class="note" style="margin-top:4px">${K.TM}</p></div>`;
}

export const screens = [
  ['Module home', home], ['Lesson step', step], ['Practice: drag and place', drag], ['Mistake replay', replay],
  ['Port Match drill', ports], ['Week summary', summary], ['Shared figure', shared],
];
export const meta = { id: 'A', cls: 'A', name: 'Field Guide', fonts: 'Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Hanken+Grotesk:wght@400;500;600;700' };
