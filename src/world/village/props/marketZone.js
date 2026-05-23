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
const SCALE_STALL   = 2.5    // pp_market_stand native ≈1.5u wide → ≈3.7u
const SCALE_BENCH   = 1.3    // matches Step-1 benches
const SCALE_BARREL  = 1.85   // matches Step-1 storage props
const SCALE_BUCKET  = 1.6    // matches Step-1 storage props
const SCALE_MARKER  = 1.5
const SCALE_WAGON   = 0.05   // pp_wagon native ≈40×50×66u (huge!) → ≈4×5×7u cart
const SCALE_PRODUCE = 2.5    // green_05–16 fruits — scale up for the large village
const SCALE_SIGN    = 2.0    // matches Step-1 directional signs

// ═══════════════════════════════════════════════════════════════════════════
export function createMarketZone(ctx) {
  // 1 ─ main market stand — the corner's centrepiece ────────────────────────
  //     Faces south-east, toward the loop road / approaching players.
  placeAsset(ctx, 'pp_market_stand', -33, 0, -13, SCALE_STALL, 2.35)

  // 2 ─ benches — a small place to stop and sit, by the stand ───────────────
  placeAsset(ctx, 'bench_b', -27, 0, -10, SCALE_BENCH, -0.8)
  placeAsset(ctx, 'bench_b', -30, 0, -18, SCALE_BENCH,  0.5)
  // extra bench (Step-2 polish) — beside the back-street edge at the
  // market entrance, facing the path so people sit and watch passers-by
  placeAsset(ctx, 'bench_b', -38, 0,  -3, SCALE_BENCH,  0.6)

  // 3 ─ support props — barrels of goods + a bucket, beside the stall ───────
  placeAsset(ctx, 'barrel_b', -36, 0,  -9, SCALE_BARREL, 0.4)
  placeAsset(ctx, 'barrel_b', -36, 0, -15, SCALE_BARREL, 1.2)
  placeAsset(ctx, 'bucket_a', -34, 0,  -9, SCALE_BUCKET, 0.8)

  // 4 ─ produce on display (Step-2 polish) — a cluster in front of the stand
  //     green_05–16 are tropical fruits/produce per ASSET_MAP — used here
  //     as the stand's market goods (watermelon, pumpkin, melon, peach, apple)
  placeAsset(ctx, 'green_06', -32, 0, -10, SCALE_PRODUCE, 0.2)  // pumpkin
  placeAsset(ctx, 'green_05', -30, 0, -11, SCALE_PRODUCE, 1.1)  // watermelon
  placeAsset(ctx, 'green_07', -31, 0,  -9, SCALE_PRODUCE, 2.4)  // melon
  placeAsset(ctx, 'green_09', -34, 0, -10, SCALE_PRODUCE, 0.8)  // peach
  placeAsset(ctx, 'green_11', -35, 0, -11, SCALE_PRODUCE, 1.6)  // apple

  // 5 ─ parked food wagon (Step-2 polish) — sits at the market entrance,
  //     beside the back-street junction — clearly a "mobile vendor"
  placeAsset(ctx, 'pp_wagon', -30, 0, -5, SCALE_WAGON, 1.6)

  // 6 ─ small market marker sign, at the corner's road-facing edge ──────────
  placeAsset(ctx, 'props_70', -26, 0, -5, SCALE_MARKER, -0.5)

  // 7 ─ directional sign (Step-2 polish) — "→ Market" on the lawn belt,
  //     guiding players from the loop road into the back street/market
  placeAsset(ctx, 'streetsign_04', -22, 0, -8, SCALE_SIGN, -0.9)
}
