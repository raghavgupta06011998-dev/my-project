# PROJECT_PROGRESS.md

## Project Goal
3D interactive portfolio village journey.

## Current Scene
- Hero house is central.
- Side houses are around the main circular road.
- Fence around hero house exists.
- Cobblestone road exists.
- Terrain is layered (green, gravel, worn, mud patches).
- Lamps, signs, benches, barrels/buckets/basic props added.
- Back street / outer ring path exists.
- Market zone (front-left) — first pass complete.
- Farm zone (back-right) — first pass complete.
- 26 trees placed in 5 zones.
- 28 outer rock/boulder clusters at village edges.
- VILLAGE_MAP.html exists as the village blueprint.

## Design Rules
- Do not randomly place assets.
- Do not block front/player spawn side.
- Front stays open for future river, bridge, forest route.
- Mountains/cliffs only on left, right, and back.
- Keep hero house clearly visible.
- Keep village warm, cinematic, clean, and breathable.

## Documentation
PROJECT_FULL_CONTEXT.md created and kept current (2026-05-23).
- Full project vision, tech stack, folder/file structure
- All active assets, disabled files, and staged-but-unimplemented assets
- Complete zone status, design rules, protected elements
- Recommended build order and git safety notes

## Safety
GitHub backup exists.
Git tag exists: safe-before-antigravity.
Before major changes, check git status and commit.

---

## Cliff/Mountain Backdrop — Analysis Session (2026-05-23)

### Task Attempted
Implement mountain valley surroundings using new assets in public/assets/models/Cliffs/.

### What Was Found: Cliffs Folder
public/assets/models/Cliffs/ is EMPTY.
- The directory was created (64 bytes — folder entry only).
- No .glb or .gltf files were placed inside it.
- The folder was created on 2026-05-23 23:06 but nothing was added.

### What Was Found: Existing Assets On Disk (Ready To Use)

Two families of cliff/mountain assets are already present in the project:

#### Family 1 — kenney-nature/ (GLB, warm brown, modular cliff tiles)
All files are 4–12 KB. Already downloaded, no conversion needed.
Modular terrain tile system — pieces snap together to form cliff walls.

| File | Description |
|---|---|
| cliff_block_rock.glb | Main volumetric cliff face block |
| cliff_large_rock.glb | Wide cliff face section |
| cliff_top_rock.glb | Cliff top cap with grass on top |
| cliff_half_rock.glb | Half-width cliff section |
| cliff_diagonal_rock.glb | Angled cliff edge |
| cliff_corner_rock.glb | Corner join piece |
| cliff_cornerTop_rock.glb | Corner top cap with grass |
| cliff_blockSlope_rock.glb | Sloped cliff block |
| rock_largeA.glb through rock_largeF.glb | 6 large standalone boulders |
| rock_tallA.glb through rock_tallJ.glb | 10 tall narrow rock formations |
| (plus stone-variant duplicates for all cliff pieces) | cooler grey tone |

#### Family 2 — kaykit-hexagon/decoration/nature/ (GLTF+BIN, stylized low-poly)
All files are 8–44 KB. Proper mountain shapes (not tiles). Single mesh, single texture atlas (hexagons_medieval.png, 16KB, in same folder). Three.js GLTFLoader resolves the texture automatically.

| File | Description |
|---|---|
| mountain_A.gltf | Mountain peak shape A — bare |
| mountain_B.gltf | Mountain peak shape B — bare |
| mountain_C.gltf | Mountain peak shape C — bare (largest) |
| mountain_A_grass_trees.gltf | Mountain A with grass + stylized trees (warmest) |
| mountain_B_grass.gltf | Mountain B with grass cover |
| mountain_C_grass_trees.gltf | Mountain C with grass + trees (best for backdrop) |
| hill_single_A.gltf | Low gentle hill shape A |
| hill_single_B.gltf | Low gentle hill shape B |
| hill_single_C.gltf | Low gentle hill shape C |
| rock_single_A-E.gltf | 5 standalone rock shapes |

### What Was Changed (Partial — Implementation Stopped)

#### COMPLETED: assetLoader.js
File: src/world/village/utils/assetLoader.js

Added 32 new asset keys to the ASSETS catalogue, inserted before the "Kenney Nature (trees, fences, garden props)" block.

New keys registered:
- kn_cliff_block, kn_cliff_large, kn_cliff_top, kn_cliff_half, kn_cliff_diagonal, kn_cliff_corner, kn_cliff_corner_top, kn_cliff_slope
- kn_rock_large_a through kn_rock_large_f (6 large boulders)
- kn_rock_tall_a through kn_rock_tall_d (4 tall rocks)
- kk_mountain_a, kk_mountain_b, kk_mountain_c (bare mountains)
- kk_mountain_a_trees, kk_mountain_b_grass, kk_mountain_c_trees (vegetated mountains)
- kk_hill_a, kk_hill_b, kk_hill_c (gentle hills)
- kk_rock_a, kk_rock_b, kk_rock_c (standalone rocks)

Git status: This change has NOT been committed yet. Run git add + git commit before next session.

#### NOT STARTED: cliffBackdrop.js
File to create: src/world/village/environment/cliffBackdrop.js
Status: NOT created. Implementation was stopped before this file was made.

#### NOT STARTED: villageBuilder.js wiring
File: src/world/village/villageBuilder.js
Status: NOT changed. Import and call not added yet.

### Implementation Status
- [x] Analyzed Cliffs folder → found empty
- [x] Identified all usable cliff/mountain assets on disk
- [x] Registered 32 new keys in assetLoader.js (PARTIAL — uncommitted)
- [ ] Create src/world/village/environment/cliffBackdrop.js
- [ ] Import + call createCliffBackdrop(ctx) in villageBuilder.js
- [ ] Visual verification in browser

### Exact Next Step (For Next Chat)

1. Commit current assetLoader.js change first:
   cd /Users/raghavgupta/Portfolio/raghav-portfolio
   git add src/world/village/utils/assetLoader.js
   git commit -m "Register cliff and mountain asset keys in ASSETS catalogue"

2. Create src/world/village/environment/cliffBackdrop.js with:
   - Export function: createCliffBackdrop(ctx)
   - Use placeAsset(ctx, key, x, y, z, scale, rotY)
   - LEFT CLIFF WALL: kk_hill_b/a + kk_mountain_a/b/c at x=-140 to -160, z=-18 to -175
   - RIGHT CLIFF WALL: mirror at x=+140 to +160
   - BACK MOUNTAINS: kk_mountain_c_trees / kk_mountain_a_trees / kk_mountain_b_grass at z=-188 to -245, large scale (14-20)
   - ROCK SCATTER: kn_rock_large_a through _f at cliff bases, scale 2.4-2.8
   - NO placements at z > -15 (front stays open)
   - NO placements at x between -125 and +125 at the back

3. In villageBuilder.js, add:
   import { createCliffBackdrop } from './environment/cliffBackdrop.js'
   Call: createCliffBackdrop(ctx)   — place it after createOuterRocks(ctx)

4. Test at localhost:5173/#village
   Check: front open, hero visible, mountains visible from all angles
   Adjust scale/position if mountains feel too close or too small.

### Placement Design (Ready to Code)
All positions confirmed safe — do not block spawn corridor (x ±20, z +10 to -22):

Back mountains (z = -188 to -245):
  kk_mountain_c_trees at (0, 0, -218) scale 20
  kk_mountain_a_trees at (-85, 0, -200) scale 16
  kk_mountain_b_grass at (85, 0, -200) scale 16
  kk_mountain_b at (-165, 0, -188) scale 13
  kk_mountain_c at (165, 0, -188) scale 13
  kk_mountain_a at (-60, 0, -245) scale 15
  kk_mountain_b at (60, 0, -245) scale 15

Left cliff side (x = -140 to -160, z = -18 to -175):
  kk_hill_b at (-140, 0, -18) scale 9 rotY 0.2
  kk_hill_a at (-148, 0, -45) scale 10 rotY 0.1
  kk_mountain_a at (-155, 0, -78) scale 12 rotY 0.3
  kk_hill_c at (-145, 0, -108) scale 10 rotY 0.2
  kk_mountain_b at (-158, 0, -140) scale 13 rotY 0.4
  kk_mountain_c at (-152, 0, -172) scale 12 rotY 0.2
  kn_cliff_block at (-130, 0, -35) scale 9 rotY 0
  kn_cliff_large at (-132, 0, -90) scale 9 rotY 0
  kn_cliff_block at (-130, 0, -145) scale 9 rotY 0

Right cliff side (mirror of left, negate x and rotY):
  kk_hill_b at (140, 0, -18) scale 9 rotY -0.2
  kk_hill_a at (148, 0, -45) scale 10 rotY -0.1
  kk_mountain_a at (155, 0, -78) scale 12 rotY -0.3
  kk_hill_c at (145, 0, -108) scale 10 rotY -0.2
  kk_mountain_b at (158, 0, -140) scale 13 rotY -0.4
  kk_mountain_c at (152, 0, -172) scale 12 rotY -0.2
  kn_cliff_block at (130, 0, -35) scale 9 rotY Math.PI
  kn_cliff_large at (132, 0, -90) scale 9 rotY Math.PI
  kn_cliff_block at (130, 0, -145) scale 9 rotY Math.PI

Rock scatter (cliff bases):
  kn_rock_large_a at (-128, 0, -28) scale 2.5 rotY 0.3
  kn_rock_large_c at (-133, 0, -68) scale 2.8 rotY 1.2
  kn_rock_large_b at (-125, 0, -115) scale 2.4 rotY 0.8
  kn_rock_large_d at (-130, 0, -160) scale 2.6 rotY 1.7
  kn_rock_large_a at (128, 0, -28) scale 2.5 rotY 2.1
  kn_rock_large_c at (133, 0, -68) scale 2.8 rotY 0.6
  kn_rock_large_b at (125, 0, -115) scale 2.4 rotY 2.4
  kn_rock_large_d at (130, 0, -160) scale 2.6 rotY 0.4

## Pending Tasks
1. ~~Find free mountain/cliff assets~~ → assets already on disk, identified
2. Commit assetLoader.js change (kk_ and kn_ cliff keys added)
3. Create cliffBackdrop.js (see exact plan above)
4. Wire cliffBackdrop into villageBuilder.js
5. Visual test and position tuning in browser
6. Build market zone (already done — first pass)
7. Build park with fence (Zone F, not started)
8. Build farm zone (already done — first pass)
9. Add school/community placeholder (Zone H, not started)
