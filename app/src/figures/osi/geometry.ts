import {
  circleRing,
  corners,
  cylinder,
  haloOf,
  insetPlan,
  onTop,
  pathOf,
  planOutline,
  ring,
  sideMatrix,
  sideSeam,
  slabOf,
  type Flat,
  type Plan,
  type Point3,
} from "../kit/iso-kit";
import {
  BENCH,
  BENCH_H,
  BOOT,
  CAP,
  CAP_H,
  CARRIAGE,
  CASE,
  CASE_TOP,
  FACE_Y,
  FOOT_H,
  FRONT_H,
  FRONT_T,
  FRONT_X,
  JACK,
  P,
  PLINTH,
  PLINTH_H,
  PLUG,
  PRINTER,
  PRINTER_TOP,
  PRINTER_Z,
  RAIL,
  RAIL_FROM,
  RAIL_TO,
  RULER,
  SHELF,
  SHELF_T,
  SIDE_X,
  SLOT,
  STAND,
  STAND_H,
  TABLET,
  TABLET_H,
  TOP,
  at,
  LEVEL,
  frontZ,
  shelfZ,
} from "./view";

const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) => slabOf(plan, z, h, P, steps, bevel);
const segment = (a: Point3, b: Point3) => pathOf([at(a), at(b)]);
const join = (paths: string[]) => paths.join("");

/** A closed rounded outline in the vertical plane y = face: slots, holders, recesses (no loose ends). */
function faceOutlineY(face: number, x0: number, x1: number, z0: number, z1: number, r: number, steps = 4) {
  const ringPts = circleRingRect(x0, x1, z0, z1, r, steps);
  return pathOf(ringPts.map(([u, v]) => at([u, face, v])), true);
}

/** The same in the vertical plane x = face, running along y. */
function faceOutlineX(face: number, y0: number, y1: number, z0: number, z1: number, r: number, steps = 4) {
  const ringPts = circleRingRect(y0, y1, z0, z1, r, steps);
  return pathOf(ringPts.map(([u, v]) => at([face, u, v])), true);
}

function circleRingRect(u0: number, u1: number, v0: number, v1: number, r: number, steps: number): Flat[] {
  const out: Flat[] = [];
  const quarter = [
    [u1 - r, v0 + r, -90],
    [u1 - r, v1 - r, 0],
    [u0 + r, v1 - r, 90],
    [u0 + r, v0 + r, 180],
  ] as const;
  for (const [cu, cv, start] of quarter) {
    for (let step = 0; step <= steps; step++) {
      const angle = ((start + (90 * step) / steps) * Math.PI) / 180;
      out.push([cu + r * Math.cos(angle), cv + r * Math.sin(angle)]);
    }
  }
  return out;
}

// ---------- base: the bench

const FEET = corners(BENCH, 20);
const BENCH_SCREWS = corners(BENCH, 8);
const LABEL: Plan = { x: BENCH.x + 12, y: BENCH.y + BENCH.d - 20, w: 46, d: 12, r: 2 };

const byDepth = (points: [number, number][]) => [...points].sort((a, b) => a[0] * 0.574 + a[1] * 0.819 - (b[0] * 0.574 + b[1] * 0.819));

export const BENCH_ART = {
  halo: haloOf(BENCH, -BENCH_H - FOOT_H, BENCH_H, P),
  feet: byDepth(FEET).map(([x, y]) => [cylinder(x, y, 7, -BENCH_H - FOOT_H, 1.6, P, 28), cylinder(x, y, 5.4, -BENCH_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28)]),
  slab: solid(BENCH, -BENCH_H, BENCH_H, 8, 1.6),
  groove: planOutline(insetPlan(BENCH, 5), 0, P),
  screwRings: join(BENCH_SCREWS.map(([x, y]) => ring(x, y, 2.2, 0, P, 16))),
  screws: BENCH_SCREWS.map(([x, y]) => at([x, y, 0])),
  label: solid(LABEL, 0, 0.8, 4),
  labelLine: planOutline(insetPlan(LABEL, 1.6), 0.8, P),
  labelRule: join([0, 1, 2].map((row) => onTop([[LABEL.x + 7, LABEL.y + 3.6 + row * 2.4], [LABEL.x + (row === 1 ? 28 : row === 2 ? 34 : 39), LABEL.y + 3.6 + row * 2.4]], 0.8, P))),
  labelScrews: [at([LABEL.x + 3.4, LABEL.y + LABEL.d / 2, 0.8]), at([LABEL.x + LABEL.w - 3.4, LABEL.y + LABEL.d / 2, 0.8])],
  cabinetHalo: haloOf(insetPlan(CASE, -3), 0, 0.1, P),
  printerHalo: haloOf(insetPlan(PRINTER, -2), 0, 0.1, P),
};

// ---------- structure: the cabinet

const SIDE_RECESS = faceOutlineX(SIDE_X, CASE.y + 5, CASE.y + CASE.d - 5, PLINTH_H + 5, CASE_TOP - 5, 2.5);

export const CABINET_ART = {
  plinth: solid(PLINTH, 0, PLINTH_H, 3, 0.4),
  plinthScrews: [at([PLINTH.x + PLINTH.w, PLINTH.y + 6, PLINTH_H / 2]), at([PLINTH.x + 8, PLINTH.y + PLINTH.d, PLINTH_H / 2]), at([PLINTH.x + PLINTH.w - 8, PLINTH.y + PLINTH.d, PLINTH_H / 2])],
  carcass: solid(CASE, PLINTH_H, CASE_TOP - PLINTH_H, 3, 0),
  carcassSeam: sideSeam(CASE, PLINTH_H + 3, P, 3),
  sideRecess: SIDE_RECESS,
  cap: solid(CAP, CASE_TOP, CAP_H, 4, 0.8),
  capSeam: sideSeam(CAP, CASE_TOP + 2, P, 4),
  capGroove: planOutline(insetPlan(CAP, 5), TOP, P, 4),
  capScrews: corners(CAP, 9).map(([x, y]) => at([x, y, TOP])),
};

// ---------- mechanism: the drawers (each built closed, moved along +y by the live loop)

export interface DrawerArt {
  front: ReturnType<typeof solid>;
  frontSeam: string;
  posts: ReturnType<typeof solid>[];
  bar: ReturnType<typeof solid>;
  holder: string;
  card: ReturnType<typeof solid>;
  rivets: Flat[];
  digit: string;
  lock?: { ring: string; key: string };
}

const FACE = FACE_Y + FRONT_T;

export const DRAWERS: DrawerArt[] = [1, 2, 3, 4, 5, 6, 7].map((n) => {
  const z = frontZ(n);
  const plan: Plan = { x: -FRONT_X, y: FACE_Y, w: FRONT_X * 2, d: FRONT_T, r: 0.8 };
  const pullZ = z + 5.6;
  const posts = [-12.5, 12.5].map((x) => solid({ x: x - 1.4, y: FACE, w: 2.8, d: 2.8, r: 0.6 }, pullZ + 0.4, 3.2, 2));
  const bar = solid({ x: -16, y: FACE + 2.4, w: 32, d: 2.4, r: 1.1 }, pullZ, 4, 3, 0.3);
  const holderZ0 = z + 11.8;
  const holderZ1 = z + 19.2;
  const lockZ = z + 15.5;
  const lockRing = pathOf(Array.from({ length: 20 }, (_, i) => at([35 + 2.1 * Math.cos((i / 20) * Math.PI * 2), FACE, lockZ + 2.1 * Math.sin((i / 20) * Math.PI * 2)])), true);
  return {
    front: solid(plan, z, FRONT_H, 3, 0.5),
    frontSeam: faceOutlineY(FACE, -FRONT_X + 3, FRONT_X - 3, z + 2.4, z + FRONT_H - 2.4, 1.4),
    posts,
    bar,
    holder: faceOutlineY(FACE, -12, 12, holderZ0, holderZ1, 1.2),
    card: solid({ x: -10.4, y: FACE, w: 20.8, d: 0.5, r: 0.2 }, holderZ0 + 0.7, holderZ1 - holderZ0 - 1.4, 2),
    rivets: [at([-13.8, FACE, (holderZ0 + holderZ1) / 2]), at([13.8, FACE, (holderZ0 + holderZ1) / 2])],
    digit: sideMatrix([0, FACE + 0.5], holderZ0 + 1.5, P, "left"),
    lock: n === 7 ? { ring: lockRing, key: faceOutlineY(FACE, 34.7, 35.3, lockZ - 1.2, lockZ + 1.2, 0.3, 2) } : undefined,
  };
});

/** The dark slot a drawer leaves in the cabinet face while it is out. */
export const CAVITIES = [1, 2, 3, 4, 5, 6, 7].map((n) => {
  const z0 = frontZ(n) + 0.3;
  const z1 = frontZ(n) + FRONT_H - 0.3;
  const x = FRONT_X - 0.8;
  return {
    back: pathOf([at([-x, FACE_Y, z0]), at([x, FACE_Y, z0]), at([x, FACE_Y, z1]), at([-x, FACE_Y, z1])], true),
    wall: pathOf([at([-x, FACE_Y, z0]), at([-x, FACE_Y - 10, z0]), at([-x, FACE_Y - 10, z1]), at([-x, FACE_Y, z1])], true),
  };
});

// ---------- mechanism: the lift on the +x side

export const LIFT_ART = {
  rail: solid(RAIL, RAIL_FROM, RAIL_TO - RAIL_FROM, 2),
  railLine: segment([RAIL.x + RAIL.w, RAIL.y + RAIL.d / 2, RAIL_FROM + 3], [RAIL.x + RAIL.w, RAIL.y + RAIL.d / 2, RAIL_TO - 3]),
  stops: [RAIL_FROM, RAIL_TO - 2].map((z) => solid({ x: SIDE_X, y: RAIL.y - 2, w: 4.6, d: RAIL.d + 4, r: 0.8 }, z, 2, 2)),
  stopScrews: [RAIL_FROM + 2, RAIL_TO].map((z) => at([SIDE_X + 2.3, RAIL.y + RAIL.d / 2, z])),
  railScrews: [0.25, 0.5, 0.75].map((share) => at([RAIL.x + RAIL.w, RAIL.y + RAIL.d / 2, RAIL_FROM + (RAIL_TO - RAIL_FROM) * share])),
  ruler: solid(RULER, RAIL_FROM + 3, RAIL_TO - RAIL_FROM - 6, 2),
  ...stationTicks(),
};

/** Station marks on the ruler beside the rail: a major tick at each layer's stop, minor every 5. */
function stationTicks() {
  const face = RULER.x + RULER.w;
  const minor: string[] = [];
  const major: string[] = [];
  for (let z = shelfZ(1) - 5; z <= RAIL_TO - 5; z += 5) {
    const station = Math.abs(((z - shelfZ(1)) / LEVEL) % 1) < 1e-6;
    (station ? major : minor).push(segment([face, RULER.y, z], [face, RULER.y + (station ? 3.6 : 1.8), z]));
  }
  return { ticksMinor: minor.join(""), ticksMajor: major.join("") };
}

/** The carriage and shelf, built with the lift at layer 1 and moved up by the live loop. */
const LIFT_HOME = shelfZ(1);
export const CARRIAGE_ART = {
  carriage: solid(CARRIAGE, LIFT_HOME - 9, 12, 2, 0.3),
  carriageScrews: [-1, 1].flatMap((side) => [at([CARRIAGE.x + CARRIAGE.w, CARRIAGE.y + CARRIAGE.d / 2 + side * 4.4, LIFT_HOME - 6.5]), at([CARRIAGE.x + CARRIAGE.w, CARRIAGE.y + CARRIAGE.d / 2 + side * 4.4, LIFT_HOME + 0.5])]),
  gib: faceOutlineX(CARRIAGE.x + CARRIAGE.w, CARRIAGE.y + 1.6, CARRIAGE.y + CARRIAGE.d - 1.6, LIFT_HOME - 4.4, LIFT_HOME - 2, 0.8, 2),
  bracket: solid({ x: SHELF.x, y: SHELF.y + SHELF.d / 2 - 1.2, w: 8, d: 2.4, r: 0.4 }, LIFT_HOME - SHELF_T - 6, 6, 2),
  shelf: solid(SHELF, LIFT_HOME - SHELF_T, SHELF_T, 3, 0.4),
  shelfLip: solid({ x: SHELF.x + SHELF.w - 1.6, y: SHELF.y, w: 1.6, d: SHELF.d, r: 0.5 }, LIFT_HOME, 1.4, 2),
  shelfScrews: [at([SHELF.x + 2.2, SHELF.y + 2.2, LIFT_HOME]), at([SHELF.x + 2.2, SHELF.y + SHELF.d - 2.2, LIFT_HOME])],
  pointer: solid({ x: RULER.x + RULER.w + 0.3, y: CARRIAGE.y + CARRIAGE.d, w: CARRIAGE.x + 2.5 - (RULER.x + RULER.w + 0.3), d: 1.3, r: 0.3 }, LIFT_HOME - 0.5, 1, 2),
};

// ---------- the till tablet on top: where the print job starts

const SCREEN = insetPlan(TABLET, 3.6);
export const TABLET_ART = {
  stand: solid(STAND, TOP, STAND_H, 3),
  body: solid(TABLET, TOP + STAND_H, TABLET_H, 5, 0.6),
  screen: planOutline(SCREEN, TOP + STAND_H + TABLET_H, P, 3),
  receipt: planOutline({ x: SCREEN.x + 5, y: SCREEN.y + 4, w: 14, d: SCREEN.d - 8, r: 0.8 }, TOP + STAND_H + TABLET_H, P, 2),
  receiptRules: join([0, 1, 2, 3].map((row) => onTop([[SCREEN.x + 8, SCREEN.y + 8 + row * 4.2], [SCREEN.x + 8 + [8, 6, 8, 5][row]!, SCREEN.y + 8 + row * 4.2]], TOP + STAND_H + TABLET_H, P))),
  button: planOutline({ x: SCREEN.x + SCREEN.w - 17, y: SCREEN.y + SCREEN.d - 9, w: 13, d: 5, r: 2.5 }, TOP + STAND_H + TABLET_H, P, 3),
  camera: at([TABLET.x + TABLET.w - 1.8, TABLET.y + TABLET.d / 2, TOP + STAND_H + TABLET_H]),
};

// ---------- controls: the jack at the plinth and the plug

export const JACK_ART = {
  housing: solid(JACK, 2, 8, 2, 0.3),
  mouth: faceOutlineX(JACK.x + JACK.w, PLUG.y - 0.6, PLUG.y + PLUG.d + 0.6, 3, 9, 0.6, 2),
  led: at([JACK.x + JACK.w, JACK.y + 1.5, 9.2]),
  ledRing: pathOf(circleRing(0, 0, 1.15, 14).map(([u, v]) => at([JACK.x + JACK.w, JACK.y + 1.5 + u, 9.2 + v])), true),
};

export const PLUG_ART = {
  plug: solid(PLUG, 3.6, 4.8, 2, 0.3),
  latch: solid({ x: PLUG.x + 1.4, y: PLUG.y + 2, w: 3.4, d: 3, r: 0.5 }, 8.4, 0.8, 2),
  boot: solid(BOOT, 4.2, 3.6, 3),
  bootRibs: join([1.5, 2.25, 3].map((dx) => pathOf([at([BOOT.x + dx, BOOT.y, 7.8]), at([BOOT.x + dx, BOOT.y + BOOT.d, 7.8])]))),
};

// ---------- printer

const PRINTER_PLAN = PRINTER;
const LED: Flat = [PRINTER.x + PRINTER.w - 8, PRINTER.y + PRINTER.d - 8.5];
const BUTTON: Flat = [PRINTER.x + PRINTER.w - 16, PRINTER.y + PRINTER.d - 8.5];

export const PRINTER_ART = {
  feet: [
    [PRINTER.x + 6, PRINTER.y + 6],
    [PRINTER.x + PRINTER.w - 6, PRINTER.y + 6],
    [PRINTER.x + 6, PRINTER.y + PRINTER.d - 6],
    [PRINTER.x + PRINTER.w - 6, PRINTER.y + PRINTER.d - 6],
  ].map(([x, y]) => cylinder(x!, y!, 3, 0, PRINTER_Z, P, 16)),
  body: solid(PRINTER_PLAN, PRINTER_Z, PRINTER_TOP - PRINTER_Z, 6, 1),
  lidSeam: sideSeam(PRINTER_PLAN, PRINTER_TOP - 5, P, 6),
  lidLine: planOutline(insetPlan(PRINTER_PLAN, 3), PRINTER_TOP, P, 6),
  slot: planOutline(SLOT, PRINTER_TOP, P, 3),
  cutter: solid({ x: SLOT.x - 1, y: SLOT.y + SLOT.d + 0.6, w: SLOT.w + 2, d: 1.6, r: 0.6 }, PRINTER_TOP, 1.2, 2),
  button: cylinder(BUTTON[0], BUTTON[1], 2.2, PRINTER_TOP, 1.2, P, 18),
  ledRing: ring(LED[0], LED[1], 1.4, PRINTER_TOP, P, 16),
  led: at([LED[0], LED[1], PRINTER_TOP]),
  ventRows: [0, 1, 2].map((row) => planOutline({ x: PRINTER.x + 8, y: PRINTER.y + 5 + row * 3.2, w: 22, d: 1.6, r: 0.8 }, PRINTER_TOP, P, 2)).join(""),
};

export const CABLE_END: Point3 = [PRINTER.x + 6, -5, 5];

