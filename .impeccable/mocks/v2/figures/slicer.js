/**
 * Slicer: a plank of 256 addresses lying on the floor, a row of dots down its
 * middle, one dot per sixteen addresses. The pointer's position across the
 * figure sets the mask, /24 to /27: the plank comes apart into one, two, four or
 * eight blocks, the gaps easing open outwards from the cut nearest the pointer.
 * The block that holds .64, the new branch, lifts. The slider is the gap.
 *
 * Pattern: one of many (four masks). Tweens, stagger by distance, a hit test on
 * fixed screen zones.
 */
const { Cam, clamp, facing, fit, prism, proj, rings, mk, solid, put, flatDot, place, tween, tset, tval, tdone, register, pointer, disposer } = HL;

const SL = 8, LEN = 184, DEP = 34, TH = 8, LIFT = 9, REST = 2;
const slotW = LEN / SL;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gap = value;
  const C = Cam(45, 0.5, 1.72);
  const span = LEN + 3 * 12;
  fit(C, [[0, 0, 0], [span, DEP, 0], [span, 0, 0], [0, DEP, 0], [0, 0, TH + LIFT], [span, DEP, TH + LIFT]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const off = [...Array(SL)].map(() => tween(0));
  const lift = [...Array(SL)].map(() => tween(0));
  const blocks = [...Array(SL)].map(() => solid(g));
  const dots = [...Array(SL * 2)].map(() => flatDot(g, C, 0.7, "dot off"));
  let m = -1, k = 2;
  const per = (mask) => SL / 2 ** (mask - 24); // slots per block

  function draw(now) {
    let moving = false;
    for (let b = 0; b < SL / k; b++) {
      const s0 = b * k, s1 = s0 + k - 1;
      const x0 = s0 * slotW + tval(off[s0], now) + 0.5, x1 = (s1 + 1) * slotW + tval(off[s1], now) - 0.5;
      const z = tval(lift[s0], now);
      if (!tdone(off[s0], now) || !tdone(lift[s0], now)) moving = true;
      const [r, i] = rings(x0, 0, x1, DEP, 4, 1.4);
      put(blocks[b], prism(P, front, r, i, z, z + TH));
    }
    dots.forEach((el, n) => {
      const s = n >> 1, x = s * slotW + ((n & 1) + 0.5) * (slotW / 2) + tval(off[s], now);
      place(el, P(x, DEP / 2, tval(lift[s], now) + TH));
    });
    return moving;
  }
  const B = register(stage, (_dt, now) => draw(now));
  bag.add(B.unregister);

  function pick(a) {
    if (a === m) return;
    const now = performance.now(), mask = a < 0 ? 24 + REST : a;
    k = per(mask);
    const nb = SL / k, home = Math.floor(2 / k);
    m = a;
    // paint order: each block, then the dots riding on it, left to right
    blocks.forEach((bl, b) => {
      if (b >= nb) { bl.sil.setAttribute("d", ""); bl.cr.setAttribute("d", ""); return; }
      g.append(bl.g);
      for (let n = b * k * 2; n < (b + 1) * k * 2; n++) { g.append(dots[n]); dots[n].setAttribute("class", b === home ? "dot" : "dot off"); }
      bl.sil.classList.toggle("hi", b === home);
    });
    for (let s = 0; s < SL; s++) {
      const b = Math.floor(s / k);
      tset(off[s], nb > 1 ? (b * gap * 3) / (nb - 1) : 0, now, Math.abs(b - home) * 40);
      tset(lift[s], b === home ? LIFT : 0, now, 0);
    }
    read.textContent = a < 0 ? "rest" : "/" + a;
    B.wake();
  }
  const x0 = P(0, DEP, 0)[0], x1 = P(span, 0, 0)[0];
  const hit = ([x]) => 24 + clamp(Math.floor(((x - x0) / (x1 - x0)) * 4), 0, 3);
  m = 0; pick(-1);
  bag.add(pointer(stage, { move: (p) => pick(hit(p)), leave: () => pick(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { gap = v; const a = m; m = -2; pick(a); }, pick: (a) => pick(a), destroy: bag.dispose };
}

hairline({
  name: "slicer",
  means: "A plank of 256 addresses: move across it to set the mask, and it comes apart into blocks; the block holding .64 lifts.",
  rules: [2, 4, 5, 9],
  range: [6, 12, 18],
  mount,
});
