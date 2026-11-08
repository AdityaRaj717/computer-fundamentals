# Replaces the home() and step() screens in dirs.mjs with the distilled versions.
import re, pathlib
p = pathlib.Path(__file__).with_name("dirs.mjs")
s = p.read_text(encoding="utf-8")

head = '''const LEAD = 'The print job is on layer 4, on its way down.';
const STEP_Q = 'The printer cable is unplugged. Which layer fails first?';
const OPTS = [['1', 'Physical'], ['2', 'Data link'], ['3', 'Network'], ['7', 'Application']];
const DAYS = [['Tue', 'closed'], ['Wed', 'closed'], ['Thu', 'open'], ['Fri', 'new']];
const tabbar = (badge, ink) => `<div class="tabbar">${[['today', 'Today'], ['practice', 'Practice'], ['review', 'Review'], ['progress', 'Progress']].map(([t, l], i) => `<div class="tab${i === 0 ? ' on' : ''}" style="position:relative">${icon(t, 25, i === 0 ? 2 : 1.6)}${l}${t === 'review' ? `<span style="position:absolute;top:-2px;left:calc(50% + 6px);min-width:18px;height:18px;border-radius:9px;background:${badge};color:${ink};font-size:11px;font-weight:700;display:grid;place-items:center;padding:0 5px">4</span>` : ''}</div>`).join('')}</div>`;
'''
s = re.sub(r"const STEP_BODY = .*?\nconst OPTS = .*?\n", "", s, flags=re.S)
s = s.replace("const WEEK = [", head + "const WEEK = [", 1)

D1_HOME = r'''  home() {
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
'''

D2_HOME = r'''  home() {
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
'''

D3_HOME = r'''  home() {
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
'''

def swap(s, marker, new):
    i = s.index(marker)
    a = s.index("  home() {", i)
    b = s.index("\n};", a)
    return s[:a] + new + s[b + 1:]

s = swap(s, "export const D1", D1_HOME)
s = swap(s, "export const D2", D2_HOME)
s = swap(s, "export const D3", D3_HOME)
p.write_text(s, encoding="utf-8")
print("ok")
