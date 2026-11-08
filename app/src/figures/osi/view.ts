import { boxCorners, fitProjection, iso, type Flat, type Plan, type Point3 } from "../kit/iso-kit";

// World units are about 1 px; x and y on the floor, z up. The drawer fronts face +y, the lift is on the +x side.
export const WIDTH = 360;
export const HEIGHT = 440;
export const AZIMUTH = 55;

export const BENCH: Plan = { x: -56, y: -48, w: 186, d: 124, r: 8 };
export const BENCH_H = 9;
export const FOOT_H = 6;

export const CASE: Plan = { x: -50, y: -40, w: 100, d: 70, r: 2 };
export const PLINTH: Plan = { x: -47, y: -37, w: 94, d: 64, r: 1.4 };
export const PLINTH_H = 12;
export const LEVEL = 25;
export const CASE_TOP = PLINTH_H + LEVEL * 7;
export const CAP: Plan = { x: -52, y: -42, w: 104, d: 74, r: 3 };
export const CAP_H = 6;
export const TOP = CASE_TOP + CAP_H;

export const FACE_Y = CASE.y + CASE.d;
export const FRONT_T = 3;
export const FRONT_X = 46;
export const FRONT_GAP = 1.2;
export const FRONT_H = LEVEL - FRONT_GAP * 2;
export const OPEN_MOST = 32;
export const TRAY_X = 43;
export const TRAY_WALL = 2;
export const TRAY_H = 12;
export const BYTE = 2;

/** Bottom of drawer n's front (n = 1 at the bottom … 7 at the top). */
export const frontZ = (n: number) => PLINTH_H + (n - 1) * LEVEL + FRONT_GAP;

export const SIDE_X = CASE.x + CASE.w;
export const RAIL: Plan = { x: SIDE_X, y: -9, w: 3, d: 8, r: 0.6 };
export const RAIL_FROM = PLINTH_H;
export const RAIL_TO = CASE_TOP - 1;
export const CARRIAGE: Plan = { x: SIDE_X + 3, y: -12, w: 4, d: 14, r: 1 };
export const SHELF: Plan = { x: SIDE_X + 7, y: -15.5, w: 18, d: 21, r: 1.6 };
export const SHELF_T = 1.8;
/** Shelf top when the lift stands at layer n (continuous). */
export const shelfZ = (n: number) => PLINTH_H + (n - 1) * LEVEL + 9;
export const BUNDLE: Plan = { x: SIDE_X + 9, y: -13, w: 13.5, d: 15, r: 1.2 };
export const CARD_H = 4.6;
export const PER_BYTE = 0.18;

export const JACK: Plan = { x: PLINTH.x + PLINTH.w, y: -11, w: 3.5, d: 12, r: 0.8 };
export const PLUG: Plan = { x: JACK.x + JACK.w, y: -8.5, w: 6.5, d: 7, r: 1 };
export const BOOT: Plan = { x: PLUG.x + PLUG.w, y: -6.8, w: 4.5, d: 3.6, r: 1.2 };
export const PULL_OUT = 9;
export const CABLE_Y = -5;
export const CABLE_Z = 6;

export const PRINTER: Plan = { x: 84, y: -28, w: 38, d: 36, r: 5 };
export const PRINTER_Z = 1.5;
export const PRINTER_TOP = 19;
export const SLOT: Plan = { x: PRINTER.x + 6, y: PRINTER.y + 15, w: 26, d: 2.2, r: 1 };
export const PAPER: Plan = { x: SLOT.x + 1, y: SLOT.y + 0.6, w: SLOT.w - 2, d: 0.8, r: 0 };
export const PAPER_MOST = 24;

export const TABLET: Plan = { x: -34, y: -30, w: 54, d: 38, r: 4 };
export const TABLET_H = 2.6;
export const STAND: Plan = { x: -30, y: -26, w: 46, d: 30, r: 3 };
export const STAND_H = 1.6;

export const RULER: Plan = { x: SIDE_X, y: -1 + 0.6, w: 1.2, d: 5, r: 0.3 };

export const P = fitProjection(
  [
    ...boxCorners(BENCH, -BENCH_H - FOOT_H, 0),
    ...boxCorners(CAP, TOP - CAP_H, TOP + 6),
    ...boxCorners({ x: -FRONT_X, y: FACE_Y, w: FRONT_X * 2, d: OPEN_MOST + FRONT_T + 4, r: 0 }, PLINTH_H, PLINTH_H + 20),
    [PAPER.x + PAPER.w, PAPER.y, PRINTER_TOP + PAPER_MOST],
  ],
  WIDTH,
  HEIGHT,
  { pad: 10, azimuth: AZIMUTH },
);

export const at = (point: Point3): Flat => iso(point, P);

const ORIGIN = at([0, 0, 0]);
const minus = (a: Flat, b: Flat): Flat => [a[0] - b[0], a[1] - b[1]];
export const EX = minus(at([1, 0, 0]), ORIGIN);
export const EY = minus(at([0, 1, 0]), ORIGIN);
export const EZ = minus(at([0, 0, 1]), ORIGIN);

const fine = (value: number) => Math.round(value * 100) / 100;

/** A screen translate for a world offset. */
export const shift = (x: number, y: number, z: number) =>
  `translate(${fine(EX[0] * x + EY[0] * y + EZ[0] * z)} ${fine(EX[1] * x + EY[1] * y + EZ[1] * z)})`;
