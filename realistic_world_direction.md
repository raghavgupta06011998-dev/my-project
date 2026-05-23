# Realistic World Direction
## "A Cinematic Nordic Village — Crafted, Not Cartoonish"

> Inspired by: The Witcher 3 village atmosphere, God of War environmental storytelling, Kingdom Come Deliverance village design.
> Feel: Grounded, cinematic, impressive. Looks like a real village frozen in golden hour. 

---

## 1. World Philosophy

This world earns respect before the player even reads a word.

The street is worn. The plaster walls have texture. The cobblestones are slightly uneven. The tree bark catches the afternoon sun. The whole scene reads: "Someone who understands craft built this."

The emotional promise:
> "This is the quality of work you hire when you want something done properly."

The scene is not whimsical. It is measured, intentional, and deeply atmospheric.

---

## 2. Emotional Experience

| Zone | Emotion | Player Feeling |
|------|---------|----------------|
| Entrance gate | Gravitas + intrigue | "This is serious work" |
| Village street | Immersion + respect | "I feel like I'm actually there" |
| Personal house | Identity + warmth | "This feels personal and real" |
| Skills forest | Depth + wonder | "There is so much here" |
| Career mountain | Progression + ambition | "They have earned this" |
| Projects | Awe + technical respect | "This is portfolio-winning work" |

---

## 3. Player Journey (Scene Order)

```
[ SPACE INTRO ]
       ↓
  Black hole / portal (kenney-space or custom geometry)
       ↓
[ VILLAGE ENTRANCE ]
  Stone gate → textured cobblestone path → iron lantern → welcome stone sign
       ↓
[ VILLAGE STREET ]
  Cobblestone road → half-timber houses → iron lamp posts → backdrop trees
       ↓
[ WELL COURTYARD ]
  Stone plaza → stone well → worn benches → rough stone walls
       ↓
[ HERO HOUSE ]
  Garden gate → hero house (large) → garden wall → personal signboard
       ↓
[ SKILLS FOREST ]
  Photorealistic trees (small — birch/pine not polyhaven giants) → stone markers
       ↓
[ BRIDGE CROSSING ]
  Stone arch bridge over stream → PBR water plane → rock riverbank
       ↓
[ CAREER MOUNTAIN PATH ]
  Rock-faced cliff steps → stone milestones → dramatic mountain view
       ↓
[ PROJECT AREAS ]
  Stone doorway portals → each project has its own material/lighting identity
```

---

## 4. Visual Atmosphere

### Sky
- **Primary:** `village_golden.exr` — golden hour, cinematic warmth
  - Note: this EXR contains a real Venice panorama — set `scene.background` separately from `scene.environment` if you want a painted sky instead
  - Solution: use `village_golden.exr` for IBL only, set `scene.background = new THREE.Color(0xe8c880)`
  - Or: use `village_sky2.exr` for clean background + `village_golden.exr` for IBL only
- **Alternative:** `sunrise.exr` for cooler morning feel
- **Tone mapping exposure:** 1.1–1.2

### Lighting
- Ambient: warm gold `0xffcb88` at 0.3 intensity
- Hemisphere: sky `0xffd4a0`, ground `0x8b6a2a` at 0.55 intensity
- Sun: deep warm orange `0xffb060` at 2.5–3.0 intensity
- Sun position: low angle (90, 22, 40) — golden hour, long shadows
- Fill: cool blue `0x8ab4d4` at 0.3 — sky fill from opposite direction
- Bounce: warm `0xff8833` point light near ground — simulates light bouncing off warm terrain

### Fog
- Type: `FogExp2`
- Color: `0xe8d5b0` (warm dusty golden)
- Density: `0.00006` (very light — adds atmosphere without obscuring)

### Color Palette
- Ground: warm brown earth + green grass
- Road: warm gray cobblestone with sandy mortar lines
- Houses: cream plaster walls + dark timber cross-beams + terracotta/red roofs
- Trees: natural green, some autumn colors
- Lamps: iron gray + warm amber glow
- Sky: warm gold (golden hour), light orange horizon

---

## 5. Terrain

### Texture Strategy
- Base: `terrain/terrain_diffuse.jpg` with `terrain_normal.jpg` + `terrain_roughness.jpg` — already in `/assets/textures/terrain/`
- Near road: `terrain/grass-004/` for richer grass
- Dirt patches near buildings: `terrain/brown-mud/` or `terrain/dry-ground/`
- Forest floor: `terrain/forest-ground/`

### Architecture Textures
The `textures/architecture/` folder has 323MB of high-quality PBR sets:
- `brick-wall-01/` — rough old brick → use for entrance gate/walls
- `bricks-021/` — varied brick → use for road-facing house bases
- `ceramic-roof/` — terracotta roof tiles → house roofs (if custom-built)
- `plaster-007/` — white/cream plaster → house walls
- `red-plaster/` — aged red plaster → accent walls
- `plaster-stone-wall/` — stone-reinforced plaster → courtyard walls

### Road Textures
Available in `textures/roads/`:
- `cobblestone/` — primary village road (replace herringbone for realistic direction)
- `cobblestone-01` through `cobblestone-06` — variants for different zones
- `mossy-cobblestone/` — for older/less-traveled areas
- `stone_path/` — forest/mountain path
- `rocky-trail/` — mountain approach

---

## 6. Road System

### Main Village Lane (z = +14 to z = -165)
- Switch FROM herringbone TO `cobblestone/` texture
- Road material file: `textures/roads/cobblestone/`
- Keep same width: 14 units
- UV repeat: reduce to 6×30 for cobblestone scale

### Well Plaza (z = -105)
- Keep PavingStones150 formal cut stone (excellent fit for realistic style)
- Consider adding `textures/roads/paving-046/` for variation

### Hero House Approach
- `textures/roads/stone_path/` — smaller, more intimate than the main road

### Forest Path
- `textures/roads/rocky-trail/` or `terrain/rock-023/`

### Mountain Path
- `textures/roads/rocky-trail/` or raw `terrain/rock-face/`

---

## 7. Architecture

### Street Houses
- Asset: `models/houses/house_01.glb` through `house_16.glb` (same as stylized direction)
- These are Germanic half-timber — correct visual register for realistic
- Style reads correctly as: old Northern European village house with:
  - Cream/beige plaster walls
  - Dark exposed timber cross-beams
  - Deep window reveals
  - Sloped roofs
- Scale: 1.0–1.05 — realistic scale, do not inflate

### Hero House
- Use `houses/house_11.glb` or `house_12.glb` or `house_13.glb` (largest variants)
- Scale 1.25–1.4
- Must feel grander and more set-back than street houses

### Modular Construction (kenney-fantasy-town)
- Even in realistic direction, kenney-fantasy-town wall/roof GLBs can be used for:
  - Entrance gate archways
  - Courtyard boundary walls
  - Market stall overhangs
  - Stone steps
- Their simple geometry works well when textured with PBR materials via `mesh.material = new THREE.MeshStandardMaterial({ map: brickTex... })`
- This is a valid approach for custom structures

### Entrance Gate
- Option A: `models/polypizza/Castle Gate.glb` — most impressive
- Option B: kenney-fantasy-town `wall-doorway-round.glb` + `wall-arch-top.glb` + manual PBR material
- Flanked by iron fence posts: `models/Fence/gatepost.glb`

---

## 8. Village Props

### Street Lamps
- Asset: `models/streetlight and sign/streetlight_a001.glb` through `a006.glb`
- Inspect all 6 variants — pick the one with an iron/wrought iron appearance
- Add point light at lamp position: warm amber `0xffcc88`, radius 8

### Well
- `models/kenney-fantasy-town/fountain-round.glb` (closest to a village well)
- OR use stone-look barrel + `fountain-center.glb` combination
- Center of plaza: (0, 0, -105)

### Carts
- `models/kenney-fantasy-town/cart.glb` or `cart-high.glb`
- Place near market area or hero house (parked, as a story detail)

### Barrels and Props
- `models/barrel/barrel_a001–a004.glb` — clustered against house walls
- `models/barrel/barrel_b001–b006.glb` — alternate style

### Benches
- `models/bench/` — check for GLBs
- Near plaza, near personal house garden

### Bonfires (evening storytelling beat)
- `models/bonfire/bonfire_a001.glb` — entrance night fire if golden hour mode
- Only near main gathering points

### Signs
- `models/streetlight and sign/streetsign_a001–a004.glb`
- `models/polypizza/Town Sign.glb` at entrance
- `models/polypizza/Arrow Sign.glb` pointing to key areas

### Fences
- `models/Fence/fence.glb` + `gate.glb` — house boundaries
- `models/kenney-nature/fence_simple.glb` for organic areas
- `models/kenney-fantasy-town/fence.glb` for courtyard/garden walls

---

## 9. Nature

### Trees for Realistic Direction
The problem: polyhaven trees are 1GB+. They cannot be used.

**Available tree GLBs that work in realistic direction:**

| Asset | File | Notes |
|-------|------|-------|
| kenney-nature trees | All 60+ tree GLBs | Low-poly but work well with good lighting |
| polypizza Autumn Tree | `Autumn Tree.glb` | Single nice tree |
| polypizza Birch Trees | `Birch Trees.glb` | Group of birch |
| polypizza Maple Trees | `Maple Trees.glb` | Rich foliage |
| polypizza Pine Trees | `Pine Trees.glb` | Compact pines |
| stylized-nature (GLTF) | `CommonTree_1.gltf` etc | More organic shape |
| stylized-nature-pack (GLTF) | `BirchTree_1.gltf` etc | Good birch forms |

**For realistic, prefer:** polypizza trees + stylized-nature GLTF packs over kenney-nature.
polypizza trees have more organic silhouettes. Kenney looks more toy-like.

### Key Issue with GLTF Assets
- `stylized-nature/` and `stylized-nature-pack/` are GLTF+BIN pairs
- Load with: `loadModel(ctx, '/assets/models/stylized-nature/CommonTree_1.gltf', ...)`
- NOT in the current `ASSETS` map — need to add or load directly
- These are worth it: organic-shaped trees dramatically improve realistic feel

### Ground Cover
- `kenney-nature/plant_bush.glb`, `plant_bushDetailed.glb` — garden
- `kenney-nature/flower_purpleA.glb`, `flower_redA.glb` — subtle color accents
- Keep flowers minimal in realistic — more selective placement

### Rocks
- `models/rocks/rocks_01–06.glb` — PBR stone look
- `kenney-nature/rock_largeA–F.glb` for landscape anchors
- `kenney-nature/rock_tallA–J.glb` for dramatic rock formations

---

## 10. Skills Forest Design (Realistic)

### Location
- z = -200 to z = -400

### Tree Selection
- Use polypizza Birch Trees, Pine Trees, Autumn Tree
- Use stylized-nature-pack BirchTree variants for denser sections
- Use kenney-nature pineTallA variants for deep forest dramatic height

### Atmosphere
- HDRI swap: `forest_golden.exr` for warm afternoon forest light
- Fog: increase to `0.0004` density — adds mist between trunks
- Darker ambient: reduce to 0.2 — forest is shaded

### Skill Markers
- Stone slab effect: `models/kenney-nature/rock_largeA.glb` at angle
- OR `kenney-fantasy-town/wall-block.glb` dressed as a stone tablet
- Text displayed via floating `THREE.Sprite` (canvas texture with skill name)

---

## 11. Bridge / River Transition (Realistic)

### Bridge
- `models/kenney-nature/bridge_stone.glb` + `bridge_side_stoneRound.glb`
- OR `models/bridge/bridge_01.glb` — inspect for stone look
- Width: match road width coming in (14 units for main bridge)

### River
- `THREE.PlaneGeometry` at y = -1.5
- Material: `THREE.MeshStandardMaterial` with animated UV scroll
- River texture: `textures/terrain/river-rocks/` as riverbed
- Water color: dark blue-green `0x3d7a8a`
- Add `kenney-nature/cliff_waterfall_rock.glb` at riverbanks

### Riverbank
- Scatter: `rocks/rocks_01–03.glb`, `kenney-nature/rock_largeA–C.glb`
- Plants: `kenney-nature/plant_bushLarge.glb` clusters
- Ground texture: `terrain/riverbed/` near water edge

---

## 12. Career Mountain Path (Realistic)

### Terrain Approach
- Use `kenney-nature/cliff_block_rock.glb` pieces as stepped terrain
- Use `cliff_blockSlope_rock.glb` for angled cliff faces
- Elevation: +4 per 20 units of Z distance from z = -400 to z = -600

### Path Texture
- `textures/roads/rocky-trail/` on narrow path up mountain
- Width narrows from 6 to 4 units as player climbs

### Milestone Signs
- Each company/milestone: `streetsign_a001.glb` with canvas text overlay
- Placed at regular intervals as player climbs

### HDRI at Summit
- `mountain_sunset.exr` or `mountain_path.exr`
- This creates a dramatic lighting shift when entering mountain zone

---

## 13. Project Portal Design (Realistic)

### Concept
- Each project is a stone archway with glowing interior
- The glow color changes per project (identity system)

### Construction
- `kenney-fantasy-town/wall-doorway-round.glb` as arch frame
- Emissive plane behind it: `THREE.MeshBasicMaterial({ color: projectColor })`
- Stone wall flanks: `wall.glb` × 2

### Project Color Identity
- Project 1 (Web/Frontend): `0x4488ff` — cool blue
- Project 2 (Data/ML): `0xff8844` — warm orange
- Project 3 (Design): `0x44dd88` — fresh green
- Project 4 (Game/3D): `0xcc44ff` — purple
- Custom colors per project as needed

---

## 14. Texture Pipeline for Realistic Direction

### Active Architecture Textures (from `/assets/textures/architecture/`)
| Texture Set | Use |
|-------------|-----|
| `brick-wall-01/` | Entrance gate, old building bases |
| `ceramic-roof/` | House roof material if custom-built |
| `plaster-007/` | Primary house wall material |
| `red-plaster/` | Accent walls, chimneys |
| `plaster-stone-wall/` | Courtyard walls |
| `rock-wall-05/` | Mountain path walls |

### How to Apply to Existing GLB Houses
The existing `houses/house_01–16.glb` have embedded baked textures.
You CANNOT override them easily without modifying the GLB in Blender.

**The practical approach:**
- Accept the houses' baked textures as-is — they look fine under good lighting
- Focus texture energy on: terrain, roads, custom-built walls, and atmospheric areas
- Use `village_golden.exr` IBL to warm ALL surfaces naturally

### Road Texture Swap
Change in `roads/roads.js`:
```js
const ROAD_PATH = '/assets/textures/roads/cobblestone/road_diffuse.jpg'  // instead of herringbone
```

---

## 15. Asset Readiness Chart (Realistic Direction)

| Asset | Format | Ready? | Notes |
|-------|--------|--------|-------|
| houses/house_01–16 | GLB | ✅ READY | Same as stylized |
| kenney-nature trees | GLB | ✅ READY | Lower priority, use as fill |
| polypizza trees | GLB | ✅ READY | Preferred for realistic |
| stylized-nature trees | GLTF+BIN | ⚠️ NEEDS GLTF PATH | Best organic shapes |
| stylized-nature-pack | GLTF+BIN | ⚠️ NEEDS GLTF PATH | BirchTree = good for realistic |
| kenney-fantasy-town walls | GLB | ✅ READY | Can add PBR texture |
| kenney-nature bridge_stone | GLB | ✅ READY | Best bridge for realistic |
| rocks/ | GLB | ✅ READY | PBR-textured rocks |
| kenney-nature rocks | GLB | ✅ READY | Secondary rocks |
| barrel/ | GLB | ✅ READY | Village props |
| bridge/ (main) | GLB | ✅ READY | 8 variants — inspect |
| streetlight and sign/ | GLB | ✅ READY | 6 variants |
| Fence/ | GLB | ✅ READY | Gate + fence |
| polypizza Castle Gate | GLB | ✅ READY | Best entrance gate |
| cobblestone road textures | JPG | ✅ READY | Multiple variants |
| architecture textures | JPG | ✅ READY | For custom surfaces |
| terrain textures | JPG | ✅ READY | Rich ground detail |
| village_golden HDRI | EXR | ✅ READY | IBL only mode |
| polyhaven trees | GLB | ❌ TOO HEAVY | 1GB+ each — excluded |
| medieval-village-e | FBX | ❌ UNUSABLE | Needs Blender conversion |
| house-interiors | FBX | ❌ UNUSABLE | Skip entirely |

---

## 16. What NOT to Do in Realistic Direction

- Do NOT mix kenney-nature cartoon blocks with photorealistic surfaces on same objects
- Do NOT use `village_golden.exr` as scene background (shows real building panorama)
- Do NOT use polyhaven trees (excluded by size)
- Do NOT make houses too bright/white — wash with warm IBL, let textures do work
- Do NOT add too many lights — one good golden-hour sun + IBL fill is all you need
- Do NOT use kenney-space assets in the village area — visual register clash

---

## 17. Build Sequence (Realistic)

### Step 1 — Foundation (DONE)
- Terrain ✅
- Road ✅ (swap to cobblestone for realistic)
- HDRI ✅ (use village_golden for IBL, solid sky background)
- Player + camera ✅

### Step 2 — Lighting Upgrade
- Switch to golden-hour light setup (low sun angle, warm color)
- Add fill light and bounce light
- Change fog to warm golden `0xe8d5b0`

### Step 3 — Trees
- Enable `createStreetTrees(ctx)` 
- Add polypizza trees at key points (entrance flanks, hero area)
- Add stylized-nature GLTF trees as forest backdrop

### Step 4 — Street Houses
- Enable `createStreetHouses(ctx)`
- 4 per side, facing road, correct Z spacing

### Step 5 — Entrance Gate
- polypizza Castle Gate or kenney-fantasy-town arch
- Gatepost × 2, welcome sign

### Step 6 — Street Props
- Iron lamp posts (6–8 along street)
- Barrels near house walls
- Cart parked near one house (story detail)

### Step 7 — Well Plaza
- fountain-round.glb well
- Stone benches

### Step 8 — Hero House
- Large house variant, scaled to 1.3
- Stone garden wall boundary
- Signboard

### Step 9 — Forest + Bridge
- Dense GLTF tree cluster
- Stone bridge over water plane

### Step 10 — Mountain Path
- Cliff block terrain
- Stone steps
- Milestone markers

---

## 18. Performance Notes (Realistic)

### Key Risk: Texture Memory
The `textures/architecture/` folder is 323MB but most sets are 4K.

Before using: **always downsample to 2K maximum.**
- 4K texture = 4× the memory of 2K
- With multiple PBR sets active = GPU VRAM exhaustion = frame drops

### 2K Conversion Required
Convert before use (use any image editor or squoosh.app):
- All `architecture/brick-wall-01/` textures: `*Color.jpg`, `*Roughness.jpg`, `*NormalGL.jpg` → resize to 2048px
- All `architecture/plaster-007/` textures → resize to 2048px
- Same for any architecture texture you actively use

### GLTF Tree Loading
- GLTF+BIN pairs must be served from the same directory
- `loadModel(ctx, '/assets/models/stylized-nature/CommonTree_1.gltf', ...)` will auto-fetch `CommonTree_1.bin`
- These work correctly in Vite — no extra config needed

---

## 19. Cinematic References

| Reference | What to borrow |
|-----------|---------------|
| The Witcher 3 (Velen village) | Atmospheric fog, warm light, worn surfaces |
| Kingdom Come Deliverance | Grounded architecture, believable scale, no magic |
| God of War (village camps) | Camera composition, stone detail, emotional lighting |
| Red Dead Redemption 2 (towns) | Dusty golden atmosphere, lived-in props |
| Ghost of Tsushima | Cinematic bokeh depth of field, warm color grading |

---

*Document version: May 2026 | Status: PLANNING — not yet implemented*
