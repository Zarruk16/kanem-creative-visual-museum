import {
  Component,
  ReactNode,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { assets } from '../config/assets'

/** Matches 3dmodel-thumb.png: elevated three-quarter from front-right */
const THUMB_AZIMUTH_DEG = 22
const THUMB_ELEVATION_DEG = 14
/** 1 = sphere fills view; lower = closer / larger (thumb fills ~75% width) */
const THUMB_FILL = 0.48

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl'),
    )
  } catch {
    return false
  }
}

function frameLikeThumb(
  group: THREE.Group,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsImpl | null,
) {
  group.position.set(0, 0, 0)
  group.scale.set(1, 1, 1)
  group.rotation.set(0, 0, 0)
  group.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(group)
  const sphere = box.getBoundingSphere(new THREE.Sphere())

  const targetRadius = 4.2
  const scale = targetRadius / (sphere.radius || 1)
  group.scale.setScalar(scale)
  group.position.set(0, 0, 0)
  group.updateMatrixWorld(true)

  const scaledBox = new THREE.Box3().setFromObject(group)
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3())
  const scaledSize = scaledBox.getSize(new THREE.Vector3())
  const scaledSphere = scaledBox.getBoundingSphere(new THREE.Sphere())

  group.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z)
  group.updateMatrixWorld(true)

  const radius = scaledSphere.radius || targetRadius
  const fov = camera.fov * (Math.PI / 180)
  const distance = (radius / Math.sin(fov / 2)) * THUMB_FILL

  const azimuth = THREE.MathUtils.degToRad(THUMB_AZIMUTH_DEG)
  const elevation = THREE.MathUtils.degToRad(THUMB_ELEVATION_DEG)
  const targetY = scaledSize.y * 0.32

  const camX = distance * Math.sin(azimuth) * Math.cos(elevation)
  const camY = distance * Math.sin(elevation)
  const camZ = distance * Math.cos(azimuth) * Math.cos(elevation)

  camera.position.set(camX, camY, camZ)
  camera.near = Math.max(0.05, distance / 100)
  camera.far = Math.max(distance * 40, 200)
  camera.lookAt(0, targetY, 0)
  camera.updateProjectionMatrix()

  if (controls) {
    controls.target.set(0, targetY, 0)
    controls.minDistance = distance * 0.55
    controls.maxDistance = distance * 2.2
    controls.update()
  }
}

function Model({ onReady }: { onReady?: () => void }) {
  const { scene } = useGLTF(assets.exteriorModelGlb)
  const groupRef = useRef<THREE.Group>(null)
  const { camera, controls } = useThree()
  const framed = useRef(false)

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
  }, [scene])

  useEffect(() => {
    if (!groupRef.current || framed.current) return

    frameLikeThumb(
      groupRef.current,
      camera as THREE.PerspectiveCamera,
      controls as OrbitControlsImpl | null,
    )

    framed.current = true
    onReady?.()
  }, [camera, controls, onReady])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

function SceneContent({ onReady }: { onReady?: () => void }) {
  return (
    <>
      <color attach="background" args={['#e5e3e0']} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 10, 6]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.3} />
      <hemisphereLight args={['#f7f2ea', '#7a7268', 0.4]} />

      <Suspense fallback={null}>
        <Model onReady={onReady} />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.32}
          scale={16}
          blur={2.4}
          far={8}
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        zoomSpeed={0.85}
      />
    </>
  )
}

class ViewerErrorBoundary extends Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('[ExteriorModelViewer]', error)
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

type ExteriorModelViewerProps = {
  active: boolean
  /** Called when the GLB is framed and ready to reveal */
  onReadyChange?: (ready: boolean) => void
}

export default function ExteriorModelViewer({
  active,
  onReadyChange,
}: ExteriorModelViewerProps) {
  const [webgl, setWebgl] = useState(true)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [rotated, setRotated] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  /** Mount canvas as soon as WebGL is available — load in background under the thumb */
  const [warmup, setWarmup] = useState(false)

  useEffect(() => {
    setWebgl(supportsWebGL())
  }, [])

  useEffect(() => {
    if (!webgl) return
    // Defer one frame so the hero can paint first, then warm the GLB + GPU
    const id = window.requestAnimationFrame(() => setWarmup(true))
    return () => window.cancelAnimationFrame(id)
  }, [webgl])

  useEffect(() => {
    onReadyChange?.(ready)
  }, [ready, onReadyChange])

  useEffect(() => {
    if (!active) setRotated(false)
  }, [active])

  const markReady = () => {
    setReady(true)
    setFailed(false)
  }

  const resetOrientation = () => {
    setRotated(false)
    setReady(false)
    setResetKey((k) => k + 1)
  }

  const showThumb = !active || !ready || failed
  const showCanvas = webgl && !failed && warmup

  return (
    <div className="exterior__viewer">
      {showThumb && (
        <div className="exterior__placeholder" aria-hidden={active && ready && !failed}>
          <img
            src={assets.exteriorModelThumb}
            alt="Exterior view of the Kanem gallery building"
            loading="eager"
            decoding="async"
          />
        </div>
      )}

      {showCanvas && (
        <div
          className="exterior__canvas-wrap"
          aria-hidden={!active}
          style={{
            opacity: active && ready ? 1 : 0,
            pointerEvents: active && ready ? 'auto' : 'none',
            transition: active ? 'opacity 0.35s ease' : 'none',
          }}
        >
          <div
            className="exterior__canvas"
            onPointerDown={() => {
              if (!active) return
              setRotated(true)
            }}
            onWheel={() => {
              if (!active) return
              setRotated(true)
            }}
          >
            <ViewerErrorBoundary onError={() => setFailed(true)}>
              <Canvas
                key={resetKey}
                shadows
                dpr={[1, 1.5]}
                camera={{ fov: 40, near: 0.1, far: 500, position: [5, 4, 7] }}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: 'high-performance',
                  failIfMajorPerformanceCaveat: false,
                }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping
                  gl.toneMappingExposure = 1.08
                }}
                style={{ touchAction: 'none' }}
                aria-label="Interactive exterior gallery model"
              >
                <SceneContent onReady={markReady} />
              </Canvas>
            </ViewerErrorBoundary>
          </div>
        </div>
      )}

      {active && ready && !failed && (
        <button
          type="button"
          className={`exterior__reset${rotated ? ' is-visible' : ''}`}
          onClick={resetOrientation}
        >
          Reset view
        </button>
      )}

      {active && !ready && webgl && !failed && (
        <p className="exterior__status" role="status">
          Loading 3D model…
        </p>
      )}

      {active && (!webgl || failed) && (
        <p className="exterior__status" role="status">
          {!webgl
            ? '3D viewing is unavailable in this browser. Showing a still preview.'
            : 'Unable to load the 3D model. Showing a still preview.'}
        </p>
      )}
    </div>
  )
}

// Start fetching the GLB as soon as this module is imported (homepage load)
try {
  useGLTF.preload(assets.exteriorModelGlb)
} catch {
  // ignore — runtime error boundary handles failures
}
