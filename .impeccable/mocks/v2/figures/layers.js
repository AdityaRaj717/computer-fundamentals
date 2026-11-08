/**
 * Layers: two stacks of seven rounded plates, a till tablet and a printer, joined
 * by a cable on the floor. The pointer's height picks a layer; on both stacks the
 * plates above it lift away to open that layer, staggered outwards, and the print
 * job (a small crate) rides on the tablet's open layer. Dots on each tablet plate
 * count its layer number. The slider is the gap, in world units.
 *
 * Pattern: scrub and pick. Tweens, stagger by distance, static hit bands taken
 * from the closed stack, so a lifting plate cannot change the choice.
 */
const { Cam, clamp, facing, fit, prism, proj, rings, open, mk, solid, put, flatDot, place, tween, tset, tval, tdone, register, pointer, disposer } = HL;

const N = 7, G = 11, T = 3, W = 46, R = 7, B = 1.6, REST = 3, STEP = 40;
const TAB = [0, 76], PRN = [76, 0];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gap = value;
  const C = Cam(45, 0.5, 2.15);
  const top = N * G + 36;
  fit(C, [[-2, -2, 0], [124, 124, 0], [124, -2, 0], [-2, 124, 0], [0, 76, top], [76, 0, top]], 200, 160);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // the cable, painted first: it lies on the floor between the stacks
  const cable = [];
  for (let k = 0; k <= 16; k++) {
    const t = k / 16, a = [W, 99], c = [84, 84], b = [99, W];
    cable.push(P((1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1], k === 0 || k === 16 ? 1.2 : 0));
  }
  mk("path", { d: open(cable), class: "nf" }, g);

  const stack = (o, dots) => {
    const [ring, inner] = rings(o[0], o[1], o[0] + W, o[1] + W, R, B);
    const plates = [];
    for (let i = 0; i < N; i++) {
      const el = solid(g);
      const d = [];
      if (dots) for (let k = 0; k <= i; k++) d.push(flatDot(g, C, 0.62, "dot off"));
      plates.push({ el, d, lift: tween(i > REST ? gap * 0.55 : 0), drawn: NaN });
    }
    return { o, ring, inner, plates };
  };
  const tab = stack(TAB, true), prn = stack(PRN, false);
  const crate = solid(g);
  const [cr, ci] = rings(TAB[0] + 24, TAB[1] + 26, TAB[0] + 37, TAB[1] + 39, 3, 1);
  const cz = tween(REST * G + T);
  let act = -1;

  function draw(now) {
    let moving = false;
    for (const s of [tab, prn]) s.plates.forEach((p, i) => {
      const z = i * G + tval(p.lift, now);
      if (!tdone(p.lift, now)) moving = true;
      if (z !== p.drawn) {
        p.drawn = z;
        put(p.el, prism(P, front, s.ring, s.inner, z, z + T));
        p.d.forEach((el, k) => place(el, P(s.o[0] + 7 + k * 3.4, s.o[1] + W - 6, z + T)));
      }
    });
    const z = tval(cz, now);
    if (!tdone(cz, now)) moving = true;
    put(crate, prism(P, front, cr, ci, z, z + 8));
    return moving;
  }

  const B2 = register(stage, (_dt, now) => draw(now));
  bag.add(B2.unregister);

  function pick(a) {
    if (a === act) return;
    const now = performance.now(), at = a < 0 ? REST : a, from = a >= 0 ? a : act < 0 ? REST : act;
    act = a;
    for (const s of [tab, prn]) s.plates.forEach((p, i) => {
      tset(p.lift, i > at ? (a < 0 ? gap * 0.55 : gap) : 0, now, Math.abs(i - from) * STEP);
      p.el.sil.classList.toggle("hi", a >= 0 && i === a);
    });
    tset(cz, at * G + T, now, 0);
    // the crate goes after its plate in paint order, so the plates above still cover it
    tab.plates[at].d[tab.plates[at].d.length - 1].after(crate.g);
    crate.sil.classList.toggle("hi", a < 0);
    tab.plates.forEach((p, i) => p.d.forEach((el) => el.setAttribute("class", i === at ? "dot" : "dot off")));
    read.textContent = a < 0 ? "rest" : "L" + (a + 1);
    B2.wake();
  }

  // static bands: each layer's screen height on the closed stack, between the two stacks' centres
  const band = [...Array(N)].map((_, i) => P(38, 38, i * G + T)[1]);
  const hit = ([, y]) => {
    let best = 0;
    band.forEach((b, i) => { if (Math.abs(y - b) < Math.abs(y - band[best])) best = i; });
    return clamp(best, 0, N - 1);
  };
  act = 0; pick(-1);
  bag.add(pointer(stage, { move: (p) => pick(hit(p)), leave: () => pick(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { gap = v; const a = act; act = -2; pick(a); }, pick: (a) => pick(a), destroy: bag.dispose };
}

hairline({
  name: "layers",
  means: "Two seven-layer stacks joined by a cable: point at a height and that layer opens on both, with the print job riding on it.",
  rules: [1, 2, 5, 9],
  range: [16, 24, 34],
  mount,
});
