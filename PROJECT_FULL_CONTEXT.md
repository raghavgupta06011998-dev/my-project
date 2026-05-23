# PROJECT_FULL_CONTEXT.md
> **Raghav 3D Interactive Portfolio — Complete Project Documentation**
> Generated: 2026-05-23 | Status: Living document — update after major changes

---

## 1. Project Vision

This is a **3D interactive portfolio**, not a conventional website.

The visitor/player explores Raghav's creative world through movement, environments, and interactive storytelling. The experience is structured as a **narrative journey through a designed 3D world** — warm, cinematic, stylized, charming, and portfolio-quality.

### The Full Journey (Planned)

| Stage | Name | Role |
|---|---|---|
| 1 | Space Intro | Cinematic entry through a black hole / portal — the world begins |
| 2 | Village Hub | **Current active area.** The player lands here and explores |
| 3 | Personal House | Raghav's story, background, and personality |
| 4 | Forest | Skills zone — ancient trees = core skills, saplings = new skills |
| 5 | Mountain | Career progression — climb higher to discover more |
| 6 | Project Worlds | Each major project becomes a small interactive environment |

The Village Hub is the main hub world — warm, walkable, and acts as the junction from which the player can navigate to all other zones.

---

## 2. Tech Stack

| Item | Details |
|---|---|
| Framework | [Three.js](https://threejs.org/) `v0.183.2` |
| Bundler | [Vite](https://vitejs.dev/) `v8.0.4` |
| Language | JavaScript (ES Modules) |
| Player model | `Knight.glb` from KayKit Adventurers pack |
| Asset format | `.glb` (models), `.gltf` (Poly Haven models), `.exr` (HDRI sky) |
| Dev command | `npm run dev` |
| Build command | `npm run build` |

---

## 3. Folder & File Structure

```
raghav-portfolio/
├── index.html                          # App entry point
├── package.json                        # Three.js + Vite dependencies
├── vite.config.js                      # (may exist as implicit)
│
├── PROJECT_FULL_CONTEXT.md             # ← THIS FILE
├── PROJECT_PROGRESS.md                 # Running progress log
├── VILLAGE_MAP.html                    # Visual top-down SVG map of the village
├── VILLAGE_BLUEPRINT.md                # Original village plan
├── VILLAGE_BLUEPRINT_V2.md             # Detailed zone-by-zone blueprint (current)
├── ASSET_MAP.md                        # Visual inspection log of all GLB assets
├── CLAUDE.md                           # Claude Code project instructions
├── EXTERNAL_ASSET_DOWNLOAD_PLAN.md     # Research plan for future assets
│
├── src/
│   ├── main.js                         # App entry — scene, animation loop, transitions
│   ├── style.css                       # Base UI styles
│   │
│   ├── core/                           # Three.js core setup
│   │   ├── camera.js                   # Perspective camera + resize
│   │   ├── clock.js                    # Delta clock
│   │   ├── renderer.js                 # WebGL renderer (shadows, tone mapping)
│   │   ├── scene.js                    # Base scene
│   │   └── SceneManager.js             # Scene switching helpers
│   │
│   ├── config/                         # Shared config constants
│   │   ├── controlsConfig.js           # Input constants
│   │   ├── lightingConfig.js           # Lighting presets
│   │   └── worldConfig.js              # World constants
│   │
│   ├── entities/                       # Mars scene entities
│   │   ├── Player.js                   # Mars player loader
│   │   ├── Car.js                      # Car entity (Mars)
│   │   └── NPC.js                      # NPC entity
│   │
│   ├── systems/                        # Game systems (used in both scenes)
│   │   ├── controls.js                 # Keyboard input + pointer lock
│   │   ├── movement.js                 # General movement update
│   │   ├── driving.js                  # Car driving mode toggle
│   │   ├── interaction.js              # E-key interaction dispatch
│   │   └── collision.js                # Collision helpers
│   │
│   ├── ui/                             # HUD / overlay UI
│   │   ├── overlayText.js              # "Click to explore" overlay
│   │   ├── interactionPrompt.js        # "Press E" prompt
│   │   └── interactionPanel.js         # Interaction content panel
│   │
│   ├── utils/
│   │   ├── loaders.js                  # loadGLBModel helper
│   │   ├── helpers.js                  # clearSceneForNextLevel, misc
│   │   └── constants.js                # Shared numeric constants
│   │
│   ├── world/
│   │   ├── mars/                       # Mars / Space scene (intro world)
│   │   │   ├── MarsWorld.js
│   │   │   ├── marsScene.js            # Assembled Mars scene
│   │   │   ├── earth.js                # Earth sphere in sky
│   │   │   ├── gate.js                 # Portal / transition gate
│   │   │   └── ground.js               # Mars ground
│   │   │
│   │   └── village/                    # Village Hub (ACTIVE area)
│   │       ├── villageBuilder.js       # ★ MASTER ASSEMBLER — builds the whole scene
│   │       │
│   │       ├── environment/
│   │       │   └── environment.js      # HDRI sky, fog, ambient + directional lights
│   │       │
│   │       ├── terrain/
│   │       │   ├── terrain.js          # ★ Layered ground (green, gravel, worn, mud)
│   │       │   └── terrainBuilder.js   # (older helper — terrain.js is canonical)
│   │       │
│   │       ├── roads/
│   │       │   ├── roads.js            # ★ Cobblestone road system (approach + ring + north)
│   │       │   ├── backStreet.js       # ★ Dirt outer path (market → park → farm → school)
│   │       │   └── roadBuilder.js      # (stub — roads.js is canonical)
│   │       │
│   │       ├── structures/
│   │       │   ├── heroHouse.js        # ★ Hero house + fence + garden + signs + lights
│   │       │   ├── streetHouses.js     # ★ 8 ring houses at R=53–60 from hero
│   │       │   ├── entrance.js         # ★ "RAGHAV'S WORLD" welcome sign arch
│   │       │   ├── marketArea.js       # (stub — marketZone.js is canonical)
│   │       │   ├── farmArea.js         # (stub — farmZone.js is canonical)
│   │       │   └── storyAreas.js       # (stub / future use)
│   │       │
│   │       ├── props/
│   │       │   ├── villageProps.js     # ★ Streetlights, signs, benches, barrels (Step 1)
│   │       │   ├── marketZone.js       # ★ Market corner (front-left) — first pass
│   │       │   ├── farmZone.js         # ★ Farm/storage zone (back-right) — first pass
│   │       │   ├── propsBuilder.js     # (helper stub)
│   │       │   ├── streetLamps.js      # (DISABLED in villageBuilder.js)
│   │       │   ├── decorItems.js       # (DISABLED in villageBuilder.js)
│   │       │   ├── signs.js            # (DISABLED in villageBuilder.js)
│   │       │   ├── fences.js           # (future use)
│   │       │   └── furniture.js        # (future use)
│   │       │
│   │       ├── nature/
│   │       │   ├── streetTrees.js      # ★ 26 trees: yard, estate edge, groves, background, approach
│   │       │   ├── outerRocks.js       # ★ 28 boulders/rock clusters at outer village edges
│   │       │   ├── gardenPlants.js     # (DISABLED in villageBuilder.js)
│   │       │   ├── mountain.js         # (DISABLED — procedural cone mountain, for future)
│   │       │   ├── mountainBuilder.js  # (future use)
│   │       │   ├── forest.js           # (future use)
│   │       │   ├── forestBuilder.js    # (future use)
│   │       │   ├── river.js            # (future use)
│   │       │   ├── riverBuilder.js     # (future use)
│   │       │   └── gardenPlants.js     # (DISABLED — gardenPlants stub)
│   │       │
│   │       ├── lighting/
│   │       │   └── villageLighting.js  # (older helper — environment.js is canonical)
│   │       │
│   │       ├── player/
│   │       │   ├── playerController.js # ★ Player movement, animation, gravity, jump
│   │       │   └── cameraController.js # ★ Third-person orbit camera (mouse look)
│   │       │
│   │       ├── systems/
│   │       │   ├── playerController.js # (duplicate path — player/ is canonical)
│   │       │   ├── cameraController.js # (duplicate path — player/ is canonical)
│   │       │   ├── villageAssets.js    # (older asset helper)
│   │       │   └── waterSystem.js      # (future use)
│   │       │
│   │       └── utils/
│   │           ├── assetLoader.js      # ★ ASSETS catalogue + placeAsset() + loadModel()
│   │           └── materials.js        # Material helpers
│   │
│   └── assets/
│       └── models/
│           └── myhouse.glb             # (local test model, not used in scene)
│
└── public/
    └── assets/
        ├── characters/
        │   ├── kaykit-adventurers/
        │   │   └── Knight.glb          # ★ Player character model
        │   └── background-humans/      # FBX humanoid animations (not yet used)
        │       ├── female/             # Female NPC animations
        │       └── male/               # Male NPC animations
        │
        ├── hdri/                       # EXR sky/lighting files
        │   ├── village_sky2.exr        # ★ ACTIVE — bright blue sky
        │   ├── village_golden.exr      # Warm golden-hour (ready to swap)
        │   ├── village_soft.exr        # Softer warm day
        │   ├── sunrise.exr             # Cool sunrise
        │   ├── forest_autumn.exr       # For future forest zone
        │   ├── forest_golden.exr       # For future forest zone
        │   ├── forest_mossy.exr        # For future forest zone
        │   ├── forest_reserve.exr      # For future forest zone
        │   ├── mountain_path.exr       # For future mountain zone
        │   ├── mountain_sunset.exr     # For future mountain zone
        │   ├── space_sunset.exr        # For Mars/space scene
        │   ├── wildflower.exr          # Alternate village mood
        │   └── village_main.exr        # Alternate village mood
        │
        ├── models/
        │   ├── houses/                 # house_01.glb … house_16.glb
        │   ├── farmbuilding/           # farmbuilding_01.glb … _08.glb
        │   ├── farmstractures/         # farmstractures_01.glb … _28.glb
        │   ├── Fence/                  # fence.glb, gate.glb, gatepost.glb, post.glb
        │   ├── bridge/                 # bridge_01.glb … _08.glb
        │   ├── trees/                  # tree_01.glb … _10.glb
        │   ├── rocks/                  # rocks_01.glb … _06.glb
        │   ├── green/                  # green_01.glb … _16.glb (tropical fruits/plants)
        │   ├── props/                  # props_01/12/28/44/70/72/91/92.glb
        │   ├── barrel/                 # barrel_a001.glb, barrel_b001.glb
        │   ├── bench/                  # bench_a/b/c/d001.glb
        │   ├── bonfire/                # bonfire_a001.glb
        │   ├── brick/                  # brick_a001.glb
        │   ├── bucket/                 # bucket_a001.glb
        │   ├── animals/                # horse.glb
        │   ├── lawnmover/              # lawn mower_a001.glb
        │   ├── milktank/               # milktank_a001.glb
        │   ├── car/                    # car models (Car.js controller, separate)
        │   ├── streetlight and sign/   # streetlight_a001–006.glb, streetsign_a001–004.glb
        │   ├── polypizza/              # PP_bridge, PP_market_stand, PP_wagon, etc.
        │   ├── kenney-fantasy-town/    # kft_ prefix: carts, hedges, fences, fountain, lantern
        │   ├── kenney-nature/          # kn_ prefix: trees, bushes, flowers, pots, CLIFF pieces
        │   │                           # ★ CLIFF GLBs live here — NOT yet implemented!
        │   ├── polyhaven/              # ph_ prefix: 4k trees, rocks, furniture (GLTF)
        │   ├── forest/                 # forest pack: Oak, Maple, Birch, Cherry, boulders, etc.
        │   ├── medieval-village/       # Not currently catalogued/used
        │   ├── fantasy-props/          # Not currently catalogued/used
        │   ├── kaykit-dungeon/         # Not currently catalogued/used
        │   └── Dont Use/               # Broken path folders (crate, chair) — NEVER reference
        │
        └── textures/
            ├── roads/
            │   ├── cobblestone-02/     # ★ ACTIVE road texture (diff+nor+rough 2K JPG)
            │   ├── cobblestone-01/03/04/05/06/  # Alternate cobbles (not active)
            │   ├── cobblestone/        # Generic
            │   ├── cobblestone-large/  # Large format
            │   ├── mossy-cobblestone/  # Mossy variant
            │   ├── herringbone/        # Herringbone paving
            │   ├── paving-046/047/049/051/141/  # Smooth paving variants
            │   ├── square_cobble/      # Square cobble
            │   ├── stone_path/         # Natural stone path
            │   └── asphalt/            # Asphalt (not used)
            │
            ├── terrain/
            │   ├── grass-path-2/       # ★ ACTIVE — worn dirt path (back street + worn discs)
            │   ├── gravel_sand/        # ★ ACTIVE — gravel base + road shoulders
            │   ├── brown-mud/          # ★ ACTIVE — mud accent patches
            │   ├── grass-001/004/      # Green grass variants (unused — lawn is solid colour)
            │   ├── grass-path-3/       # Alternate worn path
            │   ├── aerial-grass-rock/  # Mixed grass-rock (unused)
            │   ├── dry-ground/         # Dry terrain (unused)
            │   ├── forest-ground/      # Forest floor (for future forest zone)
            │   ├── gravel_stones/      # Gravel stones
            │   ├── ground-025/037/     # Generic ground variants
            │   ├── laterite/           # Laterite (unused)
            │   ├── pebbles/            # Pebble ground
            │   ├── red_terrain/        # Red terrain (Mars?)
            │   ├── river-rocks/        # For future river zone
            │   ├── riverbed/           # For future river zone
            │   ├── rocky/              # Rocky surface
            │   ├── rocky-trail/        # Rocky trail
            │   └── rock-023/026/030/051/063/064/rock-face/  # Rock face textures
            │
            ├── architecture/           # 20+ building surface textures (not yet applied to GLBs)
            │   ├── brick-wall-01/05/   # Brick walls
            │   ├── bricks-021/094/102/ # Brick variants
            │   ├── plaster-007/        # Plaster
            │   ├── plaster-brick/      # Brick plaster
            │   ├── plaster-stone-wall/ # Stone plaster
            │   ├── blue/red/yellow/worn/red-plaster/ # Coloured plasters
            │   ├── ceramic/clay-roof-02/03/red-slate-roof/  # Roof tiles
            │   ├── roof-tiles/roof_tiles/ # Roof tile variants
            │   ├── rock-wall-05/06/07/08/ # Rock wall surfaces
            │   ├── stone_wall/         # Stone wall
            │   ├── terracotta/         # Terracotta
            │   ├── tiles-074/          # Floor tiles
            │   └── wood-planks/wood-planks-grey/ # Wood planks
            │
            └── forest/                 # Tree/nature textures (for forest pack models)
                ├── leaves/             # Leaf texture
                ├── leaves-02/          # Leaf variant
                └── mossy_rock/         # Mossy rock surface
```

---

## 4. Important Files and What They Control

### ★ Critical Active Files

| File | Controls |
|---|---|
| `src/main.js` | App entry point. Sets up scene, camera, renderer, clock. Boots Mars scene first. On portal trigger → loads village. Animation loop runs here. |
| `src/world/village/villageBuilder.js` | Master assembler. `addVillageWorld(ctx)` builds everything in order. Calls every subsystem. Read this to understand what's active/disabled. |
| `src/world/village/terrain/terrain.js` | All ground layers (green lawn, gravel base, worn dirt, gravel shoulders, mud patches). `ctx.groundMesh` is set here — **player gravity uses this**. |
| `src/world/village/roads/roads.js` | Cobblestone road system. Exports `WORLD` constants (spawn, hero, bridge positions). Three road segments: approach, ring, north continuation. Uses CatmullRom ribbon meshes. |
| `src/world/village/roads/backStreet.js` | Dirt outer path at R≈68–75 from hero. Connects market → park → farm → school. Uses same ribbon mesh pattern as roads.js. |
| `src/world/village/structures/heroHouse.js` | Hero house (house_11). Circular wooden fence (R=26). Front stepping-stone path. "MY JOURNEY" sign. Garden flowers, bushes, trees. Gate lanterns. Interior glow light. |
| `src/world/village/structures/streetHouses.js` | 8 ring houses placed at R=53–60 around hero. Front gap (127°–233°) left open for player approach. Lawn belt dressing. |
| `src/world/village/structures/entrance.js` | "RAGHAV'S WORLD" welcome sign at z=+14. Canvas-rendered wooden sign. |
| `src/world/village/props/villageProps.js` | 12 streetlights (approach + loop ring), 2 directional signs, 4 benches, 4 barrel+bucket clusters. All Step-1 village detail. |
| `src/world/village/props/marketZone.js` | Market corner at (−32, −13). Stand, benches, barrels, produce, wagon, sign. First pass complete. |
| `src/world/village/props/farmZone.js` | Farm/storage zone at (82, −86). Barn, silo, barrels, milktank, horse. First pass complete. |
| `src/world/village/nature/streetTrees.js` | 26 trees placed in 5 zones: yard accents, estate edge, side-house groves, background clusters, approach framing. |
| `src/world/village/nature/outerRocks.js` | 28 boulder/rock clusters at outer village edges — back-left, back-right, deep background, mid flanks, small rocks behind houses. |
| `src/world/village/environment/environment.js` | HDRI sky loader (EXR), fog, ambient light, directional sun. Swap `HDRI_PATH` to change sky. |
| `src/world/village/player/playerController.js` | Player load (Knight.glb), scale, spawn position. WASD movement, Shift to sprint, Space to jump. Camera-relative movement. Animation crossfade (idle/walk/run). Gravity raycaster. |
| `src/world/village/player/cameraController.js` | Third-person orbit camera. Mouse look via pointer lock. LERP smoothing. Constants: `DISTANCE`, `LOOK_H`, `PITCH_MIN/MAX`. |
| `src/world/village/utils/assetLoader.js` | Central ASSETS catalogue (all asset keys → GLB paths). `placeAsset(ctx, key, x, y, z, scale, rotY)`. `loadModel()` with caching. |

### Currently Disabled Files (Commented in villageBuilder.js)

| File | Status |
|---|---|
| `nature/gardenPlants.js` | Disabled — needs review/replacement |
| `nature/mountain.js` | Disabled — procedural mountain cone, planned for future |
| `props/streetLamps.js` | Disabled — duplicate of villageProps.js functionality |
| `props/decorItems.js` | Disabled — future detail pass |
| `props/signs.js` | Disabled — future directional signs |

---

## 5. World Coordinate System

```
     −Z (North / deep into world)
          |
          |  Bridge (2, −130)
          |  Background forest z=−112…−136
          |  Hero house (0, −48)
 −X ──────┼────── +X
 (West)   |            (East)
          |  Spawn (0, +10)
          |
     +Z (South / toward player)
```

Key positions:
- Player spawn: `(0, 0, +10)` — always faces −Z into the village
- Hero house: `(0, 0, −48)` — dominant centre
- Hero fence: radius=26 around hero
- Ring road: inner R=28, outer R=42 around hero
- Side houses: R=53–60 from hero
- Back street: R≈68–80 outer loop
- Bridge: `(2, 0, −130)`
- Outer rocks: up to R=125+

---

## 6. Assets Currently Active in Scene

### Houses
| Asset Key | Role |
|---|---|
| `house_11` | Hero house — largest, at (0, −48), scale 1.55 |
| `house_07` | Ring house — back-right (a=50°, R=54) |
| `house_12` | Ring house — right (a=75°, R=60) |
| `house_15` | Ring house — front-right (a=102°, R=58) |
| `house_10` | Ring house — near-front-right (a=127°, R=53) |
| `house_16` | Ring house — near-front-left (a=233°, R=53) |
| `house_03` | Ring house — front-left (a=258°, R=58) |
| `house_01` | Ring house — left (a=285°, R=60) |
| `house_06` | Ring house — back-left (a=310°, R=54) |

### Farm Zone
| Asset Key | Role |
|---|---|
| `farmbuilding_02` | Main barn at (82, 0, −86) |
| `farmstructure_23` | Silo at (68, 0, −80) |
| `barrel_a` | Storage drums (×2 in farm yard) |
| `milktank_a` | Milk tank |
| `horse` | Grazing horse |

### Market Zone
| Asset Key | Role |
|---|---|
| `pp_market_stand` | Market stand centrepiece |
| `bench_b` | Seating (×3) |
| `barrel_b` | Goods barrels (×2) |
| `bucket_a` | Bucket |
| `green_05/06/07/09/11` | Produce display (watermelon, pumpkin, melon, peach, apple) |
| `pp_wagon` | Parked food wagon |
| `props_70` | Small market marker sign |
| `streetsign_04` | Directional "→ Market" sign |

### Village Props (Step 1)
| Asset Key | Role |
|---|---|
| `streetlight_01` | Approach road lamp posts (×6, paired, x=±9) |
| `streetlight_04` | Loop ring lamp posts (×6, at R=45, 60° apart) |
| `streetsign_04` | Directional signs (×2, at approach/north junctions) |
| `bench_b` | Entrance benches (×2, at z=+17) |
| `bench_a` | Lawn belt viewpoint benches (×2, at x=±44) |
| `barrel_b` | Storage beside side houses (×4 spots) |
| `bucket_a` | Storage beside side houses (×4 spots) |

### Hero House Detail
| Asset Key | Role |
|---|---|
| `kn_flower_red/yellow/purple` | Garden flowers + path lining |
| `kn_plant_bush` | Garden bushes + fence bushes |
| `kn_plant_bush_small` | Small bushes |
| `apple`, `cherry` | Small yard trees (×2) |
| `kft_lantern` | Gate path lanterns (×2) |

### Trees (26 total)
**Species used:** `plum`, `cherry`, `apple`, `oak`, `maple`, `birch_1`, `birch_3`, `noble_fir`, `fir`, `pine`

**Zones:**
- Yard accents: plum + cherry at back corners of hero fence
- Estate edge: cherry, apple, maple flanking the circular road
- Side-house groves: oak, maple, birch between and behind houses
- Background clusters: noble_fir, fir, pine — 3 sparse groups at z=−112…−136
- Approach framing: oak, maple, birch flanking the main road

### Rocks (28 boulders)
**Assets:** `boulder_outcrop`, `boulder_mossy_lg`, `boulder_plain_lg`, `rocks_01…06`

**Zones:** back-left cluster, back-right cluster, deep background centre, mid-left edge, mid-right edge, behind houses, front-side framing

### Textures
| Texture | Used In |
|---|---|
| `cobblestone-02` | All cobblestone roads (approach, ring, north) |
| `grass-path-2` | Back street + worn ground terrain discs |
| `gravel_sand` | Gravel base layer + road shoulder annulus |
| `brown-mud` | Mud patch discs in high-traffic areas |

### HDRI
| HDRI | Status |
|---|---|
| `village_sky2.exr` | ★ Active — bright blue sky |
| `village_golden.exr` | Ready to swap for golden-hour mood |
| All others | Staged for future zones |

---

## 7. Assets Added to Disk But NOT Yet Implemented

### Cliff/Mountain Assets — Status After Analysis Session (2026-05-23)

> **`public/assets/models/Cliffs/` is EMPTY.** The directory was created but no files were placed inside it. Use the assets described below instead — they are the correct source material.

#### ✅ REGISTERED in `assetLoader.js` — Not Yet Placed in Scene

The following two families were catalogued in `assetLoader.js` during the 2026-05-23 session. They are **ready to use via `placeAsset()`** but have not been placed in the scene yet. The file `src/world/village/environment/cliffBackdrop.js` still needs to be created.

**Family 1 — Kenney Nature Cliff System** (`kenney-nature/`, GLB, 4–12 KB each)
Modular terrain tile system. Warm brown (`_rock` variant). Use as foreground cliff faces and base detail.

| Asset Key | File | Role |
|---|---|---|
| `kn_cliff_block` | `cliff_block_rock.glb` | Main cliff face block |
| `kn_cliff_large` | `cliff_large_rock.glb` | Wide cliff section |
| `kn_cliff_top` | `cliff_top_rock.glb` | Top cap with grass |
| `kn_cliff_half` | `cliff_half_rock.glb` | Half-width section |
| `kn_cliff_diagonal` | `cliff_diagonal_rock.glb` | Angled cliff edge |
| `kn_cliff_corner` | `cliff_corner_rock.glb` | Corner join |
| `kn_cliff_corner_top` | `cliff_cornerTop_rock.glb` | Corner cap with grass |
| `kn_cliff_slope` | `cliff_blockSlope_rock.glb` | Sloped cliff block |
| `kn_rock_large_a` – `kn_rock_large_f` | `rock_largeA-F.glb` | 6 large boulders |
| `kn_rock_tall_a` – `kn_rock_tall_d` | `rock_tallA-D.glb` | 4 tall rock formations |

**Family 2 — KayKit Hexagon Mountains** (`kaykit-hexagon/decoration/nature/`, GLTF+BIN, 8–44 KB each)
Proper mountain peak shapes. Stylized low-poly, single mesh, one shared atlas texture (`hexagons_medieval.png` in same folder — resolves automatically via GLTFLoader).

| Asset Key | File | Role |
|---|---|---|
| `kk_mountain_a` | `mountain_A.gltf` | Mountain peak A (bare) |
| `kk_mountain_b` | `mountain_B.gltf` | Mountain peak B (bare) |
| `kk_mountain_c` | `mountain_C.gltf` | Mountain peak C (bare, largest) |
| `kk_mountain_a_trees` | `mountain_A_grass_trees.gltf` | Peak A with grass + trees (warmest) |
| `kk_mountain_b_grass` | `mountain_B_grass.gltf` | Peak B with grass |
| `kk_mountain_c_trees` | `mountain_C_grass_trees.gltf` | Peak C with grass + trees (best backdrop) |
| `kk_hill_a` | `hill_single_A.gltf` | Gentle hill A |
| `kk_hill_b` | `hill_single_B.gltf` | Gentle hill B |
| `kk_hill_c` | `hill_single_C.gltf` | Gentle hill C |
| `kk_rock_a` – `kk_rock_c` | `rock_single_A-C.gltf` | 3 standalone rock shapes |

#### Other Un-registered Kenney Cliff Pieces (on disk, not yet catalogued)
These remain available in `kenney-nature/` for future use if more cliff variety is needed:
- All `cliff_*_stone.glb` variants (cool grey tone — good for contrast detail)
- `cliff_cave_rock.glb`, `cliff_blockCave_rock.glb` (cave entrances — future story zone use)
- `cliff_waterfall_rock.glb`, `cliff_waterfallTop_rock.glb` (future river zone)
- `cliff_steps_rock.glb`, `cliff_stepsCorner_rock.glb` (future mountain path climbing)

### Other Staged-but-Unused Asset Categories
- `kenney-nature/` — additional fence, hedge, tree, pot models (some already registered)
- `kenney-fantasy-town/` — watermill, fountain, cart, hedge pieces (some registered, not all placed)
- `polyhaven/` — 4K trees, rocks, furniture GLTF models (all registered in ASSETS, few placed)
- `medieval-village/`, `medieval-village-e/` — not catalogued, not used
- `fantasy-props/` — not catalogued, not used
- `food/`, `crops/`, `foodish/`, `kenney-food/` — food models (not catalogued)
- `background-humans/` FBX animations — not yet used (future NPC system)
- `architecture/` textures — 20+ building texture sets (not yet applied to any house GLBs)

---

## 8. Current Village Zones

Open `VILLAGE_MAP.html` in a browser for the visual top-down map.

| Zone | Name | Status | Centre | Notes |
|---|---|---|---|---|
| A | Hero Estate | ✅ Built | (0, −48) | Hero house, fence R=26, garden, gate, sign, lights |
| B | Front Arrival | ✅ Built | (0, +10) | Spawn, welcome arch/sign, 6 approach lamps, 2 benches, approach framing trees |
| C | Main Circular Street | ✅ Built | ring R=28–42 | Cobblestone loop, 6 loop streetlamps |
| D | Back Street | ✅ Built | R≈68–80 outer | Dirt path: market exit → park → north → farm → school |
| E | Market Zone | ✅ First pass | (−32, −13) | Stand, benches, produce, wagon, sign — expand possible |
| F | Park Zone | 🔲 Planned | (−78, −86) | Fenced park, wishing well, benches, trees, shrubs |
| G | Farm Zone | ✅ First pass | (82, −86) | Barn, silo, barrels, milktank, horse — expand possible |
| H | School / Community | 🔲 Planned | (30, −15) | Placeholder building, sign, benches |
| I | Outer Rocky / Nature | ✅ First pass | R>90 | 28 rocks + 9 bg trees per cluster, village framing |
| J | Future: Forest / Mountain | 🗺️ Plan only | z < −140 | Beyond the bridge — skills forest + career mountain |

### Movement Flow (Intended Player Path)
```
Spawn → Arch → Approach Road → Loop Road → Hero Estate
Loop Road → Market (Zone E, front-left)
Market → Back Street → Park → North Road (junction at 0,−100) → Farm → School → back to Loop
North Road → Bridge → [Future] Forest → Mountain
```

---

## 9. Current Design Rules

These rules must be preserved in all future build work:

1. **Front stays open.** The corridor from spawn to the hero house (roughly x=±20, z=+30 to −22) must never be blocked. This is reserved for the future river/bridge/forest route.
2. **Hero house must always be clearly visible from spawn.** No tall structures, walls, or dense trees in the sightline.
3. **No random asset placement.** Every prop placement must have a reason (functional, compositional, or storytelling).
4. **Cliffs, mountains, and dense nature only on left, right, and back.** Never in front.
5. **Road layers must respect renderOrder.** Terrain layers are negative RO; cobblestone road is RO=0; back street is RO=−3. Never swap these.
6. **Player gravity raycaster targets `ctx.groundMesh` only.** Do not delete or reposition the base green plane.
7. **No new props inside the hero fence (R<26)** unless adding intentional garden features.
8. **New zones (park, school, cliff wall) must be positioned per the VILLAGE_MAP.html blueprint.** Do not freelance placement.
9. **Warm, cinematic, stylized, breathable.** Avoid clutter, harsh intersections, mechanical layouts.
10. **Keep `assetLoader.js` as the single truth for asset paths.** Add new assets there before placing them.

---

## 10. What Must NOT Be Changed

These are load-bearing elements. Modifying them without full analysis can break the scene.

| Element | File | Why protected |
|---|---|---|
| Player spawn position `(0, 0, +10)` | `playerController.js` | Starting point for all scene calibration |
| `ctx.groundMesh` (base green plane, 900×900) | `terrain.js` | Gravity raycaster depends on this mesh |
| `WORLD.HERO = (0, 0, −48)` | `roads.js` (exported) | Imported by heroHouse, streetHouses, villageProps, terrain |
| Ring road radii `RING_INNER=28`, `RING_OUTER=42` | `roads.js` | Hero fence, shoulder annulus, side-house placement all derive from these |
| Hero fence radius `FENCE_R=26` | `heroHouse.js` | Garden, bushes, trees, gate pillars, lights all positioned relative to this |
| All ring house positions | `streetHouses.js` | Lawn belt dressing and tree groves are positioned relative to houses |
| Road texture `cobblestone-02` | `roads.js` | UV scale tuned for this specific texture |
| Back street waypoints | `backStreet.js` | Tuned to avoid all houses, rocks, and roads |
| Camera constants | `cameraController.js` | Changing `PITCH_START` without updating `playerController.js` desynchronises camera |
| Player animation clip names | `playerController.js` | Clip search uses `.includes()` on animation names — Knight.glb specific |
| HDRI path `village_sky2.exr` | `environment.js` | Safe to swap to another `.exr` in the same folder; don't rename or move |

---

## 11. Pending Tasks

### Priority Order (from VILLAGE_MAP.html build order)

| # | Task | Status | Key File(s) |
|---|---|---|---|
| 1 | Verify / finalise back street path | 🔲 Check visually | `roads/backStreet.js` |
| 2 | Market polish — wagon, produce pass | ✅ Done in props/marketZone.js | — |
| 3 | Park zone (Zone F) | 🔲 Not started | new `structures/parkZone.js` |
| 4 | Farm expansion — field, crops, fence | 🔲 Not started | extend `props/farmZone.js` |
| 5 | School / community placeholder (Zone H) | 🔲 Not started | new `structures/schoolZone.js` |
| 6 | Outer terrain & nature detailing | 🔲 Not started | `nature/`, terrain layer additions |
| 7 | Cliff/mountain boundary walls (left/right/back) | 🟡 IN PROGRESS — assets registered, file not yet created | new `environment/cliffBackdrop.js` |
| 8 | Detailing pass (per-house props) | 🔲 Not started | `props/` |
| 9 | Performance / draw-call optimisation | 🔲 Not started | instancing, LOD |

### Additional Known Items
- ~~Register cliff models in `assetLoader.js`~~ ✅ DONE (2026-05-23) — kn_cliff_*, kn_rock_large_*, kk_mountain_*, kk_hill_* all registered. Commit this change before next session.
- Fix broken `crate_a/b/c/d` and `chair_a/b` paths (they point to `Dont Use/` folder)
- `green_01–16` are labelled "Green/Bushes" but are actually **tropical fruits** — do not use as garden shrubs
- `props_91`, `props_92` (wishing wells) are in the folder but not yet registered in ASSETS

---

## 12. Next Recommended Build Order

When ready to build, follow this sequence to avoid conflicts:

```
0. IMMEDIATE — Commit assetLoader.js (already edited, not yet committed):
   git add src/world/village/utils/assetLoader.js
   git commit -m "Register cliff and mountain asset keys in ASSETS catalogue"

1. CLIFF BACKDROP (back + sides) — NEXT TASK, all prep work done:
   - Create: src/world/village/environment/cliffBackdrop.js
   - Export: createCliffBackdrop(ctx)
   - Use placeAsset() with the kk_mountain_* and kn_cliff_* keys already registered
   - Left wall: x = −140 to −160, z = −18 to −175 (hills → mountains, larger toward back)
   - Right wall: mirror of left
   - Back mountains: z = −188 to −245 (5–7 mountain models, scale 13–20)
   - Rock scatter: kn_rock_large_a-d at cliff bases, scale 2.4–2.8
   - NO placements at z > −15 (front stays clear)
   - Wire into villageBuilder.js: import + call after createOuterRocks(ctx)
   - See PROJECT_PROGRESS.md for exact coordinates of every placement
   - Test at localhost:5173/#village, adjust scale/position in browser

2. PARK ZONE (Zone F, back-left):
   - Create: src/world/village/structures/parkZone.js
   - Position centred (−78, −86)
   - Add fence perimeter (Fence/ GLBs), wishing well (props_91), benches, trees, shrubs
   - Register props_91 in assetLoader.js first
   - Add import + call in villageBuilder.js

3. SCHOOL PLACEHOLDER (Zone H, front-right):
   - Create: src/world/village/structures/schoolZone.js
   - Position centred (30, −15)
   - One placeholder building + sign + 2 benches
   - Keep it simple — it will expand in future narrative pass

4. FARM EXPANSION (Zone G):
   - Extend: src/world/village/props/farmZone.js
   - Add: crop rows (kn_ nature props or kenney-food items)
   - Add: field fence on the perimeter

5. NATURE DETAILING:
   - Add more shrubs and flowers to lawn belt (between loop road and ring houses)
   - Add ground-level kenney-nature plants near the park and market

6. DETAILING PASS:
   - Per-house detail (crates, flowers at doors, garden items)
   - Enable/implement any disabled props files

7. OPTIMISATION:
   - Merge static geometries where possible
   - Consider InstancedMesh for repeated rocks and tree types
```

---

## 13. Git Safety Notes

| Item | Detail |
|---|---|
| Current branch | `main` |
| Git tag | `safe-before-antigravity` — a known stable state |
| GitHub backup | Exists — push before any major structural changes |
| Before major edits | Run `git status`, `git add .`, `git commit -m "Save stable state before X"` |
| Build output | `/dist/` — in `.gitignore`, not tracked |
| Safe test approach | Use `#village` URL hash to load directly into village: `http://localhost:5173/#village` |

### Before Editing Any File

```bash
# 1. Check status
git status

# 2. Commit current state if clean
git add .
git commit -m "Save state before [describe change]"

# 3. Make your edit

# 4. Verify visually in browser at localhost:5173/#village

# 5. Commit the working change
git add .
git commit -m "Add [describe what was built]"
```

---

## 14. Quick Reference: Key Constants

These are the values to tweak for layout adjustments:

| Constant | File | Current Value | Controls |
|---|---|---|---|
| `WORLD.HERO` | `roads.js` | `(0, 0, −48)` | Centre of the entire village layout |
| `WORLD.SPAWN` | `roads.js` | `(0, 0, +10)` | Player starting position |
| `WORLD.BRIDGE` | `roads.js` | `(2, 0, −130)` | North road endpoint |
| `RING_INNER` | `roads.js` | `28` | Inner edge of ring road |
| `RING_OUTER` | `roads.js` | `42` | Outer edge of ring road |
| `APPROACH_W` | `roads.js` | `14` | Width of main approach road |
| `FENCE_R` | `heroHouse.js` | `26` | Hero property fence radius |
| `HOUSE_S` | `heroHouse.js` | `1.55` | Hero house scale |
| `S` | `streetHouses.js` | `1.25` | Base ring house scale |
| `BACK_WIDTH` | `backStreet.js` | `4` | Back street path width |
| `DISTANCE` | `cameraController.js` | `5.5` | Camera orbital distance |
| `HDRI_PATH` | `environment.js` | `village_sky2.exr` | Current sky |
| `FOG_DENSITY` | `environment.js` | `0.00010` | Fog thickness |

---

*End of PROJECT_FULL_CONTEXT.md*
