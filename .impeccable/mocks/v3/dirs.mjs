import { figure, icon, statusBar } from './lib.mjs';

// ── shared content ──
const LEAD = 'The print job is on layer 4, on its way down.';
const STEP_Q = 'The printer cable is unplugged. Which layer fails first?';
const HELP = 'Guess freely. A wrong answer plays out too.';
const OPTS = [['1', 'Physical'], ['2', 'Data link'], ['3', 'Network'], ['7', 'Application']];
const WEEK = [
  { no: '1041', day: 'Tue', obj: '1.1', st: 'closed' },
  { no: '1042', day: 'Wed', obj: '1.4', st: 'closed' },
  { no: '1043', day: 'Thu', obj: '1.7', st: 'open' },
  { no: '1044', day: 'Fri', obj: '5.1', st: 'new' },
];
const SENDER = { initials: 'SM', name: 'Sam', role: 'Branch manager' };
const HOOK = 'The new branch needs its own network.';
const segs = (n, done, color, track) => `<div style="display:flex;gap:4px;flex:1">${Array.from({ length: n }, (_, i) => `<i style="flex:1;height:5px;border-radius:3px;background:${i < done ? color : track}"></i>`).join('')}</div>`;
const TABS = [['today', 'Today'], ['practice', 'Practice'], ['review', 'Review'], ['progress', 'Progress']];
// tab bar: the active tab sits on a soft pill; review carries a count badge
const tabbar = (c) => `<div class="tabbar" style="position:absolute;left:0;right:0;bottom:0;height:86px;background:${c.bg};box-shadow:0 -1px 0 ${c.line};display:flex;padding:8px 8px 0">${TABS.map(([t, l], i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;font-weight:600;color:${i === 0 ? c.on : c.off};position:relative"><span style="width:58px;height:32px;border-radius:16px;display:grid;place-items:center;background:${i === 0 ? c.pill : 'transparent'}">${icon(t, 23, i === 0 ? 2 : 1.6)}</span>${l}${t === 'review' ? `<span style="position:absolute;top:0;left:calc(50% + 8px);min-width:18px;height:18px;border-radius:9px;background:${c.badge};color:${c.badgeInk};font-size:11px;font-weight:700;display:grid;place-items:center;padding:0 5px">4</span>` : ''}</div>`).join('')}<div class="hi" style="background:${c.on}"></div></div>`;
// Hairline on a tinted stage: the plate is the stage colour, strokes are the objective's ink at four weights
const tintHL = (tint, ink) => ({ plate: tint, hi: ink, edge: ink + '99', mid: ink + '4D', lo: ink + '24', sw: 1 });

/* ───────────────────────── D1 Studio ───────────────────────── */
const S = { bg: '#F5F4F0', card: '#FFFFFF', ink: '#1C1B19', ink2: '#64625D', line: 'rgba(28,27,25,.08)' };
const SO = {
  '1.1': { tint: '#E3EEE5', ink: '#1F5B3F' }, '1.4': { tint: '#E2EAF5', ink: '#27508A' },
  '1.7': { tint: '#F6E9D9', ink: '#87511A' }, '5.1': { tint: '#F3E3E0', ink: '#8C3C34' },
};
export const D1 = {
  id: 'D1', name: 'Studio', font: 'Geist:wght@400;500;600;700;800',
  css: `
.D1{background:${S.bg};color:${S.ink};font-family:'Geist',sans-serif;letter-spacing:-.005em}
.D1 .t2{color:${S.ink2}}
.D1 .card{background:${S.card};border-radius:32px;box-shadow:0 1px 2px rgba(28,27,25,.04),0 14px 34px -16px rgba(28,27,25,.16)}
.D1 .pill{height:56px;border-radius:28px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:600;background:${S.ink};color:#fff}
.D1 .ib{width:44px;height:44px;border-radius:22px;background:#EBEAE5;display:grid;place-items:center}
.D1 .read{position:absolute;top:14px;height:28px;padding:0 11px;border-radius:14px;background:rgba(255,255,255,.72);font-size:12.5px;font-weight:600;display:flex;align-items:center;font-variant-numeric:tabular-nums}
.D1 .opt{height:58px;border-radius:20px;background:#fff;display:flex;align-items:center;gap:10px;padding:0 14px;font-size:16px;font-weight:600;box-shadow:0 1px 2px rgba(28,27,25,.05),inset 0 0 0 1px rgba(28,27,25,.07)}
.D1 .opt b{width:28px;height:28px;border-radius:14px;display:grid;place-items:center;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
`,
  home() {
    const o = SO['1.7'];
    const strip = WEEK.map((w) => {
      const c = SO[w.obj];
      const dot = w.st === 'closed' ? `<span style="width:46px;height:46px;border-radius:23px;background:${c.tint};display:grid;place-items:center">${icon('check', 20, 2.4, c.ink)}</span>`
        : w.st === 'open' ? `<span style="width:46px;height:46px;border-radius:23px;background:#fff;box-shadow:inset 0 0 0 2.5px ${c.ink};display:grid;place-items:center;font-size:12px;font-weight:700;color:${c.ink}">5/11</span>`
        : `<span style="width:46px;height:46px;border-radius:23px;box-shadow:inset 0 0 0 1.5px #D6D4CE"></span>`;
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:7px">${dot}<span style="font-size:13px;font-weight:${w.st === 'open' ? 700 : 500};color:${w.st === 'open' ? S.ink : S.ink2}">${w.day}</span></div>`;
    }).join('');
    return `${statusBar(S.ink)}
<div style="padding:10px 20px 0;display:flex;justify-content:space-between;align-items:flex-start"><div><div class="t2" style="font-size:15px;font-weight:600">Thursday</div><div style="font-size:32px;line-height:38px;font-weight:700;letter-spacing:-.03em;margin-top:2px">Your first week</div></div><span class="ib" style="margin-top:6px">${icon('dots', 22)}</span></div>
<div style="display:flex;margin:22px 16px 0">${strip}</div>
<div class="card" style="margin:24px 16px 0;padding:8px">
  <div style="position:relative;height:214px;border-radius:26px;background:${o.tint};display:grid;place-items:center">${figure('slicer-rest', tintHL(o.tint, o.ink), { w: 330, h: 190, label: 'Address block split into four /26 networks' })}<span class="read" style="right:14px;color:${o.ink}">/26</span></div>
  <div style="padding:16px 14px 14px">
    <div style="display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;border-radius:17px;background:${o.tint};color:${o.ink};display:grid;place-items:center;font-size:13px;font-weight:700">${SENDER.initials}</span><span style="font-size:14px;font-weight:600">${SENDER.name} · ${SENDER.role}</span><span class="t2" style="margin-left:auto;font-size:13px">Ticket 1043</span></div>
    <div style="font-size:23px;line-height:29px;font-weight:700;letter-spacing:-.022em;margin-top:12px">${HOOK}</div>
    <div style="height:8px;border-radius:4px;background:${o.tint};margin-top:16px"><div style="width:45%;height:8px;border-radius:4px;background:${o.ink}"></div></div>
    <div class="t2" style="font-size:13px;margin-top:8px">Step 5 of 11 · about 4 minutes</div>
    <div class="pill" style="margin-top:16px">Continue</div>
  </div>
</div>
${tabbar({ bg: '#FBFAF7', line: S.line, on: S.ink, off: '#6C6A65', pill: '#ECEAE4', badge: SO['1.7'].ink, badgeInk: '#fff' })}`;
  },
  step() {
    const o = SO['1.1'];
    return `${statusBar(S.ink)}
<div style="height:58px;display:flex;align-items:center;gap:14px;padding:0 16px"><span class="ib">${icon('x', 20, 1.8)}</span>${segs(9, 4, o.ink, '#DEDCD6')}<span class="ib">${icon('flag', 19, 1.7)}</span></div>
<div style="margin:8px 16px 0;height:300px;border-radius:32px;background:${o.tint};position:relative;display:grid;place-items:center">${figure('layers-rest', tintHL(o.tint, o.ink), { w: 330, h: 262, label: 'Two seven-layer stacks; the print job sits on layer 4' })}<span class="read" style="left:14px;color:${o.ink}">L4</span><span class="ib" style="position:absolute;right:14px;top:12px;background:rgba(255,255,255,.72);color:${o.ink}">${icon('xray', 20, 1.7, o.ink)}</span></div>
<div style="padding:22px 22px 0"><div class="t2" style="font-size:15px">${LEAD}</div><div style="font-size:24px;line-height:30px;font-weight:700;letter-spacing:-.022em;margin-top:6px">${STEP_Q}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 16px 0">${OPTS.map(([n, l], i) => i === 0
      ? `<div class="opt" style="background:${o.tint};box-shadow:inset 0 0 0 2px ${o.ink}"><b style="background:${o.ink};color:#fff">${n}</b>${l}</div>`
      : `<div class="opt"><b style="background:${S.bg}">${n}</b>${l}</div>`).join('')}</div>
<div class="t2" style="text-align:center;font-size:14px;margin-top:16px">${HELP}</div>
<div style="position:absolute;left:16px;right:16px;bottom:32px;display:flex;gap:10px"><span class="ib" style="width:56px;height:56px;border-radius:28px">${icon('back', 22, 1.9)}</span><div class="pill" style="flex:1">Play it</div></div>`;
  },
};

/* ───────────────────────── D2 Night shift ───────────────────────── */
const N = { bg: '#111113', s1: '#1A1A1D', s2: '#242428', ink: '#F4F3F0', ink2: '#A6A5AB', line: 'rgba(255,255,255,.07)' };
const NO = {
  '1.1': { hue: '#7FD4A6', stage: '#14211B' }, '1.4': { hue: '#8DB8F2', stage: '#141B26' },
  '1.7': { hue: '#F2B861', stage: '#241C12' }, '5.1': { hue: '#F29A8D', stage: '#261717' },
};
const darkHL = (stage, hue) => ({ plate: stage, hi: hue, edge: '#F4F3F099', mid: '#F4F3F04A', lo: '#F4F3F01F', sw: 1 });
export const D2 = {
  id: 'D2', name: 'Night shift', font: 'Manrope:wght@400;500;600;700;800',
  css: `
.D2{background:${N.bg};color:${N.ink};font-family:'Manrope',sans-serif}
.D2 .t2{color:${N.ink2}}
.D2 .ib{width:44px;height:44px;border-radius:22px;background:${N.s2};display:grid;place-items:center;color:${N.ink}}
.D2 .pill{height:56px;border-radius:28px;background:${N.ink};color:${N.bg};display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:700}
.D2 .read{position:absolute;font-size:12.5px;font-weight:700;font-variant-numeric:tabular-nums}
.D2 .opt{height:46px;border-radius:23px;background:${N.s1};display:flex;align-items:center;gap:12px;padding:0 18px;font-size:16px;font-weight:600}
.D2 .opt .r{width:22px;height:22px;border-radius:11px;border:1.6px solid #5E5D64}
`,
  home() {
    const o = NO['1.7'];
    const strip = WEEK.map((w) => {
      const c = NO[w.obj];
      return `<div style="flex:1;height:60px;border-radius:30px;background:${w.st === 'new' ? 'transparent' : c.stage};${w.st === 'new' ? 'box-shadow:inset 0 0 0 1.5px #2E2E33;' : ''}${w.st === 'open' ? `box-shadow:inset 0 0 0 2px ${c.hue};` : ''}display:flex;align-items:center;justify-content:center;gap:7px"><span style="font-size:14px;font-weight:700;color:${w.st === 'new' ? N.ink2 : N.ink}">${w.day}</span>${w.st === 'closed' ? icon('check', 17, 2.4, c.hue) : w.st === 'open' ? `<span style="width:7px;height:7px;border-radius:4px;background:${c.hue}"></span>` : ''}</div>`;
    }).join('');
    return `${statusBar(N.ink)}
<div style="padding:10px 20px 0;display:flex;justify-content:space-between;align-items:flex-start"><div><div class="t2" style="font-size:15px;font-weight:600">Thursday</div><div style="font-size:30px;line-height:36px;font-weight:800;letter-spacing:-.03em">Your first week</div></div><span class="ib" style="margin-top:6px">${icon('dots', 22)}</span></div>
<div style="display:flex;gap:8px;padding:20px 16px 0">${strip}</div>
<div style="margin:20px 16px 0;border-radius:32px;background:${o.stage};overflow:hidden">
  <div style="position:relative;height:230px;display:grid;place-items:center">${figure('slicer-rest', darkHL(o.stage, o.hue), { w: 340, h: 200, label: 'Address block split into four /26 networks' })}<span class="read" style="right:20px;top:18px;color:${o.hue}">/26</span></div>
  <div style="padding:0 20px 20px">
    <div style="display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;border-radius:17px;background:${o.hue};color:${o.stage};display:grid;place-items:center;font-size:13px;font-weight:800">${SENDER.initials}</span><span style="font-size:14px;font-weight:700">${SENDER.name} · ${SENDER.role}</span></div>
    <div style="font-size:26px;line-height:31px;font-weight:800;letter-spacing:-.028em;margin-top:12px">${HOOK}</div>
    <div style="display:flex;align-items:center;gap:12px;margin-top:18px">${segs(11, 5, o.hue, '#FFFFFF1F')}<span class="t2" style="font-size:13px;font-weight:700;font-variant-numeric:tabular-nums">5/11</span></div>
    <div class="pill" style="margin-top:18px">Continue</div>
  </div>
</div>
${tabbar({ bg: N.bg, line: N.line, on: N.ink, off: '#8F8E95', pill: N.s2, badge: o.hue, badgeInk: N.bg })}`;
  },
  step() {
    const o = NO['1.1'];
    return `${statusBar(N.ink)}
<div style="height:58px;display:flex;align-items:center;gap:14px;padding:0 16px"><span class="ib">${icon('x', 20, 1.8)}</span>${segs(9, 4, o.hue, '#FFFFFF1F')}<span class="ib">${icon('flag', 19, 1.7)}</span></div>
<div style="margin:6px 16px 0;height:262px;border-radius:32px;background:${o.stage};position:relative;display:grid;place-items:center">${figure('layers-rest', darkHL(o.stage, o.hue), { w: 320, h: 228, label: 'Two seven-layer stacks; the print job sits on layer 4' })}<span class="read" style="left:20px;top:16px;color:${o.hue}">L4</span>
<span style="position:absolute;right:14px;bottom:14px;height:36px;padding:0 14px;border-radius:18px;background:#FFFFFF14;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700">${icon('xray', 17, 1.8)}X-ray</span></div>
<div style="padding:20px 22px 0"><div class="t2" style="font-size:15px;font-weight:500">${LEAD}</div><div style="font-size:22px;line-height:28px;font-weight:800;letter-spacing:-.025em;margin-top:6px">${STEP_Q}</div></div>
<div style="display:flex;flex-direction:column;gap:8px;margin:14px 16px 0">${OPTS.map(([n, l], i) => i === 0
      ? `<div class="opt" style="background:${o.stage};box-shadow:inset 0 0 0 1.5px ${o.hue}"><span class="r" style="border:6px solid ${o.hue}"></span><span style="color:${o.hue};width:12px">${n}</span>${l}</div>`
      : `<div class="opt"><span class="r"></span><span class="t2" style="width:12px">${n}</span>${l}</div>`).join('')}</div>
<div class="t2" style="text-align:center;font-size:14px;margin-top:14px">${HELP}</div>
<div style="position:absolute;left:16px;right:16px;bottom:30px;display:flex;gap:10px"><span class="ib" style="width:56px;height:56px;border-radius:28px">${icon('back', 22, 1.9)}</span><div class="pill" style="flex:1">Play it</div></div>`;
  },
};

/* ───────────────────────── D3 Ticket desk ───────────────────────── */
const T = { bg: '#F3F2EE', ink: '#151514', ink2: '#5E5D59' };
const FIELD = { '1.1': '#1F5240', '1.4': '#24426B', '1.7': '#8A5419', '5.1': '#7A3A33' };
const fieldHL = (c) => ({ plate: c, hi: '#FFFFFF', edge: '#FFFFFFA6', mid: '#FFFFFF55', lo: '#FFFFFF29', sw: 1 });
export const D3 = {
  id: 'D3', name: 'Ticket desk', font: 'Archivo:wght@400;500;600;700;800;900',
  css: `
.D3{background:${T.bg};color:${T.ink};font-family:'Archivo',sans-serif}
.D3 .t2{color:${T.ink2}}
.D3 .ib{width:44px;height:44px;border-radius:22px;background:#E5E4DF;display:grid;place-items:center}
.D3 .tk{border-radius:34px;color:#fff;position:relative;overflow:hidden}
.D3 .l2{color:rgba(255,255,255,.8)}
.D3 .perf{position:relative;height:24px}
.D3 .perf .pl{position:absolute;left:22px;right:22px;top:11px;height:0;border-top:2px dashed rgba(255,255,255,.3)}
.D3 .perf b{position:absolute;top:0;width:24px;height:24px;border-radius:12px;background:${T.bg}}
.D3 .btn{height:56px;border-radius:28px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:700}
.D3 .opt{height:80px;border-radius:22px;background:#fff;padding:12px 14px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 0 0 1px rgba(0,0,0,.06)}
.D3 .opt b{font-size:26px;line-height:26px;font-weight:900;font-variant-numeric:tabular-nums}
.D3 .opt span{font-size:13px;font-weight:600;white-space:nowrap}
`,
  home() {
    const strip = WEEK.map((w) => `<div style="flex:1;height:60px;border-radius:30px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:14px;font-weight:800;${w.st === 'new' ? `background:#fff;color:${T.ink2};box-shadow:inset 0 0 0 1.5px #DCDBD6` : `background:${FIELD[w.obj]};color:#fff`}${w.st === 'open' ? `;box-shadow:0 0 0 3px ${T.bg},0 0 0 5px ${FIELD[w.obj]}` : ''}">${w.day}${w.st === 'closed' ? icon('check', 17, 2.6, '#fff') : ''}</div>`).join('');
    const f = FIELD['1.7'];
    return `${statusBar(T.ink)}
<div style="padding:10px 20px 0;display:flex;justify-content:space-between;align-items:flex-start"><div><div class="t2" style="font-size:15px;font-weight:600">Thursday</div><div style="font-size:38px;line-height:42px;font-weight:900;letter-spacing:-.035em">Week 1</div></div><span class="ib" style="margin-top:6px">${icon('dots', 22)}</span></div>
<div style="display:flex;gap:8px;padding:20px 14px 0">${strip}</div>
<div class="tk" style="margin:20px 12px 0;background:${f}">
  <div style="padding:20px 20px 0;display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;border-radius:17px;background:rgba(255,255,255,.18);display:grid;place-items:center;font-size:13px;font-weight:800">${SENDER.initials}</span><span style="font-size:14px;font-weight:700">${SENDER.name} · ${SENDER.role}</span><span class="l2" style="margin-left:auto;font-size:15px;font-weight:800;font-variant-numeric:tabular-nums">#1043</span></div>
  <div style="height:190px;display:grid;place-items:center">${figure('slicer-rest', fieldHL(f), { w: 334, h: 172, label: 'Address block split into four /26 networks' })}</div>
  <div style="padding:0 20px 18px;font-size:27px;line-height:31px;font-weight:800;letter-spacing:-.028em">${HOOK}</div>
  <div class="perf"><i class="pl"></i><b style="left:-12px"></b><b style="right:-12px"></b></div>
  <div style="padding:6px 20px 20px;display:flex;align-items:center;gap:14px"><div style="flex:1"><div style="font-size:13px;font-weight:700" class="l2">Step 5 of 11</div><div style="height:7px;border-radius:4px;background:rgba(255,255,255,.22);margin-top:8px"><div style="width:45%;height:7px;border-radius:4px;background:#fff"></div></div></div><div class="btn" style="background:#fff;color:${T.ink};height:52px;padding:0 24px;border-radius:26px">Continue</div></div>
</div>
${tabbar({ bg: '#F8F7F3', line: 'rgba(0,0,0,.07)', on: T.ink, off: '#6A6965', pill: '#E6E5E0', badge: f, badgeInk: '#fff' })}`;
  },
  step() {
    const f = FIELD['1.1'];
    return `${statusBar(T.ink)}
<div style="height:58px;display:flex;align-items:center;gap:14px;padding:0 16px"><span class="ib">${icon('x', 20, 2)}</span>${segs(9, 4, f, '#D9D8D2')}<span class="ib">${icon('flag', 19, 1.8)}</span></div>
<div class="tk" style="margin:4px 12px 0;background:${f};height:330px">
  <div style="padding:18px 22px 0;display:flex;justify-content:space-between;font-size:15px;font-weight:800;font-variant-numeric:tabular-nums"><span class="l2">#1041</span><span>L4</span></div>
  <div style="height:262px;display:grid;place-items:center">${figure('layers-rest', fieldHL(f), { w: 330, h: 250, label: 'Two seven-layer stacks; the print job sits on layer 4' })}</div>
  <span style="position:absolute;right:14px;bottom:14px;width:44px;height:44px;border-radius:22px;background:rgba(255,255,255,.16);display:grid;place-items:center">${icon('xray', 20, 1.8, '#fff')}</span>
</div>
<div style="padding:20px 22px 0"><div class="t2" style="font-size:15px;font-weight:500">${LEAD}</div><div style="font-size:25px;line-height:30px;font-weight:800;letter-spacing:-.025em;margin-top:6px">${STEP_Q}</div></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:16px 12px 0">${OPTS.map(([n, l], i) => `<div class="opt"${i === 0 ? ` style="background:${f};color:#fff;box-shadow:none"` : ''}><b>${n}</b><span>${l}</span></div>`).join('')}</div>
<div class="t2" style="text-align:center;font-size:14px;margin-top:14px">${HELP}</div>
<div style="position:absolute;left:12px;right:12px;bottom:30px;display:flex;gap:10px"><span class="ib" style="width:56px;height:56px;border-radius:28px">${icon('back', 22, 2)}</span><div class="btn" style="flex:1;background:${T.ink};color:#fff">Play it</div></div>`;
  },
};
