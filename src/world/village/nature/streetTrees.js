import { placeAsset } from '../utils/assetLoader.js'

// ═══════════════════════════════════════════════════════════════════════════
//  VILLAGE TREES — intentional, sparse, cinematic
// ═══════════════════════════════════════════════════════════════════════════
//
//  Composition follows the reference image:
//    • Trees frame the village, never crowd it.
//    • Hero house stays clearly visible from spawn.
//    • Front approach corridor is completely tree-free.
//    • Hero lawn is mostly open — only tiny accents at back corners.
//    • Side houses get nestled into nature — but never with trees in front.
//    • Background trees form 3 sparse clusters, not a continuous wall.
//
//  Scale rules (NEVER overpower the houses):
//    • SMALL    0.45 – 0.60   inside lawn, decorative
//    • MEDIUM   0.65 – 0.85   near houses, around the loop
//    • TALL     0.90 – 1.10   distant background only
//
//  Total: 26 trees in 5 intentional zones.
//
//  Layout reference:
//    HERO          (0, 0, −48)
//    Fence         R=26 from hero
//    Ring road     R=28 → 42 from hero
//    Side houses   R=53–60 from hero, angles 50–127° (right), 233–310° (left)
//    Approach      z +11 → −6, width 14u, centred at x=0
//    Back houses   z ≈ −82.7
// ═══════════════════════════════════════════════════════════════════════════

// ── A. Hero yard accents — back corners only, very small ─────────────────
//   Inside the fence (R=26), tucked at back corners of the lawn.
//   ~22u from hero centre → 4u inside the fence, well clear of the house.
//   Keeps the front, sides, and centre open for future garden / path / cart.
const YARD_ACCENTS = [
  { k: 'plum',   x: -16, z: -64, s: 0.55 },   // back-left corner
  { k: 'cherry', x:  16, z: -64, s: 0.55 },   // back-right corner
]

// ── B. Estate-edge trees — sparse, outside the circular road ─────────────
//   Just outside the ring road (R>42).  Gives the estate visual edges
//   without crowding.  Front kept clear so the hero house is readable
//   from spawn.
const ESTATE_EDGE = [
  { k: 'cherry', x: -46, z: -48, s: 0.70 },   // west side of estate
  { k: 'apple',  x:  46, z: -48, s: 0.70 },   // east side of estate
  { k: 'maple',  x: -48, z: -25, s: 0.75 },   // front-west, in lawn gap
  { k: 'maple',  x:  48, z: -25, s: 0.75 },   // front-east, in lawn gap
]

// ── C. Side-house groves — 1–2 medium trees per house group ──────────────
//   Placed BETWEEN and BEHIND houses (never in front of facades).
//
//   Right-arc houses:                Left-arc houses (mirrored):
//     house_07  (41, −83) back        house_06  (−41, −83)
//     house_12  (58, −64)             house_01  (−58, −64)
//     house_15  (57, −36)             house_03  (−57, −36)
//     house_10  (42, −16) front       house_16  (−42, −16)
const SIDE_HOUSE_GROVES = [
  // ── right side (3 trees, sit in gaps) ──────────────────────────────────
  { k: 'oak',     x:  54, z: -78, s: 0.85 },  // between house_07 ↔ house_12
  { k: 'maple',   x:  68, z: -50, s: 0.75 },  // outside / behind house_15
  { k: 'birch_1', x:  56, z:  -6, s: 0.70 },  // outside house_10

  // ── left side (mirrored) ───────────────────────────────────────────────
  { k: 'oak',     x: -54, z: -78, s: 0.85 },
  { k: 'maple',   x: -68, z: -50, s: 0.75 },
  { k: 'birch_3', x: -56, z:  -6, s: 0.70 },
]

// ── D. Background clusters — 3 sparse pine groups, NOT a wall ────────────
//   Three distinct clusters with clear gaps between them.  This was the
//   biggest issue before: a continuous row of pines created a "wall".
//   Now back-left / back-centre / back-right are visually separated, so
//   the eye reads them as natural groves, not a fence.
const BACKGROUND_CLUSTERS = [
  // back-left cluster (3 trees)
  { k: 'noble_fir', x: -60, z: -112, s: 1.00 },
  { k: 'fir',       x: -46, z: -122, s: 1.10 },
  { k: 'pine',      x: -34, z: -114, s: 0.95 },

  // ── visual gap from x=−34 to x=−5 ──────────────────────────────────────

  // back-centre cluster (4 trees, slightly deeper for depth)
  { k: 'noble_fir', x:  -5, z: -130, s: 1.10 },
  { k: 'fir',       x:   8, z: -136, s: 1.05 },
  { k: 'pine',      x:   2, z: -120, s: 0.90 },

  // ── visual gap from x=+8 to x=+30 ──────────────────────────────────────

  // back-right cluster (3 trees)
  { k: 'pine',      x:  34, z: -114, s: 0.95 },
  { k: 'fir',       x:  48, z: -124, s: 1.10 },
  { k: 'noble_fir', x:  62, z: -116, s: 1.00 },
]

// ── E. Approach framing — small/medium, never blocking road ──────────────
//   Approach road runs z=+11 → −6 at x=0±7.  Trees just outside it create
//   cinematic depth as the player walks toward the hero house.
const APPROACH_FRAMING = [
  { k: 'oak',     x: -17, z:   8, s: 0.85 },  // left, taller (anchor)
  { k: 'maple',   x: -19, z:  -4, s: 0.70 },  // left, closer to ring
  { k: 'oak',     x:  18, z:   6, s: 0.80 },  // right, asymmetric
  { k: 'birch_1', x:  21, z:  -5, s: 0.68 },  // right, lighter for variety
]

// ═══════════════════════════════════════════════════════════════════════════
export function createStreetTrees(ctx) {
  for (const t of YARD_ACCENTS)         placeAsset(ctx, t.k, t.x, 0, t.z, t.s, 0)
  for (const t of ESTATE_EDGE)          placeAsset(ctx, t.k, t.x, 0, t.z, t.s, 0)
  for (const t of SIDE_HOUSE_GROVES)    placeAsset(ctx, t.k, t.x, 0, t.z, t.s, 0)
  for (const t of BACKGROUND_CLUSTERS)  placeAsset(ctx, t.k, t.x, 0, t.z, t.s, 0)
  for (const t of APPROACH_FRAMING)     placeAsset(ctx, t.k, t.x, 0, t.z, t.s, 0)
}
