# Village Direction 02 — Medieval Playful / Stylized

**Tagline:** *"A hand-drawn world where design principles come alive, and every building tells a story."*

---

## 1. Core Concept

### The Story This World Tells

This direction abandons the idea that a portfolio must look serious to be taken seriously. Instead it makes a bold creative argument: **the world itself is a design statement**.

The player enters a world that feels like a beautifully illustrated storybook — low-poly, stylized, warm and readable. Every building is a deliberate design decision. Every colour is a choice. Every prop tells something. The village is not trying to look like a real place. It is trying to look like a designer's **imagination given physical form**.

The portfolio story becomes:

> "Every thing you see here, I designed. The roads, the colours, the signs, the layout — this world is my design thinking made visible. You are not just reading my CV. You are inside it."

This direction is closer in spirit to Bruno Simon's portfolio (racing car + low-poly golf course world) but goes further — it uses a narrative structure, a map system, and a living world rather than just a playground.

### Why This Direction Makes Sense for a Design Portfolio

- It is **immediately recognizable as intentional design work** — not an accidental aesthetic, but a curated one.
- Low-poly stylized worlds are **forgiving to build** — clean geometry hides imprecision, colour does the heavy lifting.
- It allows **playful interactions** that feel natural in a stylized world but would feel jarring in a cinematic one.
- The kenney-nature + kenney-fantasy-town + polypizza assets are all from the **same stylistic family** — they read as a coherent world without careful tuning.
- Award judges at awards like Awwwards, CSS Design Awards, and The FWA consistently respond to this style when it is executed with a strong narrative.
- The modular kenney-fantasy-town building kit allows custom buildings — you are not locked into pre-made house models.

---

## 2. Visual Mood

### The Target Feeling

**Playful, precise, and surprisingly deep. Warm like a hand-drawn map. Interactive like a good indie game.**

Not childish. Not a game demo. A **designed experience** that happens to look like a game.

Think of these references:
- *A Short Hike* — low-poly outdoors, soft colours, emotionally resonant without being realistic
- *Firewatch* — bold colour blocking, strong silhouettes, cinematic despite being stylized
- Bruno Simon's portfolio — but with a story structure and a narrative destination
- *Monument Valley* — every element feels designed, every screen feels intentional
- A vintage illustrated map — warm, annotated, full of visual delight

### What the Camera Should See at Every Point

| Player position | What they see |
|---|---|
| Spawn | A clear path ahead, two big cartoon trees framing the entrance, warm sky, a cheerful lantern |
| Walking the lane | Charming consistent buildings with colour variation, stalls, flower boxes, polypizza wagons and signs |
| Approaching plaza | A polypizza well at the centre of a circular clearing, benches, a warm glow |
| Hero house approach | A clearly distinct, larger, more detailed house — visible from a distance as the "important building" |
| Forest zone | Distinct tree sizes clearly communicating skill depth — visually readable from distance |
| Mountain | Stylized stepped geometry going upward with clear milestone markers |

### Exact Visual Style

- **Render feel:** Flat-shaded or mildly lit low-poly — think smooth geometry, no harsh PBR noise
- **Lighting:** Softer HDRI (village_soft.exr or sunrise.exr), less dramatic shadows, consistent flat warmth
- **Color palette:** Sage green, warm terracotta orange, clean cream white, golden yellow, forest green, sky blue
- **Road:** Simple flat cobblestone or hand-drawn square stone pattern — clean, not photo-real
- **Fog:** Light, distant — creates depth without atmosphere overload
- **Camera:** Same third-person but could be pulled slightly wider to show more of the stylized world at once

---

## 3. Map Blueprint

```
                             ↑ NORTH / DEEPER INTO WORLD

    ╔═══════════════════════════════════════════════════════╗
    ║              [ MOUNTAIN / CAREER ZONE ]               ║
    ║   ⛰️  company mountains · project portals · summit  ⛰️  ║
    ╚═══════════════════════════════════════════════════════╝
                               |
          ┌────────────────────┼────────────────────┐
          │     [ FOREST SKILLS ZONE ]              │
          │  🌲 strong  🌳 medium  🌱 sapling  🔥 fire │
          └────────────────────┼────────────────────┘
                               |
                         ≈≈≈ RIVER ≈≈≈
                       [  🪵 BRIDGE 🪵  ]
                               |
          ┌────────────────────┼────────────────────┐
          │        [ AI / TOOLS HOUSES ]            │
          │    🤖 ChatGPT  🤖 Claude  🤖 Figma AI   │
          └────────────────────┼────────────────────┘
                               |
         ╔═════════════════════╩═════════════════════╗
         ║             [ HERO HOUSE ]                ║
         ║  🏠 main building · 🚗 car · 🌿 garden   ║
         ║  inside: desk · map table · boards       ║
         ╚═════════════════════╦═════════════════════╝
                               |
              ╔════════════════╩════════════════╗
              ║       [ PLAZA / WELL ]          ║
              ║   💧 polypizza well · benches   ║
              ║   lanterns · flower accents     ║
              ╚════════════════╦════════════════╝
                               |
    LEFT (Beige houses)         |         RIGHT (Accent houses)
    ┌─────────────────┐ [lane] │ [lane] ┌─────────────────┐
    │  🏘️ DESIGN      │        │        │  🏘️ VISUAL       │
    │    SYSTEMS      │ trees  │  trees │    DESIGN       │
    ├─────────────────┤        │        ├─────────────────┤
    │  🏘️ PRODUCT     │ fence  │  fence │  🏘️ USER         │
    │    DESIGN       │        │        │    RESEARCH     │
    ├─────────────────┤        │        ├─────────────────┤
    │  🏘️ UX DESIGN   │        │        │  🏘️ GRAPHIC      │
    │                 │        │        │    DESIGN       │
    ├─────────────────┤        │        ├─────────────────┤
    │  🏘️ UI DESIGN   │        │        │  🏘️ CREATIVE     │
    │                 │        │        │    THINKING     │
    └─────────────────┘        │        └─────────────────┘
                               │
              ┌────────────────┴────────────────┐
              │    [ VILLAGE ENTRANCE ]         │
              │  🏮 lanterns · 🌳 trees         │
              │  welcome sign · gate            │
              └────────────────┬────────────────┘
                               │
                         🟢 PLAYER SPAWN
```

**Key layout differences from Direction 01:**
- Buildings are **smaller and closer** to the road — the world feels denser and more charming
- More polypizza props scattered throughout — wagons, signs, stalls
- The hero house is more visually distinct from the lane houses — higher, larger silhouette
- Forest zone has **clear tree sizing** readable at a distance

---

## 4. Asset Usage Plan

| Zone | Asset | Purpose | Why it fits | Scale | Use now / later |
|---|---|---|---|---|---|
| **Entrance** | `kft_fence.glb`, `kft_fence-gate.glb` (kenney-fantasy-town) | Entry gate | Modular, clean, matches style family | 1.0 | NOW |
| **Entrance** | `kft_lantern.glb` | Entry lanterns | Cartoon lantern perfectly fits stylized world | 1.0 | NOW |
| **Entrance** | `kn_tree_oak.glb`, `kn_tree_fat.glb` | Entry trees | Same kenney family, consistent | 1.2–1.4 | NOW |
| **Entrance** | `pp_town_sign.glb` (polypizza) | Welcome sign | Polypizza signs are charming and styled | 1.0 | NOW |
| **Lane — road** | `cobblestone-02` texture | Main road | Lightest cobblestone, clean, cartoon-friendly | — | NOW |
| **Lane — houses** | Germanic houses at 0.50–0.55 scale | Design principle buildings | Scaled down, they read as cozy cottages, not manors | 0.50–0.55 | NOW (step 2) |
| **Lane — houses alt** | kenney-fantasy-town wall/roof assembly | Alternative shop/building fronts | Assemble 2–3 custom kenney buildings as landmark structures | 1.0 | LATER |
| **Lane — fences** | `kn_fence_planks.glb` | Property boundaries | Consistent with kenney family | 1.0 | NOW |
| **Lane — trees** | `kn_tree_oak`, `kn_tree_detailed`, `kn_tree_fat` | Backdrop trees | Lightweight, stylized, consistent | 1.0–1.2 | NOW |
| **Lane — props** | `pp_wagon.glb` (polypizza) | Street decoration near houses | Adds street life, very village-feeling | 1.0 | NOW |
| **Lane — props** | `barrel_a`, `barrel_b` | Yard props | Existing, lightweight | 0.80 | NOW |
| **Lane — props** | `kn_flower_*`, `kn_plant_bush*` | Garden fill | Kenney flowers are bright and stylized | 0.85–0.95 | NOW |
| **Lane — lamps** | `kft_lantern` | Road edge lamps | Consistent with entrance | 1.0 | NOW |
| **Plaza** | `pp_well.glb` (polypizza) | Central well | Most charming well available | 1.1 | NOW |
| **Plaza** | `bench_c`, `bench_d` | Seating | Existing, usable | 1.0 | NOW |
| **Plaza** | `kft_lantern` | Plaza lanterns | Consistent | 1.1 | NOW |
| **Plaza** | `kn_plant_bush_large`, `kn_flower_yellow` | Plaza garden | Bright colours around well | 0.9–1.0 | NOW |
| **Hero house** | `house_01` at 0.60 | Main personal house | Largest available building — visual hierarchy | 0.60 | NOW |
| **Hero house** | `kn_fence_gate.glb` + `kn_fence_planks` | Garden boundary | Defines personal territory | 1.0 | NOW |
| **Hero house** | `kn_tree_pineTallA` flanking | Dramatic entry trees | Height contrast with house | 1.3–1.5 | NOW |
| **AI houses** | `house_06`, `house_09` | AI/tool buildings | Smaller, secondary, clearly subordinate | 0.42–0.48 | LATER |
| **AI houses** | kenney-fantasy-town wall parts | Custom AI hub signage | Build a custom signboard structure | — | LATER |
| **Bridge** | `pp_bridge.glb` or `pp_wood_bridge.glb` | River crossing | Polypizza bridges are charming, lightweight | 1.0–1.3 | LATER |
| **River** | Three.js animated plane | River water | No heavy asset needed | — | LATER |
| **Forest — big trees** | `kn_tree_pineTallA`, `kn_tree_oak` at large scale | Strong skills | Scale = skill strength | 1.5–2.5 | LATER |
| **Forest — medium** | `kn_tree_fat`, `kn_tree_detailed` | Working skills | Medium scale | 1.0–1.4 | LATER |
| **Forest — saplings** | `kn_tree_simple`, `kn_tree_small` | Beginner skills | Small scale | 0.5–0.8 | LATER |
| **Forest — campfire** | `bonfire.glb` (old) | Rest area | Existing, perfect fit | 1.0 | LATER |
| **Mountain** | `kn_tree_cone`, `kn_tree_pineRoundA` | Mountain trees | Pine/cone shapes suit altitude | 0.8–1.2 | LATER |
| **HDRI** | `village_soft.exr` | Sky (softer than golden for stylized world) | Softer light suits low-poly better | — | NOW |
| **Road texture (plaza)** | `cobblestone-01` | Plaza ground | Slightly more detailed than lane | — | NOW |

---

## 5. House / Building System

### Using Existing Houses (Fast Path)

The existing Germanic house set, scaled to 0.50–0.55, is **entirely adequate for a stylized low-poly world**. In this style, the exact architectural realism matters less — the silhouette, position, and labelling do the storytelling work. No conversion needed.

### Upgrading to kenney-fantasy-town Custom Buildings (Medium Path)

The kenney-fantasy-town kit lets you assemble custom buildings from modular parts. This is useful for creating **landmark structures** that are distinct from the lane houses — for example, a custom hero house or a unique town hall at the plaza.

To build a custom building from kenney-fantasy-town pieces in Three.js:
- Use `wall.glb` or `wall-wood.glb` as the base walls
- Stack `roof-high.glb` or `roof-gable.glb` on top
- Add `wall-door.glb` as the entrance
- Add `wall-window-glass.glb` or `wall-window-shutters.glb` for windows
- Place `chimney.glb` on the roof
- This gives a custom building look without Blender work

**Files to use for a kenney custom hero house:**
- `kenney-fantasy-town/wall-wood.glb` — timber-frame walls
- `kenney-fantasy-town/wall-window-shutters.glb` — shuttered windows
- `kenney-fantasy-town/wall-door.glb` — front entrance
- `kenney-fantasy-town/roof-high.glb` — steep roof pieces
- `kenney-fantasy-town/chimney.glb` — roof chimney
- `kenney-fantasy-town/overhang.glb` — front overhang/porch

### Medieval-Village GLTF Kit (Best Quality Path — Needs Blender Work)

The `medieval-village/` folder contains the highest-quality building material available — plaster walls, round terracotta tile roofs, wooden shutters. This is the closest to the warm Italian/Mediterranean village look.

**What you need to do in Blender:**
1. Open `Wall_Plaster_Straight.gltf` — check it loads. Export as GLB.
2. Open `Roof_RoundTiles_4x4.gltf` — check it loads. Export as GLB.
3. Open `Wall_Plaster_Door_Flat.gltf` — Export as GLB.
4. Open `Wall_Plaster_Window_Round.gltf` — Export as GLB.
5. Assemble a simple 2-wall, 1-roof structure in Blender, export as a single GLB.

**Files to ignore (for now):**
- All FBX files in `medieval-village-e/` — cannot use
- All interior pieces (floors, stairs) — not needed for exterior village
- All `Prop_Vine*` pieces — save for hero house garden detail later

**My recommended approach:** Start with kenney houses + old houses at small scale. Once you have converted 4 medieval-village GLBs as a test, I can place one custom Mediterranean building as the hero house or plaza centrepiece.

---

## 6. Interaction Ideas

These interactions feel natural in a stylized world and push this direction beyond Bruno Simon's simpler golf/racing model:

| Interaction | Where | How it works | Why it's portfolio-worthy |
|---|---|---|---|
| **Design principle signs** | Each house | Sign with title; click reveals a 3D postcard/panel with a 1-paragraph design philosophy + 2 sample visuals | Combines game interaction with real design content |
| **Well wish** | Central plaza | Click well → throw a coin animation → shows a "design philosophy" quote floating in 3D | Creates a meaningful pause and personality moment |
| **Map table navigation** | Inside hero house | Large glowing map on table → click to show minimap with all zones labelled | Practical navigation + cinematic moment |
| **Skill tree scan** | Forest zone | Walk near any tree → glowing ring appears → shows skill name, proficiency, and tools | Visual + interactive skill presentation |
| **Campfire stories** | Forest campfire | Sit down → ambient music begins → floating text: tools I use, music I work to, books I read | Personal brand storytelling |
| **Car drive mode** | Hero house yard | Enter car → fast-travel between zones → makes exploration fun | Memorable, very Bruno Simon-adjacent |
| **Project portal** | Mountain zone | Walk through a glowing door → entire environment transitions to a project showcase world | Most impressive interaction in the portfolio |
| **NPC tool houses** | AI area | Walk up to an AI house → small popup: "This tool helped me build X, design Y, research Z" | Demonstrates AI literacy in a fun way |
| **Mini skill game** | Forest zone | Optional: small reflex or pattern game near the campfire that reveals a hidden easter egg | Delights detail-oriented visitors |
| **Photo spot** | Hero house | A "camera" prop in front of the hero house → clicking it takes a screenshot and shows "Share your visit" | Social sharing potential |

---

## 7. Pros and Cons

### Pros

- **Highest uniqueness.** No other design portfolio uses this combination of narrative journey + stylized world + skill system.
- **Interactions feel natural.** In a stylized world, floating text and glowing rings look intentional, not jarring.
- **Excellent award potential.** Awwwards, CSS Design Awards, and The FWA consistently award playful interactive experiences that are also well-designed.
- **Character and personality.** A stylized world expresses more personality than a realistic one. Recruiters remember personality.
- **Consistent asset family.** Kenney-nature + kenney-fantasy-town + polypizza all share a stylistic DNA. Easy to maintain visual consistency.
- **Expandable.** Each zone (forest, mountain, project worlds) can be added later without breaking the style.
- **Good performance.** Kenney and polypizza GLBs are among the lightest assets available.

### Cons

- **Risk of looking "too game-y" for some recruiters.** Senior design leadership at traditional companies (banks, enterprise) may not immediately read this as serious professional work.
- **Style requires more creative direction.** Stylized worlds need careful colour and composition decisions — sloppiness is obvious.
- **Custom buildings need Blender work** if you want to go beyond the existing house models.
- **Harder to make look cinematic.** Low-poly worlds need stronger composition and careful lighting to feel premium rather than hobby-project.
- **Bruno Simon comparison is unavoidable.** Any playful 3D portfolio will invite comparison with Bruno Simon. You need a clear differentiator (the narrative structure and the design content make this different — but you must lean into that).

---

## 8. Implementation Difficulty

| Dimension | Rating | Notes |
|---|---|---|
| Art direction | 3 / 5 | More decisions needed — colour palette, stylistic rules, composition |
| Coding | 2 / 5 | Same systems as Direction 01 — no extra code complexity |
| Asset preparation | 3 / 5 | Some Blender work needed for medieval-village conversion; otherwise lightweight |
| Performance risk | 1 / 5 | Kenney + polypizza are among the lightest assets available |
| Time to first good result | 2–3 days | Blueprint + scaled houses + kenney trees + polypizza props = working prototype |

**Overall: Moderate friction, slightly more creative work required, but higher ceiling for award impact.**
