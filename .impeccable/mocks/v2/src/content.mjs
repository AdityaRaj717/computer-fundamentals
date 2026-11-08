// Shared, real pilot content. Sample learner data is marked in the hand-over note.
export const APP = 'Under the Hood';
export const MODULE = 'Your first week as a network tech';
export const OBJ = {
  '1.1': 'OSI reference model',
  '1.4': 'Ports, protocols, services',
  '1.7': 'IPv4 addressing',
  '5.1': 'Troubleshooting method',
};
export const TICKETS = [
  { no: '1041', day: 'Tue', obj: '1.1', hook: 'The till tablet can’t print.', topic: 'OSI model', status: 'closed', meta: 'Closed · 7 min' },
  { no: '1042', day: 'Wed', obj: '1.4', hook: 'Card payments fail but the web works.', topic: 'Ports and protocols', status: 'closed', meta: 'Closed · 8 min' },
  { no: '1043', day: 'Thu', obj: '1.7', hook: 'The new branch needs its own network.', topic: 'IPv4 and subnetting', status: 'open', meta: 'Step 5 of 11', step: 5, steps: 11 },
  { no: '1044', day: 'Fri', obj: '5.1', hook: 'Friday rush: nothing works.', topic: 'Troubleshooting', status: 'new', meta: 'Not started' },
];
export const REVIEW = [
  { q: 'Port 3389', a: 'RDP', obj: '1.4' },
  { q: 'Wrong IP on the printer', a: 'Layer 3, Network', obj: '1.1' },
  { q: 'Usable hosts in a /26', a: '62', obj: '1.7' },
  { q: 'Ports 67 and 68', a: 'DHCP', obj: '1.4' },
];
export const STEP = {
  ticket: '1041', title: 'The till tablet can’t print.', n: 4, of: 9,
  head: 'The print job heads down the stack',
  body: 'Each layer wraps the job in its own envelope. Transport adds the printer’s port, 9100. Network adds the printer’s IP address. At the bottom, the job becomes signals on the cable.',
  q: 'The printer cable is unplugged. Which layer fails first?',
  opts: ['1 Physical', '2 Data link', '3 Network', '7 Application'],
  pick: 0,
};
export const DRAG = {
  q: 'Drag each fault onto the layer where it lives.',
  n: 3, of: 5,
  placed: 'Cable unplugged',
  moving: 'Printer has the wrong IP',
  tray: 'Print service crashed',
};
export const REPLAY = {
  n: 2, of: 5,
  q: 'The card terminal must reach the payment gateway. Which port should the firewall allow?',
  yours: '80 · HTTP', right: '443 · HTTPS',
  body: 'Replaying your rule: the firewall allows 80, but card payments leave on 443, encrypted. No rule matches 443, so the firewall drops the payment and the till shows “declined”.',
};
export const PAIRS = [
  { p: '22', n: 'SSH', st: 'done' },
  { p: '25', n: 'SMTP', st: 'wrong' },
  { p: '53', n: 'DNS', st: 'done' },
  { p: '67/68', n: 'DHCP', st: '' },
  { p: '443', n: 'HTTPS', st: 'sel' },
  { p: '3389', n: 'RDP', st: '' },
];
// shuffled right column
export const RIGHT = ['RDP', 'DNS', 'HTTPS', 'SSH', 'DHCP', 'SMTP'];
export const SUMMARY = [
  { obj: '1.1', right: 12, of: 14 },
  { obj: '1.4', right: 10, of: 14 },
  { obj: '1.7', right: 9, of: 14 },
  { obj: '5.1', right: 8, of: 10 },
]; // 39 of 52 = 75%
export const pct = (r, o) => Math.round((r / o) * 100);
export const TM = 'CompTIA and Network+ are trademarks of CompTIA. Not affiliated with or endorsed by CompTIA.';
export const SHARE = {
  title: 'Slice a /24 into four networks',
  body: '192.168.10.0/24 holds 256 addresses. Move the mask to /26 and the block splits into four networks of 64. Each keeps 62 usable hosts.',
};
