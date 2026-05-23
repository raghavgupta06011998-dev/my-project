import * as THREE from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'

// ── HDRI sky ──────────────────────────────────────────────────────────────────
// Swap HDRI_PATH to change the sky. Available options in /assets/hdri/:
//   village_sky2.exr    ← bright blue sky, current choice
//   village_golden.exr  ← warm golden-hour
//   village_soft.exr    ← softer warm day
//   sunrise.exr         ← cool sunrise
const HDRI_PATH   = '/assets/hdri/village_sky2.exr'
const TONE_EXP    = 1.0
const FOG_COLOR   = 0xc8dff0
const FOG_DENSITY = 0.00010

export function setupEnvironment(ctx) {
  ctx.renderer.toneMappingExposure = TONE_EXP
  ctx.scene.fog = new THREE.FogExp2(FOG_COLOR, FOG_DENSITY)

  // Load HDRI — used as both visible sky and IBL lighting
  const pmrem = new THREE.PMREMGenerator(ctx.renderer)
  pmrem.compileEquirectangularShader()

  new EXRLoader().load(
    HDRI_PATH,
    (exrTexture) => {
      exrTexture.mapping = THREE.EquirectangularReflectionMapping
      const envMap = pmrem.fromEquirectangular(exrTexture).texture
      ctx.scene.background  = envMap
      ctx.scene.environment = envMap
      exrTexture.dispose()
      pmrem.dispose()
    },
    undefined,
    (err) => {
      console.warn('HDRI load failed:', err)
      ctx.scene.background = new THREE.Color(0xc8dff0)
    }
  )

  // Supplemental lights — work on top of HDRI IBL
  ctx.scene.add(new THREE.AmbientLight(0xffffff, 0.4))

  const sun = new THREE.DirectionalLight(0xfff8f0, 2.5)
  sun.position.set(60, 80, 40)
  sun.castShadow           = true
  sun.shadow.mapSize.set(1024, 1024)
  sun.shadow.camera.left   = -80
  sun.shadow.camera.right  =  80
  sun.shadow.camera.top    =  80
  sun.shadow.camera.bottom = -80
  sun.shadow.camera.near   =  1
  sun.shadow.camera.far    =  300
  sun.shadow.bias          = -0.001
  ctx.scene.add(sun)
}

// ── GOLDEN HOUR VERSION (enable when ready) ───────────────────────────────────
// const HDRI_PATH   = '/assets/hdri/village_golden.exr'
// const TONE_EXP    = 1.15
// const FOG_COLOR   = 0xe8d5b0
// const FOG_DENSITY = 0.00006
//
// export function setupEnvironment(ctx) {
//   ctx.renderer.toneMappingExposure = TONE_EXP
//   ctx.scene.fog = new THREE.FogExp2(FOG_COLOR, FOG_DENSITY)
//   const pmrem = new THREE.PMREMGenerator(ctx.renderer)
//   pmrem.compileEquirectangularShader()
//   new EXRLoader().load(HDRI_PATH, (exrTexture) => {
//     exrTexture.mapping = THREE.EquirectangularReflectionMapping
//     const envMap = pmrem.fromEquirectangular(exrTexture).texture
//     ctx.scene.background  = envMap
//     ctx.scene.environment = envMap
//     exrTexture.dispose()
//     pmrem.dispose()
//   })
//   ctx.scene.add(new THREE.AmbientLight(0xffcb88, 0.30))
//   ctx.scene.add(new THREE.HemisphereLight(0xffd4a0, 0x8b6a2a, 0.55))
//   const sun = new THREE.DirectionalLight(0xffb060, 2.8)
//   sun.position.set(90, 22, 40)
//   sun.castShadow = true
//   sun.shadow.mapSize.set(1024, 1024)
//   sun.shadow.camera.left=-80; sun.shadow.camera.right=80
//   sun.shadow.camera.top=80;   sun.shadow.camera.bottom=-80
//   sun.shadow.camera.near=1;   sun.shadow.camera.far=300
//   sun.shadow.bias=-0.001
//   ctx.scene.add(sun)
//   const fill = new THREE.DirectionalLight(0x8ab4d4, 0.30)
//   fill.position.set(-60, 35, -25)
//   ctx.scene.add(fill)
//   const bounce = new THREE.PointLight(0xff8833, 0.50, 80)
//   bounce.position.set(0, 2, -100)
//   ctx.scene.add(bounce)
// }
