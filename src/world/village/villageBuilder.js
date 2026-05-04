import * as THREE from 'three'
import { addHotspot, createVillageUi } from '../../systems/interaction.js'
import { clearSceneForNextLevel } from '../../utils/helpers.js'
import { loadGLBModel } from '../../utils/loaders.js'

function addToVillage(ctx, object) {
  ctx.villageGroup.add(object)
  return object
}

const villageModelCache = new Map()
let activeSpawnContext = null

function loadModel(ctx, path, position, scale = 1, rotation = 0) {
  const holder = new THREE.Group()
  holder.position.set(position[0], position[1], position[2])
  holder.scale.setScalar(scale)
  if (Array.isArray(rotation)) {
    holder.rotation.set(rotation[0] || 0, rotation[1] || 0, rotation[2] || 0)
  } else {
    holder.rotation.y = rotation || 0
  }
  addToVillage(ctx, holder)

  const cached = villageModelCache.get(path)
  if (cached?.template) {
    holder.add(cached.template.clone(true))
    console.log('Reused GLB:', path)
    return holder
  }

  if (cached) {
    cached.waiting.push(holder)
    return holder
  }

  const entry = { template: null, waiting: [holder] }
  villageModelCache.set(path, entry)

  const basePath = path.substring(0, path.lastIndexOf('/') + 1)

  loadGLBModel(ctx.scene, path, [0, 0, 0], 1, 0, {
    path: basePath,
    addToScene: false,
    center: false,
    groundAlign: true,
    onLoad: (model) => {
      entry.template = model
      entry.waiting.forEach((waitingHolder) => {
        waitingHolder.add(model.clone(true))
      })
      entry.waiting.length = 0
      console.log('Cached GLB for village reuse:', path)
    }
  })

  return holder
}

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function toXZ(position) {
  return Array.isArray(position)
    ? { x: position[0], z: position[2] }
    : { x: position.x, z: position.z }
}

function distanceXZ(a, b) {
  const dx = a.x - b.x
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dz * dz)
}

const VILLAGE_CLEAR_ZONES = [
  { x: 0, z: 8.8, radius: 3.4 },
  { x: 0, z: 0, radius: 2.2 },
  { x: 0, z: -3, radius: 2.0 }
]

const VILLAGE_ASSETS = {
  house: {
    paths: [
      '/assets/models/house/house_01.glb',
      '/assets/models/house/house_04.glb',
      '/assets/models/house/house_08.glb',
      '/assets/models/house/house_12.glb',
      '/assets/models/house/house_15.glb'
    ],
    scale: [1.55, 2.15],
    spread: 5.4,
    minDistance: 4.0,
    colliderRadius: 3.2
  },
  bench: {
    paths: ['/assets/models/bench/bench_a001.glb', '/assets/models/bench/bench_b001.glb'],
    scale: [1.05, 1.45],
    spread: 3.6,
    minDistance: 1.8
  },
  chair: {
    paths: ['/assets/models/chair/chair_a001.glb', '/assets/models/chair/chair_b001.glb'],
    scale: [0.95, 1.25],
    spread: 3.0,
    minDistance: 1.0
  },
  table: {
    paths: ['/assets/models/table/table_a001.glb', '/assets/models/table/table_b001.glb'],
    scale: [1.0, 1.3],
    spread: 2.4,
    minDistance: 1.8
  },
  foodish: {
    paths: ['/assets/models/foodish/fooddish_a001.glb', '/assets/models/foodish/fooddish_a003.glb'],
    scale: [0.75, 1.0],
    spread: 2.8,
    minDistance: 0.9
  },
  cratebox: {
    paths: ['/assets/models/cratebox/cratebox_a001.glb', '/assets/models/cratebox/cratebox_b002.glb', '/assets/models/cratebox/cratebox_d001.glb'],
    scale: [0.85, 1.15],
    spread: 3.2,
    minDistance: 1.0
  },
  barrel: {
    paths: ['/assets/models/barrel/barrel_a001.glb', '/assets/models/barrel/barrel_b001.glb'],
    scale: [0.85, 1.15],
    spread: 2.6,
    minDistance: 1.0
  },
  brick: {
    paths: ['/assets/models/brick/brick_a001.glb', '/assets/models/brick/brick_a004.glb'],
    scale: [0.85, 1.2],
    spread: 2.8,
    minDistance: 0.8
  },
  bucket: {
    paths: ['/assets/models/bucket/bucket_a001.glb', '/assets/models/bucket/bucket_b001.glb'],
    scale: [0.85, 1.15],
    spread: 2.2,
    minDistance: 0.9
  },
  props: {
    paths: ['/assets/models/props/props_01.glb', '/assets/models/props/props_12.glb', '/assets/models/props/props_28.glb', '/assets/models/props/props_44.glb'],
    scale: [0.75, 1.15],
    spread: 2.7,
    minDistance: 1.0
  },
  farmbuilding: {
    paths: ['/assets/models/farmbuilding/farmbuilding_01.glb', '/assets/models/farmbuilding/farmbuilding_04.glb'],
    scale: [1.7, 2.25],
    spread: 5.0,
    minDistance: 4.0,
    colliderRadius: 3.4
  },
  farmstractures: {
    paths: ['/assets/models/farmstractures/farmstractures_01.glb', '/assets/models/farmstractures/farmstractures_08.glb', '/assets/models/farmstractures/farmstractures_20.glb'],
    scale: [1.0, 1.45],
    spread: 5.5,
    minDistance: 2.0
  },
  milktank: {
    paths: ['/assets/models/milktank/milktank_a001.glb'],
    scale: [1.0, 1.25],
    spread: 2.6,
    minDistance: 1.3
  },
  watersprinkler: {
    paths: ['/assets/models/watersprinkler/watersprinkler_a001.glb', '/assets/models/watersprinkler/watersprinkler_a004.glb'],
    scale: [0.9, 1.15],
    spread: 5.8,
    minDistance: 1.8
  },
  lawnmover: {
    paths: ['/assets/models/lawnmover/lawn mower_a001.glb'],
    scale: [1.0, 1.25],
    spread: 2.6,
    minDistance: 1.4
  },
  foodholder: {
    paths: ['/assets/models/little foodholder/littlefoodholder_a001.glb', '/assets/models/little foodholder/littlefoodholder_b001.glb'],
    scale: [0.85, 1.1],
    spread: 2.4,
    minDistance: 1.0
  },
  waterdish: {
    paths: ['/assets/models/waterdish/waterdish_a001.glb', '/assets/models/waterdish/waterdish_a003.glb'],
    scale: [0.85, 1.05],
    spread: 2.2,
    minDistance: 1.0
  },
  trees: {
    paths: [
      '/assets/models/trees/tree_01.glb',
      '/assets/models/trees/tree_02.glb',
      '/assets/models/trees/tree_03.glb',
      '/assets/models/trees/tree_04.glb',
      '/assets/models/trees/tree_05.glb',
      '/assets/models/trees/tree_06.glb',
      '/assets/models/trees/tree_07.glb',
      '/assets/models/trees/tree_08.glb',
      '/assets/models/trees/tree_09.glb',
      '/assets/models/trees/tree_10.glb'
    ],
    scale: [1.15, 1.8],
    spread: 7.2,
    minDistance: 2.4
  },
  rocks: {
    paths: ['/assets/models/rocks/rocks_01.glb', '/assets/models/rocks/rocks_03.glb', '/assets/models/rocks/rocks_06.glb'],
    scale: [0.8, 1.35],
    spread: 5.5,
    minDistance: 1.5
  },
  green: {
    paths: ['/assets/models/green/green_01.glb', '/assets/models/green/green_06.glb', '/assets/models/green/green_13.glb'],
    scale: [0.8, 1.35],
    spread: 5.0,
    minDistance: 1.2
  },
  streetlight: {
    paths: ['/assets/models/streetlight and sign/streetlight_a001.glb', '/assets/models/streetlight and sign/streetlight_a004.glb'],
    scale: [1.25, 1.65],
    spread: 1.4,
    minDistance: 2.0
  },
  streetsign: {
    paths: ['/assets/models/streetlight and sign/streetsign_a001.glb', '/assets/models/streetlight and sign/streetsign_a003.glb'],
    scale: [1.0, 1.25],
    spread: 1.6,
    minDistance: 1.4
  },
  bridge: {
    paths: ['/assets/models/bridge/bridge_01.glb', '/assets/models/bridge/bridge_04.glb'],
    scale: [1.8, 2.3],
    spread: 0.8,
    minDistance: 3.0
  },
  bonfire: {
    paths: ['/assets/models/bonfire/bonfire_a001.glb'],
    scale: [1.0, 1.25],
    spread: 0.8,
    minDistance: 2.0
  }
}

function isVillageSpotClear(ctx, point, minDistance) {
  const occupied = ctx.villageOccupied || []
  return [...occupied, ...VILLAGE_CLEAR_ZONES].every((zone) => {
    return distanceXZ(point, zone) >= minDistance + zone.radius
  })
}

function reserveVillageSpot(ctx, point, radius) {
  if (!ctx.villageOccupied) ctx.villageOccupied = []
  ctx.villageOccupied.push({ x: point.x, z: point.z, radius })
}

function findClusterPosition(ctx, center, config, index) {
  const origin = toXZ(center)
  const spread = config.spread ?? 3
  const minDistance = config.minDistance ?? 1

  for (let attempt = 0; attempt < 18; attempt++) {
    const angle = rand(0, Math.PI * 2)
    const radius = rand(spread * 0.22, spread)
    const point = {
      x: origin.x + Math.cos(angle) * radius,
      z: origin.z + Math.sin(angle) * radius
    }

    if (Math.abs(point.x) > 24 || point.z > 18 || point.z < -28) continue
    if (isVillageSpotClear(ctx, point, minDistance)) return point
  }

  const fallbackAngle = index * 2.399
  return {
    x: origin.x + Math.cos(fallbackAngle) * spread * 0.65,
    z: origin.z + Math.sin(fallbackAngle) * spread * 0.65
  }
}

function spawnVillageAsset(ctx, type, position, options = {}) {
  const config = VILLAGE_ASSETS[type]
  if (!config) return null

  const path = options.path || pick(config.paths)
  const scaleRange = options.scaleRange || config.scale
  const scale = options.scale ?? rand(scaleRange[0], scaleRange[1])
  const rotation = options.rotation ?? rand(-Math.PI, Math.PI)
  const object = loadModel(ctx, path, [position.x, options.y ?? 0, position.z], scale, rotation)
  const radius = options.radius ?? config.colliderRadius

  if (radius) {
    ctx.rockColliders.push({ mesh: object, radius: radius * scale })
  }

  reserveVillageSpot(ctx, position, options.reserveRadius ?? config.minDistance ?? 1)
  return object
}

function spawnCluster(type, centerPosition, count, options = {}) {
  const ctx = options.ctx || activeSpawnContext
  const config = { ...VILLAGE_ASSETS[type], ...options }
  if (!ctx || !VILLAGE_ASSETS[type]) return []

  const spawned = []
  for (let i = 0; i < count; i++) {
    const position = findClusterPosition(ctx, centerPosition, config, i)
    const object = spawnVillageAsset(ctx, type, position, options)
    if (object) spawned.push(object)
  }
  return spawned
}

function createNoiseTexture(base, accent, size = 256, speckles = 1800) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < speckles; i++) {
    const alpha = Math.random() * 0.16 + 0.03
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`
    ctx.fillRect(Math.random() * size, Math.random() * size, Math.random() * 3 + 1, Math.random() * 3 + 1)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createStoneTexture() {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#c9b89d'
  ctx.fillRect(0, 0, size, size)

  for (let y = -40; y < size + 80; y += 54) {
    for (let x = -30; x < size + 80; x += 72) {
      const w = 48 + Math.random() * 42
      const h = 32 + Math.random() * 34
      const px = x + Math.random() * 12
      const py = y + Math.random() * 12
      ctx.fillStyle = `rgb(${178 + Math.random() * 38},${162 + Math.random() * 28},${132 + Math.random() * 22})`
      ctx.beginPath()
      ctx.moveTo(px + 6, py)
      ctx.lineTo(px + w - 7, py + Math.random() * 5)
      ctx.lineTo(px + w, py + h - 8)
      ctx.lineTo(px + 7, py + h)
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = 'rgba(95,77,58,0.26)'
      ctx.lineWidth = 3
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(7, 7)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createTerracottaTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#a84f2c'
  ctx.fillRect(0, 0, 256, 256)

  for (let y = 0; y < 256; y += 22) {
    for (let x = 0; x < 256; x += 32) {
      const offset = y % 44 === 0 ? 0 : 16
      ctx.fillStyle = `rgb(${150 + Math.random() * 42},${66 + Math.random() * 26},${36 + Math.random() * 18})`
      ctx.fillRect(x + offset, y, 28, 17)
      ctx.strokeStyle = 'rgba(76,38,24,0.35)'
      ctx.strokeRect(x + offset, y, 28, 17)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2.5, 2.5)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createSkyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#3d8fce')
  gradient.addColorStop(0.55, '#8fc6ea')
  gradient.addColorStop(1, '#f0d2a5')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 7; i++) {
    const x = Math.random() * canvas.width
    const y = 85 + Math.random() * 120
    const w = 34 + Math.random() * 58
    ctx.fillStyle = 'rgba(255,255,255,0.14)'
    for (let j = 0; j < 5; j++) {
      ctx.beginPath()
      ctx.ellipse(x + j * w * 0.2, y + Math.random() * 5, w * (0.14 + Math.random() * 0.06), 5 + Math.random() * 5, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function makeMat(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    map: options.map || null,
    roughness: options.roughness ?? 0.86,
    metalness: options.metalness ?? 0,
    emissive: options.emissive ? new THREE.Color(options.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: options.emissiveIntensity ?? 0
  })
}

function addVillageLights(ctx) {
  // Warm ambient base
  ctx.scene.add(new THREE.AmbientLight(0xffd8a8, 0.85))

  // Soft sky-ground bounce
  const hemi = new THREE.HemisphereLight(0xffc58a, 0x4a3b2a, 1.2)
  ctx.scene.add(hemi)

  // Main sunset sun (directional)
  const sun = new THREE.DirectionalLight(0xffb56b, 5.5)
  sun.position.set(-25, 35, 15)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.left = -60
  sun.shadow.camera.right = 60
  sun.shadow.camera.top = 60
  sun.shadow.camera.bottom = -60
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 120
  ctx.scene.add(sun)

  // Warm fill light (soft glow)
  const fill = new THREE.DirectionalLight(0xffe1b5, 1.2)
  fill.position.set(20, 10, -20)
  ctx.scene.add(fill)

  // Slight orange point glow near center (sun bounce feel)
  const glow = new THREE.PointLight(0xff9e57, 2.5, 40)
  glow.position.set(0, 6, 6)
  ctx.scene.add(glow)
}

function addVillageGround(ctx, materials) {
  const groundGeo = new THREE.PlaneGeometry(300, 300, 128, 128)
  const pos = groundGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const height = Math.sin(x * 0.16) * 0.08 + Math.cos(y * 0.13) * 0.07
    pos.setZ(i, height)
  }
  groundGeo.computeVertexNormals()

  const ground = new THREE.Mesh(groundGeo, materials.grass)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  addToVillage(ctx, ground)

  const baseGround = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshStandardMaterial({
      color: 0x6d8f4e,
      roughness: 1,
      metalness: 0
    })
  )
  baseGround.rotation.x = -Math.PI / 2
  baseGround.position.y = -0.2
  baseGround.receiveShadow = true
  addToVillage(ctx, baseGround)

  const plazaGeo = new THREE.CircleGeometry(12.5, 72)
  const plazaPos = plazaGeo.attributes.position
  for (let i = 0; i < plazaPos.count; i++) {
    const x = plazaPos.getX(i)
    const y = plazaPos.getY(i)
    plazaPos.setZ(i, Math.sin(x * 0.35) * 0.025 + Math.cos(y * 0.4) * 0.018)
  }
  plazaGeo.computeVertexNormals()

  const plaza = new THREE.Mesh(plazaGeo, materials.stone)
  plaza.rotation.x = -Math.PI / 2
  plaza.position.y = 0.055
  plaza.receiveShadow = true
  addToVillage(ctx, plaza)

  const curves = [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 15),
      new THREE.Vector3(-2, 0, 8),
      new THREE.Vector3(-8, 0, 3),
      new THREE.Vector3(-15, 0, 0)
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(1, 0, 14),
      new THREE.Vector3(6, 0, 8),
      new THREE.Vector3(10, 0, 1),
      new THREE.Vector3(17, 0, -3)
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, -9),
      new THREE.Vector3(-4, 0, -15),
      new THREE.Vector3(-1, 0, -22),
      new THREE.Vector3(4, 0, -28)
    ])
  ]

  curves.forEach((curve) => {
    const path = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, 1.2, 8, false), materials.path)
    path.scale.y = 0.018
    path.position.y = 0.075
    path.receiveShadow = true
    addToVillage(ctx, path)
  })
}

function addVillageBackdrop(ctx, materials) {
  const seaMat = new THREE.MeshStandardMaterial({
    color: 0x2f7fa9,
    roughness: 0.42,
    metalness: 0,
    emissive: new THREE.Color(0x0d3048),
    emissiveIntensity: 0.08
  })
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(600, 200, 8, 8), seaMat)
  sea.rotation.x = -Math.PI / 2
  sea.position.set(0, -0.12, -38)
  sea.receiveShadow = true
  addToVillage(ctx, sea)

  const mountainMat = makeMat(0x8f9a91, { roughness: 0.96 })
  ;[
    [-80, -120, 20, 12, 0.2],
    [-40, -130, 24, 16, -0.1],
    [60, -125, 28, 18, 0.15],
    [100, -135, 22, 14, -0.25]
  ].forEach(([x, z, w, h, r]) => {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(w, h, 5), mountainMat)
    hill.position.set(x, h * 0.35 - 1.2, z)
    hill.rotation.y = r
    hill.scale.z = 0.45
    addToVillage(ctx, hill)
  })

  ;[
    [-16, -16, 13, 1.2, 0.18],
    [15, -16.5, 13, 1.2, -0.18],
    [0, -20.5, 12, 1.35, 0]
  ].forEach(([x, z, w, h, r]) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.8), materials.stoneDark)
    wall.position.set(x, h / 2, z)
    wall.rotation.y = r
    wall.castShadow = true
    wall.receiveShadow = true
    addToVillage(ctx, wall)
  })
}

function addForegroundFraming(ctx, materials) {
  const wallMat = materials.stoneDark
  const capMat = materials.stone
  const leafMat = makeMat(0x2f7b43, { roughness: 0.9 })
  const flowerMat = makeMat(0xd8485f, { roughness: 0.82 })

  ;[
    [-9.8, 12.8, 8.6, -0.35],
    [9.8, 12.8, 8.6, 0.35]
  ].forEach(([x, z, length, r]) => {
    const wall = new THREE.Group()
    const base = new THREE.Mesh(new THREE.BoxGeometry(length, 1.0, 1.0), wallMat)
    base.position.y = 0.5
    base.castShadow = true
    base.receiveShadow = true
    wall.add(base)

    const cap = new THREE.Mesh(new THREE.BoxGeometry(length + 0.35, 0.22, 1.25), capMat)
    cap.position.y = 1.1
    cap.castShadow = true
    wall.add(cap)

    for (let i = 0; i < 16; i++) {
      const plant = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), i % 5 === 0 ? flowerMat : leafMat)
      plant.position.set(-length / 2 + Math.random() * length, 1.36 + Math.random() * 0.25, (Math.random() - 0.5) * 0.65)
      plant.scale.set(1.2, 0.75, 1)
      plant.castShadow = true
      wall.add(plant)
    }

    wall.position.set(x, 0, z)
    wall.rotation.y = r
    addToVillage(ctx, wall)
  })

  for (let i = 0; i < 7; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(6.2 - i * 0.25, 0.16, 0.65), capMat)
    step.position.set(0, 0.08 + i * 0.025, 15.6 - i * 0.52)
    step.castShadow = true
    step.receiveShadow = true
    addToVillage(ctx, step)
  }
}

function addWindow(parent, x, y, z, material) {
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.92, 0.12), parent.userData.trimMat)
  frame.position.set(x, y, z - 0.01)
  parent.add(frame)

  const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.64, 0.14), material)
  windowMesh.position.set(x, y, z)
  parent.add(windowMesh)

  const shutterMat = parent.userData.shutterMat
  ;[-0.43, 0.43].forEach((dx) => {
    const shutter = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.74, 0.13), shutterMat)
    shutter.position.set(x + dx, y, z + 0.025)
    parent.add(shutter)
  })
}

function addFacadeDetails(building, size, trimMat, accentMat) {
  const balconyMat = makeMat(0x211b18, { roughness: 0.54, metalness: 0.18 })
  if (size[1] > 3.2) {
    const balcony = new THREE.Group()
    const slab = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.72), trimMat)
    slab.position.set(0, 2.1, size[2] / 2 + 0.38)
    balcony.add(slab)
    for (let i = 0; i < 6; i++) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.06), balconyMat)
      rail.position.set(-0.9 + i * 0.36, 2.45, size[2] / 2 + 0.74)
      balcony.add(rail)
    }
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.08), balconyMat)
    topRail.position.set(0, 2.78, size[2] / 2 + 0.74)
    balcony.add(topRail)
    building.add(balcony)
  }

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.95, 0.36), trimMat)
  chimney.position.set(size[0] * 0.28, size[1] + 0.85, -size[2] * 0.12)
  chimney.castShadow = true
  building.add(chimney)

  const roofLip = new THREE.Mesh(new THREE.BoxGeometry(size[0] + 0.75, 0.12, 0.18), accentMat)
  roofLip.position.set(0, size[1] + 0.18, size[2] / 2 + 0.38)
  building.add(roofLip)

  ;[-size[0] * 0.42, size[0] * 0.42].forEach((x) => {
    const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 2.0, 5), makeMat(0x2f6d3c, { roughness: 1 }))
    vine.position.set(x, 1.2, size[2] / 2 + 0.11)
    vine.rotation.z = 0.12 * Math.sign(x)
    building.add(vine)
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 5), makeMat(0x3d8c48, { roughness: 1 }))
      leaf.position.set(x + (Math.random() - 0.5) * 0.28, 0.45 + i * 0.34, size[2] / 2 + 0.16)
      building.add(leaf)
    }
  })
}

function addBuilding(ctx, {
  name,
  position,
  size,
  wall,
  roof,
  roofHeight = 1.2,
  signColor = 0xf6d38c,
  trimColor = 0x3d2d25,
  yaw = 0,
  awning = false,
  porch = false
}) {
  const building = new THREE.Group()
  const wallMat = ctx.materialsCache?.wallMats?.get(wall) || makeMat(wall, { map: ctx.materialsCache?.plaster, roughness: 0.92 })
  const roofMat = makeMat(roof, { map: ctx.materialsCache?.terracotta, roughness: 0.84 })
  const trimMat = makeMat(trimColor, { roughness: 0.8 })
  const shutterMat = makeMat(signColor, { roughness: 0.68 })
  const accentMat = makeMat(signColor, { roughness: 0.74 })
  const windowMat = makeMat(0xffd37a, { emissive: 0xffa83d, emissiveIntensity: 0.45 })
  building.userData.trimMat = trimMat
  building.userData.shutterMat = shutterMat

  const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2], 2, 3, 2), wallMat)
  body.position.y = size[1] / 2
  body.castShadow = true
  body.receiveShadow = true
  building.add(body)

  const roofMesh = new THREE.Mesh(
    new THREE.ConeGeometry(Math.max(size[0], size[2]) * 0.78, roofHeight, 4, 1),
    roofMat
  )
  roofMesh.position.y = size[1] + roofHeight * 0.45
  roofMesh.rotation.y = Math.PI / 4
  roofMesh.scale.x = size[0] / Math.max(size[0], size[2])
  roofMesh.scale.z = size[2] / Math.max(size[0], size[2])
  roofMesh.castShadow = true
  building.add(roofMesh)

  const eave = new THREE.Mesh(new THREE.BoxGeometry(size[0] + 0.55, 0.16, size[2] + 0.55), roofMat)
  eave.position.y = size[1] + 0.08
  eave.castShadow = true
  building.add(eave)

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.45, 0.1), trimMat)
  door.position.set(0, 0.75, size[2] / 2 + 0.055)
  building.add(door)

  const doorArch = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.045, 8, 18, Math.PI), trimMat)
  doorArch.position.set(0, 1.43, size[2] / 2 + 0.09)
  doorArch.rotation.z = Math.PI
  building.add(doorArch)

  addWindow(building, -size[0] * 0.28, 1.7, size[2] / 2 + 0.06, windowMat)
  addWindow(building, size[0] * 0.28, 1.7, size[2] / 2 + 0.06, windowMat)
  if (size[1] > 3.1) addWindow(building, 0, 2.65, size[2] / 2 + 0.06, windowMat)

  const sign = new THREE.Mesh(new THREE.BoxGeometry(size[0] * 0.62, 0.38, 0.12), makeMat(signColor))
  sign.position.set(0, size[1] + 0.12, size[2] / 2 + 0.1)
  building.add(sign)

  if (awning) {
    const stripeMats = [makeMat(0xbb3f3a), makeMat(0xf3dfb6)]
    for (let i = 0; i < 5; i++) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.18, 1.2), stripeMats[i % 2])
      stripe.position.set(-1.25 + i * 0.62, 1.35, size[2] / 2 + 0.72)
      stripe.rotation.x = -0.35
      stripe.castShadow = true
      building.add(stripe)
    }
  }

  if (porch) {
    const deck = new THREE.Mesh(new THREE.BoxGeometry(size[0] * 0.7, 0.16, 1.4), trimMat)
    deck.position.set(0, 0.08, size[2] / 2 + 0.72)
    deck.receiveShadow = true
    building.add(deck)

    const postGeo = new THREE.BoxGeometry(0.12, 1.6, 0.12)
    ;[-1.35, 1.35].forEach((x) => {
      const post = new THREE.Mesh(postGeo, trimMat)
      post.position.set(x, 0.85, size[2] / 2 + 1.25)
      building.add(post)
    })
  }

  addFacadeDetails(building, size, trimMat, accentMat)

  building.position.set(...position)
  building.rotation.y = yaw
  addToVillage(ctx, building)
  ctx.rockColliders.push({ mesh: building, radius: Math.max(size[0], size[2]) * 0.72 })
  building.userData.name = name

  return building
}

function addCafeDetails(ctx, materials) {
  const wood = materials.wood
  const chairMat = materials.roofRed
  const tableGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 12)
  const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8)
  const seatGeo = new THREE.BoxGeometry(0.42, 0.16, 0.42)
  const umbrellaPoleGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.9, 8)
  const umbrellaGeo = new THREE.ConeGeometry(1.25, 0.55, 18)

  ;[
    [-14.2, -7.0, 0xc64f45],
    [-10.5, -8.4, 0x3f7fb6],
    [-12.4, -4.7, 0xe8c15f]
  ].forEach(([x, z, color]) => {
    const table = new THREE.Mesh(tableGeo, wood)
    table.position.set(x, 0.72, z)
    table.castShadow = true
    addToVillage(ctx, table)

    const leg = new THREE.Mesh(legGeo, wood)
    leg.position.set(x, 0.36, z)
    addToVillage(ctx, leg)

    ;[
      [x - 0.75, z],
      [x + 0.75, z],
      [x, z - 0.75],
      [x, z + 0.75]
    ].forEach(([cx, cz]) => {
      const chair = new THREE.Mesh(seatGeo, chairMat)
      chair.position.set(cx, 0.38, cz)
      chair.castShadow = true
      addToVillage(ctx, chair)
    })

    const pole = new THREE.Mesh(umbrellaPoleGeo, wood)
    pole.position.set(x, 1.55, z)
    addToVillage(ctx, pole)

    const umbrella = new THREE.Mesh(umbrellaGeo, makeMat(color, { roughness: 0.72 }))
    umbrella.position.set(x, 2.55, z)
    umbrella.castShadow = true
    addToVillage(ctx, umbrella)
  })
}

function addTrees(ctx, materials) {
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.28, 2.0, 9)
  const leafGeo = new THREE.SphereGeometry(1.25, 12, 10)
  const treePositions = [
    [-20, 0, 16], [-22, 0, 2], [-18, 0, -17], [-5, 0, -27],
    [7, 0, -27], [19, 0, -18], [23, 0, 4], [17, 0, 17], [3, 0, 18]
  ]

  treePositions.forEach((position, index) => {
    const tree = new THREE.Group()
    const trunk = new THREE.Mesh(trunkGeo, materials.wood)
    trunk.position.y = 0.8
    trunk.castShadow = true
    tree.add(trunk)

    for (let i = 0; i < 4; i++) {
      const leaves = new THREE.Mesh(leafGeo, materials.leaves)
      leaves.position.set((Math.random() - 0.5) * 0.8, 2.35 + i * 0.22, (Math.random() - 0.5) * 0.8)
      leaves.scale.setScalar(0.75 + Math.random() * 0.25)
      leaves.castShadow = true
      tree.add(leaves)
    }

    tree.position.set(...position)
    tree.rotation.y = index * 0.45
    addToVillage(ctx, tree)
  })
}

function addVillageExit(ctx, materials) {
  const arch = new THREE.Group()
  const pillarGeo = new THREE.BoxGeometry(0.7, 3.2, 0.7)
  const lintelGeo = new THREE.BoxGeometry(4.6, 0.55, 0.7)

  ;[-1.9, 1.9].forEach((x) => {
    const pillar = new THREE.Mesh(pillarGeo, materials.stoneDark)
    pillar.position.set(x, 1.6, 0)
    pillar.castShadow = true
    arch.add(pillar)
  })

  const lintel = new THREE.Mesh(lintelGeo, materials.stoneDark)
  lintel.position.set(0, 3.35, 0)
  lintel.castShadow = true
  arch.add(lintel)

  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.4),
    new THREE.MeshBasicMaterial({ color: 0x7acaa5, transparent: true, opacity: 0.18, depthWrite: false })
  )
  glow.position.set(0, 1.55, -0.06)
  arch.add(glow)

  arch.position.set(0, 0, -28)
  addToVillage(ctx, arch)
}

function addStreetProps(ctx, materials) {
  const metal = makeMat(0x1d1c1a, { roughness: 0.5, metalness: 0.45 })
  const glowMat = makeMat(0xffd783, { emissive: 0xffb540, emissiveIntensity: 1.3 })
  const potMat = makeMat(0xb8663d, { roughness: 0.9 })
  const flowerMats = [makeMat(0xd94f70), makeMat(0xffc857), makeMat(0x6dbf76)]
  const benchMat = makeMat(0x8b5e3c, { roughness: 0.8 })

  const lampPositions = [[-5.8, -7.2], [6.6, -6.4], [-8.5, 5.5], [8.7, 5.8]]
  lampPositions.forEach(([x, z]) => {
    const lamp = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3.2, 10), metal)
    pole.position.y = 1.6
    lamp.add(pole)

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.38, 8), glowMat)
    cap.position.y = 3.28
    lamp.add(cap)

    const top = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.22, 8), metal)
    top.position.y = 3.58
    lamp.add(top)

    lamp.position.set(x, 0, z)
    addToVillage(ctx, lamp)
  })

  ;[
    [-7.2, 0.6], [7.5, 0.8], [-12.1, -7.8], [12.8, -6.5],
    [-3.2, 9.2], [4.3, 9.0], [15.6, 4.8], [-16.2, 3.4],
    [-10.5, 10.8], [10.4, 11.2], [1.5, -11.6]
  ].forEach(([x, z], index) => {
    const pot = new THREE.Group()
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.24, 0.52, 12), potMat)
    base.position.y = 0.26
    base.castShadow = true
    pot.add(base)
    for (let i = 0; i < 5; i++) {
      const plant = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), flowerMats[(index + i) % flowerMats.length])
      plant.position.set((Math.random() - 0.5) * 0.45, 0.62 + Math.random() * 0.25, (Math.random() - 0.5) * 0.45)
      plant.castShadow = true
      pot.add(plant)
    }
    pot.position.set(x, 0, z)
    addToVillage(ctx, pot)
  })

  ;[
    [-3.8, 7.9, 0.2],
    [4.1, 7.6, -0.15],
    [0, -10.2, 0]
  ].forEach(([x, z, r]) => {
    const bench = new THREE.Group()
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.18, 0.48), benchMat)
    seat.position.y = 0.52
    seat.castShadow = true
    bench.add(seat)
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 0.42), benchMat)
    back.position.set(0, 0.92, -0.3)
    back.rotation.x = -0.22
    bench.add(back)
    ;[-0.78, 0.78].forEach((lx) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.52, 0.14), materials.stoneDark)
      leg.position.set(lx, 0.26, 0.05)
      bench.add(leg)
    })
    bench.position.set(x, 0, z)
    bench.rotation.y = r
    addToVillage(ctx, bench)
  })
}

function addSideFacades(ctx) {
  addBuilding(ctx, {
    name: 'Left Cafe Facade',
    position: [-18.5, 0.12, 6.5],
    size: [7.2, 4.2, 5.4],
    wall: 0xc98f34,
    roof: 0xb94b2e,
    signColor: 0xd95f45,
    trimColor: 0x5f4631,
    yaw: Math.PI * 0.38,
    awning: true
  })

  addBuilding(ctx, {
    name: 'Right Balcony Facade',
    position: [18.2, 0.12, 5.9],
    size: [7.4, 4.6, 5.2],
    wall: 0xe0c492,
    roof: 0xb84c2f,
    signColor: 0x6aa5c7,
    trimColor: 0x5d432c,
    yaw: -Math.PI * 0.36,
    porch: true
  })
}

function addResidentialArea(ctx) {
  const homes = [
    { path: '/assets/models/house/house_01.glb', x: -8.4, z: -4.4, scale: 2.0, rotation: Math.PI * 0.18 },
    { path: '/assets/models/house/house_04.glb', x: 7.8, z: -5.0, scale: 2.0, rotation: -Math.PI * 0.18 },
    { path: '/assets/models/house/house_08.glb', x: -11.8, z: 3.6, scale: 1.75, rotation: Math.PI * 0.34 },
    { path: '/assets/models/house/house_12.glb', x: 11.2, z: 3.2, scale: 1.75, rotation: -Math.PI * 0.34 },
    { path: '/assets/models/house/house_15.glb', x: 0, z: -11.8, scale: 2.25, rotation: Math.PI }
  ]

  homes.forEach((home) => {
    spawnVillageAsset(ctx, 'house', { x: home.x, z: home.z }, {
      path: home.path,
      scale: home.scale,
      rotation: home.rotation,
      reserveRadius: 3.4
    })
  })

  spawnCluster('bench', [-7.4, 0, 0.6], 3, { spread: 4.2, minDistance: 1.7 })
  spawnCluster('chair', [8.8, 0, -0.2], 5, { spread: 4.4, minDistance: 1.2 })
  spawnCluster('bucket', [-9.8, 0, 5.2], 4, { spread: 3.0, minDistance: 1.0 })
  spawnCluster('props', [9.8, 0, 5.0], 5, { spread: 3.4, minDistance: 1.0 })
}

function addCentralSocialHub(ctx) {
  const tableSpots = [
    { x: -3.4, z: -1.2 },
    { x: 0.4, z: 2.0 },
    { x: 3.8, z: -1.0 }
  ]

  tableSpots.forEach((spot, index) => {
    spawnVillageAsset(ctx, 'table', spot, {
      path: index === 1 ? '/assets/models/table/table_b001.glb' : '/assets/models/table/table_a001.glb',
      scale: 1.2,
      rotation: rand(-0.25, 0.25),
      reserveRadius: 1.6
    })

    ;[
      { x: spot.x - 1.0, z: spot.z, rotation: Math.PI / 2 },
      { x: spot.x + 1.0, z: spot.z, rotation: -Math.PI / 2 },
      { x: spot.x, z: spot.z - 1.0, rotation: 0 },
      { x: spot.x, z: spot.z + 1.0, rotation: Math.PI }
    ].forEach((chair) => {
      spawnVillageAsset(ctx, 'chair', chair, {
        scale: rand(0.9, 1.08),
        rotation: chair.rotation + rand(-0.16, 0.16),
        reserveRadius: 0.65
      })
    })

    spawnVillageAsset(ctx, 'foodish', { x: spot.x + 0.18, z: spot.z + 0.06 }, {
      scale: 0.75,
      rotation: rand(-Math.PI, Math.PI),
      y: 0.72,
      reserveRadius: 0.4
    })
  })

  spawnVillageAsset(ctx, 'bonfire', { x: 0.2, z: -1.8 }, {
    scale: 1.1,
    rotation: 0,
    reserveRadius: 1.8
  })
  spawnCluster('cratebox', [-4.8, 0, -4.2], 5, { spread: 2.6, minDistance: 0.9 })
  spawnCluster('foodholder', [4.8, 0, -4.0], 3, { spread: 2.1, minDistance: 1.0 })
}

function addFarmArea(ctx) {
  const farmCenter = { x: -15.0, z: -12.5 }

  spawnVillageAsset(ctx, 'farmbuilding', farmCenter, {
    path: '/assets/models/farmbuilding/farmbuilding_01.glb',
    scale: 1.9,
    rotation: Math.PI * 0.18,
    reserveRadius: 4.2
  })
  spawnVillageAsset(ctx, 'farmbuilding', { x: -20.0, z: -9.4 }, {
    path: '/assets/models/farmbuilding/farmbuilding_04.glb',
    scale: 1.55,
    rotation: Math.PI * 0.42,
    reserveRadius: 3.6
  })

  spawnCluster('farmstractures', [-15.5, 0, -17.0], 7, { spread: 5.0, minDistance: 1.8 })
  spawnCluster('milktank', [-11.5, 0, -10.5], 3, { spread: 2.6, minDistance: 1.2 })
  spawnCluster('watersprinkler', [-19.0, 0, -16.0], 5, { spread: 4.5, minDistance: 1.5 })
  spawnCluster('lawnmover', [-11.4, 0, -15.4], 1, { spread: 1.0, minDistance: 1.4 })
  spawnCluster('waterdish', [-12.8, 0, -8.0], 3, { spread: 2.2, minDistance: 1.0 })
  spawnCluster('barrel', [-18.2, 0, -8.0], 4, { spread: 2.5, minDistance: 1.0 })
}

function addRoadAndPathDetails(ctx) {
  const pathLights = [
    [-2.8, 6.3, 0.2],
    [2.8, 6.1, -0.2],
    [-5.6, 1.2, 0.4],
    [5.8, 1.0, -0.4],
    [-7.5, -5.9, 0.25],
    [7.5, -6.1, -0.25],
    [0, -13.8, 0]
  ]

  pathLights.forEach(([x, z, rotation]) => {
    spawnVillageAsset(ctx, 'streetlight', { x, z }, {
      scale: 1.45,
      rotation,
      reserveRadius: 1.4
    })
  })

  ;[
    [-3.8, 10.8, -0.25],
    [4.2, 10.7, 0.25],
    [-9.6, -1.8, Math.PI * 0.45],
    [9.8, -2.0, -Math.PI * 0.45]
  ].forEach(([x, z, rotation]) => {
    spawnVillageAsset(ctx, 'streetsign', { x, z }, {
      scale: 1.1,
      rotation,
      reserveRadius: 1.0
    })
  })
}

function addNatureLayer(ctx) {
  // 🌳 FAR BACKGROUND FOREST (dense wall for depth)
  for (let i = 0; i < 80; i++) {
    spawnVillageAsset(ctx, 'trees', {
      x: rand(-40, 40),
      z: rand(-35, -18)
    }, {
      path: VILLAGE_ASSETS.trees.paths[rand(2, 6) | 0], // bigger stylized trees
      scale: rand(1.4, 2.2),
      rotation: rand(-Math.PI, Math.PI),
      reserveRadius: 1.2
    })
  }

  // 🌲 MID FOREST CLUSTERS (organic groups)
  const midClusters = [
    [-18, 0, 12], [18, 0, 12],
    [-22, 0, 5], [22, 0, 5],
    [-15, 0, -10], [15, 0, -10]
  ]

  midClusters.forEach((center) => {
    for (let i = 0; i < 6; i++) {
      spawnVillageAsset(ctx, 'trees', {
        x: center[0] + rand(-5, 5),
        z: center[2] + rand(-5, 5)
      }, {
        path: VILLAGE_ASSETS.trees.paths[rand(0, 10) | 0],
        scale: rand(1.0, 1.6),
        rotation: rand(-Math.PI, Math.PI),
        reserveRadius: 1.4
      })
    }
  })

  // 🌾 FARMLAND EDGES (sparse, natural boundary)
  for (let i = 0; i < 25; i++) {
    spawnVillageAsset(ctx, 'trees', {
      x: rand(-30, 30),
      z: rand(5, 18)
    }, {
      path: VILLAGE_ASSETS.trees.paths[rand(0, 2) | 0], // smaller trees
      scale: rand(0.8, 1.2),
      rotation: rand(-Math.PI, Math.PI),
      reserveRadius: 1.0
    })
  }

  // 🌿 VILLAGE CENTER (light greenery, not dense)
  const villageCenters = [
    [-6, 0, 4], [6, 0, 4],
    [-4, 0, -4], [4, 0, -4]
  ]

  villageCenters.forEach((center) => {
    for (let i = 0; i < 3; i++) {
      spawnVillageAsset(ctx, 'trees', {
        x: center[0] + rand(-2, 2),
        z: center[2] + rand(-2, 2)
      }, {
        path: VILLAGE_ASSETS.trees.paths[rand(1, 5) | 0],
        scale: rand(0.9, 1.3),
        rotation: rand(-Math.PI, Math.PI),
        reserveRadius: 1.2
      })
    }
  })

  // 🪨 ROCKS + GREENERY SUPPORT (unchanged but balanced)
  spawnCluster('rocks', [-17, 0, 9], 6, { spread: 4.5, minDistance: 1.2 })
  spawnCluster('rocks', [16, 0, -15], 5, { spread: 4.0, minDistance: 1.2 })

  spawnCluster('green', [-4, 0, 13], 6, { spread: 4.0, minDistance: 1.0 })
  spawnCluster('green', [13, 0, 9], 6, { spread: 4.0, minDistance: 1.0 })
  spawnCluster('green', [-14, 0, -8], 5, { spread: 3.5, minDistance: 1.0 })
}

function addDetailLayer(ctx) {
  const detailCenters = [
    [-5.8, 0, 6.2],
    [5.8, 0, 5.8],
    [-6.2, 0, -5.2],
    [6.2, 0, -5.6],
    [-1.2, 0, -7.4],
    [1.6, 0, -7.2]
  ]

  detailCenters.forEach((center, index) => {
    spawnCluster(index % 2 === 0 ? 'barrel' : 'bucket', center, 2, {
      spread: 1.8,
      minDistance: 0.8
    })
    spawnCluster(index % 2 === 0 ? 'brick' : 'props', center, 2, {
      spread: 1.9,
      minDistance: 0.75
    })
  })
}

function addLivingVillageLayout(ctx) {
  activeSpawnContext = ctx
  ctx.villageOccupied = []

  addResidentialArea(ctx)
  addCentralSocialHub(ctx)
  addFarmArea(ctx)
  addRoadAndPathDetails(ctx)
  addNatureLayer(ctx)
  addDetailLayer(ctx)

  activeSpawnContext = null
}

function createTextTexture(title, lines = [], options = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = options.width || 512
  canvas.height = options.height || 256
  const context = canvas.getContext('2d')

  context.fillStyle = options.background || '#5a371f'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = options.border || '#c09052'
  context.lineWidth = 14
  context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

  context.fillStyle = options.color || '#ffe8bc'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = `700 ${options.titleSize || 42}px system-ui, sans-serif`
  context.fillText(title, canvas.width / 2, options.titleY || 74)

  context.font = `600 ${options.lineSize || 24}px system-ui, sans-serif`
  lines.forEach((line, index) => {
    context.fillText(line, canvas.width / 2, (options.lineY || 128) + index * (options.lineGap || 34))
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function addSignBoard(ctx, position, title, lines, options = {}) {
  const group = new THREE.Group()
  const wood = makeMat(options.wood || 0x5a371f, { roughness: 0.82 })
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(options.width || 3.6, options.height || 1.55, 0.18),
    new THREE.MeshStandardMaterial({
      map: createTextTexture(title, lines, options.texture || {}),
      roughness: 0.76
    })
  )
  board.position.y = options.boardY || 1.8
  group.add(board)

  ;[-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, options.postHeight || 2.2, 0.16), wood)
    post.position.set(side * ((options.width || 3.6) * 0.42), (options.postHeight || 2.2) / 2, -0.05)
    group.add(post)
  })

  group.position.set(position[0], position[1], position[2])
  group.rotation.y = options.rotation || 0
  addToVillage(ctx, group)
  return group
}

function addFenceLine(ctx, start, end, postCount) {
  const fence = new THREE.Group()
  const wood = makeMat(0x6b4327, { roughness: 0.9 })
  const dx = end.x - start.x
  const dz = end.z - start.z
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dx, dz)

  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, length), wood)
  rail.position.set((start.x + end.x) / 2, 0.72, (start.z + end.z) / 2)
  rail.rotation.y = angle
  fence.add(rail)

  const rail2 = rail.clone()
  rail2.position.y = 1.08
  fence.add(rail2)

  for (let i = 0; i < postCount; i++) {
    const t = postCount === 1 ? 0.5 : i / (postCount - 1)
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.34, 0.24), wood)
    post.position.set(start.x + dx * t, 0.67, start.z + dz * t)
    post.rotation.y = angle
    fence.add(post)
  }

  addToVillage(ctx, fence)
}

function addFenceBoundary(ctx, center, width, depth, gateWidth = 2.4) {
  const left = center.x - width / 2
  const right = center.x + width / 2
  const front = center.z + depth / 2
  const back = center.z - depth / 2

  addFenceLine(ctx, { x: left, z: back }, { x: right, z: back }, 9)
  addFenceLine(ctx, { x: left, z: back }, { x: left, z: front }, 7)
  addFenceLine(ctx, { x: right, z: back }, { x: right, z: front }, 7)
  addFenceLine(ctx, { x: left, z: front }, { x: -gateWidth / 2, z: front }, 4)
  addFenceLine(ctx, { x: gateWidth / 2, z: front }, { x: right, z: front }, 4)

  const gateMat = makeMat(0xf1e1c0, { roughness: 0.75 })
  ;[-0.62, 0.62].forEach((x) => {
    const gate = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.9, 0.12), gateMat)
    gate.position.set(x, 0.45, front)
    addToVillage(ctx, gate)
  })
}

function addDirtPlane(ctx, position, size, rotation = 0, color = 0xb77a45) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size[0], size[1]),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.96,
      transparent: true,
      opacity: 0.94
    })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.rotation.z = rotation
  mesh.position.set(position[0], 0.082, position[2])
  mesh.receiveShadow = true
  addToVillage(ctx, mesh)
  return mesh
}

function addStoneSteps(ctx, startZ, endZ) {
  const stone = makeMat(0xd8c6a5, { roughness: 0.9 })
  const count = 9
  for (let i = 0; i < count; i++) {
    const z = startZ + (endZ - startZ) * (i / (count - 1))
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.85 + (i % 3) * 0.18, 0.08, 0.42), stone)
    step.position.set((i % 2 - 0.5) * 0.18, 0.12, z)
    step.rotation.y = rand(-0.12, 0.12)
    step.receiveShadow = true
    addToVillage(ctx, step)
  }
}

function addWell(ctx, position) {
  const group = new THREE.Group()
  const stone = makeMat(0x9c8971, { roughness: 0.94 })
  const dark = makeMat(0x2c2320, { roughness: 0.8 })
  const wood = makeMat(0x6d4328, { roughness: 0.86 })

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.05, 0.82, 18), stone)
  base.position.y = 0.41
  group.add(base)

  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.04, 18), dark)
  water.position.y = 0.84
  group.add(water)

  ;[-0.62, 0.62].forEach((x) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.55, 0.12), wood)
    post.position.set(x, 1.48, 0)
    group.add(post)
  })

  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.15, 0.62, 4), makeMat(0x513726, { roughness: 0.82 }))
  roof.position.y = 2.35
  roof.rotation.y = Math.PI / 4
  group.add(roof)

  group.position.set(position[0], 0, position[2])
  addToVillage(ctx, group)
  ctx.rockColliders.push({ mesh: group, radius: 1.2 })
}

function addBullockCart(ctx, position) {
  const group = new THREE.Group()
  const wood = makeMat(0x7a4a2a, { roughness: 0.86 })
  const darkWood = makeMat(0x4f301b, { roughness: 0.9 })
  const hide = makeMat(0x6d3e25, { roughness: 0.78 })
  const horn = makeMat(0xd8c6a0, { roughness: 0.7 })

  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.36, 1.25), wood)
  bed.position.set(-0.6, 0.82, 0)
  group.add(bed)

  ;[-0.72, 0.72].forEach((z) => {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.08, 8, 18), darkWood)
    wheel.position.set(-1.45, 0.48, z)
    wheel.rotation.y = Math.PI / 2
    group.add(wheel)
  })

  ;[-0.34, 0.34].forEach((x) => {
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.09, 0.09), darkWood)
    shaft.position.set(x + 0.8, 0.78, 0)
    shaft.rotation.y = -0.08
    group.add(shaft)
  })

  ;[-0.38, 0.38].forEach((z) => {
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.72, 6, 10), hide)
    body.position.set(1.25, 0.66, z)
    body.rotation.z = Math.PI / 2
    group.add(body)

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), hide)
    head.position.set(1.82, 0.78, z)
    group.add(head)

    ;[-0.11, 0.11].forEach((hornZ) => {
      const hornMesh = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.28, 8), horn)
      hornMesh.position.set(2.0, 0.98, z + hornZ)
      hornMesh.rotation.z = -Math.PI / 2
      group.add(hornMesh)
    })
  })

  group.position.set(position[0], 0, position[2])
  group.rotation.y = Math.PI * 0.06
  addToVillage(ctx, group)
  ctx.rockColliders.push({ mesh: group, radius: 1.9 })
}

function addReferenceLighting(ctx) {
  ctx.scene.fog = new THREE.FogExp2(0xffc08a, 0.014)
  ctx.renderer.toneMappingExposure = 1.72

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(4.5, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0xffd071, transparent: true, opacity: 0.9 })
  )
  sun.position.set(-42, 18, -24)
  addToVillage(ctx, sun)
}

function addReferenceGround(ctx) {
  addDirtPlane(ctx, [0, 0, 10.5], [14, 7], 0, 0xb87945)
  addDirtPlane(ctx, [0, 0, 5.4], [3.0, 10.5], 0, 0xc58a55)
  addDirtPlane(ctx, [-10.2, 0, 3.4], [4.2, 14], -0.45, 0xb87945)
  addDirtPlane(ctx, [10.2, 0, 3.4], [4.2, 14], 0.45, 0xb87945)
  addDirtPlane(ctx, [0, 0, -4.0], [4.2, 9.5], 0, 0xb87945)
  addStoneSteps(ctx, 7.2, 1.8)
}

function addHeroHouse(ctx) {
  const mainHouse = loadModel(ctx, '/assets/models/house/house_15.glb', [0, 0, 0], 3.35, Math.PI)
  ctx.rockColliders.push({ mesh: mainHouse, radius: 4.9 })

  addFenceBoundary(ctx, { x: 0, z: 1.6 }, 12.8, 9.0, 2.4)
  addWell(ctx, [-4.5, 0, 1.4])

  spawnVillageAsset(ctx, 'trees', { x: -6.2, z: 3.3 }, { scale: 1.55, rotation: 0.3, reserveRadius: 1.6 })
  spawnVillageAsset(ctx, 'trees', { x: 6.0, z: 3.4 }, { scale: 1.45, rotation: -0.2, reserveRadius: 1.6 })
  spawnVillageAsset(ctx, 'green', { x: -3.2, z: 4.6 }, { scale: 1.0, rotation: 0.1, reserveRadius: 0.8 })
  spawnVillageAsset(ctx, 'green', { x: 3.2, z: 4.6 }, { scale: 1.0, rotation: -0.1, reserveRadius: 0.8 })

  addSignBoard(ctx, [-3.8, 0, 5.2], 'MY JOURNEY', ['THE BEGINNING'], {
    width: 2.7,
    height: 1.25,
    rotation: 0.08,
    texture: { titleSize: 38, lineSize: 21, lineY: 134 }
  })

  addHotspot(
    ctx,
    [0, 0.1, 4.1],
    0xffcc66,
    'Home',
    'Press E to enter your house and collect your journey map.',
    'home'
  )
}

function addForegroundStory(ctx) {
  ctx.car = loadModel(ctx, '/assets/models/car/car_01.glb', [4.6, 0, 9.7], 4.1, -Math.PI * 0.18)
  ctx.rockColliders.push({ mesh: ctx.car, radius: 1.9 })
  addHotspot(ctx, [4.6, 0.1, 9.7], 0x8ad7ff, 'Car', 'Press E near the car to drive. Press E again to get out.', 'car')

  addBullockCart(ctx, [-4.4, 0, 9.5])
  spawnCluster('rocks', [-7.8, 0, 11.8], 4, { spread: 1.9, minDistance: 0.8 })
  spawnCluster('green', [7.8, 0, 11.5], 5, { spread: 2.4, minDistance: 0.7 })

  addSignBoard(ctx, [-9.7, 0, 12.4], 'STORYVILLE', ['A JOURNEY OF', 'GROWTH, PURPOSE', '& IMPACT'], {
    width: 4.1,
    height: 1.8,
    rotation: 0.22,
    texture: { titleSize: 38, lineSize: 21, lineY: 118, lineGap: 28 }
  })

  addSignBoard(ctx, [9.8, 0, 12.2], 'THE FUTURE', ['NEW OPPORTUNITIES', 'NEW IMPACT'], {
    width: 3.9,
    height: 1.65,
    rotation: -0.2,
    texture: { titleSize: 36, lineSize: 22, lineY: 126, lineGap: 32 }
  })
}

function addSideStoryAreas(ctx) {
  const leftHomes = [
    ['/assets/models/house/house_01.glb', -12.2, 1.2, 1.7, Math.PI * 0.22],
    ['/assets/models/house/house_04.glb', -17.0, 4.2, 1.55, Math.PI * 0.38],
    ['/assets/models/house/house_08.glb', -14.7, -3.6, 1.6, Math.PI * 0.12]
  ]

  leftHomes.forEach(([path, x, z, scale, rotation]) => {
    const house = loadModel(ctx, path, [x, 0, z], scale, rotation)
    ctx.rockColliders.push({ mesh: house, radius: 2.9 })
  })

  spawnVillageAsset(ctx, 'farmbuilding', { x: -18.8, z: -8.4 }, {
    path: '/assets/models/farmbuilding/farmbuilding_01.glb',
    scale: 1.65,
    rotation: Math.PI * 0.3,
    reserveRadius: 3.4
  })
  spawnCluster('farmstractures', [-16.2, 0, -7.2], 5, { spread: 3.8, minDistance: 1.5 })
  spawnCluster('milktank', [-20.5, 0, -5.0], 2, { spread: 1.8, minDistance: 1.1 })
  spawnCluster('watersprinkler', [-18.5, 0, -12.6], 4, { spread: 3.5, minDistance: 1.3 })
  spawnCluster('lawnmover', [-13.2, 0, -8.8], 1, { spread: 0.8, minDistance: 1.2 })
  spawnCluster('barrel', [-11.8, 0, 5.6], 3, { spread: 2.2, minDistance: 0.9 })
  spawnCluster('bucket', [-15.6, 0, 6.6], 3, { spread: 2.1, minDistance: 0.8 })

  addSignBoard(ctx, [-11.8, 0, 8.2], 'EXPERIENCES', ['INTERNSHIPS', 'PROJECTS', 'LEARNINGS'], {
    width: 3.6,
    height: 1.55,
    rotation: 0.26,
    texture: { titleSize: 34, lineSize: 21, lineY: 116, lineGap: 30 }
  })

  const rightHomes = [
    ['/assets/models/house/house_09.glb', 12.4, 0.8, 1.65, -Math.PI * 0.14],
    ['/assets/models/house/house_10.glb', 17.0, 0.8, 1.65, -Math.PI * 0.14],
    ['/assets/models/house/house_12.glb', 12.4, -4.8, 1.55, -Math.PI * 0.14],
    ['/assets/models/house/house_14.glb', 17.0, -4.8, 1.55, -Math.PI * 0.14]
  ]

  rightHomes.forEach(([path, x, z, scale, rotation]) => {
    const house = loadModel(ctx, path, [x, 0, z], scale, rotation)
    ctx.rockColliders.push({ mesh: house, radius: 2.7 })
  })

  spawnCluster('table', [14.5, 0, 4.8], 2, { spread: 2.0, minDistance: 1.2 })
  spawnCluster('chair', [15.0, 0, 4.8], 6, { spread: 3.0, minDistance: 0.8 })
  spawnCluster('cratebox', [19.0, 0, 6.0], 4, { spread: 2.4, minDistance: 0.9 })
  spawnCluster('foodish', [13.5, 0, 6.3], 3, { spread: 1.8, minDistance: 0.7, y: 0.1 })

  addSignBoard(ctx, [10.7, 0, 8.3], 'SKILLS', ['DESIGN', 'DEVELOP', 'PROBLEM SOLVE', 'CREATIVITY'], {
    width: 3.45,
    height: 1.72,
    rotation: -0.24,
    texture: { titleSize: 36, lineSize: 19, lineY: 108, lineGap: 28 }
  })
}

function addBackgroundJourney(ctx) {
  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(58, 5.8, 24, 4),
    new THREE.MeshStandardMaterial({
      color: 0x2e8bb6,
      transparent: true,
      opacity: 0.9,
      roughness: 0.35,
      metalness: 0.05
    })
  )
  river.rotation.x = -Math.PI / 2
  river.position.set(0, -0.12, -8.8)
  river.receiveShadow = true
  river.userData.waveOffset = 2.5
  ctx.waterMeshes.push(river)
  addToVillage(ctx, river)

  spawnVillageAsset(ctx, 'bridge', { x: 0, z: -8.8 }, {
    path: '/assets/models/bridge/bridge_01.glb',
    scale: 2.35,
    rotation: Math.PI / 2,
    reserveRadius: 3.4
  })

  const forestPositions = []
  for (let row = 0; row < 5; row++) {
    for (let col = -8; col <= 8; col++) {
      if (Math.abs(col) < 2 && row < 2) continue
      forestPositions.push({
        x: col * 2.6 + rand(-0.7, 0.7),
        z: -14 - row * 2.6 + rand(-0.5, 0.5)
      })
    }
  }

  forestPositions.forEach((position, index) => {
    spawnVillageAsset(ctx, 'trees', position, {
      path: VILLAGE_ASSETS.trees.paths[index % VILLAGE_ASSETS.trees.paths.length],
      scale: rand(1.45, 2.15),
      rotation: rand(-Math.PI, Math.PI),
      reserveRadius: 1.1
    })
  })

  addSignBoard(ctx, [0, 0, -18.2], 'THE PATH AHEAD', ['GROWTH AND IMPACT'], {
    width: 4.6,
    height: 1.35,
    postHeight: 3.1,
    boardY: 2.65,
    rotation: 0,
    texture: { titleSize: 34, lineSize: 20, lineY: 132 }
  })

  const mountainMat = makeMat(0x7d7468, { roughness: 0.96 })
  ;[
    [-10, -31, 10, 16],
    [0, -34, 14, 22],
    [12, -31, 11, 18]
  ].forEach(([x, z, radius, height]) => {
    const mountain = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 6), mountainMat)
    mountain.position.set(x, height / 2 - 1.2, z)
    mountain.rotation.y = rand(-0.25, 0.25)
    addToVillage(ctx, mountain)
  })
}

function addReferenceVillageLayout(ctx) {
  activeSpawnContext = ctx
  ctx.villageOccupied = []

  addReferenceLighting(ctx)
  addReferenceGround(ctx)
  addHeroHouse(ctx)
  addForegroundStory(ctx)
  addSideStoryAreas(ctx)
  addRoadAndPathDetails(ctx)
  addDetailLayer(ctx)
  addBackgroundJourney(ctx)

  activeSpawnContext = null
}

function createRiver(ctx, width, length, yPos, zPos) {
  const geo = new THREE.PlaneGeometry(width, length, 64, 64)
  const mat = new THREE.MeshStandardMaterial({
    color: 0x2f8fff,
    transparent: true,
    opacity: 0.85,
    roughness: 0.3,
    metalness: 0.2
  })

  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.set(0, yPos, zPos)
  mesh.userData.waveOffset = Math.random() * 10
  ctx.waterMeshes.push(mesh)
  return mesh
}

function createBridge(zPos) {
  const bridge = new THREE.Group()

  const arcGeo = new THREE.TorusGeometry(2.5, 0.25, 12, 32, Math.PI)
  const arc = new THREE.Mesh(
    arcGeo,
    new THREE.MeshStandardMaterial({ color: 0x8b5e3c })
  )
  arc.rotation.z = Math.PI / 2
  arc.position.set(0, 0.6, zPos)
  bridge.add(arc)

  for (let i = -4; i <= 4; i++) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.15, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x7a4e2d })
    )
    plank.position.set(i * 0.6, 0.9 - Math.abs(i) * 0.05, zPos)
    plank.castShadow = true
    bridge.add(plank)
  }

  for (const side of [-1, 1]) {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.2, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x5a3a20 })
    )
    rail.position.set(0, 1.2, zPos + side * 1.2)
    bridge.add(rail)
  }

  return bridge
}

function addForest(ctx) {
  for (let i = 0; i < 30; i++) {
    const tree = new THREE.Group()

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 1),
      new THREE.MeshStandardMaterial({ color: 0x8b5e3c })
    )
    trunk.position.y = 0.5
    tree.add(trunk)

    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0x228b22 })
    )
    leaves.position.y = 1.5
    tree.add(leaves)

    tree.position.set(
      (Math.random() - 0.5) * 20,
      0,
      -20 - Math.random() * 20
    )

    addToVillage(ctx, tree)
  }
}

function addOverlayTextForVillage() {
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position:fixed;top:8%;left:5%;opacity:0;transition:opacity 1.2s ease;
    pointer-events:none;border-left:2px solid #ffd166;padding-left:14px;
    z-index:10;font-family:system-ui,sans-serif;
  `
  overlay.innerHTML = `
    <div style="color:#fff;font-size:1rem;font-weight:500;letter-spacing:1.5px;margin-bottom:6px;">
      Village hub
    </div>
    <div style="color:#ffe2a3;font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;">
      Cafe and story house are now explorable
    </div>
  `
  document.body.appendChild(overlay)
  setTimeout(() => overlay.style.opacity = '1', 350)
  setTimeout(() => overlay.style.opacity = '0', 3900)
  setTimeout(() => overlay.remove(), 5200)
}

export function addVillageWorld(ctx) {
  ctx.activeScene = 'village'
  ctx.transitioning = false
  ctx.transitionQueued = false
  ctx.drivingMode = false
  ctx.car = null
  clearSceneForNextLevel(ctx)
  // 🔥 FORCE REMOVE OLD SPACE PLAYER COMPLETELY
  if (ctx.player) {
    ctx.scene.remove(ctx.player)
    ctx.player = null
  }

  ctx.scene.background = createSkyTexture()
  // 🌇 Better color contrast (less washed yellow)
  ctx.renderer.toneMappingExposure = 1.1
  // 🌫️ Reduce yellow fog (keeps greens visible)
  ctx.scene.fog = new THREE.FogExp2(0xe6d3a3, 0.012)

  ctx.villageGroup = new THREE.Group()
  ctx.scene.add(ctx.villageGroup)

  // 🧍 ALWAYS remove old character (space character) and load village player
  if (ctx.character) {
    ctx.scene.remove(ctx.character)
    ctx.character = null
  }

  loadGLBModel(ctx.scene, '/assets/models/character/player.glb', [0, 0, 0], 1, 0, {
    addToScene: false,
    center: true,
    groundAlign: true,
    onLoad: (model) => {
      ctx.character = model

      // 🔥 Fix character ground alignment properly
      model.scale.setScalar(2)

      // Reset position first
      model.position.set(0, 0, 0)

      // Get bounding box
      const box = new THREE.Box3().setFromObject(model)
      const height = box.max.y - box.min.y

      // Store height for physics
      ctx.characterHeight = height

      // Lift character so feet touch ground initially
      model.position.y = 5
      model.rotation.y = 0

      ctx.scene.add(model)

      // 🎬 Setup animation mixer
      ctx.mixer = new THREE.AnimationMixer(model)

      if (model.animations && model.animations.length > 0) {
        const clip = model.animations[0]
        const action = ctx.mixer.clipAction(clip)
        action.play()
        ctx.currentAction = action
      }
    }
  })

  const stoneTexture = createStoneTexture()
  const plasterTexture = createNoiseTexture('#e9d6b5', [130, 92, 63], 256, 2400)
  plasterTexture.repeat.set(1.5, 1.5)
  const terracottaTexture = createTerracottaTexture()
  const grassTexture = createNoiseTexture('#789d55', [47, 76, 42], 256, 1300)
  grassTexture.repeat.set(6, 6)
  const pathTexture = createStoneTexture()
  pathTexture.repeat.set(3, 3)

  ctx.materialsCache = {
    plaster: plasterTexture,
    terracotta: terracottaTexture,
    wallMats: new Map()
  }

  const materials = {
    grass: makeMat(0xffffff, { map: grassTexture, roughness: 0.96 }),
    path: makeMat(0xffffff, { map: pathTexture, roughness: 0.86 }),
    stone: makeMat(0xffffff, { map: stoneTexture, roughness: 0.84 }),
    stoneDark: makeMat(0x8c6a4f, { roughness: 0.9 }),
    wood: makeMat(0x8b5e3c, { roughness: 0.85 }),
    leaves: makeMat(0x3f8f48, { roughness: 0.9 }),
    roofRed: makeMat(0xb94f35, { map: terracottaTexture, roughness: 0.78 })
  }

  addVillageLights(ctx)

  // 🌿 DARKER + ROUGHER GROUND MATERIAL
  const groundGeo = new THREE.PlaneGeometry(300, 300, 128, 128)
  const pos = groundGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    // small natural bumps
    const height = Math.sin(x * 0.15) * 0.2 + Math.cos(y * 0.12) * 0.2
    pos.setZ(i, height)
  }
  groundGeo.computeVertexNormals()

  // 🌍 LOAD REAL TERRAIN TEXTURES
  const textureLoader = new THREE.TextureLoader()

  const terrainDiffuse = textureLoader.load('/assets/textures/terrain/terrain_diffuse.jpg')
  const terrainNormal = textureLoader.load('/assets/textures/terrain/terrain_normal.jpg')
  const terrainRoughness = textureLoader.load('/assets/textures/terrain/terrain_roughness.jpg')

  // 🎨 DARKER + RICHER GREEN FIX (matches PolyHaven look)
  terrainDiffuse.offset.set(0, 0)
  terrainDiffuse.repeat.set(18, 18)
  terrainNormal.repeat.set(18, 18)
  terrainRoughness.repeat.set(18, 18)

  // Fix color space (important for correct green tone)
  terrainDiffuse.colorSpace = THREE.SRGBColorSpace
  terrainNormal.colorSpace = THREE.NoColorSpace
  terrainRoughness.colorSpace = THREE.NoColorSpace

  terrainDiffuse.wrapS = terrainDiffuse.wrapT = THREE.RepeatWrapping
  terrainNormal.wrapS = terrainNormal.wrapT = THREE.RepeatWrapping
  terrainRoughness.wrapS = terrainRoughness.wrapT = THREE.RepeatWrapping

  // 🔥 Set anisotropy for sharper terrain textures
  const maxAnisotropy = ctx.renderer.capabilities.getMaxAnisotropy()
  terrainDiffuse.anisotropy = maxAnisotropy
  terrainNormal.anisotropy = maxAnisotropy
  terrainRoughness.anisotropy = maxAnisotropy

  // 🔥 Improved ground material for color, contrast, and sharpness
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: terrainDiffuse,
    normalMap: terrainNormal,
    roughnessMap: terrainRoughness,

    // 🎨 Slight green tint to deepen color
    color: new THREE.Color(0xcfe8b4),

    // 🔥 Stronger surface detail
    normalScale: new THREE.Vector2(1.6, 1.6),

    // 🌿 Less washed-out lighting
    roughness: 0.8,
    metalness: 0
  })

  const ground = new THREE.Mesh(groundGeo, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ctx.groundMesh = ground
  addToVillage(ctx, ground)

  // 🌳 ADD TREES FROM ASSETS
  addNatureLayer(ctx)

  // 🎮 FIRST PERSON CAMERA CONTROLS (FPS MODE)

  const keys = {}
  // Jump state
  let velocityY = 0
  let isOnGround = true
  const gravity = 12        // smoother fall
  const jumpForce = 6.2     // softer jump
  const damping = 0.92      // smooth air movement

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase()
    keys[key] = true

    // Map arrow keys
    if (key === 'arrowup') keys['w'] = true
    if (key === 'arrowdown') keys['s'] = true
    if (key === 'arrowleft') keys['a'] = true
    if (key === 'arrowright') keys['d'] = true

    // Camera rotation via keyboard
    if (key === 'j') keys['lookLeft'] = true
    if (key === 'l') keys['lookRight'] = true
    if (key === 'i') keys['lookUp'] = true
    if (key === 'k') keys['lookDown'] = true

    if (key === ' ') {
      if (isOnGround) {
        velocityY = jumpForce
        isOnGround = false
      }
    }
  })

  document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase()
    keys[key] = false

    if (key === 'arrowup') keys['w'] = false
    if (key === 'arrowdown') keys['s'] = false
    if (key === 'arrowleft') keys['a'] = false
    if (key === 'arrowright') keys['d'] = false

    if (key === 'j') keys['lookLeft'] = false
    if (key === 'l') keys['lookRight'] = false
    if (key === 'i') keys['lookUp'] = false
    if (key === 'k') keys['lookDown'] = false
  })

  // 🎥 Third-person camera setup
  ctx.camera.position.set(0, 3.5, 8)

  // Enable pointer lock on click
  document.body.addEventListener('click', () => {
    document.body.requestPointerLock()
  })

  // Mouse look
  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement !== document.body) return

    // Store rotation separately (do NOT rotate camera directly)
    ctx.cameraYaw = (ctx.cameraYaw || 0) - e.movementX * 0.002
    ctx.cameraPitch = (ctx.cameraPitch || 0) - e.movementY * 0.002

    ctx.cameraPitch = Math.max(
      -Math.PI / 3,
      Math.min(Math.PI / 3, ctx.cameraPitch)
    )
  })

  // Movement update
  ctx.updatePlayer = (delta) => {
    // 🎬 Update animation
    if (ctx.mixer) {
      ctx.mixer.update(delta)
    }

    // 🎮 Keyboard camera rotation
    const rotationSpeed = 1.5

    if (keys['lookLeft']) ctx.cameraYaw = (ctx.cameraYaw || 0) + rotationSpeed * delta
    if (keys['lookRight']) ctx.cameraYaw = (ctx.cameraYaw || 0) - rotationSpeed * delta
    if (keys['lookUp']) ctx.cameraPitch = (ctx.cameraPitch || 0) + rotationSpeed * delta
    if (keys['lookDown']) ctx.cameraPitch = (ctx.cameraPitch || 0) - rotationSpeed * delta

    // Clamp vertical look
    ctx.cameraPitch = Math.max(
      -Math.PI / 3,
      Math.min(Math.PI / 3, ctx.cameraPitch || 0)
    )

    const speed = 5

    // 🎮 Move CHARACTER instead of camera
    const move = new THREE.Vector3()

    if (keys['w']) move.z -= 1
    if (keys['s']) move.z += 1
    if (keys['a']) move.x -= 1
    if (keys['d']) move.x += 1

    // 🧍 Ensure character exists before movement
    if (!ctx.character) return

    if (move.length() > 0 && ctx.character) {
      move.normalize()

      const angle = ctx.cameraYaw || 0
      const rotatedX = move.x * Math.cos(angle) - move.z * Math.sin(angle)
      const rotatedZ = move.x * Math.sin(angle) + move.z * Math.cos(angle)

      ctx.character.position.x += rotatedX * speed * delta
      ctx.character.position.z += rotatedZ * speed * delta

      ctx.character.rotation.y = Math.atan2(rotatedX, rotatedZ)

      // ▶️ Play walk animation
      if (ctx.currentAction) ctx.currentAction.paused = false
    } else {
      // ⏸️ Pause animation when idle
      if (ctx.currentAction) ctx.currentAction.paused = true
    }

    // 🎥 Camera follows character (third person)
    if (ctx.character) {
      const yaw = ctx.cameraYaw || 0
      const pitch = ctx.cameraPitch || 0

      const cameraOffset = new THREE.Vector3(0, 2.5, 5)
      cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw)

      const targetPosition = ctx.character.position.clone()
      const desiredPosition = targetPosition.clone().add(cameraOffset)

      ctx.camera.position.lerp(desiredPosition, 0.1)

      ctx.camera.lookAt(
        ctx.character.position.x,
        ctx.character.position.y + 1.5 + pitch * 2,
        ctx.character.position.z
      )
    }

    // 🌍 Raycast-based ground detection (FIX sinking issue)
    const raycaster = new THREE.Raycaster()
    const down = new THREE.Vector3(0, -1, 0)

    if (ctx.character) {
      // Ray start slightly above player
      const origin = ctx.character.position.clone()
      origin.y += 5

      raycaster.set(origin, down)

      // 🔥 ONLY detect ground mesh
      const intersects = raycaster.intersectObject(ctx.groundMesh, true)

      if (intersects.length === 0) return

      const groundY = intersects[0].point.y

      // ✅ Use character height so feet touch ground properly
      const halfHeight = (ctx.characterHeight || 2) / 2
      const targetY = groundY + halfHeight

      // Apply gravity smoothly
      velocityY -= gravity * delta
      ctx.character.position.y += velocityY * delta

      // Snap to ground when close
      if (ctx.character.position.y <= targetY) {
        ctx.character.position.y = targetY
        velocityY = 0
        isOnGround = true
      } else {
        isOnGround = false
      }
    }
  }
}

export function updateVillageWorld(ctx) {
  // 🎮 Update FPS movement
  if (ctx.updatePlayer) {
    ctx.updatePlayer(ctx.delta || 0.016)
  }
  ctx.waterMeshes.forEach((mesh) => {
    const pos = mesh.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const wave = Math.sin(x * 0.3 + ctx.time * 2 + mesh.userData.waveOffset) * 0.1
      pos.setZ(i, wave)
    }
    pos.needsUpdate = true
    mesh.geometry.computeVertexNormals()
  })
}
