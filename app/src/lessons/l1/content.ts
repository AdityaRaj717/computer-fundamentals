import type { LayerNo } from "@/figures/osi/model";

// Lesson 1 words. Each step stays under about 60 words (constitution, principle I).
// Jo is an invented Brew & Byte barista.

export const TICKET = {
  no: "1041",
  from: "Jo",
  role: "Barista",
  initials: "JO",
  hook: "The till tablet can’t print.",
  objective: "1.1 OSI model",
};

export const EXPLAIN = {
  kicker: `Ticket ${TICKET.no} · ${TICKET.from}, ${TICKET.role}`,
  title: TICKET.hook,
  body: "This cabinet is the tablet’s network stack. Open a drawer to see what each layer adds to the print job. Tap the job on the lift to send it down to the printer.",
};

export const PREDICT = {
  kicker: "Predict",
  title: "The printer cable is unplugged. Which layer fails first?",
  options: [1, 2, 3, 7] as LayerNo[],
  playing: "Watch the lift. The job goes down past your layer.",
  right: { title: "No cable, no signal.", body: "Layer 1, Physical, fails first. Every layer above it added its envelope, but the bits had nowhere to go." },
  wrong: (name: string, n: number) => ({
    title: `Layer ${n}, ${name}, did its job.`,
    body: "It added its envelope and passed the job down. The job stopped at layer 1, Physical: no cable, no signal.",
  }),
};

export const CLOSE = {
  kicker: "Fault found",
  title: "Layer 1: the printer cable was out.",
  plugIn: "Tap the plug on the cabinet to push it back in.",
  send: "Now tap the job on the lift to send a test page.",
  sending: "Sending the test page…",
  printed: "The receipt prints. Jo can take card orders again.",
  note: "Objective 1.1 · OSI model · Simplified: in TCP/IP the app does the jobs of layers 5 and 6.",
};

export const CLOSED = {
  title: `Ticket ${TICKET.no} closed`,
  body: "You found a layer 1 fault by watching where the job stopped. Practice questions come next.",
};
