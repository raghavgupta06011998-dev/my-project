import { placeAsset } from '../utils/assetLoader.js'

// ═══════════════════════════════════════════════════════════════════════════
//  FARM / STORAGE ZONE — village working corner (first pass)
// ═══════════════════════════════════════════════════════════════════════════
//
//  A small working farm in the BACK-RIGHT outer area — well beyond the
//  residential ring, behind and east of the right-side houses.
//
//  Why here:
//    • Outside the side-house ring (R 53–60) → the farm sits at R≈90+
//      from the hero, clearly its own separate "working" district.
//    • Back-right → far from the hero house entrance AND far from the
//      front-left market, so the social/work zones never collide.
//    • Tucked in the open pocket between the right houses, the background
//      tree clusters and the outer rocks — clear of all of them.
//
//  Contents (first pass — small & breathable):
//    1 barn · 1 silo · 2 storage drums · 1 milk tank · 1 horse
//
//  Note: the village buildings are large (side house ≈23×12u) — the barn
//  is sized to match.  A single barn + a silo keeps the back-right pocket
//  uncrowded; two full barns would not fit without clutter.
//
//  Cluster centred ≈ (78, −80).
// ═══════════════════════════════════════════════════════════════════════════

// ── Scales — retuned after measuring the loaded GLBs (Step-1 method) ───────
const SCALE_BARN     = 1.2    // barn ≈23u wide — matches the side houses
const SCALE_SILO     = 0.95   // silo ≈11.5u tall — a vertical landmark
const SCALE_BARREL   = 1.85   // matches the other storage barrels
const SCALE_MILKTANK = 1.9
const SCALE_HORSE    = 2.4

// ═══════════════════════════════════════════════════════════════════════════
export function createFarmZone(ctx) {
  // 1 ─ barn — the main farm structure ──────────────────────────────────────
  //     Front faces south-west, toward the farm yard and the village.
  placeAsset(ctx, 'farmbuilding_02', 82, 0, -86, SCALE_BARN, 2.4)

  // 2 ─ silo — vertical storage landmark, on the village-facing side ────────
  placeAsset(ctx, 'farmstructure_23', 68, 0, -80, SCALE_SILO, 0)

  // 3 ─ storage props — metal drums + a milk tank, along the barn yard ──────
  placeAsset(ctx, 'barrel_a',   80, 0, -71, SCALE_BARREL,   0.3)
  placeAsset(ctx, 'barrel_a',   83, 0, -72, SCALE_BARREL,   1.1)
  placeAsset(ctx, 'milktank_a', 78, 0, -70, SCALE_MILKTANK, 0.6)

  // 4 ─ a grazing horse — gives the farm yard life ──────────────────────────
  placeAsset(ctx, 'horse', 75, 0, -67, SCALE_HORSE, -0.9)
}
