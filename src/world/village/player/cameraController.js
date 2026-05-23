import * as THREE from 'three'

// ── Camera constants ──────────────────────────────────────────────────────────
// Adjust these to tune the feel of the camera without touching logic.
const DISTANCE    = 5.5    // orbital distance from player
const LOOK_H      = 1.4    // look-at height above character feet
const PITCH_MIN   = -0.15  // radians — near-horizontal low limit
const PITCH_MAX   =  1.05  // radians — steep overhead limit
const PITCH_START =  0.32  // initial pitch (slightly above horizontal)
const LERP_SPEED  =  0.12  // camera smoothing (0 = frozen, 1 = instant snap)
const MOUSE_SENS  =  0.002 // mouse sensitivity

// ── Setup (called once on load) ───────────────────────────────────────────────
export function setupCamera(ctx) {
  ctx.cameraYaw   = 0
  ctx.cameraPitch = PITCH_START

  // Pointer lock — click anywhere to capture mouse
  document.body.addEventListener('click', () => {
    document.body.requestPointerLock()
  })

  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement !== document.body) return

    // Right mouse = camera orbits clockwise (standard game convention)
    ctx.cameraYaw   += e.movementX * MOUSE_SENS
    // Down mouse = camera tilts up (standard game convention)
    ctx.cameraPitch += e.movementY * MOUSE_SENS
    ctx.cameraPitch  = Math.max(PITCH_MIN, Math.min(PITCH_MAX, ctx.cameraPitch))
  })
}

// ── Update (called every frame from playerController) ─────────────────────────
export function updateCamera(ctx) {
  if (!ctx.character) return

  const yaw   = ctx.cameraYaw   ?? 0
  const pitch = ctx.cameraPitch ?? PITCH_START

  // Spherical coordinates → cartesian offset from player
  // Camera sits at (sin(yaw), sinPitch, cos(yaw)) * DISTANCE from player.
  // yaw=0 → camera behind player (+z), looking toward -z.
  // Increasing yaw (mouse right) orbits camera clockwise viewed from above.
  const cosP   = Math.cos(pitch)
  const sinP   = Math.sin(pitch)
  const offX   =  Math.sin(yaw) * cosP * DISTANCE
  const offY   =  sinP * DISTANCE + LOOK_H * 0.4   // keep camera above ground
  const offZ   =  Math.cos(yaw) * cosP * DISTANCE

  const pPos   = ctx.character.position
  const target = new THREE.Vector3(pPos.x + offX, pPos.y + offY, pPos.z + offZ)

  ctx.camera.position.lerp(target, LERP_SPEED)
  ctx.camera.lookAt(pPos.x, pPos.y + LOOK_H, pPos.z)
}
