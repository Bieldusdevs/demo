'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.22
      ref.current.rotation.y += d * 0.31
    }
  })
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.15, 0.34, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={1.4}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.45}
          distortionScale={0.3}
          temporalDistortion={0.28}
          color="#b59cff"
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(2200 * 3)
    for (let i = 0; i < 2200; i++) {
      const r = 4 + Math.random() * 4
      const t = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 6
      arr[i*3] = Math.cos(t) * r
      arr[i*3+1] = y
      arr[i*3+2] = Math.sin(t) * r
    }
    return arr
  }, [])
  useFrame((_, d) => {
    if (points.current) points.current.rotation.y += d * 0.06
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.019} color="#6cf6c7" sizeAttenuation transparent opacity={0.82} />
    </points>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 48 }} dpr={[1,2]} gl={{ antialias: true }}>
        <color attach="background" args={['#050608']} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[5,5,5]} intensity={1.2} />
        <pointLight position={[-3,-2,-2]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[2,1,2]} intensity={1.1} color="#06ffa5" />
        <TorusKnot />
        <Particles />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
      {/* WebGPU / shader overlay hint */}
      <div className="absolute top-5 right-6 text-[10px] tracking-widest text-zinc-500">
        WEBGPU • WGSL • R3F
      </div>
    </div>
  )
}
