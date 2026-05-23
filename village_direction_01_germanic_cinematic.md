# Village Direction 01 — Germanic Cinematic

**Tagline:** *"A village carved from memory, lit by golden hour, built from craft."*

---

## 1. Core Concept

### The Story This World Tells

This direction leans into the existing Germanic/North European half-timber house set and transforms it into a **cinematic, autumnal, storybook village** — think Elden Ring's villages, Studio Ghibli's European countryside, or the Alsatian towns of France. The village does not pretend to be Italian. It is Northern European: timber beams, steep roofs, cobbled lanes, overcast golden sky pushing through fog.

The portfolio story becomes:

> "You arrive at the edge of a quiet village. Warm light bleeds through the fog. Each house you pass holds a piece of how I think about design. At the end of the lane, behind the well, is my house — where my story lives."

The Germanic style works **because it feels serious and crafted**, not playful. Half-timber architecture historically represents **mastery and precision** — each beam is placed with intention. That is exactly the message a senior designer wants to send to Google or a top creative studio.

### Why This Direction Makes Sense for a Design Portfolio

- The houses already exist. No conversion needed. Zero prep time.
- The style is distinctive — no other designer portfolio uses a cinematic Northern European village.
- It signals maturity. Germanic/Alsatian villages feel real, grounded, and premium — not a game demo.
- The HDRI lighting (village_golden.exr) already creates exactly the right warm overcast atmosphere for this direction.
- The design skill houses gain weight from the architecture. A house representing "Typography" or "Design Systems" should feel like a solid craftsman's building — not a cartoon cottage.

---

## 2. Visual Mood

### The Target Feeling

**Cinematic European village. Grounded. Slightly melancholy. Warm. Premium.**

Not a video game. Not a fantasy setting. Not a cartoon.

Think of these visual references:
- The village scenes in *Elden Ring* — stone lanes, warm lanterns, fog in the distance
- The Alsatian French village of Colmar or Riquewihr — half-timber, flower boxes, cobblestone
- *Howl's Moving Castle* countryside — stylized but emotionally real
- *The Witcher 3* village lighting — golden hour, mist, deep shadows, grounded architecture

### What the Camera Should See at Every Point

| Player position | What they see |
|---|---|
| Spawn/entrance | Warm fog, two tall entrance trees, a gate, first house silhouettes on both sides, lanterns glowing |
| Walking the lane | Houses closely framing the path, flower boxes, fences, soft shadow from trees, cobblestones underfoot |
| Approaching the well | The lane opens into a circular plaza, soft warm light on the fountain/well, benches, the hero house visible behind |
| Hero house approach | The lane narrows, large trees frame both sides, the main house sits at the end like a final destination |
| Hero house exterior | Front garden, fence boundary, car visible on side, warm light inside windows |

### Exact Visual Style

- **Render feel:** Stylized cinematic, not photo-real
- **Lighting:** Golden hour warm fill from the west, cool blue-hour from east (already coded), warm lantern point lights
- **Color palette:** Amber, warm cream, dark timber brown, slate grey roofs, deep green foliage, warm terracotta ground
- **Fog:** Low warm fog (already coded with FogExp2) — creates depth, mystery, atmosphere
- **Shadows:** Soft, long shadows from low sun angle
- **Camera height:** Third-person, slightly elevated — the player sees rooflines and tree canopy as part of the composition

---

## 3. Map Blueprint

```
                             ↑ NORTH / DEEPER INTO WORLD
                             
    ════════════════════════════════════════════════════════
                         [ MOUNTAIN ZONE ]
                      company / project worlds
    ════════════════════════════════════════════════════════
                              |
                              |
         ┌────────────────────┼────────────────────┐
         │         [ FOREST SKILLS ZONE ]          │
         │  big trees    campfire    saplings       │
         └────────────────────┼────────────────────┘
                              |
                         [ RIVER ]
                    ──────── ~ ~ ────────
                         [ BRIDGE ]
                              |
              ┌───────────────┴───────────────┐
              │      [ AI / TOOLS AREA ]      │
              │  ChatGPT · Claude · AI houses │
              └───────────────┬───────────────┘
                              |
         ╔════════════════════╩════════════════════╗
         ║           [ HERO HOUSE ]                ║
         ║   front garden · fence · car parking   ║
         ║   inside: desk · map table · boards    ║
         ╚════════════════════╦════════════════════╝
                              |
              ╔═══════════════╩═══════════════╗
              ║      [ WELL / PLAZA ]         ║
              ║    fountain · benches ·       ║
              ║    gathering point            ║
              ╚═══════════════╦═══════════════╝
                              |
    LEFT                      |                      RIGHT
    ┌──────────┐  cobbled lane │  cobbled lane  ┌──────────┐
    │ DESIGN   │      ↑        │        ↑       │ VISUAL   │
    │ SYSTEMS  │   tree backdrop              │ DESIGN   │
    ├──────────┤               │               ├──────────┤
    │ PRODUCT  │   fence line  │  fence line   │ USER     │
    │ DESIGN   │               │               │ RESEARCH │
    ├──────────┤               │               ├──────────┤
    │ UX       │               │               │ GRAPHIC  │
    │ DESIGN   │               │               │ DESIGN   │
    ├──────────┤               │               ├──────────┤
    │ UI       │               │               │ CREATIVE │
    │ DESIGN   │               │               │ THINKING │
    └──────────┘               │               └──────────┘
                               │
              ┌────────────────┴────────────────┐
              │         [ ENTRANCE ]            │
              │   gate · post lanterns ·        │
              │   entrance trees · village sign │
              └────────────────┬────────────────┘
                               │
                         [ PLAYER SPAWN ]
                           z = +14
```

**Lane proportions:**
- Road width: 12–14 units (walkable, not a highway)
- House setback from road edge: 12–14 units (tight framing)
- House-to-house spacing along Z: 18–20 units
- Total lane length (spawn to well): ~80 units
- Well/plaza to hero house: ~60 units
- Hero house to AI area: ~30 units
- AI area to river: ~20 units
- Total world depth: ~250 units

---

## 4. Asset Usage Plan

| Zone | Asset | Purpose | Why it fits | Scale | Use now / later |
|---|---|---|---|---|---|
| **Entrance** | `Fence/gatepost.glb`, `Fence/gate.glb` | Entry gate | Existing, clean | 1.0 | NOW |
| **Entrance** | `kft_lantern` (kenney-fantasy-town) | Entry lanterns | Low-poly warm tone matches village mood | 1.0 | NOW |
| **Entrance** | `kn_tree_oak`, `kn_tree_fat` (kenney-nature) | Flanking entrance trees | Clean silhouette, lightweight | 1.2 | NOW |
| **Lane — road** | `herringbone` texture | Main road surface | Most village-authentic of available options | — | NOW |
| **Lane — grass verge** | `Grass001_2K-JPG_Color.jpg` | Grass between road and houses | Already in use, correct | — | NOW |
| **Lane — houses left** | `house_14`, `house_03`, `house_12`, `house_07` | Design principle buildings | Existing set, all same style family | 0.50–0.55 | NOW |
| **Lane — houses right** | `house_02`, `house_11`, `house_15`, `house_16` | Design principle buildings | Beige/red alternation creates variety | 0.50–0.55 | NOW |
| **Lane — fences** | `kn_fence_planks` (kenney-nature) | Property boundary lines | Wood plank fences fit half-timber houses | 1.0 | NOW |
| **Lane — trees** | `kn_tree_detailed`, `kn_tree_tall`, `kn_tree_oak` | Backdrop trees behind houses | Lightweight, consistent style | 1.0–1.2 | NOW |
| **Lane — props** | `barrel_a`, `barrel_b` | Yard/street dressing | Old assets but fit the European cottage feel | 0.85–0.90 | NOW |
| **Lane — props** | `kn_flower_red`, `kn_flower_yellow`, `kn_flower_purple` | Front yard flowers | Add colour and life to plain facades | 0.85 | NOW |
| **Lane — props** | `kn_plant_bush`, `kn_plant_bush_detail` | Garden fill | Lightweight, consistent | 0.90 | NOW |
| **Lane — signs** | `streetsign_01–04` (old assets) | Design principle labels | Existing, fits village aesthetic | 0.90 | NOW |
| **Lane — lamps** | `kft_lantern` | 5 pairs at road edge | Consistent with entrance | 1.0 | NOW |
| **Lane — rocks** | `rocks_01`, `rocks_03`, `rocks_04` | Natural ground accents | Fit European countryside feel | 0.7–0.8 | NOW |
| **Plaza** | `pp_well` (polypizza) | Central well | Charming low-poly well — better than props_91 | 1.0–1.2 | NOW |
| **Plaza** | `bench_c`, `bench_d` | Seating around well | Existing, match style | 1.0 | NOW |
| **Plaza** | `kft_lantern` | Flanking plaza lanterns | Consistent with lane lamps | 1.1 | NOW |
| **Plaza** | `rocks_05` | Natural accents | Lightweight, adds texture | 0.75 | NOW |
| **Plaza** | `PavingStones150` texture | Plaza ground | Clean cut stone for formal space | — | NOW |
| **Hero house** | `house_01` | Main personal house | Largest and most impressive of the set | 0.60 | NOW |
| **Hero house** | `kn_fence_gate`, `kn_fence_planks` | Garden boundary | Defines personal space | 1.0 | NOW |
| **Hero house** | `kn_tree_pineTallA`, `kn_tree_oak` | Flanking trees | Frame the house dramatically | 1.1–1.3 | NOW |
| **Hero house** | `car_*` (existing) | Parked car in yard | Already in game system | 1.0 | NOW |
| **Hero house garden** | `kn_pot_large`, `kn_flower_red`, `kn_log_stack` | Garden dressing | Personal, lived-in feeling | 0.85–0.95 | NOW |
| **AI houses** | `house_06`, `house_09` | AI/tool area buildings | Smaller, secondary houses | 0.45–0.50 | LATER |
| **Bridge** | `bridge_01–04` or `pp_bridge` (polypizza) | River crossing | Either works — polypizza lighter | 1.0–1.2 | LATER |
| **River** | Custom Three.js plane with water material | River | No heavy asset needed | — | LATER |
| **Forest** | `kn_tree_pineTallA`, `kn_tree_pineRoundA`, `kn_tree_cone` | Skill trees | Pines feel like deep forest | 1.0–2.0 | LATER |
| **Forest** | `bonfire` (old) | Campfire rest area | Existing, perfect fit | 1.0 | LATER |
| **Forest** | `rocks_02`, `rocks_06` | Forest landmark rocks | More dramatic/monumental rocks suit forest | 0.8 | LATER |
| **Mountain** | `farmbuilding_03`, `farmbuilding_07` | Outpost/checkpoint buildings | Reframed as mountain waystation buildings | 0.6 | LATER |
| **HDRI** | `village_golden.exr` | Sky and IBL lighting | Already in use — perfect warm atmosphere | — | NOW |
| **HDRI — forest** | `forest_golden.exr` | Forest zone sky | Switch when entering forest | — | LATER |
| **HDRI — mountain** | `mountain_path.exr` | Mountain zone sky | Switch when entering mountain | — | LATER |

---

## 5. House Meaning System

Each house represents a design discipline. The house model and position should reinforce the label — larger, more complex houses for the more complex disciplines.

| Side | House model | Design principle | Why this house |
|---|---|---|---|
| LEFT | `house_14` (large red compound) | **UI Design** | First house player sees — UI is the visible surface of design. Large, front-facing, impressive. |
| LEFT | `house_03` (red 2-storey, clean facade) | **UX Design** | Second house — UX runs underneath UI. Same style, slightly different read. |
| LEFT | `house_12` (beige L-shaped compound) | **Product Design** | Third house — L-shape suggests complexity and structure. Product thinking is multi-dimensional. |
| LEFT | `house_07` (beige 1-storey, simple porch) | **Design Systems** | Fourth house — smallest, most methodical. Design systems are invisible but essential, like this humble house. |
| RIGHT | `house_02` (beige 2-storey, wide symmetric) | **Visual Design** | First right house — wide and symmetrical, like visual composition. |
| RIGHT | `house_11` (beige large compound) | **Graphic Design** | Large and layered, like the history of graphic craft. |
| RIGHT | `house_15` (red L-shaped, angled wing) | **User Research** | Angled — research approaches the problem from an unexpected direction. |
| RIGHT | `house_16` (red L-shaped, different pitch) | **Creative Thinking** | Most unusual roofline — creative thinking breaks patterns. |

**Hero house:** `house_01` — the largest and most complete building. Two storeys, attached pergola deck. This is where my full story lives.

---

## 6. Interaction Ideas

| Interaction | Where | How it works | Portfolio value |
|---|---|---|---|
| **House signs** | Each design principle house | Sign above door with title; hover shows a brief tooltip with 1-line description of what this skill means | Tells the design story without UI overlays |
| **Well/plaza** | Central plaza | Click well — triggers a ripple animation and shows a "portfolio philosophy" quote | Creates a meaningful pause point |
| **Map table** | Inside hero house | Player walks to map table — circular minimap/GTA-style nav appears showing the full world | Practical: navigation aid |
| **Desk interaction** | Inside hero house | Walk to desk — shows portfolio case studies in a floating panel / 3D billboard | Direct portfolio access point |
| **Car unlock** | Hero house yard | Press E near car — enters car drive mode for faster world exploration | Practical and fun |
| **Forest skill markers** | Forest zone | Each tree cluster has a glowing label. Big trees glow brighter. Hover shows skill name + years | Visual storytelling of skill depth |
| **Campfire rest** | Forest zone | Sit near campfire — ambient music/sound begins, "Rest area / Music I work to" moment | Personality moment |
| **Mountain path marker** | Base of mountain | Stone marker with current company/experience. Click to see detail panel | Career storytelling |
| **Project portals** | Mountain peaks / project zones | Walk through a glowing door or portal — enters a mini project world | Most impressive interaction |

---

## 7. Pros and Cons

### Pros

- **Zero asset conversion needed.** All house models are ready to use today.
- **Art direction is already cohesive.** All 16 houses are from the same set — same style, same scale family, same material language.
- **Cinematic quality is achievable immediately.** The HDRI + fog + sun/fill lights already create the right atmosphere.
- **Serious portfolio impression.** A grounded cinematic village says "mature designer" better than a cartoon playground.
- **Distinctive.** No other portfolio uses this style. Germanic/Alsatian cinematic village is not a used space in design portfolios.
- **Good performance.** All house GLBs are lightweight. No conversion overhead.
- **Scalable.** The house system can expand — more areas, more zones, without breaking the style.

### Cons

- **Not Mediterranean.** If you specifically want warm terracotta Italian village, this direction will not achieve that without asset additions.
- **Houses are large manors, not small cottages.** At default scale they look like estates. Scaling to 0.50–0.55 is essential and must be done precisely.
- **All houses look related.** They are from the same set. Variety must come from position, rotation, and scale — not from model differences.
- **Risk of looking generic** if the lighting/atmosphere is not carefully maintained. Without good HDRI and fog, these houses just look like a game's residential zone.
- **Interior work is complex later.** When you want interiors, you will need to model them from scratch (no interior assets for these house models currently).

---

## 8. Implementation Difficulty

| Dimension | Rating | Notes |
|---|---|---|
| Art direction | 2 / 5 | Clear, consistent, existing assets — just needs scale tuning and layout care |
| Coding | 2 / 5 | All systems already exist — tweaking constants only |
| Asset preparation | 1 / 5 | No conversion needed — just scale adjustments |
| Performance risk | 1 / 5 | All lightweight GLBs, existing HDRI |
| Time to first good result | 1–2 days | Blueprint reset + scaled houses + trees + lamps = working prototype |

**Overall: Lowest friction, fastest to a good result, most technically safe direction.**
