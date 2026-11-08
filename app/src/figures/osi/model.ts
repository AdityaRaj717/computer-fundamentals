// The OSI cabinet's truth. Every number the figure, readout, caption and aria text show comes from here.
// Sources: CompTIA N10-009 objective 1.1 (OSI reference model); IEEE 802.3 (Ethernet II framing:
// 7-byte preamble + 1-byte SFD, 14-byte header, 4-byte FCS); RFC 791 (IPv4 header, 20 bytes without
// options); RFC 9293 (TCP header, 20 bytes without options). Port 9100 is raw (AppSocket/JetDirect) printing.
// Simplified: in TCP/IP the application does the jobs of layers 5 and 6, so they add no header here.

export type LayerNo = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Layer {
  n: LayerNo;
  name: string;
  pdu: string;
  /** What this layer adds to Jo's print job, in a few words. */
  adds: string;
  /** Header bytes this layer puts in front. */
  header: number;
  /** Trailer bytes this layer puts at the end (only Ethernet's FCS). */
  trailer: number;
}

export const LAYERS: readonly Layer[] = [
  { n: 1, name: "Physical", pdu: "bits", adds: "preamble, then signals on the cable", header: 8, trailer: 0 },
  { n: 2, name: "Data link", pdu: "frame", adds: "printer's MAC + checksum", header: 14, trailer: 4 },
  { n: 3, name: "Network", pdu: "packet", adds: "IP 10.0.1.24 → 10.0.1.31", header: 20, trailer: 0 },
  { n: 4, name: "Transport", pdu: "segment", adds: "TCP port 9100", header: 20, trailer: 0 },
  { n: 5, name: "Session", pdu: "data", adds: "nothing here (simplified)", header: 0, trailer: 0 },
  { n: 6, name: "Presentation", pdu: "data", adds: "nothing here (simplified)", header: 0, trailer: 0 },
  { n: 7, name: "Application", pdu: "data", adds: "the print job: receipt #0318", header: 0, trailer: 0 },
];

export const layer = (n: number): Layer => LAYERS[Math.min(7, Math.max(1, Math.round(n))) - 1]!;

/** Sample data: the size of Jo's receipt as the till app hands it down. */
export const PAYLOAD = 412;

export const bytesAdded = (n: number) => layer(n).header + layer(n).trailer;

/** Bytes in the bundle once layers 7 … n have each added theirs. */
export function bytesThrough(n: number) {
  let total = PAYLOAD;
  for (let at = 7; at >= n; at--) total += bytesAdded(at);
  return total;
}

/** The Ethernet frame (everything but the preamble) and what goes on the wire. */
export const FRAME_BYTES = bytesThrough(2);
export const WIRE_BYTES = bytesThrough(1);

export type Fault = "none" | "cable" | "ip" | "service";

/** The layer each break-it fault lives in. */
export const FAULT_LAYER: Record<Exclude<Fault, "none">, LayerNo> = { cable: 1, ip: 3, service: 7 };

export const FAULT_TEXT: Record<Exclude<Fault, "none">, string> = {
  cable: "Cable unplugged",
  ip: "Printer has the wrong IP",
  service: "Print service crashed",
};

// ---------- the send: the lift carries the job down the stack, over the cable, and the printer reads it up again

/** Seconds. Animation pacing, not network facts. */
export const PACE = {
  move: 0.42,
  dwell: 0.5,
  watch: 1.5,
  grow: 0.28,
  wire: 1.1,
  climb: 1.05,
  print: 1.3,
  hold: 1.6,
} as const;

export type Phase = "ready" | "down" | "stopped" | "wire" | "climb" | "printed" | "dropped";

export interface SendState {
  phase: Phase;
  /** Lift height as a layer number: 7 at the top, 1 at the bottom (continuous while moving). */
  lift: number;
  /** The layer the job is at (down the tablet) or being read at (up the printer). */
  at: LayerNo;
  /** 0..1 per layer: how much of that layer's envelope is on the bundle. Index 0 is layer 1. */
  grown: number[];
  /** 0..1 per layer: how far that drawer is pulled out by the send itself. */
  drawer: number[];
  /** 0..1 along the cable, or -1 when nothing is on it. */
  pulse: number;
  /** 0..1 opacity of the bundle on the shelf (it leaves as bits at layer 1). */
  bundle: number;
  /** 0..1 of the receipt out of the printer. */
  paper: number;
  /** Printer status light: 0 off … 1 on. */
  printerLed: number;
  /** Bytes on the bundle right now. */
  bytes: number;
  done: boolean;
}

export interface SendOptions {
  fault: Fault;
  /** The layer the learner predicted: the lift lingers there, and that drawer opens fully. */
  watch?: LayerNo | null;
}

const ease = (t: number) => {
  const u = Math.min(1, Math.max(0, t));
  return u * u * (3 - 2 * u);
};

interface Stop {
  n: LayerNo;
  from: number;
  arrive: number;
  leave: number;
}

/** Times of each stop on the way down. */
function stopsOf(watch: LayerNo | null | undefined) {
  const stops: Stop[] = [];
  let t = 0;
  for (let n = 7; n >= 1; n--) {
    const from = t;
    const arrive = n === 7 ? 0 : t + PACE.move;
    const leave = arrive + (watch === n ? PACE.watch : PACE.dwell);
    stops.push({ n: n as LayerNo, from, arrive, leave });
    t = leave;
  }
  return stops;
}

export function sendLength({ fault, watch }: SendOptions) {
  const stops = stopsOf(watch);
  const bottom = stops[stops.length - 1]!.leave;
  if (fault === "cable") return bottom + PACE.hold;
  const climbTo = fault === "ip" ? 3 : 7;
  const climb = (PACE.climb * climbTo) / 7;
  return bottom + PACE.wire + climb + (fault === "none" ? PACE.print : 0) + PACE.hold;
}

/** Where everything is `t` seconds into a send. Pure, so the tour, a replay and the tests agree. */
export function sendAt(t: number, { fault, watch }: SendOptions): SendState {
  if (t < 0) {
    const zeros = [0, 0, 0, 0, 0, 0, 0];
    return { phase: "ready", lift: 7, at: 7, grown: zeros, drawer: [...zeros], pulse: -1, bundle: 1, paper: 0, printerLed: 0, bytes: PAYLOAD, done: false };
  }
  const stops = stopsOf(watch);
  const grown = [0, 0, 0, 0, 0, 0, 0];
  const drawer = [0, 0, 0, 0, 0, 0, 0];
  let lift = 7;
  let at: LayerNo = 7;
  for (const stop of stops) {
    if (t < stop.from) break;
    if (t < stop.arrive) {
      lift = stop.n + 1 - ease((t - stop.from) / PACE.move);
    } else {
      lift = stop.n;
      at = stop.n;
    }
    const since = t - stop.arrive;
    grown[stop.n - 1] = ease(since / PACE.grow);
    const open = watch === stop.n ? 1 : 0.5;
    const close = stop.n === 1 && fault === "cable" ? Infinity : stop.leave;
    drawer[stop.n - 1] = since < 0 ? 0 : open * ease(since / 0.25) * (1 - ease((t - close) / 0.3));
  }
  const bottom = stops[stops.length - 1]!.leave;
  // the count steps on arrival, with the layer word, so both come from the same instant
  const bytes = PAYLOAD + LAYERS.reduce((sum, l, index) => sum + (grown[index]! > 0 ? bytesAdded(l.n) : 0), 0);
  const base: SendState = { phase: "down", lift, at, grown, drawer, pulse: -1, bundle: 1, paper: 0, printerLed: 0, bytes, done: false };
  if (t < bottom) return base;
  if (fault === "cable") return { ...base, phase: "stopped", at: 1, done: t >= bottom + PACE.hold };
  const wireT = t - bottom;
  if (wireT < PACE.wire) {
    return { ...base, phase: "wire", at: 1, pulse: ease(wireT / PACE.wire), bundle: 1 - ease(wireT / 0.35) };
  }
  const climbTo = fault === "ip" ? 3 : 7;
  const climbT = wireT - PACE.wire;
  const climbFor = (PACE.climb * climbTo) / 7;
  const gone = { ...base, bundle: 0, pulse: -1, grown: [0, 0, 0, 0, 0, 0, 0], drawer: [0, 0, 0, 0, 0, 0, 0] };
  if (climbT < climbFor) {
    const reading = Math.min(climbTo, 1 + Math.floor((climbT / climbFor) * climbTo)) as LayerNo;
    return { ...gone, phase: "climb", at: reading, printerLed: 0.5 + 0.5 * Math.round((climbT * 8) % 1), bytes: WIRE_BYTES };
  }
  const after = climbT - climbFor;
  if (fault !== "none") {
    return { ...gone, phase: "dropped", at: FAULT_LAYER[fault], printerLed: 0, bytes: WIRE_BYTES, done: after >= PACE.hold };
  }
  return { ...gone, phase: "printed", at: 7, printerLed: 1, paper: ease(after / PACE.print), bytes: WIRE_BYTES, done: after >= PACE.print + PACE.hold };
}

export const READY: SendState = sendAt(-1, { fault: "none" });

// ---------- words

const kb = (n: number) => `${n.toLocaleString("en-US")} B`;

export function layerLine(n: number) {
  const l = layer(n);
  const add = bytesAdded(n);
  return `L${l.n} ${l.name} · ${add ? `+${add} B` : n === 7 ? kb(PAYLOAD) : "+0 B"}`;
}

/** The card's readout, from the same instant as the parts. */
export function readoutOf(state: SendState, open: LayerNo | null, cable: boolean) {
  switch (state.phase) {
    case "down":
      return `${layerLine(state.at)} · ${kb(state.bytes)}`;
    case "stopped":
      return `L1 Physical · no link · stopped`;
    case "wire":
      return `on the cable · ${kb(WIRE_BYTES)}`;
    case "climb":
      return `printer reads L${state.at} ${layer(state.at).name}`;
    case "dropped":
      return state.at === 3 ? `printer · L3 · not my IP · dropped` : `printer · L7 · no print service`;
    case "printed":
      return `printed · ${kb(WIRE_BYTES)} on the wire`;
    default:
      if (open) return layerLine(open);
      return cable ? `ready · job ${kb(PAYLOAD)}` : `cable out · link off`;
  }
}

/** What a screen reader hears when the choice changes (never per frame). */
export function spokenOf(state: SendState, open: LayerNo | null, cable: boolean) {
  if (state.phase === "stopped") return "Stopped at layer 1, Physical: the cable is unplugged, so no signal leaves the tablet.";
  if (state.phase === "printed") return `Printed. ${WIRE_BYTES} bytes crossed the cable, and the printer read the job back up to layer 7.`;
  if (state.phase === "dropped") return state.at === 3 ? "The printer read up to layer 3 and dropped the job: the address was not its own." : "The printer read up to layer 7, but no print service was listening on port 9100.";
  if (state.phase === "down" || state.phase === "wire" || state.phase === "climb") return "Sending the print job.";
  const l = open ? layer(open) : null;
  const opened = l ? `Layer ${l.n}, ${l.name}, is open: it adds ${l.adds}. ` : "";
  return `${opened}The cable is ${cable ? "plugged in" : "unplugged"}.`;
}

export const DESCRIPTION =
  "A cabinet with seven drawers stands on a bench: it is the till tablet's network stack, layer 7 Application at the top and layer 1 Physical at the bottom. Each drawer holds the envelope its layer adds to the print job: nothing in 5 and 6, a 20-byte TCP header with port 9100 in 4, a 20-byte IP header in 3, a 14-byte Ethernet header and 4-byte checksum in 2, and an 8-byte preamble in 1. A lift on the cabinet's side carries the job down, growing a plate for each header, to a jack at the plinth. A cable runs from the jack to a receipt printer. Unplug it and the job stops at layer 1.";
