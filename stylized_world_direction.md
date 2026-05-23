# Stylized World Direction
## "A Handcrafted Nordic Storybook"

> Inspired by: Bruno Simon's portfolio, Ghibli village aesthetics, A Short Hike, Townscaper, Valheim's artstyle.
> Feel: Warm, playful, cinematic, storybook-quality. Looks like it was designed by one artist with a clear vision.

---

## 1. World Philosophy

This is not a website. It is a **living storybook** — a place that feels like someone actually built it with their hands.

Every object is slightly imperfect. Every path curves. Every lamp flickers. Trees are chunky and expressive, not photorealistic. Houses have personality. The player feels like they're walking through a memory, not a showroom.

The emotional promise:
> "This person built an entire world just to show you who they are."

That is the first impression. That is what makes this memorable.

---

## 2. Emotional Experience

| Zone | Emotion | Player Feeling |
|------|---------|----------------|
| Entrance gate | Curiosity + wonder | "Where am I entering?" |
| Village street | Warmth + exploration | "I want to see everything" |
| Personal house | Belonging + intimacy | "This is who they are" |
| Skills forest | Magic + discovery | "Something is hidden here" |
| Career mountain | Ambition + respect | "They've climbed far" |
| Projects | Surprise + delight | "This is genuinely impressive" |

---

## 3. Player Journey (Scene Order)

```
[ SPACE INTRO ]
       ↓
  Black hole / portal (kenney-space assets)
       ↓
[ VILLAGE ENTRANCE ]
  Gate → stone arch → welcome sign → first lamp
       ↓
[ VILLAGE STREET ]
  Herringbone road → houses left and right → lamp posts → trees
       ↓
[ WELL PLAZA ]
  Stone courtyard → stone well → benches → flowers
       ↓
[ HERO HOUSE ]
  Garden path → personal house → signboard → yard props
       ↓
[ SKILLS FOREST ]
  Dense trees → glowing skill markers → stone shrines
       ↓
[ BRIDGE CROSSING ]
  Wooden bridge over stream → transition gate
       ↓
[ CAREER MOUNTAIN PATH ]
  Stone steps → milestone signs → summit view
       ↓
[ PROJECT PORTALS ]
  Each project = glowing portal or small building
```

---

## 4. Visual Atmosphere

### Sky
- **Primary:** `village_sky2.exr` — crisp blue sky, no buildings in panorama
- **Alternative:** `village_soft.exr` for softer warm-day feel
- **Tone mapping exposure:** 1.0–1.15

### Lighting
- Ambient: warm white `0xffffff` at 0.4 intensity
- Sun: warm cream `0xfff8f0` at 2.5–3.0 intensity
- Sun position: high angle (60, 80, 40) — bright day, not golden hour
- No hemisphere light — HDRI provides enough fill
- Optional point lights near bonfires and lanterns for atmosphere

### Fog
- Type: `FogExp2`
- Color: `0xc8dff0` (cool light blue)
- Density: `0.00010` (very gentle — just adds depth at distance)

### Color Palette
- Ground: greens and warm browns
- Road: warm beige herringbone brick
- Houses: warm timber beige / deep brown cross-beams
- Trees: chunky stylized green / deep forest green
- Flowers: purple, red, yellow (kenney-nature flowers)
- Lamps: warm amber glow
- Sky: cool clean blue

---

## 5. Terrain

### Texture
- Primary: `terrain/grass-001/` — lush vibrant green
- Alternative patches: `terrain/forest-ground/` for forest zone
- Far-distance falloff: `terrain/aerial-grass-rock/`

### Shape
- Flat main village street zone (z = +14 to z = -165)
- Gentle elevation rise starting at hero house approach
- Steep hill rise after z = -200 for forest/mountain path
- Low depression hints at stream/river before bridge zone

### Ground mesh
- Keep `ctx.groundMesh` as the flat plane with grass texture
- Terrain elevation handled by separate elevated mesh pieces over distance

---

## 6. Road System

### Main Village Lane (z = +14 to z = -165)
- Texture: herringbone brick (`/assets/textures/roads/herringbone/`)
- Width: 14 units
- UV repeat: 4×46

### Well Plaza (z = -105)
- Texture: PavingStones150 formal cut stone
- Shape: circle, radius 14

### Side Clearings (z = -90)
- Same PavingStones150
- Two organic circles, radius 8, offset ±7 X

### Hero House Approach (z = -148)
- Herringbone, narrowed to 7 units wide
- Creates sense of arrival

### Forest Path (z = -200+)
- Texture: `terrain/stone_path/` or `terrain/rocky-trail/`
- Width: 4–5 units — single-person path

---

## 7. Architecture

### Street Houses (z = -8 to z = -65)
- Asset pack: `models/houses/house_01.glb` through `house_16.glb`
- Style: Germanic half-timber (dark cross-beams, warm plaster walls)
- 4 houses on each side of road — 8 total
- Placement: x = ±20–24, varied Z spacing
- Rotation: face road (toward center)
- Scale: 1.0–1.1 — do not over-scale

### Hero House (z = -165)
- Asset: `models/houses/` — pick largest variant (house_11 or house_12)
- Scale: 1.3–1.5 — it must feel bigger and more important
- Set back from road by 12+ units
- Garden clearance: 15 units front, 10 units sides

### Modular Building Option (kenney-fantasy-town)
- Use kenney-fantasy-town wall/roof pieces to build custom structures
- Assets at: `models/kenney-fantasy-town/wall.glb`, `roof.glb`, etc.
- Good for: market stalls, entrance archway, signs, fountain

### Entrance Archway
- Option A: `models/kenney-nature/cliff_blockCave_rock.glb` as natural gate
- Option B: `models/polypizza/Castle Gate.glb`
- Option C: `models/kenney-fantasy-town/wall-arch.glb` + `wall-arch-top.glb`
- Flanked by: `models/Fence/gatepost.glb` × 2

---

## 8. Village Props

### Street Lamps
- Asset: `models/streetlight and sign/streetlight_a001.glb` (or a002–a006)
- Spacing: every 15–20 units along road
- Placement: x = ±9 (road edge), same Z as houses
- Point light radius 6 units, warm amber `0xffcc88`

### Well (Plaza Center)
- Build from kenney-fantasy-town: `fountain-round.glb` or `fountain-square.glb`
- Center of plaza at (0, 0, -105)

### Market Area (optional, z ≈ -50 to -80)
- `models/kenney-fantasy-town/stall.glb`, `stall-green.glb`, `stall-red.glb`
- `models/polypizza/Market Stalls Compact.glb`
- `models/barrel/barrel_a001.glb` clusters

### Benches
- `models/bench/` (check available GLBs)
- Place near well plaza and hero house garden

### Bonfires / Campfires
- `models/bonfire/bonfire_a001.glb` — with point light
- Use sparingly: entrance, hero yard, forest path

### Signs
- `models/streetlight and sign/streetsign_a001.glb` for directional signs
- `models/polypizza/Town Sign.glb` for village entrance welcome
- `models/polypizza/Arrow Sign.glb` for navigation hints

### Fences
- `models/Fence/fence.glb` for house boundaries
- `models/kenney-nature/fence_simple.glb` for natural areas
- `models/kenney-nature/fence_gate.glb` at hero house

---

## 9. Nature

### Foliage Style
- Chunky, low-poly stylized — matches house style
- Color should pop: bright greens, warm browns, deep forest greens
- No photorealistic trees — wrong visual register

### Primary Trees (ALL kenney-nature GLBs)
| Zone | Tree Types | Notes |
|------|-----------|-------|
| Entrance flanks | `tree_oak.glb`, `tree_fat.glb` | Biggest and widest |
| Street backdrop | `tree_detailed.glb`, `tree_pineRoundA.glb`, `tree_tall.glb` | Behind houses |
| Hero area | `tree_pineTallA.glb`, `tree_oak.glb` | Taller, more dramatic |
| Forest zone | `tree_pineTallA.glb`, `tree_cone.glb`, `tree_pineRoundB.glb` | Dense cluster |

### Shrubs and Ground Cover
- `models/kenney-nature/plant_bush.glb` — house gardens
- `models/kenney-nature/plant_bushDetailed.glb` — hero yard
- `models/kenney-nature/plant_bushLarge.glb` — forest edges
- Flowers: `flower_purpleA.glb`, `flower_redA.glb`, `flower_yellowA.glb` — near houses and plaza

### Rocks
- `models/kenney-nature/rock_largeA.glb` through `rock_largeF.glb` — landscape rocks
- `models/kenney-nature/rock_tallA.glb` — taller feature rocks
- `models/rocks/rocks_01.glb` through `rocks_06.glb` — clusters

### Hedges (hero garden)
- `models/kenney-fantasy-town/hedge.glb`, `hedge-large.glb`
- `models/kenney-fantasy-town/hedge-gate.glb` at garden entrance

---

## 10. Skills Forest Design

### Zone Location
- z = -200 to z = -350
- x = -60 to +60 (wider than village)

### Layout
- Dense tree clusters with narrow winding paths
- Trees scale up as you go deeper (older = bigger)
- Individual skill markers = small stone/wood signs

### Skill Visualization
- Core skills (Python, Three.js, React): Ancient tall pines, scale 1.8–2.5
- Growing skills: Medium oak trees, scale 1.2–1.5
- Learning skills: Saplings, scale 0.6–0.9
- Each skill tree has: a small sign (`kenney-nature/sign.glb`) with the skill name

### Atmosphere
- `forest_golden.exr` HDRI swap when entering forest zone
- Fog density increase: 0.0003
- Optional: `models/bonfire/bonfire_a001.glb` at forest clearing center

---

## 11. Bridge / River Transition

### Location
- z = -310 (between forest and mountain)

### Bridge Asset Options
- `models/kenney-nature/bridge_stone.glb` — best for village/forest feel
- `models/kenney-nature/bridge_wood.glb` — more rustic
- `models/bridge/bridge_01.glb` through `bridge_08.glb` — inspect for best fit

### River Visual
- A wide `THREE.PlaneGeometry` plane at y = -1 (below terrain)
- Material: animated scroll texture or simple blue-gray color `0x5a7fa8`
- Add `cliff_waterfall_rock.glb` pieces for riverside edges

---

## 12. Career Mountain Path

### Location
- z = -400 to z = -600
- Elevation: terrain rises to y = +40 by z = -500

### Layout
- Stone steps spiraling up: `models/kenney-nature/cliff_steps_rock.glb` tiles
- Milestone signs at each company: `streetsign_a001.glb` with custom text
- Rocks flanking path: tall rock variants for drama

### HDRI
- `mountain_path.exr` or `mountain_sunset.exr` for this zone

---

## 13. Project Portals

### Concept
- Each project is a glowing portal or small standalone building
- Placed as side areas off the main path (left or right of mountain path)

### Portal Options
- `models/kenney-nature/cliff_blockCave_rock.glb` ring = cave entrance portal
- `models/kenney-fantasy-town/wall-doorway-round.glb` as framed portal
- Simple glowing plane with shader (THREE.MeshBasicMaterial + emissive)

---

## 14. Space Intro Zone

### Location
- Separate scene (not in village)

### Assets
- `models/kenney-space/` — has planets, rockets, space stations
- `models/space/` — 92 files, 19MB — inspect for usable pieces
- HDRI: `space_sunset.exr`

---

## 15. Asset Readiness Chart

| Asset | Format | Ready? | Notes |
|-------|--------|--------|-------|
| kenney-nature trees | GLB | ✅ READY | Primary tree library |
| kenney-nature fences | GLB | ✅ READY | All fence variants |
| kenney-nature rocks | GLB | ✅ READY | All sizes |
| kenney-nature flowers | GLB | ✅ READY | Purple/red/yellow |
| kenney-nature bridges | GLB | ✅ READY | Stone and wood |
| kenney-nature signs | GLB | ✅ READY | Single sign GLB |
| kenney-nature cliff blocks | GLB | ✅ READY | Mountain terrain |
| kenney-fantasy-town walls | GLB | ✅ READY | Modular building kit |
| kenney-fantasy-town roofs | GLB | ✅ READY | Modular roofs |
| kenney-fantasy-town market | GLB | ✅ READY | Stalls, carts |
| kenney-fantasy-town fountain | GLB | ✅ READY | Well alternative |
| kenney-fantasy-town hedges | GLB | ✅ READY | Garden borders |
| kenney-fantasy-town lantern | GLB | ✅ READY | Street lighting |
| houses/house_01–16 | GLB | ✅ READY | Half-timber style |
| props/props_01–91 | GLB | ✅ READY | Unknown content, inspect |
| barrel/ | GLB | ✅ READY | Multiple variants |
| bonfire/ | GLB | ✅ READY | Campfire prop |
| bridge/ (main) | GLB | ✅ READY | 8 variants |
| Fence/ | GLB | ✅ READY | Gate + fence + post |
| streetlight and sign/ | GLB | ✅ READY | 6 lamp variants |
| rocks/ | GLB | ✅ READY | 6 variants |
| polypizza/Town Sign | GLB | ✅ READY | Entrance sign |
| polypizza/Post Lantern | GLB | ✅ READY | Lamp post |
| polypizza/Arrow Sign | GLB | ✅ READY | Navigation |
| polypizza/Small Bridge | GLB | ✅ READY | Lighter bridge |
| stylized-nature trees | GLTF+BIN | ⚠️ NEEDS GLTF PATH | CommonTree_1.gltf, etc. |
| stylized-nature-pack | GLTF+BIN | ⚠️ NEEDS GLTF PATH | BirchTree, Bush, etc. |
| medieval-village-e | FBX | ❌ UNUSABLE | Convert in Blender |
| house-interiors | FBX | ❌ UNUSABLE | Convert or skip |
| polyhaven trees | GLB | ❌ TOO HEAVY | 1GB+ each — never use |

---

## 16. What NOT to Build in Stylized Direction

- Do NOT use polyhaven trees (1GB+ each)
- Do NOT use polyhaven stone walls or heavy photoscanned props
- Do NOT use thick PBR texture overlays on stylized assets — clash of registers
- Do NOT try to make the scene "realistic" — that undermines the storybook feel
- Do NOT mix kenney stylized with polyhaven photorealism

---

## 17. Build Sequence (Stylized)

### Step 1 — Foundation (DONE)
- Terrain ✅
- Herringbone road ✅
- HDRI sky ✅
- Player + camera ✅

### Step 2 — Trees
- Enable `createStreetTrees(ctx)` in villageBuilder.js
- All 30 kenney-nature trees across 4 zones

### Step 3 — Entrance
- Gate arch (kenney-fantasy-town wall-arch OR polypizza Castle Gate)
- Welcome sign (polypizza Town Sign)
- Entrance fencing (Fence/gatepost × 2, kenney-nature fence_simple)
- 2 lamp posts (streetlight_a001 × 2)

### Step 4 — Street Houses
- Uncomment `createStreetHouses(ctx)` in villageBuilder.js
- 4 houses per side, staggered Z, facing road

### Step 5 — Street Props
- Lamp posts every 15–20 units (6–8 lamps total)
- Barrel clusters near 2–3 houses
- Bench near well plaza area
- Flowers along road edge

### Step 6 — Well Plaza
- Fountain / well center
- 4 benches around plaza
- Flower clusters at plaza edge

### Step 7 — Hero House
- Hero house (large variant)
- Hero garden: hedges, flowers, path stones
- Personal signboard

### Step 8 — Forest Zone
- Dense pine tree cluster (z = -200 to -350)
- Skill markers
- Narrow path

### Step 9 — Bridge + River
- Bridge over stream
- Water plane
- Rocks + plants at riverbank

### Step 10 — Mountain Path
- Cliff block terrain
- Stone steps
- Milestone signs

---

## 18. Technical Notes

### GLTF Loading (stylized-nature pack)
To use stylized-nature GLTF trees, switch from `placeAsset()` GLB key to:
```js
loadModel(ctx, '/assets/models/stylized-nature/CommonTree_1.gltf', position, scale, rotY)
```
The loader already supports GLTF. `.gltf` and `.glb` are both handled by `GLTFLoader`.

### Performance Budget (Stylized)
- Target: 60fps on mid-range laptop
- Max models in scene: ~150 simultaneously
- Max textures: keep to 2K, no 4K in scene
- Trees: all kenney (~30–120KB each) — 30 trees = ~2MB max
- Houses: each is ~1–2MB — 8 total = ~12MB
- Props: each small prop ~50–500KB — budget 50 props = ~15MB

Total estimated: < 50MB active scene = achievable

---

## 19. Cinematic References

| Reference | What to borrow |
|-----------|---------------|
| Bruno Simon's portfolio | Playful physics, camera feel, toy-like scale |
| A Short Hike | Color warmth, tree shapes, cozy natural paths |
| Townscaper | Modular building harmony, color palette |
| Ghibli villages | Lamp lighting, flower details, storytelling through objects |
| Valheim | Chunky trees, brooding forest edge, dramatic scale contrast |

---

*Document version: May 2026 | Status: PLANNING — not yet implemented*
