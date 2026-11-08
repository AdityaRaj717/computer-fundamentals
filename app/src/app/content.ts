// Sample content for the pilot, taken from specs/001-netplus-pilot/spec.md.
// Jo, Priya and Sam are invented Brew & Byte staff. Brew & Byte is a made-up café chain.

export type ObjId = "o11" | "o14" | "o17" | "o51";
export type TicketNo = "1041" | "1042" | "1043" | "1044";

export const OBJECTIVES: Record<ObjId, { no: string; name: string; figure: string }> = {
  o11: { no: "1.1", name: "OSI model", figure: "Seven-drawer cabinet" },
  o14: { no: "1.4", name: "Ports and protocols", figure: "Building with numbered doors" },
  o17: { no: "1.7", name: "IPv4 addressing", figure: "Address cutting jig" },
  o51: { no: "5.1", name: "Troubleshooting", figure: "Café test bench" },
};

export interface Ticket {
  no: TicketNo;
  day: string;
  dayLong: string;
  obj: ObjId;
  from: string;
  role: string;
  initials: string;
  hook: string;
  /** What the sender wrote, as a chat message. */
  message: string;
  minutes: number;
  steps: string[];
  /** Built and playable in this pilot build. */
  ready: boolean;
  buildsOn?: string;
}

export const TICKETS: Ticket[] = [
  {
    no: "1041",
    day: "Tue",
    dayLong: "Tuesday",
    obj: "o11",
    from: "Jo",
    role: "Barista",
    initials: "JO",
    hook: "The till tablet can’t print.",
    message: "Hi! The till tablet won’t print receipts. The printer is on and has paper. Can you take a look?",
    minutes: 6,
    steps: ["Look inside the tablet’s network stack", "Predict which layer fails first", "Fix it and close the ticket"],
    ready: true,
  },
  {
    no: "1042",
    day: "Wed",
    dayLong: "Wednesday",
    obj: "o14",
    from: "Priya",
    role: "Shift lead",
    initials: "PK",
    hook: "Card payments fail but the web works.",
    message: "The card machine keeps saying “connection failed”, but the tablet still loads websites. Odd, right?",
    minutes: 7,
    steps: ["Walk the building of numbered doors", "Find the door the payment needs", "Open it on the firewall"],
    ready: false,
  },
  {
    no: "1043",
    day: "Thu",
    dayLong: "Thursday",
    obj: "o17",
    from: "Sam",
    role: "Owner",
    initials: "SA",
    hook: "The new branch needs its own network.",
    message: "We open on Market Street next month. It needs its own network, kept apart from ours.",
    minutes: 7,
    steps: ["Slide the mask along the address", "Count the networks and hosts", "Hand the branch its block"],
    ready: false,
  },
  {
    no: "1044",
    day: "Fri",
    dayLong: "Friday",
    obj: "o51",
    from: "Priya",
    role: "Shift lead",
    initials: "PK",
    hook: "Friday rush: nothing works.",
    message: "Queue out the door, tills down, Wi-Fi down. Please help!",
    minutes: 12,
    steps: ["Name the problem and guess a cause", "Test it on the café bench", "Fix, check and write it up"],
    ready: false,
    buildsOn: "Builds on tickets 1041 to 1043. You can start it any time.",
  },
];

export const ticket = (no: string) => TICKETS.find((t) => t.no === no);

export const MODULE = {
  title: "Your first week as a network tech",
  blurb: "Four help-desk tickets at Brew & Byte. Each one teaches a Network+ objective.",
  reviewed: "8 Nov 2026",
};

export const SOURCES: Record<TicketNo, string[]> = {
  "1041": ["CompTIA Network+ N10-009 exam objectives, 1.1", "ISO/IEC 7498-1, the OSI basic reference model"],
  "1042": ["CompTIA Network+ N10-009 exam objectives, 1.4", "IANA service name and port number registry"],
  "1043": ["CompTIA Network+ N10-009 exam objectives, 1.7", "RFC 950 and RFC 4632 (subnetting, CIDR)"],
  "1044": ["CompTIA Network+ N10-009 exam objectives, 5.1"],
};

export const RECAP: Record<"1041", string[]> = {
  "1041": [
    "A message goes down seven layers, and each adds its own header.",
    "With no cable there is no signal: the job stops at layer 1.",
    "Find the layer by watching where the job stops.",
  ],
};

export const TRADEMARK = "CompTIA and Network+ are trademarks of CompTIA. This app isn’t affiliated with or endorsed by CompTIA.";

// ---------- practice for ticket 1041 (all original questions)

export type Question =
  | {
      id: string;
      kind: "place";
      obj: ObjId;
      prompt: string;
      faults: { id: string; label: string; layer: 1 | 2 | 3 | 4 | 7 }[];
      layers: (1 | 2 | 3 | 4 | 7)[];
      review: string;
    }
  | {
      id: string;
      kind: "choose";
      obj: ObjId;
      prompt: string;
      figure?: "ip";
      options: { value: number; label: string }[];
      answer: number;
      why: string;
      wrong: (label: string) => string;
      review: string;
    };

export const LAYER_NAMES: Record<number, string> = {
  1: "Physical",
  2: "Data link",
  3: "Network",
  4: "Transport",
  5: "Session",
  6: "Presentation",
  7: "Application",
};

const layerOpt = (n: number) => ({ value: n, label: `${n} · ${LAYER_NAMES[n]}` });

export const PRACTICE_1041: Question[] = [
  {
    id: "1041-q1",
    kind: "place",
    obj: "o11",
    prompt: "Put each fault on the layer it lives in.",
    faults: [
      { id: "cable", label: "Cable unplugged", layer: 1 },
      { id: "ip", label: "Printer has the wrong IP", layer: 3 },
      { id: "svc", label: "Print service crashed", layer: 7 },
    ],
    layers: [1, 2, 3, 7],
    review: "Which layer each fault lives in",
  },
  {
    id: "1041-q2",
    kind: "choose",
    obj: "o11",
    figure: "ip",
    prompt: "The printer has the wrong IP address. Which layer stops the job?",
    options: [1, 2, 3, 7].map(layerOpt),
    answer: 3,
    why: "The job crosses the cable fine, but it carries the wrong address, so layer 3, Network, can’t deliver it.",
    wrong: (label) => `Layer ${label} did its job and passed the print job on. Watch it stop at layer 3, Network.`,
    review: "A wrong IP address is a layer 3 fault",
  },
  {
    id: "1041-q3",
    kind: "choose",
    obj: "o11",
    prompt: "Which layer adds the printer’s port number, 9100, to the print job?",
    options: [2, 3, 4, 7].map(layerOpt),
    answer: 4,
    why: "Ports belong to layer 4, Transport. The port tells the printer which service the job is for.",
    wrong: (label) => `Layer ${label} adds other things. Port numbers live in layer 4, Transport.`,
    review: "Port numbers live in layer 4",
  },
  {
    id: "1041-q4",
    kind: "choose",
    obj: "o11",
    prompt: "A switch forwards frames by MAC address. Which layer is that?",
    options: [1, 2, 3, 4].map(layerOpt),
    answer: 2,
    why: "MAC addresses and frames belong to layer 2, Data link. Routers and IP addresses are layer 3.",
    wrong: (label) => `Not layer ${label}. Frames and MAC addresses are layer 2, Data link.`,
    review: "Switches and MAC addresses are layer 2",
  },
];

// ---------- Port Match drill: 12 well-known ports (N10-009 objective 1.4)

export const PORTS: { id: string; port: string; proto: string; use: string }[] = [
  { id: "ftp", port: "20/21", proto: "FTP", use: "moving files" },
  { id: "ssh", port: "22", proto: "SSH", use: "a secure remote shell" },
  { id: "telnet", port: "23", proto: "Telnet", use: "an unencrypted remote shell" },
  { id: "smtp", port: "25", proto: "SMTP", use: "sending email" },
  { id: "dns", port: "53", proto: "DNS", use: "looking up names" },
  { id: "dhcp", port: "67/68", proto: "DHCP", use: "handing out IP addresses" },
  { id: "http", port: "80", proto: "HTTP", use: "web pages" },
  { id: "pop3", port: "110", proto: "POP3", use: "downloading email" },
  { id: "imap", port: "143", proto: "IMAP", use: "email kept in folders" },
  { id: "snmp", port: "161/162", proto: "SNMP", use: "monitoring devices" },
  { id: "https", port: "443", proto: "HTTPS", use: "secure web pages and payments" },
  { id: "rdp", port: "3389", proto: "RDP", use: "remote desktop" },
];
