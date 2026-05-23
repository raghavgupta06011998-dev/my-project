# VILLAGE BLUEPRINT
## Cinematic Mediterranean Portfolio World — Design & Implementation Plan

---

## 1. TOP-DOWN ZONE MAP (ASCII)

```
                    ┌──────────────────────────────────────┐
                    │           THE FUTURE / MOUNTAIN       │  z = -50 to -60
                    │         [glowing gate + rising path]  │
                    └─────────────┬────────────────────────┘
                                  │ path
          ┌───────────────────────┼────────────────────────┐
          │   SKILLS FOREST       │    SKILLS FOREST        │  z = -30 to -45
          │   x = +15 to +35      │    (mirrored)           │
          └──────────┬────────────┼───────────┬─────────────┘
                     │            │           │
    ┌────────────────┼────────────┼───────────┼───────────────┐
    │ EXPERIENCES    │            │           │  SKILLS ZONE  │  z = -15 to -30
    │ x = -12 to -20 │            │           │  x = +12 to  │
    │ [shop fronts,  │            │           │  +20          │
    │  signs, carts] │   MAIN     │   PATH    │  [skill signs,│
    └────────────────┤   COBBLE   ├───────────┤   markers]    │
                     │   ROAD     │           │               │
                     │   x = -5   │   to +5   │               │
    ┌────────────────┼────────────┼───────────┼───────────────┐
    │                │  PROJECTS  │           │               │  z = -6 to -10
    │                │  PORTAL    │           │               │
    │                │  x = +12   │           │               │
    └────────────────┤────────────┴───────────┤───────────────┘
                     │                        │
                     │    HERO HOME ZONE       │  z = -10 to -14
                     │    x = -8 to +8         │
                     │    [house, garden,       │
                     │     lamps, fence]        │
                     └────────────┬────────────┘
                                  │ path
                     ┌────────────┴────────────┐
                     │     ENTRANCE GATE        │  z = +2 to +6
                     │  [arch, sign, gateposts] │
                     └────────────┬────────────┘
                                  │
                     ┌────────────┴────────────┐
                     │     PLAYER SPAWN         │  z = +8 to +12
                     │     camera looks -Z      │
                     └─────────────────────────┘
```

**Coordinate system: +X = right, -Z = forward/north, +Y = up**

---

## 2. ZONE LAYOUT

### Zone 0 — Player Spawn (z = +8 to +12)
- Player spawns here, camera looks toward -Z (into the village)
- No props — open, uncluttered, lets the player see the entrance clearly
- The gate arch is the first visible landmark

### Zone 1 — Entrance Gate (z = +2 to +6)
- **Asset:** `gate_a` or `props_91` (well substituted if no gate) + 2 gateposts
- **Sign board:** "RAGHAV'S WORLD" — canvas painted, warm wood grain, gold lettering, dual-pole mount
- **Trees:** tree_01 pair flanking the gate (x = ±18)
- **Purpose:** Cinematic welcome moment, clear invitation to walk forward

### Zone 2 — Hero Home (z = -10 to -14, x = -8 to +8)
- The personal identity zone — the most important area
- **House:** to be added with a lightweight GLB when available
- **Garden fence:** 4-sided rectangle (fence_a, 20KB each post)
- **Garden plants:** green_03 / green_05 at 4 corners
- **Front path:** narrow stone path from gate entrance to house door
- **Lamp pair:** 1 lamp left, 1 lamp right of front door
- **Sign:** "HOME" sign on left gatepost
- **Light:** warm PointLight (0xff8833, radius 12) at house height

### Zone 3 — Projects Portal (z = -6 to -10, x = +10 to +14)
- Right-front, slightly off-path — player sees it while walking
- **Asset:** `pp_castle_gate` (KayKit Castle Gate, 130KB)
- **Sign:** "PROJECTS →" pointing toward gate
- **Light:** blue-purple PointLight accent (0x8844ff, radius 10) — portal glow
- **Purpose:** The gateway into project worlds, visually distinct with cool light

### Zone 4 — Experiences Street (z = -15 to -30, x = -12 to -22)
- Left side of the main road — shops, carts, boards representing work history
- **Props per "stop":** 1 sign board (company/role) + 1 barrel or cart
- 2–3 experience stops spaced 5–7 units apart
- **Trees:** tree_07 pair at z = -22 (flanking the experience zone)
- **Sign example:** "SAMSUNG — Summer 2023" on a tall wooden post board
- **Light:** warm lantern glow per stop (lamp_a, small PointLight radius 8)

### Zone 5 — Skills Zone (z = -15 to -30, x = +12 to +22)
- Right side of the main road — mirrored from Experiences
- Skill markers: glowing stones, signs on posts, small shrines
- **Props:** rocks_01 / rocks_04 as anchor, green plants as accent
- **Trees:** tree_03 pair at z = -22
- **Sign examples:** "REACT", "THREE.JS", "PYTHON" on individual stone markers
- **Light:** cool blue-white PointLight per marker (radius 6)

### Zone 6 — Skills Forest (z = -30 to -45, x = ±15 to ±35)
- Dense tree grove on both sides — forest corridor feeling
- **Trees:** tree_01 through tree_10 variety (max 10 instances total across both sides)
- Staggered X/Z placement — not grid-aligned
- **Ground:** forest-ground texture blend begins here
- Rocks and green plants scattered underneath
- **Purpose:** Transition zone between village and mountain path

### Zone 7 — Future Mountain Path (z = -45 to -60)
- The road narrows and rises slightly (Y offset or visual illusion via scaling)
- **Asset:** large rocks flanking sides (rocks_03, rocks_06)
- **Sign:** "THE FUTURE →" on a tall post
- **Light:** golden sunrise PointLight (0xffdd88) pointing upward
- **Gate:** single archway at z = -55 — the "next chapter" threshold
- **Purpose:** Aspirational, hopeful, open-ended

---

## 3. ROAD / PATH LAYOUT

### Problem with current road
The current road (`PlaneGeometry` from z=+14 to z=-165) renders as a **flat yellow-beige rectangle** that looks like a carpet, not a village path. It has:
- No texture tiling (or very large untiled texture)
- No natural edges or border
- No width variation

### Fix Plan

#### 3a. Main cobblestone road
- **Geometry:** `PlaneGeometry(7, 55)` — width 7 units, length 55 units (z = 0 to -55)
- **Texture:** `PavingStones006_1K-JPG_Color.jpg` (already in `/public/assets/village/textures/`)
- **Tiling:** `repeat.set(2, 16)` — tile small stones tightly
- **Rotation:** `rotateX(-Math.PI/2)` — flat on ground
- **Position:** centered on x=0, y=0.01 (slight elevation above terrain to avoid z-fighting)
- **Material:** `MeshStandardMaterial` with roughness 0.9, no metalness

#### 3b. Natural dirt-edge border
- **Geometry:** 2 thin `PlaneGeometry(2.5, 55)` strips at x = ±4.5
- **Texture:** `grass-path-2` diff texture, tiled (repeat 1, 16)
- **Purpose:** Makes road edges blend into terrain naturally, removes sharp carpet edge

#### 3c. Front entrance path (z = 0 to +8)
- **Geometry:** `PlaneGeometry(5, 8)` — slightly narrower
- **Same PavingStones006 texture**, same tiling
- Connects player spawn to entrance gate seamlessly

#### 3d. Hero home front path (x=0, z=-14 to -10)
- **Geometry:** `PlaneGeometry(2, 4)` — narrow personal path
- **Texture:** `mossy-cobblestone` diff — older, more personal feel

#### 3e. Skills forest path (z = -30 to -45)
- **Geometry:** `PlaneGeometry(5, 15)` — narrower as it approaches forest
- **Texture:** `rocky-trail` diff — dirt with stones

#### 3f. Mountain path (z = -45 to -60)
- **Geometry:** `PlaneGeometry(4, 15)` — narrowest
- **Texture:** `rocky-trail` diff with a slight Y-tilt (visual only — mesh stays flat, camera + rock props create the illusion of climbing)

---

## 4. TERRAIN TEXTURE PLAN

### Ground plane
- **Single large `PlaneGeometry(120, 120)`** centered at origin
- This is the base terrain — everything else sits on top

### Texture zones (rendered via UV approach or multiple overlapping planes)

| Zone | Z Range | Texture File | Notes |
|------|---------|-------------|-------|
| Main village | 0 to -30 | `aerial_grass_rock_diff_2k.jpg` | Warm Mediterranean dry grass |
| Side zones (experiences/skills) | ±12 to ±35, z -15 to -30 | `dry_ground_01_diff_2k.jpg` | Dry Mediterranean soil |
| Forest floor | ±15 to ±35, z -30 to -45 | `forrest_ground_01_diff_2k.jpg` | Forest ground, darker |
| Mountain approach | z -45 to -60 | `rocky_trail_diff_2k.jpg` | Rocky ground, rough |
| Far edges (OOB) | beyond ±40 | `brown-mud` or same aerial-grass | Fills in background |

### Texture settings (all terrain)
- Format: 2K JPG (not 4K — performance)
- `wrapS = wrapT = THREE.RepeatWrapping`
- `repeat.set(8, 8)` — prevents large stretchy look
- Roughness: 0.95, metalness: 0.0
- No normal maps on terrain (save GPU — distant ground)

### Ground plane implementation
```js
// Single plane, 3 overlapping zone planes instead of 1 texture shader blend
// Main ground (large, base layer)
const groundGeo  = new THREE.PlaneGeometry(120, 80)
const groundMat  = new THREE.MeshStandardMaterial({ map: aerialGrassTexture, roughness: 0.95 })
const groundMesh = new THREE.Mesh(groundGeo, groundMat)
groundMesh.rotation.x = -Math.PI / 2
groundMesh.position.set(0, 0, -20)  // centered over village area
ctx.scene.add(groundMesh)
ctx.groundMesh = groundMesh  // for player gravity raycasting

// Forest floor overlay (alpha-blended, elevated 0.005 to avoid z-fighting)
// Mountain floor overlay (z -45 to -65)
```

---

## 5. FOREST PLACEMENT PLAN

### Location
Both sides of the road between z=-28 and z=-45, x=±13 to ±32

### Tree count budget: **10 instances max** (performance rule)
- Left side: 5 trees (x = -14, -19, -24, -20, -28 at staggered Z)
- Right side: 5 trees (x = +14, +19, +25, +22, +30 at staggered Z)

### Tree selection (all lightweight, self-contained GLBs)
| Key | File size | Use |
|-----|-----------|-----|
| tree_01 | 284KB | Forest edge, smallest |
| tree_05 | 352KB | Mid-forest, fuller canopy |
| tree_07 | 332KB | Forest corner |
| tree_08 | 292KB | Back forest |
| tree_10 | ~420KB | Tall background tree |

### Placement pattern (staggered, not grid)
```
Left:           Right:
(-14, z=-30)    (+15, z=-31)
(-21, z=-34)    (+20, z=-33)
(-15, z=-39)    (+14, z=-38)
(-27, z=-36)    (+26, z=-35)
(-20, z=-43)    (+22, z=-43)
```

### Forest floor props (under trees)
- rocks_01 / rocks_03: 1 rock per 2 trees (5 total)
- green_03 / green_05: 1 plant per 2 trees (5 total)
- No lamps in forest (darker = more atmospheric)

### Forest lighting
- No additional point lights — let ambient + hemisphere light the forest
- Slightly reduce ambient light in this zone via fog density (not possible per-zone with FogExp2 — rely on distance)

---

## 6. FUTURE BUILDING / STRUCTURE PLACEMENT PLAN

These are **planned for later phases** — not in first implementation. Document here for coordinate reservation.

### Future: Side Houses (Experience Street)
- Left house (Experiences): x = -22, z = -20, rotY = Math.PI * 0.5 (facing inward)
- Right house (Skills): x = +22, z = -20, rotY = -Math.PI * 0.5
- **Asset needed:** A GLB under 500KB with no external textures (KayKit Fantasy or similar)
- **Currently:** zone is marked by signs + props only

### Future: Village Market (Plaza)
- Location: z = -22 to -26, x = -18 to -10
- 2–3 market stalls facing the road
- **Assets available:** `pp_village_market` or `kft_cart` (if lightweight)

### Future: Hero House Model
- Location: x=0, z=-12, centred behind fence
- **Asset needed:** GLB under 800KB (house model), self-contained
- **Currently:** zone marked by fence + garden + glow only

### Future: River / Bridge Crossing
- Location: z = -27 to -30, cuts across road
- Bridge asset: `pp_bridge` (if available and lightweight)
- River: animated `PlaneGeometry` with water ShaderMaterial or simple blue plane
- Marks transition from village into forest

### Future: Mountain Model
- Location: x = -20 to +20, z = -55 to -80
- Low-poly mountain mesh or imported GLB
- Can use stacked cone geometry as placeholder

---

## 7. ASSET CATEGORIES NEEDED LATER

### Structures (not yet in scene)
| Asset | Key | File | Priority |
|-------|-----|------|----------|
| Hero house | TBD | Needs lightweight GLB <800KB | HIGH |
| Side house L | TBD | KayKit or Poly Pizza house | MEDIUM |
| Side house R | TBD | Same asset, mirrored | MEDIUM |
| Market stalls | kft_cart | KayKit cart | LOW |
| Bridge | pp_bridge | Poly Pizza bridge | LOW |

### Nature (available, not yet used)
| Asset | Key | Use |
|-------|-----|-----|
| tree_08, tree_09, tree_10 | tree_08-10 | Forest depth |
| green_01, green_02 | green_01-02 | Market decoration |
| rocks_02, rocks_07 | rocks_02-07 | Path framing |

### Props (available, not yet placed)
| Asset | Key | Use |
|-------|-----|-----|
| Lamp post | lamp_a | Experience zone lamps |
| Wagon | pp_wagon | Market zone |
| Well | props_91 | Already placed at plaza |
| Sign post | pp_arrow_sign | Skill/experience markers |

### Animations (not yet wired)
| File | Path | Use |
|------|------|-----|
| Knight idle | Knight.glb (clip 0) | Already default |
| Walk cycle | Rig_Medium_MovementBasic.glb | Needs wiring to WASD |

---

## 8. PERFORMANCE RULES

### Hard limits
| Category | Limit | Reason |
|----------|-------|--------|
| GLB instances in scene | ≤ 30 | GPU draw call budget |
| Max GLB file size (single asset) | ≤ 1.5MB | Loading time |
| Shadow map resolution | 1024×1024 | GPU memory |
| Terrain texture size | 2K JPG | Not 4K — too heavy |
| Point lights | ≤ 8 total | Fragment shader cost |
| Directional lights | ≤ 2 total | Shadow render passes |

### Banned assets (never load)
- `crate_a`, `crate_b`, `crate_c`, `crate_d` — broken paths, excluded forever
- `chair_a`, `chair_b` — excluded
- `ph_jacaranda` — 275MB texture folder
- `ph_fir_tree` — 565MB texture folder
- `ph_pine_tree` — 1GB texture folder
- `ph_fir_sapling_med` — 119MB texture folder
- Old `player.glb` — 48MB

### Recommended asset selection order
1. **Original village tree_01–10 pack** — 284–1MB, self-contained GLBs ✅
2. **Poly Pizza props** — 50–200KB each ✅
3. **KayKit packs** — 100–500KB, most self-contained ✅
4. **Poly Haven GLTF** — ONLY if 4K texture folder is under 5MB total ⚠️

### Texture loading rules
- Always use 1K or 2K variants when both exist
- Set `texture.repeat` — never leave default (1,1) on terrain
- Use `THREE.SRGBColorSpace` on color/diffuse maps
- Do NOT load HDRI until scene is working smoothly (EXR can be 5–20MB)

### Shadow rules
- Only 1 directional light casts shadows (`sun`)
- `castShadow = true` only on hero house and player mesh (not rocks, plants, barrels)
- `receiveShadow = true` on ground mesh and road only

---

## 9. FIRST IMPLEMENTATION STEPS (After Blueprint Approval)

Execute in this order — one step at a time, confirm visually between steps:

### Step 1 — Fix the road
**File:** `src/world/village/roads/roads.js`
- Replace the large PlaneGeometry carpet with:
  - Main cobblestone road: width 7, tiling PavingStones006
  - Dirt edge strips: width 2.5 on each side, grass-path-2 texture
  - Short entrance path (z=0 to +8)
- Expected result: the road looks like actual cobblestone, not a yellow carpet

### Step 2 — Fix the terrain
**File:** `src/world/village/terrain/terrain.js`
- Replace current flat ground with aerial-grass-rock textured plane
- Add tiling (repeat 8, 8)
- Confirm groundMesh is exported correctly for player gravity

### Step 3 — Adjust zone scale (coordinate system update)
**Files:** `roads.js`, `heroHouse.js`, `signs.js`, `decorItems.js`, `streetLamps.js`, `streetTrees.js`
- Update all Z constants to new compact layout:
  ```
  ENTRANCE_Z   = +4
  SIDE_HOUSE_Z = -20
  PLAZA_Z      = -22  (may merge with side house zone or remove)
  HERO_Z       = -12
  FUTURE_Z     = -50
  ```
- This tightens the scene so the player sees all zones without walking too far

### Step 4 — Reposition trees
**File:** `src/world/village/nature/streetTrees.js`
- Move trees to match new zone Z values
- Confirm tree pair at entrance (z=+4), mid (z=-15), hero approach (z=-10)

### Step 5 — Add forest
**File:** `src/world/village/nature/forest.js`
- Re-enable forest module
- Place 10 trees in staggered pattern (see Section 5)
- Add rocks and green plants underneath
- Confirm no frame rate drop

### Step 6 — Add experience + skills markers
**File:** `src/world/village/props/signs.js`
- Add experience signs on left side (z=-15 to -25)
- Add skill markers on right side (z=-15 to -25)
- Update HOME, FUTURE signs to new Z coordinates

### Step 7 — Review lighting
**File:** `src/world/village/environment/environment.js`
- Current setup is already good (golden-hour)
- Adjust PointLight positions to match new zone coordinates
- Confirm no more than 8 point lights total

### Step 8 — Camera / player start
**File:** `src/world/village/player/cameraController.js`
- Confirm player spawn at z=+10, y=0
- Confirm camera starts looking toward -Z (into the village)
- Confirm the gate arch is the first landmark visible

---

## 10. VISUAL REFERENCE CHECKLIST

When reviewing each step, check against these cinematic quality markers:

- [ ] Road looks like real cobblestone (tiled texture, not carpet)
- [ ] Ground has warm Mediterranean dry-grass texture
- [ ] Trees are placed naturally (not grid-aligned)
- [ ] No floating or sunken props
- [ ] The entrance gate is clearly visible from spawn
- [ ] The hero home zone feels warm and personal
- [ ] The Projects portal has a visually distinct glow
- [ ] The forest creates a natural corridor (not a wall of trees)
- [ ] Lights are warm in village, cool/blue near portal, golden near future gate
- [ ] No yellow/beige flat rectangles visible
- [ ] Scene loads in under 4 seconds on a mid-range laptop
- [ ] 60fps in village area (no heavy assets causing drops)

---

*Blueprint version 1.0 — written 2026-05-17*
*Do not implement until approved.*
