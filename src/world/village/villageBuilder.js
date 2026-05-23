import * as THREE from 'three'
import { clearSceneForNextLevel } from '../../utils/helpers.js'

// environment + terrain (always needed)
import { setupEnvironment } from './environment/environment.js'
import { createTerrain }    from './terrain/terrain.js'

// roads
import { createRoads } from './roads/roads.js'

// ── FOUNDATION PASS: structures, props, signs, lamps are DISABLED ────────────
// Uncomment each block when ready to add that layer back.
// Do NOT delete these imports — they are re-enabled one by one later.
import { createEntrance }            from './structures/entrance.js'
import { createStreetHouses }       from './structures/streetHouses.js'
import { createHeroHouse }           from './structures/heroHouse.js'
// import { createGardenPlants }    from './nature/gardenPlants.js'
// import { createMountain }        from './nature/mountain.js'
// import { createStreetLamps }     from './props/streetLamps.js'
// import { createDecorItems }      from './props/decorItems.js'
// import { createNavigationSigns } from './props/signs.js'

// nature — trees only (foundation pass keeps entrance + backdrop trees)
import { createStreetTrees } from './nature/streetTrees.js'
import { createOuterRocks }  from './nature/outerRocks.js'

// props — village detail layer
import { createVillageProps } from './props/villageProps.js'
import { createMarketZone }   from './props/marketZone.js'
import { createFarmZone }     from './props/farmZone.js'

// player + camera
import { setupPlayer } from './player/playerController.js'
import { setupCamera } from './player/cameraController.js'

// utils
import { setActiveSpawnContext, clearActiveSpawnContext } from './utils/assetLoader.js'

// =====================================================
// INIT
// =====================================================

export function addVillageWorld(ctx) {
  ctx.activeScene      = 'village'
  ctx.transitioning    = false
  ctx.transitionQueued = false
  ctx.car              = null

  clearSceneForNextLevel(ctx)

  if (ctx.player) {
    ctx.scene.remove(ctx.player)
    ctx.player = null
  }

  // village root group — everything attaches here
  ctx.villageGroup = new THREE.Group()
  ctx.scene.add(ctx.villageGroup)

  // ── environment ─────────────────────────────────
  setupEnvironment(ctx)

  // ── terrain ─────────────────────────────────────
  createTerrain(ctx)

  // ── roads ───────────────────────────────────────────────────────────────
  createRoads(ctx)

  // ── nature: trees only ───────────────────────────
  // Structures / props spawn after ctx is populated — keep setActiveSpawnContext
  setActiveSpawnContext(ctx)
  ctx.villageOccupied = []

  // ── nature framing (forest band + cluster groves) ─
  createStreetTrees(ctx)
  createOuterRocks(ctx)      // rough rocky landscape around the village

  // ── structures ───────────────────────────────────
  createEntrance(ctx)        // welcoming arch + sign at spawn
  createHeroHouse(ctx)       // emotional centre of the world
  createStreetHouses(ctx)    // organic side hamlets framing the hero

  // ── props: village detail layer (first pass) ─────
  createVillageProps(ctx)    // streetlights, signs, benches, storage props
  createMarketZone(ctx)      // small front-left market / food corner
  createFarmZone(ctx)        // back-right farm / storage working corner

  // ── DISABLED: secondary nature ───────────────────
  // createGardenPlants(ctx)
  // createMountain(ctx)

  // ── DISABLED: props / signs / lamps ──────────────
  // createStreetLamps(ctx)
  // createDecorItems(ctx)
  // createNavigationSigns(ctx)

  clearActiveSpawnContext()

  ctx.rockColliders = []

  // ── player + camera ─────────────────────────────
  setupPlayer(ctx)
  setupCamera(ctx)
}

// =====================================================
// UPDATE (called every frame)
// =====================================================

export function updateVillageWorld(ctx) {
  if (ctx.updatePlayer) {
    ctx.updatePlayer(ctx.delta || 0.016)
  }

  if (ctx.dynamicUpdaters) {
    const time = performance.now()
    ctx.dynamicUpdaters.forEach((fn) => fn(time))
  }
}
