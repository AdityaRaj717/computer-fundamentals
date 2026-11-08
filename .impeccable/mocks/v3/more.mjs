// The other five screens, written once and styled per direction through a kit.
import { figure, icon, statusBar } from './lib.mjs';

const ink = (hex) => ({ plate: null, hi: hex, edge: hex + '99', mid: hex + '4D', lo: hex + '24', sw: 1 });
const onTint = (tint, c) => ({ ...ink(c), plate: tint });

export const KITS = {
  D1: {
    font: 'Geist', bg: '#F5F4F0', ink: '#1C1B19', ink2: '#64625D', surf: '#FFFFFF', surf2: '#EBEAE5', track: '#DEDCD6', line: 'rgba(28,27,25,.08)',
    tw: 700, r: 20, stageR: 32, shadow: '0 1px 2px rgba(28,27,25,.05),inset 0 0 0 1px rgba(28,27,25,.07)',
    pri: { bg: '#1C1B19', fg: '#FFFFFF' }, err: { tint: '#F8E3DF', ink: '#A3322A' },
    obj: {
      '1.1': { stage: '#E3EEE5', accent: '#1F5B3F', on: '#FFFFFF', soft: '#E3EEE5', read: '#1F5B3F', hl: onTint('#E3EEE5', '#1F5B3F') },
      '1.4': { stage: '#E2EAF5', accent: '#27508A', on: '#FFFFFF', soft: '#E2EAF5', read: '#27508A', hl: onTint('#E2EAF5', '#27508A') },
      '1.7': { stage: '#F6E9D9', accent: '#87511A', on: '#FFFFFF', soft: '#F6E9D9', read: '#87511A', hl: onTint('#F6E9D9', '#87511A') },
      '5.1': { stage: '#F3E3E0', accent: '#8C3C34', on: '#FFFFFF', soft: '#F3E3E0', read: '#8C3C34', hl: onTint('#F3E3E0', '#8C3C34') },
    },
    readBg: 'rgba(255,255,255,.72)',
  },
  D2: {
    font: 'Manrope', bg: '#111113', ink: '#F4F3F0', ink2: '#A6A5AB', surf: '#1A1A1D', surf2: '#242428', track: '#FFFFFF1F', line: 'rgba(255,255,255,.07)',
    tw: 800, r: 23, stageR: 32, shadow: 'none',
    pri: { bg: '#F4F3F0', fg: '#111113' }, err: { tint: '#2B1816', ink: '#F59A8C' },
    obj: {
      '1.1': { stage: '#14211B', accent: '#7FD4A6', on: '#111113', soft: '#14211B', read: '#7FD4A6', hl: { plate: '#14211B', hi: '#7FD4A6', edge: '#F4F3F099', mid: '#F4F3F04A', lo: '#F4F3F01F', sw: 1 } },
      '1.4': { stage: '#141B26', accent: '#8DB8F2', on: '#111113', soft: '#141B26', read: '#8DB8F2', hl: { plate: '#141B26', hi: '#8DB8F2', edge: '#F4F3F099', mid: '#F4F3F04A', lo: '#F4F3F01F', sw: 1 } },
      '1.7': { stage: '#241C12', accent: '#F2B861', on: '#111113', soft: '#241C12', read: '#F2B861', hl: { plate: '#241C12', hi: '#F2B861', edge: '#F4F3F099', mid: '#F4F3F04A', lo: '#F4F3F01F', sw: 1 } },
      '5.1': { stage: '#261717', accent: '#F29A8D', on: '#111113', soft: '#261717', read: '#F29A8D', hl: { plate: '#261717', hi: '#F29A8D', edge: '#F4F3F099', mid: '#F4F3F04A', lo: '#F4F3F01F', sw: 1 } },
    },
    readBg: '#FFFFFF14',
  },
  D3: {
    font: 'Archivo', bg: '#F3F2EE', ink: '#151514', ink2: '#5E5D59', surf: '#FFFFFF', surf2: '#E5E4DF', track: '#D9D8D2', line: 'rgba(0,0,0,.07)',
    tw: 800, r: 22, stageR: 34, shadow: '0 1px 2px rgba(0,0,0,.05),inset 0 0 0 1px rgba(0,0,0,.06)',
    pri: { bg: '#151514', fg: '#FFFFFF' }, err: { tint: '#F6E0DB', ink: '#9E3328' },
    obj: {
      '1.1': { stage: '#1F5240', accent: '#1F5240', on: '#FFFFFF', soft: '#DCE8E1', read: '#FFFFFF', hl: { plate: '#1F5240', hi: '#FFFFFF', edge: '#FFFFFFA6', mid: '#FFFFFF55', lo: '#FFFFFF29', sw: 1 } },
      '1.4': { stage: '#24426B', accent: '#24426B', on: '#FFFFFF', soft: '#DEE5EF', read: '#FFFFFF', hl: { plate: '#24426B', hi: '#FFFFFF', edge: '#FFFFFFA6', mid: '#FFFFFF55', lo: '#FFFFFF29', sw: 1 } },
      '1.7': { stage: '#8A5419', accent: '#8A5419', on: '#FFFFFF', soft: '#F1E4D3', read: '#FFFFFF', hl: { plate: '#8A5419', hi: '#FFFFFF', edge: '#FFFFFFA6', mid: '#FFFFFF55', lo: '#FFFFFF29', sw: 1 } },
      '5.1': { stage: '#7A3A33', accent: '#7A3A33', on: '#FFFFFF', soft: '#EFDFDC', read: '#FFFFFF', hl: { plate: '#7A3A33', hi: '#FFFFFF', edge: '#FFFFFFA6', mid: '#FFFFFF55', lo: '#FFFFFF29', sw: 1 } },
    },
    readBg: 'rgba(255,255,255,.16)',
  },
};

// ── pieces ──
const ib = (K, n, extra = '') => `<span style="width:44px;height:44px;border-radius:22px;background:${K.surf2};display:grid;place-items:center;color:${K.ink};flex:none;${extra}">${icon(n, 20, 1.8)}</span>`;
const segs = (n, done, a, track) => `<div style="display:flex;gap:4px;flex:1">${Array.from({ length: n }, (_, i) => `<i style="flex:1;height:5px;border-radius:3px;background:${i < done ? a : track}"></i>`).join('')}</div>`;
const top = (K, done, total, o) => `<div style="height:58px;display:flex;align-items:center;gap:14px;padding:0 16px">${ib(K, 'x')}${segs(total, done, o.accent, K.track)}${ib(K, 'flag')}</div>`;
const title = (K, t, size = 24) => `<div style="font-size:${size}px;line-height:${Math.round(size * 1.24)}px;font-weight:${K.tw};letter-spacing:-.024em">${t}</div>`;
const lead = (K, t) => `<div style="font-size:15px;line-height:21px;color:${K.ink2};font-weight:500">${t}</div>`;
const read = (K, o, t, pos) => `<span style="position:absolute;${pos};height:28px;padding:0 11px;border-radius:14px;background:${K.readBg};color:${o.read};font-size:12.5px;font-weight:700;display:flex;align-items:center;font-variant-numeric:tabular-nums">${t}</span>`;
const stage = (K, o, fig, h, r, label, inner = '', fh = h - 36, pb = 0) => `<div style="margin:0 16px;height:${h}px;border-radius:${K.stageR}px;background:${o.stage};position:relative;display:grid;place-items:center;overflow:hidden;padding-bottom:${pb}px">${figure(fig, o.hl, { w: 330, h: fh, label })}${read(K, o, r, 'left:14px;top:14px')}${inner}</div>`;
const pri = (K, t, extra = '') => `<div style="height:56px;border-radius:28px;background:${K.pri.bg};color:${K.pri.fg};display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:700;${extra}">${t}</div>`;
const tile = (K, o, text, st, extra = '') => {
  const base = `height:52px;border-radius:${K.r}px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:16px;font-weight:650;font-variant-numeric:tabular-nums;${extra}`;
  if (st === 'done') return `<div style="${base};background:${o.soft};color:${K === KITS.D3 ? o.accent : o.accent};opacity:.9">${text}${icon('check', 18, 2.4, o.accent)}</div>`;
  if (st === 'sel') return `<div style="${base};background:${K.surf};color:${K.ink};box-shadow:inset 0 0 0 2.5px ${o.accent}">${text}</div>`;
  if (st === 'wrong') return `<div style="${base};background:${K.err.tint};color:${K.err.ink};box-shadow:inset 0 0 0 2px ${K.err.ink}">${text}${icon('x', 17, 2.4, K.err.ink)}</div>`;
  return `<div style="${base};background:${K.surf};color:${K.ink};box-shadow:${K.shadow}">${text}</div>`;
};
const shell = (K, body) => `<div style="position:absolute;inset:0;background:${K.bg};color:${K.ink};font-family:'${K.font}',sans-serif">${statusBar(K.ink)}${body}<div class="hi" style="background:${K.ink}"></div></div>`;

// ── 3. practice: drag and place ──
export function drag(K) {
  const o = K.obj['1.1'];
  const slot = (n, name, body, kind) => {
    // the slot under a dragged chip shows only its highlight; the chip says the rest
    const bd = kind === 'hot' ? `background:${o.soft};box-shadow:inset 0 0 0 2px ${o.accent}` : kind === 'empty' ? `background:transparent;box-shadow:inset 0 0 0 1.5px ${K.track}` : `background:${K.surf};box-shadow:${K.shadow}`;
    return `<div style="height:58px;border-radius:${K.r}px;${bd};display:flex;align-items:center;gap:12px;padding:0 7px 0 16px"><span style="font-size:13px;font-weight:700;color:${K.ink2};width:14px;font-variant-numeric:tabular-nums">${n}</span><span style="font-size:15px;font-weight:650;flex:1">${name}</span>${body}</div>`;
  };
  const chip = (t, extra = '') => `<span style="height:44px;padding:0 16px;border-radius:22px;background:${o.accent};color:${o.on};display:flex;align-items:center;gap:6px;font-size:14px;font-weight:700;${extra}">${t}</span>`;
  return shell(K, `${top(K, 2, 5, o)}
<div style="padding:6px 22px 16px">${lead(K, 'Question 3 of 5')}${title(K, 'Drag each fault onto its layer.')}</div>
${stage(K, o, 'layers-y150', 226, 'L3', 'Two layer stacks; layer 3 is open')}
<div style="display:flex;flex-direction:column;gap:8px;margin:16px 16px 0;position:relative">
  ${slot('1', 'Physical', chip(`${icon('check', 16, 2.4, o.on)}Cable unplugged`), '')}
  ${slot('3', 'Network', '', 'hot')}
  ${slot('7', 'Application', `<span style="font-size:13px;color:${K.ink2};padding-right:8px">Empty</span>`, 'empty')}
  ${chip('Printer has the wrong IP', `position:absolute;right:10px;top:59px;transform:rotate(-2.5deg);box-shadow:0 14px 28px -8px rgba(0,0,0,.35)`)}
</div>
<div style="padding:18px 20px 0;display:flex;align-items:center;gap:10px"><span style="font-size:13px;color:${K.ink2};font-weight:600">Still to place</span><span style="height:44px;padding:0 16px;border-radius:22px;box-shadow:inset 0 0 0 1.5px ${o.accent};color:${K.ink};display:flex;align-items:center;font-size:14px;font-weight:700">Print service crashed</span></div>
<div style="position:absolute;left:16px;right:16px;bottom:30px"><div style="text-align:center;font-size:14px;color:${K.ink2};margin-bottom:12px">Or tap a fault, then tap a layer.</div>${pri(K, 'Check', 'opacity:.35')}</div>`);
}

// ── 4. mistake replay ──
export function replay(K) {
  const o = K.obj['1.4'];
  const scrub = `<div style="position:absolute;left:14px;right:14px;bottom:14px;height:40px;border-radius:20px;background:${K.readBg};display:flex;align-items:center;gap:10px;padding:0 6px 0 6px"><span style="width:30px;height:30px;border-radius:15px;background:${o.accent};display:grid;place-items:center"><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="${o.on}"/></svg></span><div style="flex:1;height:4px;border-radius:2px;background:${o.read}33"><div style="width:68%;height:4px;border-radius:2px;background:${o.read}"></div></div><span style="font-size:12px;font-weight:700;color:${o.read};padding-right:8px;font-variant-numeric:tabular-nums">0:04</span></div>`;
  return shell(K, `${top(K, 1, 5, o)}
<div style="padding:6px 22px 16px">${lead(K, 'You chose port 80, HTTP.')}${title(K, 'Here’s what that rule does.')}</div>
${stage(K, o, 'doors-rest', 262, '443', 'A server with a door per port; the payment waits at the shut 443 door while 80 stands open', scrub, 190, 50)}
<p style="padding:16px 22px 0;font-size:16px;line-height:24px">Card payments travel on port 443. Your rule only opens 80, so the firewall drops the payment.</p>
<div style="position:absolute;left:0;right:0;bottom:0;border-radius:30px 30px 0 0;background:${K.err.tint};padding:20px 16px 34px">
  <div style="display:flex;align-items:center;gap:10px;font-size:16px;font-weight:700;color:${K.err.ink};padding:0 4px">${icon('xc', 22, 1.9, K.err.ink)}Not quite. The answer is 443, HTTPS.</div>
  <div style="display:flex;gap:10px;margin-top:16px"><span style="width:56px;height:56px;border-radius:28px;background:${K.surf};display:grid;place-items:center;flex:none">${icon('replay', 21, 1.9, K.ink)}</span>${pri(K, 'Show me 443', 'flex:1')}</div>
</div>`);
}

// ── 5. Port Match drill ──
export function ports(K) {
  const o = K.obj['1.4'];
  const L = [['22', 'done'], ['25', 'wrong'], ['53', 'done'], ['67/68', ''], ['443', 'sel'], ['3389', '']];
  const R = [['RDP', 'wrong'], ['DNS', 'done'], ['HTTPS', ''], ['SSH', 'done'], ['DHCP', ''], ['SMTP', '']];
  const grid = L.map((l, i) => tile(K, o, l[0], l[1], 'font-size:18px') + tile(K, o, R[i][0], R[i][1])).join('');
  return shell(K, `<div style="height:58px;display:flex;align-items:center;gap:12px;padding:0 16px">${ib(K, 'x')}<span style="flex:1;font-size:17px;font-weight:${K.tw}">Port Match</span><span style="height:44px;padding:0 15px;border-radius:22px;background:${K.surf2};display:flex;align-items:center;gap:6px;font-size:15px;font-weight:700;font-variant-numeric:tabular-nums">${icon('timer', 18, 1.8)}0:31</span></div>
<div style="padding:4px 20px 14px;display:flex;align-items:center;gap:12px"><div style="flex:1;height:8px;border-radius:4px;background:${K.track}"><div style="width:58%;height:8px;border-radius:4px;background:${o.accent}"></div></div><span style="font-size:14px;font-weight:700;font-variant-numeric:tabular-nums">7 of 12</span></div>
${stage(K, o, 'doors-pick', 140, '443', 'A server with a door per port; door 443 is open')}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 16px 0">${grid}</div>
<div style="margin:14px 16px 0;padding:12px 14px;border-radius:18px;background:${K.err.tint};color:${K.err.ink};display:flex;gap:10px;align-items:center;font-size:15px;font-weight:600">${icon('xc', 20, 1.9, K.err.ink)}25 is SMTP, for email. RDP is 3389.</div>
<div style="position:absolute;left:16px;right:16px;bottom:30px;height:48px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:15px;font-weight:600;color:${K.ink2}">${icon('timer', 18, 1.8, K.ink2)}Turn off the timer</div>`);
}

// ── 6. week summary ──
export function summary(K) {
  const rows = [['1.1', 'OSI model', 12, 14], ['1.4', 'Ports and protocols', 10, 14], ['1.7', 'IPv4 addressing', 9, 14], ['5.1', 'Troubleshooting', 8, 10]].map(([k, n, r, t]) => {
    const o = K.obj[k], p = Math.round((r / t) * 100);
    return `<div style="padding:12px 0"><div style="display:flex;justify-content:space-between;align-items:baseline;font-size:15px;font-weight:650"><span>${n} <span style="color:${K.ink2};font-weight:500;font-size:13px">${k}</span></span><span style="font-variant-numeric:tabular-nums">${p}%</span></div><div style="height:8px;border-radius:4px;background:${K === KITS.D2 ? '#FFFFFF14' : o.soft};margin-top:8px"><div style="width:${p}%;height:8px;border-radius:4px;background:${o.accent}"></div></div></div>`;
  }).join('');
  const n = K.obj['1.7'];
  return shell(K, `<div style="height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 16px">${ib(K, 'back')}${ib(K, 'share')}</div>
<div style="padding:4px 22px 0">${title(K, 'Week 1, closed', 32)}<div style="font-size:16px;color:${K.ink2};margin-top:4px">Sam’s café network is up and running.</div></div>
<div style="margin:20px 16px 0;padding:18px 20px 8px;border-radius:28px;background:${K.surf};box-shadow:${K.shadow}">
  <div style="display:flex;align-items:baseline;gap:10px"><span style="font-size:52px;line-height:56px;font-weight:800;letter-spacing:-.04em;font-variant-numeric:tabular-nums">75%</span><span style="font-size:15px;color:${K.ink2};font-weight:500">right first time<br>39 of 52 questions</span></div>
  <div style="margin-top:6px">${rows}</div>
</div>
<div style="margin:12px 16px 0;padding:16px 16px 16px 20px;border-radius:24px;background:${n.stage};color:${K === KITS.D3 ? '#fff' : K.ink};display:flex;align-items:center;gap:12px"><div style="flex:1"><div style="font-size:16px;font-weight:700">Start with subnetting</div><div style="font-size:14px;opacity:.8;margin-top:2px">5 cards are waiting in Review.</div></div><span style="height:44px;padding:0 18px;border-radius:22px;background:${n.accent === n.stage ? '#FFFFFF' : n.accent};color:${n.accent === n.stage ? K.ink : n.on};display:flex;align-items:center;font-size:15px;font-weight:700">Review 5</span></div>
<div style="padding:22px 22px 0;font-size:16px;font-weight:700">How was week 1?</div>
<div style="display:flex;gap:8px;padding:10px 16px 0">${[1, 2, 3, 4, 5].map((v) => `<span style="flex:1;height:48px;border-radius:24px;background:${K.surf};box-shadow:${K.shadow};display:grid;place-items:center;font-size:16px;font-weight:700">${v}</span>`).join('')}</div>
<div style="margin:12px 16px 0;height:56px;border-radius:24px;background:${K.surf};box-shadow:${K.shadow};display:flex;align-items:center;gap:12px;padding:0 16px;font-size:15px;font-weight:600">${icon('mail', 20, 1.8, K.ink2)}<span style="flex:1">Email me when week 2 is out</span>${icon('next', 18, 2, K.ink2)}</div>`);
}

// ── 7. shared figure (opened from a link, no app) ──
export function shared(K) {
  const o = K.obj['1.7'];
  const stops = ['/24', '/25', '/26', '/27'];
  return shell(K, `<div style="height:56px;display:flex;align-items:center;gap:10px;padding:0 20px"><span style="width:30px;height:30px;border-radius:9px;background:${K.ink};color:${K.bg};display:grid;place-items:center;font-size:12px;font-weight:800">UH</span><span style="font-size:15px;font-weight:700;flex:1">Under the Hood</span><span style="height:30px;padding:0 12px;border-radius:15px;background:${K.surf2};font-size:13px;font-weight:600;display:flex;align-items:center">Network+ · 1.7</span></div>
<div style="padding:10px 22px 18px">${title(K, 'Slice a /24 into four networks', 30)}</div>
${stage(K, o, 'slicer-rest', 236, '/26', 'Address block split into four /26 networks')}
<div style="margin:12px 16px 0;padding:16px 18px 14px;border-radius:24px;background:${K.surf};box-shadow:${K.shadow}">
  <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700"><span>Mask</span><span style="font-variant-numeric:tabular-nums">4 networks of 64</span></div>
  <div style="position:relative;height:36px;margin-top:6px"><div style="position:absolute;left:4px;right:4px;top:16px;height:4px;border-radius:2px;background:${K.track}"></div><div style="position:absolute;left:4px;width:66%;top:16px;height:4px;border-radius:2px;background:${o.accent}"></div>${stops.map((_, i) => `<span style="position:absolute;left:calc(${i * 33.3}% - ${i === 3 ? 8 : 0}px);top:14px;width:8px;height:8px;border-radius:4px;background:${i < 2 ? o.accent : K.track}"></span>`).join('')}<span style="position:absolute;left:calc(66.6% - 14px);top:4px;width:28px;height:28px;border-radius:14px;background:${K.surf};box-shadow:0 2px 8px rgba(0,0,0,.22),inset 0 0 0 2px ${o.accent}"></span></div>
  <div style="display:flex;justify-content:space-between;font-size:13px;color:${K.ink2};font-weight:600;font-variant-numeric:tabular-nums">${stops.map((s, i) => `<span style="${i === 2 ? `color:${K.ink}` : ''}">${s}</span>`).join('')}</div>
</div>
<p style="padding:16px 22px 0;font-size:16px;line-height:24px">256 addresses, split four ways. Each network gets 64, and 62 of them are usable.</p>
<div style="padding:18px 16px 0">${pri(K, 'Try the full lesson')}<div style="text-align:center;font-size:13px;color:${K.ink2};margin-top:10px">From ticket 1043 · 7 minutes · free, no sign-up</div></div>
<div style="position:absolute;left:22px;right:22px;bottom:26px;font-size:11.5px;line-height:16px;color:${K.ink2}">Last reviewed 8 Nov 2026 · Report an error<br>CompTIA and Network+ are trademarks of CompTIA. Not affiliated with or endorsed by CompTIA.</div>`);
}
