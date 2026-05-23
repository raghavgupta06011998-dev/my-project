# 🏘️ Raghav's Portfolio Village — Architecture Blueprint v2
*Full planned village layout. Nothing implemented from this document — awaiting approval.*

> **Visual map:** open `VILLAGE_MAP.html` in any browser for the top-down view.

---

## 0. Current village — verified coordinate facts

| Element | Position / spec |
|---|---|
| Player spawn | `(0, +10)` — faces −Z (north, into village) |
| Entrance arch "RAGHAV'S WORLD" | `z ≈ +22` |
| Approach road (cobblestone) | `z +26 → −6`, ~14u wide, x≈0 |
| Hero house | `(0, −48)`, scale 1.55 — **36×22u** |
| Hero fence (circular) | R=26, gate front `z ≈ −22` |
| Main loop road (cobblestone) | R=28–42, ring around hero |
| Lawn belt | R=42–53 |
| 8 side houses | R=53–60 — each **~23×27u** at scale 1.25 |
| Front gap (approach corridor) | angles 127°–233° kept open |
| North road | `z −90 → −130` → Bridge `(2,−130)` |
| Background forest band | `z −112 … −136` |
| Outer rocks | already placed (28 rocks at far sides + far back) |
| Step 1–3 props (lights/signs/benches/storage/market/farm) | already placed — DO NOT MOVE |

**Angle convention:** CW from north of hero. 0°=behind hero, 90°=east, 180°=front/south, 270°=west.

---

## 1. The 10 zones

### Zone A — HERO HOUSE ESTATE ✓ existing
- **Where:** inside fence R<26 around hero `(0,−48)`.
- **Contents (already built):** hero house, circular brown picket fence + gate, front stepping-stone path, "MY JOURNEY" sign, 2 gate lanterns, 6 path flowers, 6 fence bushes, 2 yard trees.
- **Role:** the emotional centre — the player's personal story zone.
- **Action:** keep as is.

### Zone B — FRONT ARRIVAL ✓ existing
- **Where:** `z +6 … +30`, around the entrance.
- **Contents:** spawn point, entrance arch + "RAGHAV'S WORLD" sign, approach road, 2 entrance benches (Step 1), 6 approach streetlights (Step 1), approach framing trees.
- **Role:** cinematic welcome. The player's first impression — keep clean and uncluttered.
- **Action:** keep as is. No new props in the corridor x≈0.

### Zone C — MAIN CIRCULAR STREET ✓ existing
- **Where:** cobblestone loop R=28–42 around hero.
- **Contents:** ring road, 6 loop streetlights (Step 1) at R=45 every 60°.
- **Role:** primary movement loop — players use it to reach the hero house and the four outer zones.
- **Action:** keep as is.

### Zone D — BACK STREET / SECONDARY STREET 🟡 new
- **Where:** dirt path forming a larger outer loop at R≈68–75 from hero. Behind the side houses, between them and the outer rocky boundary.
- **Width:** ~4–5u (clearly thinner than the cobblestone loop).
- **Material:** worn dirt / gravel (a TERRAIN overlay layer in `terrain.js`, NOT a cobblestone road — distinguishes it from the main loop).
- **Waypoints (CatmullRom):** `(-35,-5)` market exit → `(-78,-50)` → `(-78,-88)` → `(-30,-100)` → `(30,-100)` → `(78,-88)` → `(78,-50)` farm exit → `(35,-5)` school exit.
- **Role:** "service street" — gives access to MARKET, PARK, NORTH ROAD, FARM, and SCHOOL **without** the player having to walk the whole main loop. Keeps the residential ring quiet.
- **Why a dirt path, not cobble?** The main loop is the formal village street; the back street is a humble, walkable path. Visual hierarchy: cobble = main, dirt = secondary.

### Zone E — MARKET ZONE 🟢 first pass done, expandable
- **Where:** front-left lawn belt, centred `(−32, −13)`. Mirror of the (planned) school.
- **Existing (Step 2):** pp_market_stand + 2 bench_b + 2 barrel_a + bucket_a + props_70 marker.
- **Planned additions:**
  - 1× `pp_wagon` — a parked food cart, ~`(−24,−16)`
  - 1–2 more `bench_b` along the back-street edge
  - 4–6 `green_05–16` (watermelon, pumpkin, melon, peach, apple) as **produce on the stand**
  - 1× `props_91` (wishing well) — optional, only if it fits cleanly *(but I recommend reserving props_91 for the PARK)*
  - 1× `streetsign_04` along the back street pointing "→ Market"
- **Why here:** front-left = visible as the player walks up, never blocks the spawn→hero sightline (kept clear at x≈0), off the cobblestone (doesn't block movement).

### Zone F — PARK ZONE 🟡 new
- **Where:** back-left outer area, centred `(−78, −86)`. Mirror of the farm.
- **Footprint:** ~30×30u fenced rectangle.
- **Contents (planned):**
  - **Perimeter:** white picket fence (`Fence/fence.glb`, `Fence/gate.glb`, `Fence/gatepost.glb`, `Fence/post.glb`) — these are the unused self-textured fence pieces.
  - **Centrepiece:** `props_91` (roofed wishing well) — *ASSET_MAP calls this "the best decorative centrepiece in the entire library."* Perfect for a park focal point.
  - **Seating:** 2–3 `bench_a` (classic garden bench, green frame + orange slats) — matches "park" feel.
  - **Trees:** 3–4 from the forest pack — `oak`, `maple`, `cherry`, `plum` (all proven self-textured).
  - **Shrubs:** 3–5 from the forest pack — `shrub_dec`, `shrub_dec_2`, `shrub_holly`, `shrub_rasp` (raspberry).
  - **Flowers:** scattered from `stylized-nature` — `Flower_3_Group`, `Flower_4_Group` (self-textured stylized models).
  - **Pebbles:** `stylized-nature/Pebble_Round_1–5` along the path edges.
  - **Lamps:** 2× `streetlight_04` at the park entrance + interior.
  - **Marker:** 1× `props_70` sign at the entrance.
- **Why here:** outer back-left mirrors the back-right farm → symmetric village composition. Connected to the village via the back street. A peaceful counterpoint to the farm's working bustle.

### Zone G — FARM ZONE 🟢 first pass done, expandable
- **Where:** back-right outer area, centred `(78, −80)`.
- **Existing (Step 3):** 1× barn, 1× silo, 2× barrel_a, 1× milktank, 1× horse.
- **Planned additions ("kheti ho rahi ho" feel):**
  - **Fenced field:** a rectangular crop plot east of the barns, `x 95–115, z −95 … −75`. Perimeter `Fence/fence.glb` pieces (white picket) — modest farm fence.
  - **Crops on the field:** 6–10× scattered `green_06` (pumpkin) + `green_05` (watermelon) + `green_07` (melon) as the actual crop rows. The `green_*` assets ARE fruits/produce per ASSET_MAP — perfect ground crops.
  - **Second farm building:** 1× `farmbuilding_04` (smaller barn) at `(95, −78)` — a stable/storage shed next to the field.
  - **Animal life:** 1× Cow from `animals-pack/Cow.gltf` near the horse + 1× Donkey at the field edge.
  - **Animal feeders/water:** 1× `littlefoodholder_a001` (elevated feeder), 1× `waterdish_a001` (trough), 1× `foodish_a001` (feed dish). Register these in assetLoader.
  - **Farm tools:** 1× `watersprinkler_a001` (watering can), 1× `lawnmover_a` (already registered) tucked beside the barn.
  - **Hay equivalent:** there's no clean hay-bale asset (kenney-graveyard hay-bale is Kenney → untextured) — substitute with extra wood barrels (`barrel_b` ×2) or skip.
  - **Lamps:** 1× `streetlight_01` at the farm entrance.
- **Why here:** back-right outer mirrors the back-left park → symmetric, plus far from the hero house and from the social market.

### Zone H — SCHOOL / COMMUNITY ZONE 🟡 new (placeholder if no asset fits)
- **Where:** front-right lawn belt, centred `(30, −15)`. Mirror of the market.
- **Asset reality:** there is **no dedicated school GLB** in `/models`. Suggested options:
  - **Option 1 (preferred):** repurpose one of the **unused house variants** (`house_08`, `house_13`, or `house_05`) at scale 1.0 (smaller than residential) as a **schoolhouse / community hall**.
  - **Option 2:** use `farmbuilding_03` (smaller beige barn) at scale 1.0 as a **village community hall**.
  - **Option 3:** placeholder only — mark the zone on the map and leave empty until a better asset is added.
- **Suggested contents (Option 1 with `house_13`):**
  - 1× `house_13` at `(32, −18)`, scale 1.0, facing the village (rotated to face inward)
  - 2× `bench_b` outside the entrance — a small "outside the schoolhouse" gathering spot
  - 1× `streetsign_04` near the loop: "→ Community"
  - 1× `streetlight_01` at the path
  - Maybe 1× `props_91` (wishing well) — *alternative location to the park, if you'd prefer the well at the community hub*
- **Why here:** front-right mirrors the front-left market → balances the village's "front half" socially.

### Zone I — OUTER NATURE / ROCKY 🟢 first pass done, expandable
- **Where:** far sides (x>90 or x<−90) and far back (z<−110).
- **Existing:** 28 rocks (outerRocks.js) + 19 background trees (streetTrees.js BACKGROUND_CLUSTERS + edges).
- **Planned additions:**
  - 8–12 more shrubs at the village→wild boundary (forest pack `shrub_dec`, `shrub_con`, `shrub_holly`)
  - 4–6 `stylized-nature/DeadTree_*` for spooky/wild variety at the edges
  - Scattered `Pebble_Round_*` clusters
  - 1–2 elevated rock outcrops near the bridge to suggest rising terrain toward the future mountain
- **Why:** softens the village→wild boundary; no hard edge. The village reads as a small settlement inside a larger landscape.

### Zone J — FUTURE FOREST / MOUNTAIN PATH 🔴 plan only, do NOT build yet
- **Where:** beyond `z = −140`, full width.
- **Path:** the north road exits at `(2, −130)` (existing bridge). Beyond:
  - **Forest band** (`z −140 … −200`): dense `fir`, `noble_fir`, `pine` from forest pack, plus boulders. The "Skills Forest" of the portfolio narrative.
  - **Mountain rise** (`z < −200`): scaled-up rocks/boulders, `rocks_06` trail markers (the inukshuk-like stone totems per ASSET_MAP), winding trail. The "Career Mountain."
  - **Trail markers along the way:** 4–6 small lanterns (`kft_lantern` — acceptable as ambient white path-light) + 2–3 `rocks_06` totems.
- **Why:** narrative exit — the player's onward journey. Marked clearly so the player knows the village isn't the end.
- **Action:** **none yet.** Plan only. Implement only after the village interior is finished.

---

## 2. Movement flow

```
                   FUTURE FOREST / MOUNTAIN (J)
                              ↑
                          bridge (z=−130)
                              ↑
                          north road
                              ↑
        PARK (F)   ←─ back street ─→   FARM (G)
        (-78,-86)                       (78,-80)
            ↓                              ↓
           back street curves around the village
            ↓                              ↓
        MARKET (E)  ←─ main loop ─→  SCHOOL (H)
        (-32,-13)                       (30,-15)
                ↘                    ↙
                 ↘  HERO ESTATE   ↙
                  ↘  (A) (0,-48) ↙
                      cobble loop
                          ↑
                   approach road
                          ↑
                   ⛩ entrance arch (z≈+22)
                          ↑
                   PLAYER SPAWN (B)
                       (0,+10)
```

**Narrative arc:**
1. **SPAWN** → emotional first impression (sky, arch, gate)
2. **HERO ESTATE** — *who I am* (personal story, "MY JOURNEY")
3. **MARKET** — *connections, social life* (meeting people)
4. **PARK** — *reflection, rest* (peaceful pause)
5. **FARM** — *work, effort, growing things* (craft, persistence)
6. **SCHOOL** — *learning, community* (skills and shared knowledge)
7. **NORTH PATH** — *future, ambition* (onward to forest = skills tree, mountain = career)

Each zone maps to a facet of the portfolio. The village isn't decoration — it's a **legible journey**.

---

## 3. Asset folder analysis

### 🟢 Self-textured, safe to use

| Folder | Count | What's useful |
|---|---|---|
| **houses** | 16 | All houses self-textured. 8 used; 8 spare for school/community. |
| **farmbuilding** | 8 | Barns. `02` used. `01`, `03–08` available. |
| **farmstractures** | 28 | `01–08` decks/gazebos, `09–18` stilt towers, `19–28` silos/water-towers. `23` used. |
| **bench** | 4 | `bench_a-d`. All used somewhere. |
| **barrel** | 2 | `barrel_a` (metal), `barrel_b` (wood). Both used. |
| **bucket** | 2 | `bucket_a` used. `bucket_b` available. |
| **streetlight and sign** | 10 | 6 lights + 4 signs. All proven. |
| **props** | 91 | **High value.** props_70 used, props_91 (wishing well) + props_92 (well variant) reserved. props_85–90 = log piles. **Avoid** props_05–69 (industrial warehouse — wrong theme). |
| **bridge** | 8 | 8 bridges (stone arch, wooden arc, rope). For future forest/mountain crossings. |
| **trees** | 10 | `tree_01–10` stylized village trees. Old code used them — likely textured. |
| **rocks** | 6 | `rocks_01–06` stylized clusters. Used in outerRocks. |
| **Fence** (capital F) | 4 | **`fence`, `gate`, `gatepost`, `post`** — white picket. **Reserved for the park.** |
| **animals** + **animals-pack** | 13 | horse + Cow, Bull, Donkey, Alpaca, Deer, Fox, Husky, ShibaInu, Stag, Wolf. Use horse + cow + donkey for farm. |
| **green** | 16 | `green_05–16` = produce (watermelon, pumpkin, melon, peach, pear, apple, persimmon). Use as **farm crops** + market produce. |
| **milktank** (3), **waterdish** (3), **watersprinkler** (5), **lawnmover** (3), **foodish** (4), **little foodholder** (6) | 24 | Farm tools/feeders. `milktank_a` registered. Register others as needed. |
| **polypizza** | 25 | Self-textured. `pp_market_stand` used. Useful: `pp_wagon`, `pp_well`, `pp_post_lantern`, `pp_arrow_sign`, `pp_birch_trees`, `pp_maple_trees`. |
| **stylized-nature** | 68 | Bushes, Clover, Common/DeadTree, Fern, Flowers, Grass, Mushrooms, Pebbles, RockPath, Rock_Medium. **Use generously in PARK and outer nature.** |
| **forest pack** at `/assets/forest/forest/source/` | ~25 | Already used (trees + boulders + shrubs). Reserve more shrubs (`shrub_dec`, `shrub_holly`, `shrub_rasp`) for the park. |

### 🔴 Avoid (Kenney `colormap.png` is absent → renders white/untextured)

| Folder | Count | Status |
|---|---|---|
| kenney-fantasy-town | 167 | **All white.** Confirmed via Step 2 (stall-red rendered white). Stalls, carts, fences, hedges, fountains all unusable. *Exception:* `kft_lantern` is already used as small white gate lamps — acceptable in small doses only. |
| kenney-nature | 329 | Same colormap pack — would render white. *Do not confuse with `/assets/forest/forest/source/` which is a different, self-textured pack.* |
| kenney-food | 200 | Same — skip food items from this pack. Use `green_05–16` for produce instead. |
| kenney-graveyard | 91 | Same pack. (Tempting `hay-bale` is unusable.) |
| kenney-minigolf | 126 | Wrong theme (golf course). |
| kenney-pirate | 72 | Wrong theme. |
| kenney-platformer | 153 | Wrong theme (game blocks). |
| kenney-space | 40 | Wrong theme. |

### 🟡 Save for later (interiors / hero-house detailing / specific moments)

| Folder | Count | Why save |
|---|---|---|
| polyhaven | ~17 (subfolders) | 4k realistic — wrong style for stylized village. Save for hero house interior detailing or a single "hero artefact." |
| kaykit-furniture | 53 | Interior furniture — save for hero house interior pass. |
| kaykit-dungeon | 211 | Banners only might apply outdoors; rest is dungeon-themed. |
| kaykit-dungeon-classic | 202 | Weapons + dungeon items — save for "Skills Forest" creative props. |
| fantasy-props | 94 | Anvils, books, candles, cauldrons — for hero interior. |
| medieval-village | 176 | Modular building kit — only if we need a custom building (e.g., schoolhouse). |
| pirate | 72 | Theme mismatch. |
| space | 92 | Theme mismatch. |
| car | 14 | car_07/10/14 are wooden carts (decorative) — could test for farm. Modern cars are for the car controller. |

### 🚫 Hard exclude (per repository rules)
`crate_a/b/c/d`, `chair_a/b` — broken paths, in "Dont Use" folder.

---

## 4. Build sequence (user-numbered)

| Step | Work | Notes |
|---|---|---|
| **1** | **Back street** | Implement as a dirt-path overlay in `terrain.js` (a new layer between gravel and worn) tracing the CatmullRom waypoints. Plus add 4 streetlights along it. |
| **2** | **Market polish** | Add `pp_wagon` + 1–2 more benches + produce items + a back-street sign. Keep minimal. |
| **3** | **Park zone** | Fence perimeter + `props_91` centrepiece + benches + trees/shrubs + flowers/pebbles + 2 lamps + 1 marker. ~15 objects total. |
| **4** | **Farm expansion** | Crop field with fence + green_06/05/07 crops + 2nd farm building + animal feeders + cow + lawnmover/watering can + 1 lamp. ~12 objects added. |
| **5** | **School / community** | 1 schoolhouse (house_13 at scale 1.0) + 2 benches + 1 sign + 1 lamp. ~5 objects. (Or skip if placeholder preferred.) |
| **6** | **Outer terrain & nature** | 8–12 shrubs + 4–6 stylized DeadTrees + pebble clusters at the village→wild boundary. |
| **7** | **Detailing pass** | Per-house dressing (small log piles / planters / barrels beside the 8 side houses) + flowers on the hero garden / market / school. |
| **8** | **Optimization** | Cull unseen, review draw call count, consolidate materials, final composition pass. |

---

## 5. ASCII top-down layout (open `VILLAGE_MAP.html` for the visual)

```
              x=−140        x=−70    x=0     x=+70        x=+140
       z=−200 ┌────────────── FUTURE: FOREST / MOUNTAIN (J) ────────────┐
              │      pine/fir density / rising rocks / hidden trail       │
       z=−150 ├──────────────────────────────────────────────────────────┤
              │       ░ BRIDGE ░     ↑ north cobble road                 │
       z=−110 │  rocks       BACKGROUND FOREST BAND       rocks          │
              │   ┌────────── BACK STREET (dirt loop, R≈70) ──────┐      │
       z=−85  │   │  PARK (F)         │      │      FARM (G)       │     │
              │   │  fence·well·      │ ▼    │   barn·silo·horse·  │     │
              │   │  benches·trees    │      │   crops·feeders     │     │
              │   │       (−78,−86)   │      │      (78,−80)       │     │
       z=−60  │   │  house_01─────── ▼   ▼  ─────── house_12       │     │
              │   │             ╔══════════════════╗                │    │
              │   │  house_03   ║      LOOP        ║  house_15      │    │
       z=−40  │   │             ║    R28–42        ║                │    │
              │   │             ║   cobblestone    ║                │    │
              │   │             ║  ┌─ HERO (A) ──┐ ║                │    │
              │   │             ║  │ fence R=26  │ ║                │    │
       z=−20  │   │  house_16   ║  │  (0,−48)    │ ║   house_10     │    │
              │   │     ╲       ║  └─────────────┘ ║       ╱        │    │
              │   │  MARKET (E) ╚══════════════════╝ SCHOOL (H)     │    │
       z=0    │   │  stand·     ╲___ corridor ___╱  comm. hall      │    │
              │   │  benches·         (open)        bench·sign      │    │
              │   │  (−32,−13)                      (30,−15)        │    │
       z=+15  │   └───────────────────────────────────────────────┘     │
              │                       ║ approach ║                       │
       z=+22  │                ⛩  "RAGHAV'S WORLD" arch                  │
       z=+10  │                       ▶ SPAWN ◀                          │
              └──────────────────────────────────────────────────────────┘
```

---

## 6. Open decisions for you

1. **`props_91` wishing well** — Park centrepiece (recommended) OR community-hall centrepiece. I lean park.
2. **School zone** — proceed with `house_13` repurposed as a schoolhouse, OR leave as placeholder?
3. **Back street material** — dirt overlay (matches village rustic), or a thinner cobblestone branch (more "designed")?
4. **Farm crops** — use `green_06` pumpkins as the crop, OR skip crops (just fenced field)?
5. **Forest pack `oak`, `maple`, `cherry` already in the streetTrees** — should the park borrow the same species for visual continuity, or use the `trees/tree_01–10` set for variety?

---

## 7. Restrictions honoured
✓ No assets added · No layout changes · No house/road/fence/sign/player/terrain edits · No Step 1–3 props moved.
✓ Only `/models` assets in the plan (or the proven `/assets/forest/forest/source/` forest pack already in use).

**Awaiting your approval (and answers to the 5 open decisions above) before implementing Step 1: the back street.**
