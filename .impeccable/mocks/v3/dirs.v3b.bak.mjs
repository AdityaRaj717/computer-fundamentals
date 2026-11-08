import { figure, icon, statusBar } from './lib.mjs';

const LEAD = 'The print job is on layer 4, on its way down.';
const STEP_Q = 'The printer cable is unplugged. Which layer fails first?';
const OPTS = [['1', 'Physical'], ['2', 'Data link'], ['3', 'Network'], ['7', 'Application']];
const DAYS = [['Tue', 'closed'], ['Wed', 'closed'], ['Thu', 'open'], ['Fri', 'new']];
const tabbar = (badge, ink) => `<div class="tabbar">${[['today', 'Today'], ['practice', 'Practice'], ['review', 'Review'], ['progress', 'Progress']].map(([t, l], i) => `<div class="tab${i === 0 ? ' on' : ''}" style="position:relative">${icon(t, 25, i === 0 ? 2 : 1.6)}${l}${t === 'review' ? `<span style="position:absolute;top:-2px;left:calc(50% + 6px);min-width:18px;height:18px;border-radius:9px;background:${badge};color:${ink};font-size:11px;font-weight:700;display:grid;place-items:center;padding:0 5px">4</span>` : ''}</div>`).join('')}</div>`;
const WEEK = [
  { no: '1041', day: 'Tue', t: 'The till tablet can’t print.', topic: 'OSI model', obj: '1.1', st: 'closed' },
  { no: '1042', day: 'Wed', t: 'Card payments fail but the web works.', topic: 'Ports and protocols', obj: '1.4', st: 'closed' },
  { no: '1043', day: 'Thu', t: 'The new branch needs its own network.', topic: 'IPv4 and subnetting', obj: '1.7', st: 'open' },
  { no: '1044', day: 'Fri', t: 'Friday rush: nothing works.', topic: 'Troubleshooting', obj: '5.1', st: 'new' },
];
const tabs = (active) => ['today', 'practice', 'review', 'progress'].map((t) => [t, { today: 'Today', practice: 'Practice', review: 'Review', progress: 'Progress' }[t], t === active]);
const segs = (n, done, cls = 'seg') => `<div class="${cls}s">${Array.from({ length: n }, (_, i) => `<i class="${i < done ? 'on' : ''}"></i>`).join('')}</div>`;

/* ───────────────────────── D1 Studio ───────────────────────── */
const S = { bg: '#F3F3F1', card: '#FFFFFF', ink: '#111113', ink2: '#5F5F66', fill: '#ECECE9', line: 'rgba(17,17,19,.08)', green: '#0D7A55', err: '#C2372B' };
const SHL = { plate: '#FFFFFF', hi: '#141416', edge: '#9A9AA2', mid: '#C4C4CA', lo: '#E3E3E7', sw: 1 };
export const D1 = {
  id: 'D1', name: 'Studio', font: 'Geist:wght@400;500;600;700;800',
  css: `
.D1{background:${S.bg};color:${S.ink};font-family:'Geist',sans-serif;letter-spacing:-.005em}
.D1 .h1{font-size:34px;line-height:40px;font-weight:700;letter-spacing:-.03em}
.D1 .h2{font-size:24px;line-height:30px;font-weight:700;letter-spacing:-.022em}
.D1 .t2{color:${S.ink2}}
.D1 .card{background:${S.card};border-radius:28px;box-shadow:0 1px 1px rgba(17,17,19,.04),0 10px 30px -12px rgba(17,17,19,.12)}
.D1 .chip{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 11px;border-radius:14px;background:${S.bg};font-size:13px;font-weight:600}
.D1 .btn{height:54px;border-radius:17px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:600}
.D1 .pri{background:${S.ink};color:#fff}
.D1 .ib{width:40px;height:40px;border-radius:20px;background:${S.fill};display:grid;place-items:center}
.D1 .bar{height:6px;border-radius:3px;background:${S.fill};overflow:hidden}.D1 .bar i{display:block;height:100%;background:${S.ink};border-radius:3px}
.D1 .segs{display:flex;gap:4px;flex:1}.D1 .segs i{flex:1;height:5px;border-radius:3px;background:#DADAD6}.D1 .segs i.on{background:${S.ink}}
.D1 .row{display:flex;align-items:center;gap:14px;padding:14px 18px;min-height:68px}
.D1 .row+.row{box-shadow:inset 0 1px 0 ${S.line}}
.D1 .tabbar{position:absolute;left:0;right:0;bottom:0;height:84px;background:rgba(255,255,255,.96);box-shadow:0 -1px 0 ${S.line};display:flex;padding:8px 10px 0}
.D1 .tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10.5px;font-weight:600;color:#6B6B72}
.D1 .tab.on{color:${S.ink}}
.D1 .opt{height:54px;border-radius:16px;border:1.5px solid #E2E2DE;display:flex;align-items:center;gap:10px;padding:0 14px;font-size:16px;font-weight:600;background:#fff}
.D1 .opt b{width:26px;height:26px;border-radius:13px;background:${S.bg};display:grid;place-items:center;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
.D1 .opt.sel{border:2px solid ${S.ink};background:#FAFAF8}.D1 .opt.sel b{background:${S.ink};color:#fff}
.D1 .read{position:absolute;top:16px;left:16px;height:26px;padding:0 10px;border-radius:13px;background:${S.bg};font-size:12px;font-weight:600;display:flex;align-items:center;font-variant-numeric:tabular-nums;color:${S.ink2}}
`,
  home() {
    const strip = DAYS.map(([d, st]) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px"><span style="font-size:13px;font-weight:${st === 'open' ? 700 : 500};color:${st === 'open' ? S.ink : S.ink2}">${d}</span>${st === 'closed' ? icon('checkc', 28, 1.6, S.green) : st === 'open' ? icon('half', 28, 1.6, S.ink) : icon('circle', 28, 1.6, '#A9A9AE')}</div>`).join('');
    return `${statusBar(S.ink)}
<div style="padding:8px 20px 0;display:flex;justify-content:space-between;align-items:center"><div class="h1">Your first week</div><span class="ib">${icon('dots', 22)}</span></div>
<div style="display:flex;margin:22px 20px 0">${strip}</div>
<div class="card" style="margin:24px 16px 0;overflow:hidden">
  <div style="position:relative;height:250px;display:grid;place-items:center">${figure('slicer-rest', SHL, { w: 344, h: 220, label: 'Address block split into four /26 networks' })}<span class="read" style="left:auto;right:16px">/26</span></div>
  <div style="padding:0 20px 20px">
    <div class="t2" style="font-size:14px;font-weight:500">Ticket 1043</div>
    <div style="font-size:24px;line-height:30px;font-weight:700;letter-spacing:-.022em;margin-top:4px">The new branch needs its own network.</div>
    <div class="bar" style="margin-top:18px"><i style="width:45%"></i></div>
    <div class="t2" style="font-size:13px;margin-top:8px;font-variant-numeric:tabular-nums">Step 5 of 11 · 4 min left</div>
    <div class="btn pri" style="margin-top:18px">Continue</div>
  </div>
</div>
${tabbar(S.ink, '#fff')}`;
  },
  step() {
    return `${statusBar(S.ink)}
<div style="height:56px;display:flex;align-items:center;gap:14px;padding:0 16px"><span class="ib">${icon('x', 20, 1.8)}</span>${segs(9, 4)}<span class="ib">${icon('flag', 19, 1.7)}</span></div>
<div class="card" style="margin:8px 16px 0;height:300px;position:relative;display:grid;place-items:center">${figure('layers-rest', SHL, { w: 340, h: 260, label: 'Two seven-layer stacks; the print job sits on layer 4' })}<span class="read">L4</span><span class="ib" style="position:absolute;right:14px;top:14px;background:${S.bg}">${icon('xray', 20)}</span></div>
<div style="padding:22px 20px 0"><div class="t2" style="font-size:15px">${LEAD}</div><div class="h2" style="margin-top:6px">${STEP_Q}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 16px 0">${OPTS.map(([n, l], i) => `<div class="opt${i === 0 ? ' sel' : ''}"><b>${n}</b>${l}</div>`).join('')}</div>
<div style="position:absolute;left:16px;right:16px;bottom:32px;display:flex;gap:10px"><span class="ib" style="width:54px;height:54px;border-radius:17px">${icon('back', 22, 1.9)}</span><div class="btn pri" style="flex:1">Play it</div></div>`;
  },
};

/* ───────────────────────── D2 Night shift ───────────────────────── */
const N = { bg: '#0B0B0D', s1: '#161619', s2: '#202024', ink: '#F4F4F3', ink2: '#A2A2A9', line: 'rgba(255,255,255,.07)', amber: '#EFB24A', err: '#FF7A6B', green: '#5BD39A' };
const NHL = { plate: '#0B0B0D', hi: '#FAFAF9', edge: '#8E8E97', mid: '#4A4A52', lo: '#2A2A30', sw: 1 };
export const D2 = {
  id: 'D2', name: 'Night shift', font: 'Manrope:wght@400;500;600;700;800',
  css: `
.D2{background:${N.bg};color:${N.ink};font-family:'Manrope',sans-serif}
.D2 .t2{color:${N.ink2}}
.D2 .ib{width:40px;height:40px;border-radius:20px;background:${N.s2};display:grid;place-items:center;color:${N.ink}}
.D2 .pill{height:56px;border-radius:28px;background:${N.ink};color:${N.bg};display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:700}
.D2 .segs{display:flex;gap:3px}.D2 .segs i{flex:1;height:4px;border-radius:2px;background:#2C2C31}.D2 .segs i.on{background:${N.amber}}
.D2 .read{position:absolute;font-size:12px;font-weight:600;color:${N.ink2};font-variant-numeric:tabular-nums;letter-spacing:.02em}
.D2 .tabbar{position:absolute;left:0;right:0;bottom:0;height:84px;background:${N.bg};box-shadow:0 -1px 0 ${N.line};display:flex;padding:8px 10px 0}
.D2 .tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10.5px;font-weight:700;color:#8C8C94}
.D2 .tab.on{color:${N.ink}}
.D2 .day{width:136px;flex:none;border-radius:22px;background:${N.s1};padding:14px;height:142px;display:flex;flex-direction:column;justify-content:space-between}
.D2 .opt{height:44px;border-radius:16px;background:${N.s1};display:flex;align-items:center;gap:12px;padding:0 16px;font-size:16px;font-weight:600}
.D2 .opt .r{width:22px;height:22px;border-radius:11px;border:1.6px solid #5A5A62}
.D2 .opt.sel{background:${N.s2};box-shadow:inset 0 0 0 1.5px ${N.amber}}.D2 .opt.sel .r{border:6px solid ${N.amber}}
`,
  home() {
    const strip = DAYS.map(([d, st]) => `<div style="flex:1;height:58px;border-radius:18px;background:${N.s1};display:flex;align-items:center;justify-content:center;gap:8px;${st === 'open' ? `box-shadow:inset 0 0 0 1.5px ${N.amber}` : ''}"><span style="font-size:14px;font-weight:700;color:${st === 'open' ? N.ink : N.ink2}">${d}</span>${st === 'closed' ? icon('check', 18, 2.2, N.green) : st === 'open' ? icon('half', 18, 1.8, N.amber) : icon('circle', 18, 1.8, '#5E5E66')}</div>`).join('');
    return `${statusBar(N.ink)}
<div style="padding:8px 20px 0;display:flex;justify-content:space-between;align-items:center"><span style="font-size:28px;font-weight:800;letter-spacing:-.03em">Week 1</span><span class="ib">${icon('dots', 22)}</span></div>
<div style="display:flex;gap:8px;padding:18px 20px 0">${strip}</div>
<div style="position:relative;height:270px;display:grid;place-items:center">${figure('slicer-rest', NHL, { w: 370, h: 230, label: 'Address block split into four /26 networks' })}<span class="read" style="right:20px;top:18px">/26</span></div>
<div style="padding:0 20px">
  <div style="font-size:14px;font-weight:700;color:${N.amber}">Ticket 1043</div>
  <div style="font-size:30px;line-height:35px;font-weight:800;letter-spacing:-.03em;margin-top:6px">The new branch needs its own network.</div>
  ${segs(11, 5).replace('class="segs"', 'class="segs" style="margin-top:20px"')}
  <div class="t2" style="font-size:13px;font-weight:600;margin-top:8px">Step 5 of 11 · 4 min left</div>
  <div class="pill" style="margin-top:20px">Continue</div>
</div>
${tabbar(N.amber, N.bg)}`;
  },
  step() {
    return `${statusBar(N.ink)}
<div style="height:56px;display:flex;align-items:center;gap:14px;padding:0 16px"><span class="ib">${icon('x', 20, 1.8)}</span><div style="flex:1">${segs(9, 4)}</div><span class="ib">${icon('flag', 19, 1.7)}</span></div>
<div style="position:relative;height:300px;display:grid;place-items:center">${figure('layers-rest', NHL, { w: 360, h: 268, label: 'Two seven-layer stacks; the print job sits on layer 4' })}<span class="read" style="left:20px;top:8px">L4</span>
<span style="position:absolute;right:16px;bottom:4px;height:36px;padding:0 14px;border-radius:18px;background:${N.s2};display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700">${icon('xray', 17, 1.8)}X-ray</span></div>
<div style="padding:16px 20px 0"><div class="t2" style="font-size:15px;font-weight:500">${LEAD}</div><div style="font-size:24px;line-height:30px;font-weight:800;letter-spacing:-.025em;margin-top:6px">${STEP_Q}</div>
<div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">${OPTS.map(([n, l], i) => `<div class="opt${i === 0 ? ' sel' : ''}"><span class="r"></span><span class="t2" style="font-variant-numeric:tabular-nums;width:12px">${n}</span>${l}</div>`).join('')}</div></div>
<div style="position:absolute;left:20px;right:20px;bottom:30px;display:flex;gap:10px"><span class="ib" style="width:56px;height:56px;border-radius:28px">${icon('back', 22, 1.9)}</span><div class="pill" style="flex:1">Play it</div></div>`;
  },
};

/* ───────────────────────── D3 Ticket desk ───────────────────────── */
const T = { bg: '#F2F2EF', ink: '#131313', ink2: '#5C5C60', card: '#FFFFFF' };
const FIELD = { '1.1': '#1D4A38', '1.4': '#1F3A5E', '1.7': '#7C4B12', '5.1': '#3A3A40' };
const fieldHL = (c) => ({ plate: c, hi: '#FFFFFF', edge: 'rgba(255,255,255,.62)', mid: 'rgba(255,255,255,.32)', lo: 'rgba(255,255,255,.16)', sw: 1 });
export const D3 = {
  id: 'D3', name: 'Ticket desk', font: 'Archivo:wght@400;500;600;700;800;900',
  css: `
.D3{background:${T.bg};color:${T.ink};font-family:'Archivo',sans-serif}
.D3 .t2{color:${T.ink2}}
.D3 .ib{width:42px;height:42px;border-radius:21px;background:#E4E4E0;display:grid;place-items:center}
.D3 .tk{border-radius:28px;color:#fff;position:relative;overflow:hidden}
.D3 .tk .l2{color:rgba(255,255,255,.78)}
.D3 .perf{position:relative;height:22px}
.D3 .perf:before{content:'';position:absolute;left:20px;right:20px;top:10px;border-top:2px dashed rgba(255,255,255,.28)}
.D3 .perf b{position:absolute;top:0;width:22px;height:22px;border-radius:11px;background:${T.bg}}
.D3 .btn{height:56px;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:700}
.D3 .tabbar{position:absolute;left:0;right:0;bottom:0;height:84px;background:${T.bg};box-shadow:0 -1px 0 rgba(0,0,0,.08);display:flex;padding:8px 10px 0}
.D3 .tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10.5px;font-weight:700;color:#6A6A6E}
.D3 .tab.on{color:${T.ink}}
.D3 .mini{border-radius:22px;padding:14px;color:#fff;height:112px;display:flex;flex-direction:column;justify-content:space-between}
.D3 .segs{display:flex;gap:4px;flex:1}.D3 .segs i{flex:1;height:6px;border-radius:3px;background:#D6D6D1}.D3 .segs i.on{background:${FIELD['1.1']}}
.D3 .opt{height:76px;border-radius:20px;background:#fff;padding:12px 14px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:inset 0 0 0 1.5px #E1E1DC}
.D3 .opt b{font-size:24px;line-height:24px;font-weight:900;font-variant-numeric:tabular-nums}
.D3 .opt span{font-size:13px;font-weight:600;white-space:nowrap}
.D3 .opt.sel{background:${FIELD['1.1']};color:#fff;box-shadow:none}
`,
  home() {
    const strip = DAYS.map(([d, st], i) => { const c = FIELD[WEEK[i].obj]; return `<div style="flex:1;height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:14px;font-weight:800;${st === 'new' ? `background:#fff;color:${T.ink2};box-shadow:inset 0 0 0 1.5px #DCDCD7` : `background:${c};color:#fff`}">${d}${st === 'closed' ? icon('check', 17, 2.4, '#fff') : st === 'open' ? icon('half', 17, 2, '#fff') : ''}</div>`; }).join('');
    return `${statusBar(T.ink)}
<div style="padding:8px 20px 0;display:flex;justify-content:space-between;align-items:center"><span style="font-size:40px;line-height:44px;font-weight:900;letter-spacing:-.035em">Week 1</span><span class="ib">${icon('dots', 22)}</span></div>
<div style="display:flex;gap:8px;padding:18px 12px 0">${strip}</div>
<div class="tk" style="margin:16px 12px 0;background:${FIELD['1.7']}">
  <div style="padding:20px 20px 0;font-size:16px;font-weight:800;font-variant-numeric:tabular-nums">#1043</div>
  <div style="height:200px;display:grid;place-items:center">${figure('slicer-rest', fieldHL(FIELD['1.7']), { w: 334, h: 180, label: 'Address block split into four /26 networks' })}</div>
  <div style="padding:0 20px 18px;font-size:27px;line-height:31px;font-weight:800;letter-spacing:-.028em">The new branch needs its own network.</div>
  <div class="perf"><b style="left:-11px"></b><b style="right:-11px"></b></div>
  <div style="padding:6px 20px 20px;display:flex;align-items:center;gap:14px"><div style="flex:1"><div style="font-size:13px;font-weight:700" class="l2">Step 5 of 11</div><div style="height:6px;border-radius:3px;background:rgba(255,255,255,.2);margin-top:8px"><div style="width:45%;height:6px;border-radius:3px;background:#fff"></div></div></div><div class="btn" style="background:#fff;color:${T.ink};height:52px;padding:0 22px;border-radius:26px">Continue</div></div>
</div>
${tabbar(T.ink, '#fff')}`;
  },
  step() {
    const f = FIELD['1.1'];
    return `${statusBar(T.ink)}
<div style="height:56px;display:flex;align-items:center;gap:14px;padding:0 16px"><span class="ib">${icon('x', 20, 2)}</span>${segs(9, 4)}<span class="ib">${icon('flag', 19, 1.8)}</span></div>
<div class="tk" style="margin:4px 12px 0;background:${f};height:336px">
  <div style="padding:18px 20px 0;display:flex;justify-content:space-between;font-size:15px;font-weight:800;font-variant-numeric:tabular-nums"><span>#1041</span><span class="l2">L4</span></div>
  <div style="height:270px;display:grid;place-items:center">${figure('layers-rest', fieldHL(f), { w: 340, h: 256, label: 'Two seven-layer stacks; the print job sits on layer 4' })}</div>
  <span style="position:absolute;right:14px;bottom:14px;width:44px;height:44px;border-radius:22px;background:rgba(255,255,255,.14);display:grid;place-items:center">${icon('xray', 20, 1.8, '#fff')}</span>
</div>
<div style="padding:20px 20px 0"><div class="t2" style="font-size:15px;font-weight:500">${LEAD}</div><div style="font-size:25px;line-height:30px;font-weight:800;letter-spacing:-.025em;margin-top:6px">${STEP_Q}</div></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:16px 12px 0">${OPTS.map(([n, l], i) => `<div class="opt${i === 0 ? ' sel' : ''}"><b>${n}</b><span>${l}</span></div>`).join('')}</div>
<div style="position:absolute;left:12px;right:12px;bottom:30px;display:flex;gap:10px"><span class="ib" style="width:56px;height:56px;border-radius:18px">${icon('back', 22, 2)}</span><div class="btn" style="flex:1;background:${T.ink};color:#fff">Play it</div></div>`;
  },
};
