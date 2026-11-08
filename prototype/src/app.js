// Network+ pilot prototype: one page, no build step, Hairline figures mounted live.
(() => {
  // ── storage that never breaks the page ──
  const load = (k, d) => { try { const v = localStorage.getItem('uth.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem('uth.' + k, JSON.stringify(v)); } catch {} };

  // ── icons (one stroke, Phosphor-like) ──
  const I = {
    x: '<path d="M18 6 6 18M6 6l12 12"/>', flag: '<path d="M5 21V4.5M5 15.5c5-3.5 9 3 14 0v-11c-5 3.5-9-3-14 0"/>',
    back: '<path d="M15 19 8 12l7-7"/>', next: '<path d="m9 5 7 7-7 7"/>', share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8M8 11H5.5v9.5h13V11H16"/>',
    today: '<path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/>', practice: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
    review: '<path d="M4.5 9.5A8 8 0 0 1 19 8M19.5 14.5A8 8 0 0 1 5 16M19 3.5V8h-4.5M5 20.5V16h4.5"/>', progress: '<path d="M4 20h16M7 20v-7M12 20V6M17 20v-10"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>', checkc: '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.8 2.8L16 9.8"/>', xc: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/>', xray: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M4 12h16"/>',
    dots: '<circle cx="5.5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18.5" cy="12" r="1.2" fill="currentColor"/>',
    replay: '<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4.5h4.5"/>', mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>', bolt: '<path d="M13.5 3 5 13.5h6L10.5 21 19 10.5h-6z"/>',
    stack: '<path d="m12 4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4"/>', grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    play: '<path d="M7.5 5v14l11-7z" fill="currentColor" stroke="none"/>', pause: '<path d="M8 5v14M16 5v14"/>',
  };
  const ic = (n, s = 22, w = 1.8) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── content ──
  const LAYERS = ['Physical', 'Data link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'];
  const DOOR_PORTS = ['22', '25', '53', '80', '443', '3389'];
  const PORTS = [
    ['20/21', 'FTP', 'moving files'], ['22', 'SSH', 'a secure remote shell'], ['23', 'Telnet', 'an unencrypted remote shell'], ['25', 'SMTP', 'sending email'],
    ['53', 'DNS', 'looking up names'], ['67/68', 'DHCP', 'handing out IP addresses'], ['80', 'HTTP', 'web pages'], ['110', 'POP3', 'downloading email'],
    ['143', 'IMAP', 'email kept in folders'], ['161/162', 'SNMP', 'monitoring devices'], ['443', 'HTTPS', 'secure web pages and payments'], ['3389', 'RDP', 'remote desktop'],
  ];
  const FAULTS = [{ id: 'cable', t: 'Cable unplugged', layer: 0 }, { id: 'ip', t: 'Printer has the wrong IP', layer: 2 }, { id: 'svc', t: 'Print service crashed', layer: 6 }];
  const PORT_Q = [['80', 'HTTP', 3], ['443', 'HTTPS', 4], ['22', 'SSH', 0], ['25', 'SMTP', 1]];

  // ── state ──
  const S = {
    style: load('style', 'studio'), screen: 'home', step: 0, predict: null, played: false,
    closed: load('closed', false), drag: { at: {}, sel: null, checked: false }, pq: null,
    pm: null, timerOn: load('timerOn', true), best: load('best', null), rating: load('rating', null), email: load('email', ''),
  };
  const app = document.getElementById('app');
  const view = document.getElementById('view');

  // ── Hairline: figures register themselves; we mount as many as a screen needs ──
  const FIGS = {}; window.hairline = (f) => { FIGS[f.name] = f; };
  let live = [];
  const READ = {
    layers: (t) => /^L\d$/.test(t) ? `${t} · ${LAYERS[Number(t[1]) - 1]}` : null,
    doors: (t) => t.startsWith('door ') ? DOOR_PORTS[Number(t.slice(5)) - 1] : t === 'shut' ? '443 · shut' : null,
    slicer: (t) => t.startsWith('/') ? t : null,
  };
  function mount(el, name) {
    const f = FIGS[name];
    HL.inject(document);
    el.setAttribute('data-hairline', name); el.setAttribute('role', 'img'); el.setAttribute('aria-label', f.means);
    const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, el);
    const tag = el.parentElement.querySelector('.read');
    let text = '';
    const read = {
      get textContent() { return text; },
      set textContent(v) { text = v == null ? '' : String(v); if (tag) tag.textContent = (READ[name](text)) || tag.dataset.rest; },
    };
    const h = f.mount({ stage: el, svg, read }, f.range[1]);
    live.push(h);
    return h;
  }
  const figs = {};

  // ── pieces ──
  const segs = (n, done) => `<div class="segs" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i class="${i < done ? 'on' : ''}"></i>`).join('')}</div>`;
  const top = (n, done, closeTo = 'home') => `<div class="topbar"><button class="ib" data-go="${closeTo}" aria-label="Close">${ic('x', 20)}</button>${segs(n, done)}<button class="ib" data-act="report" aria-label="Report an error">${ic('flag', 19)}</button></div>`;
  const stage = (name, h, w, rest, extra = '') => `<div class="stage" style="height:${h}px"><span class="read" data-rest="${rest}">${rest}</span><div class="fig" data-fig="${name}" style="width:${w}px"></div>${extra}</div>`;
  const tabs = (cur) => `<nav class="tabbar" aria-label="Main">${[['home', 'today', 'Today'], ['practice', 'practice', 'Practice'], ['review', 'review', 'Review'], ['summary', 'progress', 'Progress']].map(([go, icn, l]) => `<button class="tab" data-go="${go}"${cur === go ? ' aria-current="page"' : ''}><span class="pill">${ic(icn, 23, cur === go ? 2 : 1.6)}</span>${l}${go === 'review' ? '<span class="badge o11" style="--badge:var(--accent);--badge-ink:var(--on)">4</span>' : ''}</button>`).join('')}</nav>`;

  // ── screens ──
  const SCREENS = {
    home() {
      const days = [['Tue', 'o11', S.closed ? 'closed' : 'open'], ['Wed', 'o14', S.closed ? 'open' : ''], ['Thu', 'o17', ''], ['Fri', 'o51', '']];
      const strip = days.map(([d, o, st]) => `<div class="day ${o} ${st}"><span class="dot">${st === 'closed' ? ic('check', 18, 2.4) : st === 'open' ? `<span class="lbl-n">${S.closed ? '0/4' : `${S.step + 1}/3`}</span>${''}` : ''}</span>${d}</div>`).join('');
      const t = S.closed
        ? { o: 'o14', fig: 'doors', rest: 'rest', who: 'PK', name: 'Priya · Shift lead', no: '1042', hook: 'Card payments fail but the web works.', prog: 0, meta: 'Practice first · 1 question', go: 'portq', cta: 'Start' }
        : { o: 'o11', fig: 'layers', rest: 'L4 · Transport', who: 'JO', name: 'Jo · Barista', no: '1041', hook: 'The till tablet can’t print.', prog: Math.round(((S.step) / 3) * 100), meta: `Step ${S.step + 1} of 3 · about 3 minutes`, go: 'lesson', cta: S.step ? 'Continue' : 'Start ticket' };
      return `<div class="screen with-tabs fade-in">
<div class="pad" style="padding-top:10px;display:flex;justify-content:space-between;align-items:flex-start"><div><div class="kick">${S.closed ? 'Wednesday' : 'Tuesday'}</div><h1 class="h1">Your first week</h1></div><button class="ib" data-act="menu" aria-label="Options">${ic('dots', 22)}</button></div>
<div class="strip" role="list" aria-label="This week">${strip}</div>
<article class="card ticket ${t.o}">
  ${stage(t.fig, 214, 330, t.rest)}
  <div style="padding:16px 14px 14px">
    <div class="sender"><span class="avatar">${t.who}</span>${t.name}<span class="t2 num" style="margin-left:auto;font-size:13px">Ticket ${t.no}</span></div>
    <h2 style="font-size:23px;line-height:29px;font-weight:var(--tw);letter-spacing:-.022em;margin:12px 0 0">${t.hook}</h2>
    <div class="bar" style="margin-top:16px"><i style="width:${t.prog}%"></i></div>
    <div class="t2" style="font-size:13px;margin-top:8px">${t.meta}</div>
    <div class="perf"><b style="left:-20px"></b><b style="right:-20px"></b></div>
    <button class="pri" data-go="${t.go}" style="margin-top:14px">${t.cta}</button>
  </div>
</article>
</div>${tabs('home')}`;
    },

    lesson() {
      const step = S.step;
      const kicker = '<div class="kick" style="font-size:14px">Ticket 1041 · Jo, Barista</div>';
      let body = '', bar = '';
      if (step === 0) {
        body = `<div class="pad" style="margin-top:20px">${kicker}<h2 class="h2" style="margin-top:4px">The print job heads down the stack</h2><p class="body" style="margin-top:8px">Each layer wraps the job in its own envelope. Transport adds the printer’s port, 9100. Network adds its IP address.</p></div><p class="help">Touch the stack to open a layer.</p>`;
        bar = `<button class="ib" style="width:56px;height:56px;border-radius:28px" data-go="home" aria-label="Back">${ic('back', 22)}</button><button class="pri" data-act="lnext" style="flex:1">Next</button>`;
      } else if (step === 1) {
        body = `<div class="pad" style="margin-top:20px"><p class="lead">The print job is on layer 4, on its way down.</p><h2 class="h2" style="margin-top:6px">The printer cable is unplugged. Which layer fails first?</h2></div>
<div class="opts layers4" role="radiogroup" aria-label="Layers">${[0, 1, 2, 6].map((L) => `<button class="opt" role="radio" aria-checked="${S.predict === L}" data-pick="${L}"><b>${L + 1}</b><span>${LAYERS[L]}</span></button>`).join('')}</div>
<p class="help">Guess freely. A wrong answer plays out too.</p>`;
        bar = `<button class="ib" style="width:56px;height:56px;border-radius:28px" data-act="lback" aria-label="Back">${ic('back', 22)}</button><button class="pri" data-act="play" style="flex:1" ${S.predict == null ? 'disabled' : ''}>Play it</button>`;
      } else {
        body = `<div class="pad" style="margin-top:20px"><div class="kick" style="font-size:14px;color:var(--accent)">Fault found</div><h2 class="h2" style="margin-top:4px">Layer 1: the printer cable was out.</h2><p class="body" style="margin-top:8px">You plug it back in and the test page prints. Jo can take card orders again.</p><p class="t2" style="font-size:13px;margin-top:14px">Objective 1.1 · OSI model · Simplified: real stacks share some jobs between layers.</p></div>`;
        bar = `<button class="pri" data-act="close">Close ticket 1041</button>`;
      }
      return `<div class="screen with-bar fade-in o11">${top(3, step + (step === 2 ? 1 : 0))}
${stage('layers', 300, 330, 'L4 · Transport', `<button class="ib" data-act="xray" aria-label="Packet x-ray">${ic('xray', 20)}</button>`)}
${body}</div><div class="bottom o11">${bar}</div>
<div class="sheet o11" id="fb"></div>`;
    },

    practice() {
      const best = S.best ? `best ${fmt(S.best)}` : 'no best yet';
      return `<div class="screen with-tabs fade-in"><div class="pad" style="padding-top:10px"><div class="kick">Week 1</div><h1 class="h1">Practice</h1></div>
<div class="list">
  <button class="item o14" data-go="ports"><span class="sw">${ic('grid', 24)}</span><span style="flex:1"><b style="font-size:16px">Port Match</b><br><span class="t2" style="font-size:14px">12 ports · ${best}</span></span>${ic('next', 18, 2)}</button>
  <button class="item o11" data-go="drag"><span class="sw">${ic('stack', 24)}</span><span style="flex:1"><b style="font-size:16px">Ticket 1041 practice</b><br><span class="t2" style="font-size:14px">2 questions · drag and choose</span></span>${ic('next', 18, 2)}</button>
  <button class="item o17" disabled><span class="sw">${ic('bolt', 24)}</span><span style="flex:1"><b style="font-size:16px">Subnet Sprint</b><br><span class="t2" style="font-size:14px">Opens after Thursday’s ticket</span></span>${ic('lock', 18, 2)}</button>
</div></div>${tabs('practice')}`;
    },

    review() {
      const cards = [['o14', 'Port 3389', 'Ports and protocols · 1.4'], ['o11', 'Wrong IP on the printer', 'OSI model · 1.1'], ['o17', 'Usable hosts in a /26', 'IPv4 addressing · 1.7'], ['o14', 'Ports 67 and 68', 'Ports and protocols · 1.4']];
      return `<div class="screen with-tabs fade-in"><div class="pad" style="padding-top:10px"><div class="kick">4 cards</div><h1 class="h1">Review</h1><p class="lead" style="margin-top:6px">Things you missed come back here until they stick.</p></div>
<div class="list">${cards.map(([o, t, s]) => `<div class="item ${o}" style="box-shadow:var(--card-shadow)"><span class="sw" style="width:12px;height:44px;border-radius:6px;background:var(--accent)"></span><span style="flex:1"><b style="font-size:16px">${t}</b><br><span class="t2" style="font-size:14px">${s}</span></span></div>`).join('')}</div>
<div class="pad" style="margin-top:18px"><button class="pri" data-go="ports">Start with Port Match</button></div></div>${tabs('review')}`;
    },

    drag() {
      const d = S.drag;
      const slot = (L) => {
        const f = FAULTS.find((x) => d.at[x.id] === L);
        const st = d.checked && f ? (f.layer === L ? ' right' : ' wrong') : f ? '' : ' empty';
        return `<div class="slot${st}" data-slot="${L}"${d.sel ? ` role="button" tabindex="0" aria-label="Place on layer ${L + 1}, ${LAYERS[L]}"` : ''}><span class="n">${L + 1}</span><span class="name">${LAYERS[L]}</span>${f ? `<button class="chip" data-chip="${f.id}" data-placed="1">${d.checked ? ic(f.layer === L ? 'check' : 'x', 16, 2.4) : ''}${f.t}</button>` : `<span class="t2" style="font-size:13px;padding-right:9px">${d.sel ? 'Tap to place' : 'Empty'}</span>`}</div>`;
      };
      const tray = FAULTS.filter((f) => d.at[f.id] == null).map((f) => `<button class="chip ghost${d.sel === f.id ? ' sel' : ''}" data-chip="${f.id}">${f.t}</button>`).join('');
      const all = FAULTS.every((f) => d.at[f.id] != null);
      return `<div class="screen with-bar fade-in o11">${top(2, 0, 'practice')}
<div class="pad" style="margin-top:6px;margin-bottom:16px"><p class="lead">Question 1 of 2</p><h2 class="h2">Drag each fault onto its layer.</h2></div>
${stage('layers', 226, 290, 'L4 · Transport')}
<div class="slots">${[0, 2, 6].map(slot).join('')}</div>
<div class="tray">${tray ? `<span class="t2" style="font-size:13px;font-weight:600">Still to place</span>${tray}` : ''}</div>
</div><div class="bottom o11" style="flex-direction:column;gap:12px"><p class="help" style="margin:0">Or tap a fault, then tap a layer.</p><button class="pri" data-act="dcheck" ${all && !d.checked ? '' : 'disabled'}>Check</button></div>
<div class="sheet o11" id="fb"></div>`;
    },

    portq() {
      return `<div class="screen with-bar fade-in o14">${top(2, 1, 'practice')}
<div class="pad" style="margin-top:6px;margin-bottom:16px"><p class="lead">Question 2 of 2 · from Wednesday’s ticket</p><h2 class="h2">Card payments fail but the web works. Which port should the firewall allow?</h2></div>
${stage('doors', 200, 250, 'rest')}
<div class="opts" role="radiogroup" aria-label="Ports">${PORT_Q.map(([p, n], i) => `<button class="opt num" role="radio" aria-checked="${S.pq === i}" data-pq="${i}">${p} · ${n}</button>`).join('')}</div>
<p class="help">Guess freely. A wrong answer plays out too.</p>
</div><div class="bottom o14"><button class="ib" style="width:56px;height:56px;border-radius:28px" data-go="drag" aria-label="Back">${ic('back', 22)}</button><button class="pri" data-act="pqcheck" style="flex:1" ${S.pq == null ? 'disabled' : ''}>Check</button></div>
<div class="sheet o14" id="fb"></div>`;
    },

    replay() {
      const [p, n] = PORT_Q[S.pq];
      const scrub = `<div style="position:absolute;left:14px;right:14px;bottom:14px;height:40px;border-radius:20px;background:var(--read-bg);display:flex;align-items:center;gap:10px;padding:0 10px 0 6px;z-index:2"><button data-act="rplay" aria-label="Replay" style="width:30px;height:30px;border-radius:15px;background:var(--accent);color:var(--on);display:grid;place-items:center">${ic('play', 14)}</button><div style="flex:1;height:4px;border-radius:2px;background:color-mix(in srgb,var(--read) 22%,transparent)"><i id="scrub" style="display:block;height:4px;border-radius:2px;background:var(--read);width:0"></i></div><span class="num" id="scrubt" style="font-size:12px;font-weight:700;color:var(--read)">0:00</span></div>`;
      return `<div class="screen fade-in o14">${top(2, 1, 'practice')}
<div class="pad" style="margin-top:6px;margin-bottom:16px"><p class="lead">You chose port ${p}, ${n}.</p><h2 class="h2">Here’s what that rule does.</h2></div>
${stage('doors', 262, 300, 'rest', scrub)}
<p class="body pad" style="margin-top:16px" id="rtext">Card payments travel on port 443. Your rule only opens ${p}, so the firewall drops the payment.</p>
</div><div class="sheet err show o14" id="fb"><div class="msg">${ic('xc', 22)}Not quite. The answer is 443, HTTPS.</div><div class="row"><button class="ib" style="width:56px;height:56px;border-radius:28px;background:var(--surf)" data-act="rplay" aria-label="Replay">${ic('replay', 21)}</button><button class="pri" data-act="show443" style="flex:1">Show me 443</button></div></div>`;
    },

    ports() {
      const g = S.pm;
      const round = g.rounds[g.r];
      const L = round.map((i) => { const [p] = PORTS[i]; const st = g.done.has(i) ? 'done' : g.sel?.side === 'p' && g.sel.i === i ? 'sel' : g.bad?.p === i ? 'wrong' : ''; return `<button class="tile port ${st}" data-tile="p${i}" ${g.done.has(i) ? 'disabled' : ''}>${p}${st === 'done' ? ic('check', 18, 2.4) : st === 'wrong' ? ic('x', 17, 2.4) : ''}</button>`; });
      const R = g.order[g.r].map((i) => { const [, n] = PORTS[i]; const st = g.done.has(i) ? 'done' : g.sel?.side === 'n' && g.sel.i === i ? 'sel' : g.bad?.n === i ? 'wrong' : ''; return `<button class="tile ${st}" data-tile="n${i}" ${g.done.has(i) ? 'disabled' : ''}>${n}${st === 'done' ? ic('check', 18, 2.4) : st === 'wrong' ? ic('x', 17, 2.4) : ''}</button>`; });
      const grid = L.map((l, k) => l + R[k]).join('');
      const pct = Math.round((g.done.size / 12) * 100);
      return `<div class="screen fade-in o14"><div class="topbar"><button class="ib" data-go="practice" aria-label="Close">${ic('x', 20)}</button><span style="flex:1;font-size:17px;font-weight:var(--tw)">Port Match</span><span class="num" id="clock" style="height:44px;padding:0 15px;border-radius:22px;background:var(--surf2);display:${S.timerOn ? 'flex' : 'none'};align-items:center;gap:6px;font-size:15px;font-weight:700">${ic('timer', 18)}<span>${fmt(g.t)}</span></span></div>
<div class="pad" style="display:flex;align-items:center;gap:12px;margin:4px 0 14px"><div class="bar" style="flex:1;background:var(--track)"><i style="width:${pct}%"></i></div><span class="num" style="font-size:14px;font-weight:700">${g.done.size} of 12</span></div>
${stage('doors', 136, 170, 'rest')}
<div class="grid2">${grid}</div>
<div id="pmnote">${g.note ? `<div class="note ${g.note.ok ? 'ok' : 'err'}">${ic(g.note.ok ? 'checkc' : 'xc', 20)}${g.note.t}</div>` : ''}</div>
<button data-act="timer" style="display:flex;align-items:center;justify-content:center;gap:8px;height:48px;width:100%;margin-top:10px;font-size:15px;font-weight:600;color:var(--ink2)">${ic('timer', 18)}${S.timerOn ? 'Turn off the timer' : 'Turn the timer back on'}</button>
</div>`;
    },

    summary() {
      const rows = [['o11', 'OSI model', '1.1', 12, 14], ['o14', 'Ports and protocols', '1.4', 10, 14], ['o17', 'IPv4 addressing', '1.7', 9, 14], ['o51', 'Troubleshooting', '5.1', 8, 10]].map(([o, n, k, r, t]) => {
        const p = Math.round((r / t) * 100);
        return `<div class="${o}" style="padding:12px 0"><div style="display:flex;justify-content:space-between;align-items:baseline;font-size:15px;font-weight:650"><span>${n} <span class="t2" style="font-weight:500;font-size:13px">${k}</span></span><span class="num">${p}%</span></div><div class="bar" style="margin-top:8px;${S.style === 'night' ? 'background:rgba(255,255,255,.08)' : ''}"><i style="width:${p}%"></i></div></div>`;
      }).join('');
      const em = S.email;
      return `<div class="screen with-tabs fade-in"><div class="topbar" style="justify-content:space-between"><button class="ib" data-go="home" aria-label="Back">${ic('back', 20)}</button><button class="ib" data-go="shared" aria-label="Share a figure">${ic('share', 20)}</button></div>
<div class="pad"><h1 class="h1">Week 1, closed</h1><p class="lead" style="margin-top:4px;font-size:16px">Sam’s café network is up and running.</p></div>
<div class="card" style="margin:20px 16px 0;padding:18px 20px 8px"><div style="display:flex;align-items:baseline;gap:10px"><span class="num" style="font-size:52px;line-height:56px;font-weight:800;letter-spacing:-.04em">75%</span><span class="t2" style="font-size:15px;font-weight:500">right first time<br>39 of 52 questions</span></div><div style="margin-top:6px">${rows}</div></div>
<div class="o17" style="margin:12px 16px 0;padding:16px 16px 16px 20px;border-radius:24px;background:var(--stage);display:flex;align-items:center;gap:12px;${S.style === 'desk' ? 'color:#fff' : ''}"><div style="flex:1"><div style="font-size:16px;font-weight:700">Start with subnetting</div><div style="font-size:14px;opacity:.8;margin-top:2px">5 cards are waiting in Review.</div></div><button data-go="review" style="height:44px;padding:0 18px;border-radius:22px;background:${S.style === 'desk' ? '#fff' : 'var(--accent)'};color:${S.style === 'desk' ? 'var(--ink)' : 'var(--on)'};font-size:15px;font-weight:700">Review 5</button></div>
<div class="pad" style="margin-top:22px;font-size:16px;font-weight:700" id="rate-l">How was week 1?</div>
<div class="rate" role="group" aria-labelledby="rate-l">${[1, 2, 3, 4, 5].map((v) => `<button data-rate="${v}" aria-pressed="${S.rating === v}">${v}</button>`).join('')}</div>
<form class="field" id="mailf" style="margin-top:22px" novalidate>${em ? `<div class="note ok" style="margin:0">${ic('checkc', 20)}Saved. One email when week 2 ships, nothing else.</div>` : `<label for="mail">Email me when week 2 is out</label><div style="display:flex;gap:8px"><input id="mail" type="email" autocomplete="email" placeholder="you@example.com"><button class="pri" style="width:auto;padding:0 20px;height:52px">Notify me</button></div><div class="err" id="mailerr" hidden></div><p class="t2" style="font-size:13px;margin:8px 4px 0">Used only for this. Unsubscribe in one tap.</p>`}</form>
<div style="height:24px"></div></div>${tabs('summary')}`;
    },

    shared() {
      return `<div class="screen fade-in o17" style="padding-bottom:30px"><div style="height:56px;display:flex;align-items:center;gap:10px;padding:0 20px"><span style="width:30px;height:30px;border-radius:9px;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-size:12px;font-weight:800">UH</span><span style="font-size:15px;font-weight:700;flex:1">Under the Hood</span><span style="height:30px;padding:0 12px;border-radius:15px;background:var(--surf2);font-size:13px;font-weight:600;display:flex;align-items:center">Network+ · 1.7</span></div>
<div class="pad" style="margin:10px 0 18px"><h1 class="h1" style="font-size:30px">Slice a /24 into networks</h1></div>
${stage('slicer', 236, 330, '/26')}
<div class="card" style="margin:12px 16px 0;padding:16px 18px 12px"><div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700"><label for="mask">Mask</label><span class="num" id="maskout">4 networks of 64</span></div>
<div class="range"><input id="mask" type="range" min="24" max="27" step="1" value="26" aria-valuetext="/26" style="--fill:66.6%"></div>
<div class="t2 num" style="display:flex;justify-content:space-between;font-size:13px;font-weight:600"><span>/24</span><span>/25</span><span>/26</span><span>/27</span></div></div>
<p class="body pad" style="margin-top:16px" id="maskp"></p>
<div style="padding:18px 16px 0"><button class="pri" data-go="home">Try the full lesson</button><p class="t2" style="text-align:center;font-size:13px;margin-top:10px">From ticket 1043 · 7 minutes · free, no sign-up</p></div>
<p class="t2 pad" style="font-size:11.5px;line-height:16px;margin-top:22px">Last reviewed 8 Nov 2026 · <button data-act="report" style="text-decoration:underline;text-underline-offset:2px">Report an error</button><br>CompTIA and Network+ are trademarks of CompTIA. Not affiliated with or endorsed by CompTIA.</p></div>`;
    },
  };

  // ── after a screen is drawn ──
  const AFTER = {
    home() {
      const el = view.querySelector('[data-fig]');
      figs.home = mount(el, el.dataset.fig);
    },
    lesson() {
      figs.l = mount(view.querySelector('[data-fig]'), 'layers');
      if (S.step === 2) figs.l.pick(0);
      if (S.step === 1 && S.played) showPredict(false);
    },
    drag() {
      figs.d = mount(view.querySelector('[data-fig]'), 'layers');
      dragWire();
      if (S.drag.checked) dragFeedback(false);
    },
    portq() { figs.q = mount(view.querySelector('[data-fig]'), 'doors'); },
    replay() { figs.r = mount(view.querySelector('[data-fig]'), 'doors'); setTimeout(runReplay, 300); },
    ports() { figs.p = mount(view.querySelector('[data-fig]'), 'doors'); },
    shared() { figs.s = mount(view.querySelector('[data-fig]'), 'slicer'); maskWire(); },
  };

  let clockId = 0, scrubId = 0;
  function go(name) {
    clearInterval(clockId); clearInterval(scrubId);
    live.forEach((h) => h.destroy()); live = [];
    S.screen = name;
    if (name === 'ports' && (!S.pm || S.pm.finished)) newGame();
    view.innerHTML = SCREENS[name]();
    app.dataset.screen = name;
    (AFTER[name] || (() => {}))();
    if (name === 'ports') startClock();
    const h = view.querySelector('h1, h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  const redraw = () => go(S.screen);

  // ── lesson ──
  function showPredict(animate = true) {
    const fb = view.querySelector('#fb');
    const right = S.predict === 0;
    const L = S.predict;
    fb.className = `sheet o11 ${right ? 'ok' : 'err'}`;
    fb.innerHTML = right
      ? `<div class="msg">${ic('checkc', 22)}Right. No cable, no signal.</div><p class="sub">Layer 1, Physical, fails first. Every layer above it waits for bits that never arrive.</p><div class="row"><button class="pri" data-act="lnext">Next</button></div>`
      : `<div class="msg">${ic('xc', 22)}Not quite. Layer ${L + 1}, ${LAYERS[L]}, never gets a say.</div><p class="sub">With the cable out nothing leaves the tablet, so layer 1, Physical, fails first.</p><div class="row"><button class="ib" style="width:56px;height:56px;border-radius:28px;background:var(--surf)" data-act="play" aria-label="Replay">${ic('replay', 21)}</button><button class="pri" data-act="lnext" style="flex:1">Next</button></div>`;
    requestAnimationFrame(() => fb.classList.add('show'));
    const opts = view.querySelectorAll('[data-pick]');
    opts.forEach((o) => { const v = Number(o.dataset.pick); o.classList.toggle('right', v === 0); o.classList.toggle('wrong', v === L && !right); });
    if (!animate) { figs.l.pick(0); return; }
    if (right) figs.l.pick(0);
    else { figs.l.pick(L); setTimeout(() => figs.l && figs.l.pick(0), 1400); }
  }

  // ── drag and place, with a tap alternative ──
  function placeChip(id, L) {
    const d = S.drag;
    for (const k in d.at) if (d.at[k] === L) delete d.at[k];
    d.at[id] = L; d.sel = null;
    const keep = view.querySelector('.screen').scrollTop;
    redraw(); view.querySelector('.screen').scrollTop = keep;
    figs.d.pick(L);
  }
  function dragWire() {
    const scr = view.querySelector('.screen');
    scr.querySelectorAll('[data-chip]').forEach((chip) => {
      chip.addEventListener('pointerdown', (e) => {
        if (S.drag.checked) return;
        const id = chip.dataset.chip, sx = e.clientX, sy = e.clientY;
        let ghost = null, over = null;
        const move = (ev) => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
          if (!ghost) { ghost = chip.cloneNode(true); ghost.classList.add('dragging'); ghost.classList.remove('ghost', 'sel'); ghost.style.background = 'var(--accent)'; ghost.style.color = 'var(--on)'; app.appendChild(ghost); chip.style.opacity = '.3'; }
          ghost.style.left = ev.clientX - ghost.offsetWidth / 2 + 'px'; ghost.style.top = ev.clientY - 22 + 'px';
          const t = document.elementFromPoint(ev.clientX, ev.clientY); const s = t && t.closest('[data-slot]');
          if (s !== over) { if (over) over.classList.remove('hot'); over = s; if (s) { s.classList.add('hot'); figs.d.pick(Number(s.dataset.slot)); } }
        };
        const up = () => {
          removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
          if (!ghost) return; // a tap: handled by click
          ghost.remove(); chip.style.opacity = '';
          chip.dataset.dragged = '1';
          if (over) placeChip(id, Number(over.dataset.slot));
        };
        addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
      });
    });
  }
  function dragFeedback(animate = true) {
    const wrong = FAULTS.filter((f) => S.drag.at[f.id] !== f.layer);
    const fb = view.querySelector('#fb');
    fb.className = `sheet o11 ${wrong.length ? 'err' : 'ok'}`;
    fb.innerHTML = wrong.length
      ? `<div class="msg">${ic('xc', 22)}${3 - wrong.length} of 3 in the right place.</div><p class="sub">${wrong.map((f) => `“${f.t}” is a layer ${f.layer + 1} problem, ${LAYERS[f.layer]}.`).join(' ')}</p><div class="row"><button class="ib" style="width:56px;height:56px;border-radius:28px;background:var(--surf)" data-act="dretry" aria-label="Try again">${ic('replay', 21)}</button><button class="pri" data-go="portq" style="flex:1">Next question</button></div>`
      : `<div class="msg">${ic('checkc', 22)}All three in the right place.</div><p class="sub">Cables are layer 1, IP addresses layer 3, and services like printing live at layer 7.</p><div class="row"><button class="pri" data-go="portq">Next question</button></div>`;
    if (animate) requestAnimationFrame(() => fb.classList.add('show')); else fb.classList.add('show');
    if (wrong.length) figs.d.pick(wrong[0].layer);
  }

  // ── mistake replay ──
  function runReplay() {
    const door = PORT_Q[S.pq][2];
    figs.r.replay(door);
    const bar = view.querySelector('#scrub'), t = view.querySelector('#scrubt');
    clearInterval(scrubId);
    let ms = 0;
    scrubId = setInterval(() => { ms += 100; if (!bar) return; bar.style.width = Math.min(100, (ms / 6000) * 100) + '%'; t.textContent = '0:0' + Math.min(6, Math.floor(ms / 1000)); if (ms >= 6000) clearInterval(scrubId); }, 100);
  }

  // ── Port Match ──
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  function newGame() {
    const all = shuffle(PORTS.map((_, i) => i));
    const rounds = [all.slice(0, 6), all.slice(6)];
    S.pm = { rounds, order: rounds.map(shuffle), r: 0, done: new Set(), sel: null, bad: null, note: null, t: 0, miss: 0, finished: false };
  }
  function startClock() { clearInterval(clockId); clockId = setInterval(() => { if (!S.timerOn || S.pm.finished) return; S.pm.t++; const c = view.querySelector('#clock span'); if (c) c.textContent = fmt(S.pm.t); }, 1000); }
  function tapTile(code) {
    const g = S.pm, side = code[0], i = Number(code.slice(1));
    if (g.done.has(i)) return;
    g.bad = null;
    if (side === 'p') { const di = DOOR_PORTS.indexOf(PORTS[i][0]); if (di >= 0) figs.p.pick(di); }
    if (!g.sel || g.sel.side === side) { g.sel = { side, i }; g.note = null; return redrawPorts(); }
    const a = g.sel.i, b = i; g.sel = null;
    if (a === b) {
      g.done.add(a);
      g.note = { ok: true, t: `${PORTS[a][0]} is ${PORTS[a][1]}, for ${PORTS[a][2]}.` };
      const di = DOOR_PORTS.indexOf(PORTS[a][0]); if (di >= 0) figs.p.pick(di);
      if (g.rounds[g.r].every((x) => g.done.has(x))) {
        if (g.r === 0) { g.r = 1; g.note = { ok: true, t: 'Round 1 done. Six more.' }; }
        else return finishGame();
      }
    } else {
      g.miss++;
      const p = side === 'p' ? b : a, n = side === 'p' ? a : b;
      g.bad = { p, n };
      g.note = { ok: false, t: `${PORTS[p][0]} is ${PORTS[p][1]}, for ${PORTS[p][2]}. ${PORTS[n][1]} is ${PORTS[n][0]}.` };
      setTimeout(() => { if (S.screen === 'ports' && g.bad && g.bad.p === p) { g.bad = null; redrawPorts(); } }, 900);
    }
    redrawPorts();
  }
  function redrawPorts() {
    const keep = live; live = [];
    const scr = view.querySelector('.screen'), st = scr.scrollTop;
    const figEl = view.querySelector('[data-fig]').parentElement;
    view.innerHTML = SCREENS.ports();
    view.querySelector('[data-fig]').parentElement.replaceWith(figEl);
    live = keep;
    view.querySelector('.screen').scrollTop = st;
  }
  function finishGame() {
    const g = S.pm; g.finished = true;
    const prev = S.best;
    if (S.timerOn && (!S.best || g.t < S.best)) { S.best = g.t; save('best', g.t); }
    redrawPorts();
    modal(`<h2 class="h2">All 12 matched</h2><p class="lead" style="margin-top:6px">${S.timerOn ? `${fmt(g.t)} · ` : ''}${g.miss ? `${g.miss} miss${g.miss > 1 ? 'es' : ''}. Missed ports come back more often next round.` : 'No misses.'}</p>
${S.timerOn ? `<p class="body" style="margin-top:12px">${!prev ? 'That’s your first time on the board.' : g.t < prev ? `New best. Previous best was ${fmt(prev)}.` : `Your best is ${fmt(prev)}.`}</p>` : ''}
<div style="display:flex;gap:10px;margin-top:20px"><button class="sec" data-act="mclose" data-go="practice">Done</button><button class="pri" data-act="again" style="flex:1">Play again</button></div>`);
  }

  // ── shared page mask slider ──
  function maskWire() {
    const r = view.querySelector('#mask'), out = view.querySelector('#maskout'), p = view.querySelector('#maskp');
    const upd = (m, pick = true) => {
      const n = 2 ** (m - 24), size = 256 / n;
      out.textContent = n === 1 ? '1 network of 256' : `${n} networks of ${size}`;
      p.textContent = n === 1 ? '192.168.10.0/24 is one network of 256 addresses, 254 of them usable.' : `256 addresses, split ${n} ways. Each network gets ${size}, and ${size - 2} of them are usable.`;
      r.setAttribute('aria-valuetext', '/' + m); r.style.setProperty('--fill', ((m - 24) / 3) * 100 + '%');
      if (pick) figs.s.pick(m);
    };
    r.addEventListener('input', () => upd(Number(r.value)));
    upd(26, false);
  }

  // ── sheets, toasts ──
  function modal(html) {
    let sc = app.querySelector('.scrim'), m = app.querySelector('.modal');
    if (!sc) { sc = document.createElement('div'); sc.className = 'scrim'; app.appendChild(sc); sc.addEventListener('click', closeModal); }
    if (!m) { m = document.createElement('div'); m.className = 'modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); app.appendChild(m); }
    m.innerHTML = `<div class="grab"></div>${html}`;
    requestAnimationFrame(() => { sc.classList.add('show'); m.classList.add('show'); const f = m.querySelector('button'); if (f) f.focus(); });
  }
  function closeModal() { app.querySelector('.scrim')?.classList.remove('show'); app.querySelector('.modal')?.classList.remove('show'); }
  let toastT = 0;
  function toast(t) {
    let el = app.querySelector('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); app.appendChild(el); }
    el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600);
  }
  const STYLES = [['studio', 'Studio', 'Light, calm cards', '#F6E9D9'], ['night', 'Night shift', 'Dark, glowing line work', '#241C12'], ['desk', 'Ticket desk', 'Bold colour per ticket', '#8A5419']];
  function menu() {
    modal(`<h2 class="h2">Prototype</h2><p class="lead" style="margin:4px 0 16px">Pick a visual direction. Everything else stays the same.</p>
<div class="styles">${STYLES.map(([id, n, d, c]) => `<button data-style="${id}" aria-pressed="${S.style === id}"><span class="swatch" style="background:${c}"></span><span style="flex:1">${n}<br><span class="t2" style="font-size:14px;font-weight:500">${d}</span></span>${S.style === id ? ic('check', 20, 2.4) : ''}</button>`).join('')}</div>
<div style="display:flex;gap:10px;margin-top:16px"><button class="sec" data-act="reset" style="flex:1">Start over</button><button class="sec" data-go="shared" data-act="mclose" style="flex:1">Shared page</button></div>`);
  }

  // ── one click handler for the whole app ──
  app.addEventListener('click', (e) => {
    const sl = e.target.closest('[data-slot]');
    if (sl && S.drag.sel && !S.drag.checked && !e.target.closest('[data-chip]')) { placeChip(S.drag.sel, Number(sl.dataset.slot)); return; }
    const b = e.target.closest('button, [data-go]');
    if (!b || b.disabled) return;
    const a = b.dataset.act;
    if (b.dataset.style) { S.style = b.dataset.style; save('style', S.style); app.dataset.style = S.style; window.__syncBg && window.__syncBg(); closeModal(); redraw(); return; }
    if (a === 'mclose') closeModal();
    if (b.dataset.go) { if (a !== 'mclose') closeModal(); go(b.dataset.go); return; }
    if (b.dataset.pick != null) { if (S.played) return; S.predict = Number(b.dataset.pick); view.querySelectorAll('[data-pick]').forEach((o) => o.setAttribute('aria-checked', String(o === b))); view.querySelector('[data-act="play"]').disabled = false; figs.l.pick(S.predict); return; }
    if (b.dataset.pq != null) { S.pq = Number(b.dataset.pq); view.querySelectorAll('[data-pq]').forEach((o) => o.setAttribute('aria-checked', String(o === b))); view.querySelector('[data-act="pqcheck"]').disabled = false; figs.q.pick(PORT_Q[S.pq][2]); return; }
    if (b.dataset.rate) { S.rating = Number(b.dataset.rate); save('rating', S.rating); view.querySelectorAll('[data-rate]').forEach((o) => o.setAttribute('aria-pressed', String(o === b))); toast('Thanks. Your rating is saved with this week.'); return; }
    if (b.dataset.tile) { tapTile(b.dataset.tile); return; }
    if (b.dataset.chip) {
      if (b.dataset.dragged) { delete b.dataset.dragged; return; }
      if (S.drag.checked) return;
      const id = b.dataset.chip;
      if (b.dataset.placed) { delete S.drag.at[id]; S.drag.sel = id; } else S.drag.sel = S.drag.sel === id ? null : id;
      const keep = view.querySelector('.screen').scrollTop; redraw(); view.querySelector('.screen').scrollTop = keep; return;
    }
    switch (a) {
      case 'menu': return menu();
      case 'reset': try { Object.keys(localStorage).filter((k) => k.startsWith('uth.')).forEach((k) => localStorage.removeItem(k)); } catch {} location.reload(); return;
      case 'report': return toast('Error report opened for this step. (Prototype: nothing is sent.)');
      case 'xray': return modal(`<h2 class="h2">Packet x-ray</h2><p class="lead" style="margin:4px 0 14px">What each layer added to Jo’s print job.</p>${[['7', 'Application', 'Print job: receipt #0318'], ['4', 'Transport', 'To port 9100, the printer’s print service'], ['3', 'Network', 'From 10.0.1.24 to 10.0.1.31'], ['2', 'Data link', 'To the printer’s MAC, 3C:52:82:4A:1F:07'], ['1', 'Physical', 'Signals on the cable']].map(([n, l, v]) => `<div class="o11" style="display:flex;gap:12px;padding:12px 0;box-shadow:inset 0 -1px 0 var(--line)"><span style="width:30px;height:30px;border-radius:15px;background:var(--soft);color:var(--accent);display:grid;place-items:center;font-size:13px;font-weight:700;flex:none">${n}</span><span><b style="font-size:15px">${l}</b><br><span class="t2" style="font-size:14px">${v}</span></span></div>`).join('')}<p class="t2" style="font-size:13px;margin-top:12px">Simplified: layers 5 and 6 add nothing you need here.</p><button class="pri" data-act="mclose" style="margin-top:14px">Done</button>`);
      case 'lnext': if (S.step < 2) { S.step++; S.played = false; } return redraw();
      case 'lback': S.step = Math.max(0, S.step - 1); S.played = false; S.predict = null; return redraw();
      case 'play': if (S.predict == null) return; S.played = true; view.querySelector('[data-act="play"]:not(.ib)')?.setAttribute('disabled', ''); return showPredict(true);
      case 'close': S.closed = true; save('closed', true); S.step = 0; S.drag = { at: {}, sel: null, checked: false }; go('drag'); return toast('Ticket 1041 closed. Two practice questions next.');
      case 'dcheck': S.drag.checked = true; { const keep = view.querySelector('.screen').scrollTop; redraw(); view.querySelector('.screen').scrollTop = keep; } return;
      case 'dretry': S.drag = { at: {}, sel: null, checked: false }; return redraw();
      case 'pqcheck':
        if (S.pq === 1) {
          figs.q.pick(4);
          const fb = view.querySelector('#fb'); fb.className = 'sheet ok o14';
          fb.innerHTML = `<div class="msg">${ic('checkc', 22)}Right. Card payments travel on 443, HTTPS.</div><p class="sub">The web works because 80 is open. Payments need 443 open too.</p><div class="row"><button class="pri" data-go="home">Finish practice</button></div>`;
          requestAnimationFrame(() => fb.classList.add('show')); return;
        }
        return go('replay');
      case 'rplay': return runReplay();
      case 'show443': {
        clearInterval(scrubId); figs.r.pick(4);
        view.querySelector('#rtext').textContent = 'Open 443 and the payment walks straight through. Keep 80 open too, so the web still works.';
        const fb = view.querySelector('#fb'); fb.className = 'sheet ok show o14';
        fb.innerHTML = `<div class="msg">${ic('checkc', 22)}That’s it: 443 open, payment through.</div><p class="sub">This one goes into your Review list for tomorrow.</p><div class="row"><button class="pri" data-go="home">Finish practice</button></div>`;
        return;
      }
      case 'timer': S.timerOn = !S.timerOn; save('timerOn', S.timerOn); return redrawPorts();
      case 'again': closeModal(); newGame(); return go('ports');
    }
  });
  view.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = view.querySelector('#mail'), err = view.querySelector('#mailerr');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())) { err.hidden = false; err.textContent = 'That doesn’t look like an email address. Check for a missing @ or dot.'; inp.setAttribute('aria-invalid', 'true'); inp.focus(); return; }
    S.email = inp.value.trim(); save('email', S.email); redraw();
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-slot][role="button"]')) { e.preventDefault(); e.target.click(); }
  });

  // ── start ──
  const PAGE_BG = { studio: '#F5F4F0', night: '#111113', desk: '#F3F2EE' };
  const syncBg = () => { const narrow = matchMedia('(max-width: 500px)').matches; document.body.style.background = narrow ? PAGE_BG[S.style] : '#DADAD6'; document.documentElement.style.colorScheme = narrow && S.style === 'night' ? 'dark' : 'light'; };
  matchMedia('(max-width: 500px)').addEventListener('change', syncBg);
  window.__syncBg = syncBg;
  app.dataset.style = S.style; syncBg();
  const start = location.hash === '#share' ? 'shared' : 'home';
  go(start);
})();
