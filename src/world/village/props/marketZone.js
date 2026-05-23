import { placeAsset } from '../utils/assetLoader.js'

// ═══════════════════════════════════════════════════════════════════════════
//  MARKET ZONE — small village food / social corner (first pass)
// ═══════════════════════════════════════════════════════════════════════════
//
//  A small, lived-in market corner on the FRONT-LEFT of the circular
//  village — in the lawn belt (R 42–53) west of the approach corridor,
//  between the loop road and the near-front-left house (house_16).
//
//  Why here:
//    • Front-left → players see it as they walk up the approach, but it
//      never blocks the spawn → hero sightline (kept clear, x≈0).
//    • In the lawn belt → off the cobblestone, never blocks movement.
//    • A Step-1 loop streetlight already stands at (−22.5,−9), right at
//      this corner — it doubles as the market's lamp, so no new light is
//      added here (avoids clutter / duplicate lamps).
//
//  Contents (first pass — deliberately small & breathable):
//    1 market stand · 2 benches · 2 barrels + 1 bucket · 1 marker
//
//  Cluster centred ≈ (−32, −13).  All items kept ≥6u from house_16
//  (−42,−16) and ≥4u from the loop streetlight.
//
//  Asset note: the kenney-fantasy-town stalls render untextured (their
//  shared colormap texture is absent from the project) — so the stand is
//  a self-textured Poly Pizza model and the seating uses the proven
//  bench_b from Step 1.
// ═══════════════════════════════════════════════════════════════════════════

// ── Scales — tuned after measuring the loaded GLBs (see Step-1 method) ─────
const SCALE_STALL  = 2.5    // pp_market_stand native ≈1.5u wide → ≈3.7u
const SCALE_BENCH  = 1.3    // matches Step-1 benches
const SCALE_BARREL = 1.85   // matches Step-1 storage props
const SCALE_BUCKET = 1.6    // matches Step-1 storage props
const SCALE_MARKER = 1.5

// ═══════════════════════════════════════════════════════════════════════════
export function createMarketZone(ctx) {
  // 1 ─ main market stand — the corner's centrepiece ────────────────────────
  //     Faces south-east, toward the loop road / approaching players.
  placeAsset(ctx, 'pp_market_stand', -33, 0, -13, SCALE_STALL, 2.35)

  // 2 ─ benches — a small place to stop and sit, by the stand ───────────────
  placeAsset(ctx, 'bench_b', -27, 0, -10, SCALE_BENCH, -0.8)
  placeAsset(ctx, 'bench_b', -30, 0, -18, SCALE_BENCH,  0.5)

  // 3 ─ support props — barrels of goods + a bucket, beside the stall ───────
  placeAsset(ctx, 'barrel_b', -36, 0,  -9, SCALE_BARREL, 0.4)
  placeAsset(ctx, 'barrel_b', -36, 0, -15, SCALE_BARREL, 1.2)
  placeAsset(ctx, 'bucket_a', -34, 0,  -9, SCALE_BUCKET, 0.8)

  // 4 ─ small market marker sign, at the corner's road-facing edge ──────────
  placeAsset(ctx, 'props_70', -26, 0, -5, SCALE_MARKER, -0.5)
}
