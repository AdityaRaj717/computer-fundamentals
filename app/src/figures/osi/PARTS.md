# Fig 1 · The OSI cabinet: concept and parts

**Size:** Figure (one mechanism, about 74 parts). It stays a Figure: one moving lift, one drawer at a time, one cable.

**The object, in one sentence:** a seven-drawer filing cabinet is the till tablet's network stack. Each drawer holds the envelope its layer adds, sized by its real header bytes. A lift on the cabinet's side carries Jo's print job down past every drawer, growing one plate per header. At the plinth it leaves as bits through a jack and cable to a receipt printer. Pull the plug and the job stops at layer 1.

**Why the cabinet and not the sleeving conveyor:** the cabinet is tall, so it fills a portrait phone screen. A conveyor with seven stations is wide and would be tiny at 390 px. Drawers also make "layers" touchable: you open one to see what lives there.

**Camera:** azimuth 55° (drawer fronts on the +y face turned toward the viewer, lift on the +x side still in view), elevation 30°.

## Parts (back to front)

**Base: the bench**
1. halo · 2–9. four feet (flange + foot) · 10. bench slab with bevel · 11. groove · 12–15. corner screws with rings · 16. label plate · 17. its rule lines (stand for text) · 18–19. its screws

**Structure: the cabinet**
20. plinth (recessed kick base) · 21. carcass · 22. top cap (overhangs 2) · 23. top-cap groove · 24. carcass seam above the plinth · 25. side panel recess (closed outline on the +x face) · 26–29. cap screws

**Mechanism: drawers**
30–36. seven drawer fronts (layer 7 at the top) · 37–57. seven pulls (two posts and a bar each) · 58–64. seven label holders with a card and the layer digit · 65. the open tray (floor + two walls, rebuilt as it slides) · 66. tray contents: receipt cards (7), empty (6, 5), TCP header plate 40 long = 20 B (4), IP header plate 40 = 20 B (3), Ethernet header 28 = 14 B plus checksum chip 8 = 4 B at the far end (2), preamble strip 16 = 8 B with alternating ticks (1). Scale: 2 units per byte.

**Mechanism: the lift**
67. rail on the +x face · 68–69. rail end blocks with screws · 70. carriage · 71–72. two rollers · 73. shelf

**Subject (the one lit part)**
74. the bundle on the shelf: the print job card, which grows one plate per header on the way down (thickness 0.12 per byte; the payload card is fixed)

**Controls**
75. jack housing on the plinth · 76. link light · 77. plug (slides out when unplugged) · 78. boot · 79. cable along the bench · 80. signal pulse on the cable

**Printer**
81. halo · 82. body · 83. lid seam · 84. paper slot (closed outline) · 85. cutter bar · 86. receipt (rises when printed, rule lines stand for print) · 87. status light · 88. feed button · 89. port block where the cable lands
