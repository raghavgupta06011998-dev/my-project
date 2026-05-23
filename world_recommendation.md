# World Direction — Final Recommendation
## Asset Pipeline Cleanup + Decision Document

> This document is the tiebreaker. Read this first if you want to know what to build.

---

## 1. Side-by-Side Comparison

| Dimension | Stylized | Realistic |
|-----------|---------|-----------|
| **Visual style** | Bruno Simon / Ghibli / Storybook | Witcher / God of War / Cinematic |
| **Emotional register** | Playful, warm, handcrafted | Grounded, serious, immersive |
| **First 5-second impression** | "This is delightful" | "This is impressive" |
| **Technical complexity** | Lower — kenney GLBs load fast | Higher — GLTF trees, texture management |
| **Asset readiness** | 95% ready to use NOW | 85% ready, 2K conversion needed |
| **Tree situation** | kenney-nature GLBs work perfectly | Need GLTF trees, polyhaven excluded |
| **Road texture** | Herringbone (already done) | Cobblestone (simple swap needed) |
| **Lighting setup** | Simple: bright day + HDRI | Harder: golden hour, fill, bounce |
| **Performance risk** | Very low — all assets tiny | Medium — texture memory management |
| **Recruiter reaction** | Fun, shows creativity and personality | Serious, shows technical depth |
| **Design award potential** | Very high — rare to see in portfolios | High — cinematic is expected in games |
| **Differentiation** | Unique — almost no portfolio does this | Impressive — but game devs do it |
| **Build speed** | Fast — can have a great scene in 1–2 days | Slower — needs texture work, lighting tuning |
| **Maintenance** | Easy — small GLBs, clear structure | Harder — texture memory, lighting balance |

---

## 2. Who Will See This Portfolio

You need to answer one question honestly:

**Are you targeting:**
- A) Game studios, 3D roles, creative agencies → Cinematic realistic direction wins
- B) Web dev companies, startups, product companies, FAANG → Stylized wins (shows creativity + web skill)
- C) Both → Hybrid approach (recommended below)

Most strong frontend/fullstack engineers targeting companies like Google, Stripe, Linear, or design-forward startups are better served by the **stylized direction.**

The realistic direction requires comparison to actual game studios — you will be judged against Naughty Dog and CDPR environments. The stylized direction is judged only against web portfolios, where you are almost certainly the best.

---

## 3. Final Recommendation

### PRIMARY DIRECTION: Stylized (Storybook Nordic)

**Build this first. Build this completely. Make it perfect.**

#### Why:
1. **Asset readiness is highest.** kenney-nature GLBs are all ready. kenney-fantasy-town is all ready. Houses are all ready. Zero conversion work.
2. **Differentiation is maximum.** Nobody doing web portfolios builds a stylized explorable village. Bruno Simon did physics toys. Nobody has done a full narrative village.
3. **Lighting is easier.** Bright day HDRI + one good sun = 90% of the way there. No texture fighting.
4. **Performance is safest.** All kenney assets are 30–120KB. 30 trees = ~2MB. The entire stylized village will load in under 3 seconds on a normal connection.
5. **Personality reads.** A stylized world shows your creative identity, not just technical skill. Recruiters remember personality.
6. **You can complete it.** A realistic direction done halfway looks wrong. A stylized direction done 70% still looks charming.

#### The Risk of Realistic:
- Half-done realistic = broken, uncanny, wrong
- Half-done stylized = charming, slightly unfinished, still appealing
- You want the direction with the graceful fallback

---

## 4. How to Use the Realistic Direction Document

The realistic document is NOT wasted. Use it for:

1. **Later zones.** When you build the Career Mountain or the Skills Forest, those can be more cinematic and realistic in feel — the deeper you go, the more serious the world becomes.
2. **The Hero House interior** (future feature). If you ever add an interior walkthrough, realistic textures feel more personal and emotional.
3. **HDRI strategy.** Using `village_golden.exr` for IBL-only (not background) in the stylized direction gives you warm light without the ugly panorama.

---

## 5. Hybrid Approach (BEST OF BOTH)

You do not have to choose completely. The best direction is:

### Village Entrance + Street = Stylized
- kenney-nature trees
- kenney-fantasy-town modular buildings
- Herringbone road
- Bright warm sky HDRI

### Hero House + Garden = Slightly More Grounded
- Houses GLBs (same pack, but larger/grander variant)
- Richer terrain textures around the house
- Hedge borders (kenney-fantasy-town hedges still stylized)
- One or two polypizza organic trees for variety

### Forest = Transitional (Stylized → More Organic)
- GLTF stylized-nature trees (more organic silhouettes than kenney)
- Shift fog color warmer
- Shift HDRI to `forest_golden.exr`
- The forest feels deeper and more serious than the cheerful village

### Mountain = Most Cinematic
- cliff_block rock geometry (kenney still, but used at scale = less toy-like)
- `mountain_path.exr` or `mountain_sunset.exr` — dramatic
- Milestone signs feel like gravitas markers

### Result
A journey that starts warm and playful, and gradually becomes more cinematic and personal as you go deeper. The player feel the tone shift — and that IS the storytelling.

---

## 6. Asset Hierarchy — What to Keep, Archive, Ignore

### KEEP (use in builds)
```
models/kenney-nature/          ← PRIMARY tree + nature library
models/kenney-fantasy-town/    ← PRIMARY modular building kit
models/houses/                 ← PRIMARY house assets
models/polypizza/              ← Supplementary (Gate, Sign, Trees, Bridge)
models/Fence/                  ← Gate + fence system
models/streetlight and sign/   ← Lamp posts + street signs
models/barrel/                 ← Village props
models/bonfire/                ← Atmosphere prop
models/bridge/                 ← Bridge variants (inspect)
models/rocks/                  ← PBR rock clusters
models/space/                  ← Space intro zone (future)
models/kenney-space/           ← Space intro props
models/environment/            ← forest_land.glb (terrain piece)
models/car/                    ← If car feature returns
models/character/              ← Player character (current)

textures/roads/herringbone/    ← Current road texture
textures/roads/cobblestone/    ← If realistic switch
textures/terrain/grass-001/    ← Current ground
textures/terrain/terrain_*     ← Default terrain set
hdri/village_sky2.exr          ← Current sky
hdri/village_golden.exr        ← IBL-only later
hdri/forest_golden.exr         ← Forest zone future
hdri/mountain_path.exr         ← Mountain zone future
hdri/mountain_sunset.exr       ← Mountain zone future
hdri/space_sunset.exr          ← Space intro future
```

### CONDITIONAL (keep but not urgent)
```
models/stylized-nature/        ← GLTF trees, good for forest zone
models/stylized-nature-pack/   ← GLTF birch trees, good for forest zone
models/props/                  ← 91 GLBs — inspect JPGs to understand content
models/bench/                  ← Check if GLBs exist
models/kenney-graveyard/       ← Could use as decorative area (gravestones = story)
models/kenney-pirate/          ← Skip unless there's a nautical zone
models/kaykit-dungeon/         ← Skip unless adding dungeon zone
models/fantasy-props/          ← 57MB, 94 files — check for usable props (weapons for display)

textures/roads/ (all others)   ← Keep in case of road reskin
textures/architecture/         ← Keep but ALWAYS convert to 2K before use
textures/terrain/ (others)     ← Keep as needed for zone variation
hdri/ (others)                 ← All HDRIs are small, keep all
```

### ARCHIVE / DO NOT USE
```
models/Dont Use/               ← Already labeled — do not touch
models/house-interiors/        ← ALL FBX — unusable without conversion
models/medieval-village-e/     ← ALL FBX — unusable without conversion
models/polyhaven/              ← 2.3GB — trees are 500MB–1GB each — NEVER USE
models/farmbuilding/           ← American barn style — wrong region
models/farmstractures/         ← 22MB — wrong architectural style
models/animals-pack/           ← 36MB — portfolio doesn't need animals
models/animals/                ← 9MB — same
models/crops/                  ← 2.9MB — farm crops (wrong setting)
models/food/                   ← Food items (only use if market zone)
models/foodish/                ← Same
models/kenney-food/            ← Same  
models/lawnmover/              ← A lawnmower — not relevant
models/milktank/               ← Not relevant
models/watersprinkler/         ← Not relevant
models/waterdish/              ← Not relevant
models/table/                  ← Only relevant if interior scenes
models/kaykit-furniture/       ← Only if interior scenes
models/little foodholder/      ← Not relevant
models/kenney-minigolf/        ← Not relevant
models/green/                  ← Tropical fruit props — wrong climate
models/brick/                  ← Likely just brick pieces — check before discarding
models/bucket/                 ← Very small, might use as prop
models/beginning_village.glb   ← Large scene GLB — inspect, may be duplicate
```

---

## 7. Technical Conversion List

### Required Conversions (FBX → GLB)

These are ONLY worth converting if you decide you absolutely need them. In the stylized direction, you don't need any of them.

| File | Source | Target | Why Needed |
|------|--------|--------|-----------|
| `medieval-village-e/*.fbx` | FBX | GLB | Mediterranean props (well, market stall) — only if you want this style |
| `medieval-village-e/Well.fbx` | FBX | GLB | Most useful single piece |
| `medieval-village-e/MarketStand_1.fbx` | FBX | GLB | Market stall shape |

**How to convert (Blender):**
1. Open Blender
2. File → Import → FBX → select file
3. File → Export → glTF 2.0 (.glb/.gltf)
4. Settings: Format = GLB, Include = Selected Objects, Transform = Y Forward + Z Up
5. Save to same folder

**Verdict: Skip this entirely for now.** kenney-fantasy-town has market stalls and a better fountain/well. FBX conversion is a detour.

### Required Texture Resizing (4K → 2K)

Only do this for textures you're actively using. Do NOT batch-resize — you'll create unnecessary work.

**Convert when you use them:**
```
textures/architecture/brick-wall-01/     → Resize all JPGs from 4K to 2048px
textures/architecture/plaster-007/       → Same
textures/architecture/ceramic-roof/      → Same
textures/architecture/bricks-021/        → Same
textures/terrain/aerial-grass-rock/      → 4K → 2K
textures/terrain/forest-ground/          → 4K → 2K
```

**How to convert (free tools):**
- macOS: `sips -Z 2048 filename.jpg` (command line, built-in)
- Batch: `for f in *.jpg; do sips -Z 2048 "$f"; done`
- Online: squoosh.app

**Textures already small enough (keep as-is):**
```
textures/roads/herringbone/    ← Already 2K or less
textures/terrain/grass-001/    ← Already used, check size
```

### GLTF Assets (No Conversion Needed)

These work directly. Just use the GLTF path instead of GLB:
```
models/stylized-nature/CommonTree_1.gltf
models/stylized-nature/Bush_Common.gltf
models/stylized-nature-pack/BirchTree_1.gltf
```

The Three.js GLTFLoader handles `.gltf` and `.bin` pairs automatically. No conversion required.

---

## 8. Priority Build Order (Next Steps)

Given the stylized primary direction, here is the exact build sequence:

### This Week — Make It Look Like a Real Village

**Day 1: Trees**
- Uncomment `createStreetTrees(ctx)` in villageBuilder.js
- Result: 30 kenney trees filling all 4 zones

**Day 2: Entrance**
- Create `structures/entrance.js`
- Add: polypizza Castle Gate or kenney-fantasy-town arch
- Add: polypizza Town Sign ("Raghav's World" or your name)
- Add: 2 gatepost.glb + 4 fence.glb pieces flanking gate
- Add: 2 streetlamp posts at entrance

**Day 3: Houses**
- Uncomment `createStreetHouses(ctx)` in villageBuilder.js
- Write: `structures/streetHouses.js` — 4 houses left side, 4 right side
- Space evenly from z = -10 to z = -65

**Day 4: Street Props**
- Create `props/streetLamps.js` — 6 lamps spaced along road
- Create `props/decorItems.js` — barrel clusters near 3 houses, flower patches

**Day 5: Well Plaza**
- Add fountain-round.glb at (0, 0, -105)
- Add 4 benches around plaza
- Add flower clusters at edge

**Following Week: Hero House**
- Create `structures/heroHouse.js`
- Large house variant, hedges, garden path, signboard

---

## 9. Three Questions Before You Start Building

Answer these three and you're unblocked:

1. **Which house is the hero house?**
   Run the scene with just one house at (0, 0, -165) at scale 1.3 and rotate to face entrance. Pick which house_XX feels right.

2. **Which entrance gate looks best?**
   Add `polypizza/Castle Gate.glb` at (0, 0, +14) and walk up to it. If it feels right, done. If not, try kenney-fantasy-town arch.

3. **Do you want warm golden-hour lighting or bright midday?**
   - Bright midday (current) → clean, easy to see, matches blue sky
   - Golden hour → atmospheric, cinematic, more emotional
   - Recommendation: bright midday for now, golden hour as "premium mode" later

---

## 10. What Makes This Portfolio Win

The competitor is every other portfolio on the internet.

Most are: React + Framer Motion + hero section + three sections + contact form.

Even most "3D portfolios" are: Three.js background with floating particles or a spinning model.

You are building: a world.

Not a trick. Not a demo. A world where someone can walk for 2–3 minutes and understand who you are before reading a single word.

That is the difference.

**The stylized direction achieves this faster, more completely, and with less risk of feeling broken at half-completion.**

Build it.

---

*Document version: May 2026 | Decision: STYLIZED PRIMARY + HYBRID DEPTH PROGRESSION*
