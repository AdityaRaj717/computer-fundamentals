# Network+ pilot prototype

Open `index.html` in any browser (no install, works from disk). On a desktop it shows a 390×844 phone; on a phone it fills the screen.

## The flow
1. **Home** (Today): Tuesday, ticket 1041 from Jo. The Layers figure is live: touch it to open a layer.
2. **Lesson** (3 steps): explain → predict ("Play it" plays your answer; a wrong one opens your layer, then layer 1) → close the ticket. The scan button opens the packet x-ray.
3. **Practice Q1**: drag each fault onto its layer (or tap a fault, then a layer). The figure opens the layer you hover.
4. **Practice Q2**: the firewall port question. A wrong answer opens the mistake replay; "Show me 443" swings the right door open.
5. **Practice tab → Port Match**: 12 ports in two rounds, timer you can turn off, personal best.
6. **Progress tab**: week summary with rating and an email form (validated; saved on this device only).
7. **Share button** on the summary (or `index.html#share`): the shared figure page with a working mask slider.
8. **⋯ on Home**: switch between Studio, Night shift and Ticket desk; "Start over" resets.

## Files
- `src/app.css`, `src/app.js`: the prototype. `figures/`: the three Hairline figures (Layers, Doors, Slicer). `vendor/hairline-kernel.js`: Hairline's engine (MIT, Lucas Marques), unchanged.
- `node build.mjs` inlines everything into `index.html`.

Sample content: Jo, Priya and Sam are invented Brew & Byte staff; the week-summary numbers are sample data. Nothing is sent anywhere; ratings, email and best times stay in this browser.
