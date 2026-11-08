"use client";

import * as React from "react";
import { IsoFigure } from "../kit/react/draw";
import { asksForStillness, useReadout } from "../kit/react/live";
import { bundleKey, bundleOf, cablePath, paperOf, pulseAt, trayOf } from "./frame";
import { DESCRIPTION, PACE, READY, readoutOf, sendAt, sendLength, spokenOf, type Fault, type LayerNo, type Phase, type SendState } from "./model";
import { FACE_Y, FRONT_T, FRONT_X, HEIGHT, LEVEL, OPEN_MOST, PLUG, PULL_OUT, SHELF, WIDTH, at, frontZ, shelfZ, shift } from "./view";
import { pathOf } from "../kit/iso-kit";
import { CAVITIES } from "./geometry";

const TOUR_FIRST = 1.4;
const TOUR_BACK = 3600;
const PICK_EACH = 1.3;
const DRAWER_TAU = 0.16;
const LIFT_TAU = 0.22;
const HOVER_SHARE = 0.28;

export interface OsiHandle {
  /** Send the print job down the stack. `watch` lingers on the learner's predicted layer. */
  send: (options?: { watch?: LayerNo | null }) => void;
  setCable: (plugged: boolean) => void;
  pick: (n: LayerNo | null) => void;
  reset: () => void;
}

export interface OsiLiveProps {
  ref?: React.Ref<OsiHandle>;
  bench: React.ReactNode;
  cabinet: React.ReactNode;
  fronts: React.ReactNode[];
  jack: React.ReactNode;
  plug: React.ReactNode;
  rail: React.ReactNode;
  carriage: React.ReactNode;
  lip: React.ReactNode;
  printer: React.ReactNode;
  printerFront: React.ReactNode;
  leds: { jack: [number, number]; printer: [number, number] };
  /** Play the idle tour when nobody is touching the figure. */
  tour?: boolean;
  /** Start with the cable plugged in. */
  plugged?: boolean;
  /** A fault beyond the cable, for free play. */
  fault?: Exclude<Fault, "none" | "cable"> | null;
  onCable?: (plugged: boolean) => void;
  onSendDone?: (phase: Phase) => void;
  onPick?: (n: LayerNo | null) => void;
  onSend?: () => void;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const follow = (now: number, want: number, dt: number, tau: number, calm: boolean, near = 0.01) => {
  if (calm) return want;
  const next = now + (want - now) * (1 - Math.exp(-dt / tau));
  return Math.abs(want - next) < near ? want : next;
};

/** Hit bands over each drawer's face, so a tap in the gaps between fronts still lands. */
const BANDS = [1, 2, 3, 4, 5, 6, 7].map((n) => {
  const z0 = frontZ(n) - 1.2;
  const z1 = z0 + LEVEL;
  const y = FACE_Y + FRONT_T;
  return pathOf([at([-FRONT_X - 3, y, z0]), at([FRONT_X + 3, y, z0]), at([FRONT_X + 3, y, z1]), at([-FRONT_X - 3, y, z1])], true);
});
const PLUG_HIT = at([PLUG.x + PLUG.w / 2 + PULL_OUT / 2, PLUG.y + PLUG.d / 2, 6]);
const JOB_HIT = pathOf(
  [
    at([SHELF.x - 3, SHELF.y - 2, shelfZ(1) - 9]),
    at([SHELF.x + SHELF.w + 2, SHELF.y - 2, shelfZ(1) - 9]),
    at([SHELF.x + SHELF.w + 2, SHELF.y + SHELF.d + 2, shelfZ(1) - 9]),
    at([SHELF.x + SHELF.w + 2, SHELF.y + SHELF.d + 2, shelfZ(1) + 16]),
    at([SHELF.x - 3, SHELF.y - 2, shelfZ(1) + 16]),
  ],
  true,
);

interface Sim {
  open: number[];
  trayDrawn: number[];
  picked: LayerNo | null;
  hover: LayerNo | null;
  plugged: boolean;
  plug: number;
  lift: number;
  bundle: number;
  bundleKey: string;
  paper: number;
  paperFade: number;
  paperOut: boolean;
  paperDrawn: number;
  jackLed: number;
  printerLed: number;
  sending: { clock: number; watch: LayerNo | null; fault: Fault } | null;
  state: SendState;
  result: SendState | null;
  tour: { clock: number; sent: boolean } | null;
}

const fresh = (plugged: boolean): Sim => ({
  open: [0, 0, 0, 0, 0, 0, 0],
  trayDrawn: [0, 0, 0, 0, 0, 0, 0],
  picked: null,
  hover: null,
  plugged,
  plug: plugged ? 0 : 1,
  lift: 7,
  bundle: 1,
  bundleKey: "",
  paper: 0,
  paperFade: 1,
  paperOut: false,
  paperDrawn: 0,
  jackLed: plugged ? 1 : 0,
  printerLed: 0,
  sending: null,
  state: READY,
  result: null,
  tour: null,
});

export function OsiLive(props: OsiLiveProps) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const root = React.useRef<HTMLDivElement | null>(null);
  const sim = React.useRef<Sim>(fresh(props.plugged ?? true));
  const fronts = React.useRef<(SVGGElement | null)[]>([]);
  const trays = React.useRef<(SVGGElement | null)[]>([]);
  const cavities = React.useRef<(SVGGElement | null)[]>([]);
  const lift = React.useRef<SVGGElement | null>(null);
  const bundle = React.useRef<SVGGElement | null>(null);
  const plug = React.useRef<SVGGElement | null>(null);
  const cable = React.useRef<SVGGElement | null>(null);
  const pulse = React.useRef<SVGCircleElement | null>(null);
  const jackLed = React.useRef<SVGCircleElement | null>(null);
  const printerLed = React.useRef<SVGCircleElement | null>(null);
  const paper = React.useRef<SVGGElement | null>(null);
  const frame = React.useRef(0);
  const last = React.useRef(0);
  const spokenKey = React.useRef("");
  const latest = React.useRef(props);
  latest.current = props;

  const [visible, setVisible] = React.useState(false);
  const [engaged, setEngaged] = React.useState(false);
  const [idle, setIdle] = React.useState(true);
  const [poke, setPoke] = React.useState(0);

  const faultNow = (s: Sim): Fault => (!s.plugged ? "cable" : latest.current.fault ?? "none");

  const speak = React.useCallback(() => {
    const s = sim.current;
    const node = root.current;
    if (!node) return;
    const shown = s.sending ? s.state : s.result ?? READY;
    const key = `${shown.phase}|${s.picked}|${s.plugged}`;
    if (key === spokenKey.current) return;
    spokenKey.current = key;
    node.setAttribute("aria-valuenow", String(s.picked ?? 0));
    node.setAttribute("aria-valuetext", spokenOf(shown, s.picked, s.plugged));
  }, []);

  const draw = React.useCallback(() => {
    const s = sim.current;
    for (let i = 0; i < 7; i++) {
      const open = s.open[i]!;
      const g = fronts.current[i];
      if (g) {
        if (open > 0.01) g.setAttribute("transform", shift(0, open, 0));
        else g.removeAttribute("transform");
        if (open > 1) g.dataset.open = "";
        else delete g.dataset.open;
      }
      const cavity = cavities.current[i];
      if (cavity) {
        const shown = open > 0.4 ? "1" : "0";
        if (cavity.style.opacity !== shown) cavity.style.opacity = shown;
      }
      const tray = trays.current[i];
      if (tray && Math.abs(open - s.trayDrawn[i]!) > 0.02) {
        tray.innerHTML = trayOf(i + 1, open);
        s.trayDrawn[i] = open;
      }
    }
    lift.current?.setAttribute("transform", shift(0, 0, shelfZ(s.lift) - shelfZ(1)));
    const key = bundleKey(s.state.grown);
    if (bundle.current) {
      if (key !== s.bundleKey) {
        bundle.current.innerHTML = bundleOf(s.state.grown);
        s.bundleKey = key;
      }
      bundle.current.style.opacity = s.bundle >= 0.999 ? "" : String(Math.round(s.bundle * 100) / 100);
    }
    plug.current?.setAttribute("transform", shift(s.plug * PULL_OUT, 0, 0));
    cable.current?.querySelectorAll("path").forEach((path) => path.setAttribute("d", cablePath(s.plug)));
    const p = s.state.pulse;
    if (pulse.current) {
      const point = pulseAt(Math.max(0, p), s.plug);
      pulse.current.setAttribute("cx", String(point[0]));
      pulse.current.setAttribute("cy", String(point[1]));
      pulse.current.style.opacity = p < 0 ? "0" : String(Math.round(Math.min(1, Math.sin(Math.PI * p) * 3) * 100) / 100);
    }
    if (jackLed.current) jackLed.current.style.opacity = String(Math.round(s.jackLed * 100) / 100);
    if (printerLed.current) printerLed.current.style.opacity = String(Math.round(s.printerLed * 100) / 100);
    if (paper.current) {
      if (Math.abs(s.paper - s.paperDrawn) > 0.004) {
        paper.current.innerHTML = paperOf(s.paper);
        s.paperDrawn = s.paper;
      }
      paper.current.style.opacity = s.paperFade >= 0.999 ? "" : String(Math.round(s.paperFade * 100) / 100);
    }
    const shown = s.sending ? s.state : s.result ?? READY;
    say(readoutOf(shown, s.sending ? null : s.picked ?? s.hover, s.plugged));
    speak();
  }, [say, speak]);

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      const s = sim.current;
      const props = latest.current;
      // the tour drives the same targets a learner would
      if (s.tour) {
        s.tour.clock += dt;
        const t = s.tour.clock;
        const picks = 7 * PICK_EACH;
        if (t < picks) s.picked = (7 - Math.floor(t / PICK_EACH)) as LayerNo;
        else s.picked = null;
        if (t >= picks + 0.5 && !s.tour.sent && s.plugged) {
          s.tour.sent = true;
          s.sending = { clock: 0, watch: null, fault: faultNow(s) };
          s.result = null;
          if (s.paper > 0) s.paperOut = true;
        }
        const loop = s.tour.sent ? picks + 0.5 + sendLength({ fault: "none" }) + 1.6 : picks + 2.4;
        if (!s.sending && t > loop) s.tour = { clock: 0, sent: false };
      }
      if (s.sending) {
        const length = sendLength({ fault: s.sending.fault, watch: s.sending.watch });
        s.sending.clock = calm ? length : s.sending.clock + dt;
        s.state = sendAt(s.sending.clock, { fault: s.sending.fault, watch: s.sending.watch });
        if (s.state.done) {
          const phase = s.state.phase;
          s.result = s.state;
          s.sending = null;
          // a job that stopped at layer 1 stays there, beside the dead jack, until something changes
          if (phase !== "stopped") {
            s.state = { ...READY, grown: [0, 0, 0, 0, 0, 0, 0] };
            s.bundle = 0;
          }
          props.onSendDone?.(phase);
        }
      }
      const st = s.state;
      for (let i = 0; i < 7; i++) {
        const n = (i + 1) as LayerNo;
        const chosen = s.sending ? 0 : s.picked === n ? 1 : s.hover === n ? HOVER_SHARE : 0;
        const want = Math.max(chosen, s.sending ? st.drawer[i]! : 0) * OPEN_MOST;
        s.open[i] = follow(s.open[i]!, want, dt, DRAWER_TAU, calm, 0.02);
      }
      s.plug = follow(s.plug, s.plugged ? 0 : 1, dt, 0.14, calm, 0.002);
      s.jackLed = follow(s.jackLed, s.plugged && s.plug < 0.05 ? 1 : 0, dt, 0.12, calm, 0.01);
      if (s.sending) {
        s.lift = follow(s.lift, st.lift, dt, 0.06, calm, 0.002);
        s.bundle = st.bundle;
        s.printerLed = st.printerLed;
        if (st.paper > 0) {
          s.paper = st.paper;
          s.paperFade = 1;
          s.paperOut = false;
        }
      } else {
        const stuck = s.result?.phase === "stopped";
        s.lift = follow(s.lift, stuck ? 1 : 7, dt, LIFT_TAU, calm, 0.002);
        const home = stuck || s.lift > 6.95 ? 1 : 0;
        s.bundle = follow(s.bundle, home, dt, 0.18, calm, 0.01);
        s.printerLed = follow(s.printerLed, s.result?.phase === "printed" ? 1 : 0, dt, 0.2, calm, 0.01);
      }
      if (s.paperOut) {
        s.paperFade = follow(s.paperFade, 0, dt, 0.12, calm, 0.01);
        if (s.paperFade === 0) {
          s.paper = 0;
          s.paperOut = false;
        }
      }
      draw();
      const settled =
        !s.paperOut &&
        !s.tour &&
        !s.sending &&
        s.open.every((open, i) => open === (s.picked === i + 1 ? OPEN_MOST : s.hover === i + 1 ? HOVER_SHARE * OPEN_MOST : 0)) &&
        s.plug === (s.plugged ? 0 : 1) &&
        s.lift === (s.result?.phase === "stopped" ? 1 : 7) &&
        (s.bundle === 1 || s.bundle === 0) &&
        (s.jackLed === 0 || s.jackLed === 1);
      return !settled || s.bundle !== 1;
    },
    [draw],
  );

  const stop = React.useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  const run = React.useCallback(() => {
    if (frame.current) return;
    last.current = 0;
    const step = (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 1 / 30) : 1 / 60;
      last.current = now;
      const more = tick(dt, asksForStillness());
      frame.current = more ? requestAnimationFrame(step) : 0;
    };
    frame.current = requestAnimationFrame(step);
  }, [tick]);

  const wake = React.useCallback(() => {
    sim.current.tour = null;
    setIdle(false);
    setPoke((count) => count + 1);
  }, []);

  // ---------- the API the lesson uses

  const send = React.useCallback(
    (options?: { watch?: LayerNo | null }) => {
      const s = sim.current;
      wake();
      s.picked = null;
      s.hover = null;
      s.result = null;
      if (s.paper > 0) s.paperOut = true;
      s.sending = { clock: 0, watch: options?.watch ?? null, fault: faultNow(s) };
      latest.current.onSend?.();
      run();
    },
    [run, wake],
  );

  const setCable = React.useCallback(
    (plugged: boolean) => {
      const s = sim.current;
      if (s.plugged === plugged) return;
      s.plugged = plugged;
      s.result = null;
      if (s.sending) s.sending = null;
      s.state = { ...READY, grown: [0, 0, 0, 0, 0, 0, 0] };
      latest.current.onCable?.(plugged);
      run();
    },
    [run],
  );

  const pick = React.useCallback(
    (n: LayerNo | null) => {
      const s = sim.current;
      s.picked = n;
      s.result = null;
      latest.current.onPick?.(n);
      run();
    },
    [run],
  );

  const reset = React.useCallback(() => {
    const s = sim.current;
    s.sending = null;
    s.picked = null;
    s.hover = null;
    s.result = null;
    s.state = { ...READY, grown: [0, 0, 0, 0, 0, 0, 0] };
    if (s.paper > 0) s.paperOut = true;
    run();
  }, [run]);

  React.useImperativeHandle(props.ref, () => ({ send, setCable, pick, reset }), [send, setCable, pick, reset]);

  // ---------- visibility, tour and idle

  React.useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => setVisible(Boolean(entries.at(-1)?.isIntersecting)), { rootMargin: "120px 0px" });
    observer.observe(node);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [stop]);

  React.useEffect(() => {
    if (engaged) {
      setIdle(false);
      return;
    }
    const timer = window.setTimeout(() => setIdle(true), TOUR_BACK);
    return () => window.clearTimeout(timer);
  }, [engaged, poke]);

  const touring = visible && idle && !engaged && (props.tour ?? false);

  React.useEffect(() => {
    if (!visible) {
      stop();
      return;
    }
    run();
    if (!touring || asksForStillness()) return;
    const timer = window.setTimeout(() => {
      const s = sim.current;
      if (s.sending) return;
      s.tour = { clock: 0, sent: false };
      s.result = null;
      run();
    }, TOUR_FIRST * 1000);
    return () => {
      window.clearTimeout(timer);
      const s = sim.current;
      if (s.tour) {
        s.tour = null;
        s.picked = null;
        run();
      }
    };
  }, [visible, touring, run, stop]);

  // ---------- input

  const hitOf = (target: EventTarget | null): { kind: "drawer"; n: LayerNo } | { kind: "plug" } | { kind: "job" } | null => {
    const node = (target as Element | null)?.closest?.("[data-hit]");
    if (!node) return null;
    const kind = node.getAttribute("data-hit");
    if (kind === "drawer") return { kind, n: Number(node.getAttribute("data-n")) as LayerNo };
    if (kind === "plug") return { kind };
    if (kind === "job") return { kind };
    return null;
  };

  const act = (hit: NonNullable<ReturnType<typeof hitOf>>) => {
    const s = sim.current;
    wake();
    if (hit.kind === "drawer") {
      if (s.sending) return;
      pick(s.picked === hit.n ? null : hit.n);
    } else if (hit.kind === "plug") {
      setCable(!s.plugged);
    } else if (!s.sending) {
      send();
    }
  };

  const onKey = (event: React.KeyboardEvent) => {
    const s = sim.current;
    const current = s.picked ?? 0;
    let next: number | null = null;
    if (event.key === "ArrowUp" || event.key === "ArrowRight") next = current ? Math.min(7, current + 1) : 1;
    else if (event.key === "ArrowDown" || event.key === "ArrowLeft") next = current ? Math.max(1, current - 1) : 7;
    else if (event.key === "Home") next = 1;
    else if (event.key === "End") next = 7;
    else if (event.key === "Escape") {
      wake();
      pick(null);
      return;
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (event.repeat || s.sending) return;
      send();
      return;
    } else if (event.key === "c" || event.key === "C") {
      wake();
      setCable(!s.plugged);
      return;
    }
    if (next === null || s.sending) return;
    event.preventDefault();
    wake();
    pick(next as LayerNo);
  };

  const bindFront = (index: number) => (node: SVGGElement | null) => {
    fronts.current[index] = node;
  };
  const bindTray = (index: number) => (node: SVGGElement | null) => {
    trays.current[index] = node;
  };
  const bindCavity = (index: number) => (node: SVGGElement | null) => {
    cavities.current[index] = node;
  };

  const cableRest = cablePath(props.plugged === false ? 1 : 0);
  const plugRest = props.plugged === false ? shift(PULL_OUT, 0, 0) : undefined;

  return (
    <div
      ref={(node) => {
        root.current = node;
        anchor.current = node;
      }}
      className="osi-stage"
      role="slider"
      tabIndex={0}
      aria-label="OSI cabinet: arrow keys open layers 1 to 7, Enter sends the print job, C unplugs or plugs the cable, Escape closes the drawer"
      aria-valuemin={0}
      aria-valuemax={7}
      aria-valuenow={0}
      aria-valuetext={spokenOf(READY, null, props.plugged ?? true)}
      onClick={(event) => {
        const hit = hitOf(event.target);
        if (hit) act(hit);
      }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const hit = hitOf(event.target);
        const n = hit?.kind === "drawer" ? hit.n : null;
        const s = sim.current;
        if (s.hover !== n) {
          s.hover = n;
          if (n) wake();
          run();
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setEngaged(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setEngaged(false);
        sim.current.hover = null;
        run();
      }}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
      onKeyDown={onKey}
    >
      <IsoFigure width={WIDTH} height={HEIGHT} label={DESCRIPTION}>
        {props.bench}
        {props.cabinet}
        <g className="osi-bands">
          {BANDS.map((d, index) => (
            <path key={index} className="osi-hit" d={d} data-hit="drawer" data-n={index + 1} />
          ))}
        </g>
        {props.fronts.map((front, index) => (
          <g key={index} className="osi-drawer" data-hit="drawer" data-n={index + 1}>
            <g ref={bindCavity(index)} className="osi-cavity" style={{ opacity: 0 }}>
              <path className="osi-cavity-back" d={CAVITIES[index]!.back} />
              <path className="osi-cavity-wall" d={CAVITIES[index]!.wall} />
              <path className="iso-line" data-tone="lo" d={CAVITIES[index]!.back} />
            </g>
            <g ref={bindTray(index)} />
            <g ref={bindFront(index)}>{front}</g>
          </g>
        ))}
        {props.jack}
        <g ref={cable} className="osi-cable">
          <path className="osi-cable-body" d={cableRest} />
          <path className="osi-cable-shine" d={cableRest} />
        </g>
        <g ref={plug} transform={plugRest} data-hit="plug" className="osi-plug">
          {props.plug}
        </g>
        <circle ref={pulse} className="osi-pulse" cx={0} cy={0} r={2.1} style={{ opacity: 0 }} />
        <circle className="osi-led-off" cx={props.leds.jack[0]} cy={props.leds.jack[1]} r={0.9} />
        <circle ref={jackLed} className="osi-led" cx={props.leds.jack[0]} cy={props.leds.jack[1]} r={0.9} style={{ opacity: props.plugged === false ? 0 : 1 }} />
        {props.rail}
        <g ref={lift} transform={shift(0, 0, shelfZ(7) - shelfZ(1))} data-hit="job" className="osi-job">
          <path className="osi-hit" d={JOB_HIT} />
          {props.carriage}
          <g ref={bundle} dangerouslySetInnerHTML={{ __html: bundleOf([0, 0, 0, 0, 0, 0, 0]) }} />
          {props.lip}
        </g>
        {props.printer}
        <circle className="osi-led-off" cx={props.leds.printer[0]} cy={props.leds.printer[1]} r={0.9} />
        <circle ref={printerLed} className="osi-led" cx={props.leds.printer[0]} cy={props.leds.printer[1]} r={0.9} style={{ opacity: 0 }} />
        <g ref={paper} />
        {props.printerFront}
        <circle className="osi-hit" cx={PLUG_HIT[0]} cy={PLUG_HIT[1]} r={13} data-hit="plug" />
      </IsoFigure>
    </div>
  );
}

export { PACE };
