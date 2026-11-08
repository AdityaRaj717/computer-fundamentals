import { lineSvg, pathOf, sideSeam, slabOf, solidSvg, type Flat, type Plan, type Point3 } from "../kit/iso-kit";
import { LAYERS } from "./model";
import { CABLE_END } from "./geometry";
import {
  BOOT,
  BUNDLE,
  BYTE,
  CABLE_Y,
  CARD_H,
  FACE_Y,
  P,
  PAPER,
  PAPER_MOST,
  PER_BYTE,
  PRINTER_TOP,
  PULL_OUT,
  TRAY_H,
  TRAY_WALL,
  TRAY_X,
  at,
  frontZ,
  shelfZ,
} from "./view";

const tenth = (v: number) => Math.round(v * 10) / 10;

// ---------- drawer trays: only the part that has come out of the case is drawn, so nothing shows through the face

interface Item {
  plan: Plan;
  h: number;
  tone: "hi" | "mid" | "lo";
  /** Lines on the card's front face (y = plan.y + plan.d), drawn only when the card is out. */
  lines?: (x0: number, face: number, top: number) => string;
  free?: boolean;
  /** A tab on the card's top edge: [x offset, width]. */
  tab?: [number, number];
  /** Alternating ticks hanging from the top edge (the preamble's 1010…). */
  bits?: boolean;
}

/** Upright cards stand near the back of the tray, so they show above the drawer front when it is out. */
const CARD_Y = FACE_Y - 26;
const CARD_D = 1;
const CARD_HT = 17;

const face = (x0: number, y: number, rows: [number, number][]) => (top: number) =>
  rows.map(([drop, length]) => pathOf([at([x0 + 3, y, top - drop]), at([x0 + 3 + length, y, top - drop])])).join("");

const card = (x: number, bytes: number, extra: Partial<Item> = {}, dy = 0, h = CARD_HT): Item => ({
  plan: { x, y: CARD_Y + dy, w: bytes * BYTE, d: CARD_D, r: 0.3 },
  h,
  tone: "hi",
  ...extra,
});

/** What stands in each drawer, in drawer coordinates (closed). Card width is 2 units per byte of header. */
const CONTENTS: Record<number, Item[]> = {
  7: [
    { plan: { x: -30, y: CARD_Y, w: 30, d: CARD_D, r: 0.3 }, h: CARD_HT - 1, tone: "mid" },
    { plan: { x: -26, y: CARD_Y + 3, w: 30, d: CARD_D, r: 0.3 }, h: CARD_HT - 3, tone: "hi", lines: (x0, y, top) => face(x0, y, [[3, 18], [5.6, 12], [8.2, 16]])(top), free: true },
  ],
  6: [],
  5: [],
  4: [card(-38, LAYERS[3]!.header, { tab: [28, 10], lines: (x0, y, top) => face(x0, y, [[4, 22], [6.6, 14]])(top), free: true })],
  3: [card(-38, LAYERS[2]!.header, { tab: [4, 10], lines: (x0, y, top) => face(x0, y, [[4, 30], [6.6, 30]])(top), free: true })],
  2: [
    card(-38, LAYERS[1]!.header, { tab: [16, 10], lines: (x0, y, top) => face(x0, y, [[4, 20]])(top), free: true }),
    card(36 - LAYERS[1]!.trailer * BYTE, LAYERS[1]!.trailer, { tone: "mid" }),
  ],
  1: [card(-38, LAYERS[0]!.header, { bits: true })],
};

/** Clip a drawer-coordinate plan, moved out by s, to the part in front of the case face. */
function outside(plan: Plan, s: number): Plan | null {
  const y0 = Math.max(plan.y + s, FACE_Y);
  const y1 = plan.y + plan.d + s;
  const d = y1 - y0;
  if (d < 0.35) return null;
  return { x: plan.x, y: y0, w: plan.w, d, r: Math.min(plan.r, d / 2, plan.w / 2) };
}

const floorOf = (n: number) => frontZ(n) + 0.6;
const FLOOR_T = 1;

export function trayOf(n: number, s: number) {
  if (s < 0.3) return "";
  const z = floorOf(n);
  const top = z + FLOOR_T;
  const out: string[] = [];
  const slide = (x: number) => solidSvg(slabOf({ x, y: FACE_Y, w: 1.2, d: s, r: 0 }, top + 3.2, 3.4, P, 2), { tone: "lo", crease: "faint" });
  out.push(slide(-TRAY_X - 1.2));
  out.push(solidSvg(slabOf({ x: -TRAY_X, y: FACE_Y, w: TRAY_X * 2, d: s, r: 0 }, z, FLOOR_T, P, 2), { tone: "mid" }));
  out.push(solidSvg(slabOf({ x: -TRAY_X, y: FACE_Y, w: TRAY_WALL, d: s, r: 0 }, top, TRAY_H - FLOOR_T, P, 2), { tone: "mid" }));
  for (const item of CONTENTS[n] ?? []) {
    const plan = outside(item.plan, s);
    if (!plan) continue;
    const whole = plan.d >= item.plan.d - 0.01;
    const front = plan.y + plan.d;
    const cardTop = top + item.h;
    out.push(solidSvg(slabOf(plan, top, item.h, P, 2), { tone: item.tone, crease: item.tone === "hi" ? "lo" : "faint" }));
    if (item.tab) out.push(solidSvg(slabOf({ ...plan, x: plan.x + item.tab[0], w: item.tab[1], r: 0.3 }, cardTop, 3, P, 2), { tone: item.tone, crease: "lo" }));
    if (!whole) continue;
    if (item.lines) out.push(lineSvg(item.lines(plan.x, front, cardTop), { tone: "lo", free: item.free }));
    if (item.bits) {
      const minor: string[] = [];
      const major: string[] = [];
      for (let i = 0; i <= 14; i++) {
        const x = plan.x + 1 + i;
        (i % 2 ? minor : major).push(pathOf([at([x, front, cardTop]), at([x, front, cardTop - (i % 2 ? 2.2 : 4.4)])]));
      }
      out.push(lineSvg(minor.join(""), { tone: "lo" }), lineSvg(major.join(""), { tone: "mid" }));
    }
  }
  out.push(solidSvg(slabOf({ x: TRAY_X - TRAY_WALL, y: FACE_Y, w: TRAY_WALL, d: s, r: 0 }, top, TRAY_H - FLOOR_T, P, 2), { tone: "mid" }));
  out.push(slide(TRAY_X));
  return out.join("");
}

// ---------- the bundle: the print job card, with one plate per header grown under the newest on top

export function bundleOf(grown: number[]) {
  const z0 = shelfZ(1);
  const parts: number[] = [];
  const trailer = LAYERS[1]!.trailer * PER_BYTE * (grown[1] ?? 0);
  parts.push(trailer, CARD_H);
  for (const n of [4, 3, 2, 1]) parts.push(LAYERS[n - 1]!.header * PER_BYTE * (grown[n - 1] ?? 0));
  const total = parts.reduce((sum, h) => sum + h, 0);
  const seams: string[] = [];
  let z = z0;
  parts.forEach((h, index) => {
    z += h;
    if (index < parts.length - 1 && h > 0.06 && z < z0 + total - 0.06) seams.push(sideSeam(BUNDLE, z, P, 3));
  });
  const paths = slabOf(BUNDLE, z0, total, P, 3, 0.4);
  return solidSvg(paths, { tone: "hi", crease: "lo", lit: true, inner: lineSvg(seams.join(""), { tone: "mid" }) });
}

export const bundleKey = (grown: number[]) => grown.map((g) => Math.round(g * 40)).join(",");

// ---------- the cable from the plug's boot along the bench to the printer's back

export function cablePoints(out: number): Point3[] {
  const u = out * PULL_OUT;
  const x0 = BOOT.x + BOOT.w - 0.6 + u;
  return [
    [x0, CABLE_Y, 6],
    [x0 + 3.2, CABLE_Y, 4.2],
    [x0 + 5.2, CABLE_Y, 1.4],
    [CABLE_END[0] - 9, CABLE_Y, 1.4],
    [CABLE_END[0] - 5, CABLE_Y, 3.4],
    CABLE_END,
  ];
}

export function cablePath(out: number) {
  return pathOf(cablePoints(out).map(at));
}

/** A point `share` of the way along the cable, on screen. */
export function pulseAt(share: number, out: number): Flat {
  const pts = cablePoints(out).map(at);
  const lengths = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i]![0], p[1] - pts[i]![1]));
  const total = lengths.reduce((a, b) => a + b, 0);
  let left = Math.min(1, Math.max(0, share)) * total * 0.92;
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i]!;
    if (left <= length) {
      const t = length ? left / length : 0;
      return [tenth(pts[i]![0] + (pts[i + 1]![0] - pts[i]![0]) * t), tenth(pts[i]![1] + (pts[i + 1]![1] - pts[i]![1]) * t)];
    }
    left -= length;
  }
  return pts[pts.length - 1]!;
}

// ---------- the receipt rising out of the slot

export function paperOf(share: number) {
  if (share <= 0.01) return "";
  const h = PAPER_MOST * share;
  const z0 = PRINTER_TOP - 0.4;
  const paths = slabOf(PAPER, z0, h + 0.4, P, 2);
  const face = PAPER.y + PAPER.d;
  const lines: string[] = [];
  const lengths = [16, 11, 18, 8, 14, 18, 10, 13];
  for (let row = 0; row < lengths.length; row++) {
    const z = z0 + h + 0.4 - 3 - row * 2.8;
    if (z < PRINTER_TOP + 1.6) break;
    lines.push(pathOf([at([PAPER.x + 3, face, z]), at([PAPER.x + 3 + lengths[row]!, face, z])]));
  }
  return solidSvg(paths, { tone: "hi", crease: "faint" }) + lineSvg(lines.join(""), { tone: "lo", free: true });
}
