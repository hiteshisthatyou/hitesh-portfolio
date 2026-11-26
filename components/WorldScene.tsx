'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current || !shell.current) return;
    group.current.rotation.y += delta * 0.105;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.13, 0.035);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.1, 0.035);
    shell.current.rotation.y -= delta * 0.08;
  });
  return (
    <group ref={group} position={[1.45, 0.05, 0]}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.12, 2]} />
        <MeshDistortMaterial color="#a5f3dc" roughness={0.12} metalness={0.78} distort={0.22} speed={1.1} radius={1} transparent opacity={0.82} />
      </mesh>
      <mesh scale={1.28}>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshBasicMaterial color="#b7ffe8" wireframe transparent opacity={0.17} />
      </mesh>
      {[1.65, 2.05, 2.48].map((radius, i) => (
        <mesh key={radius} rotation={[0.45 + i * 0.62, 0.2 + i * 0.7, i * 0.42]}>
          <torusGeometry args={[radius, i === 1 ? 0.009 : 0.015, 12, 180]} />
          <meshBasicMaterial color={i === 1 ? '#d9fff5' : '#72b9ac'} transparent opacity={i === 1 ? 0.72 : 0.38} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={1.1 + i * 0.12} rotationIntensity={0.7} floatIntensity={0.8}>
            <mesh position={[Math.cos(a) * 2.15, Math.sin(a * 1.4) * 0.7, Math.sin(a) * 1.5]}>
              <octahedronGeometry args={[i % 2 ? 0.085 : 0.12, 0]} />
              <meshStandardMaterial color={i % 2 ? '#c6fff0' : '#8fe0cb'} emissive="#2b887b" emissiveIntensity={1.4} metalness={0.8} roughness={0.18} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function OrbitField() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const data = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 12;
      data[i * 3] = Math.cos(theta) * radius;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = Math.sin(theta) * radius - 3;
    }
    return data;
  }, []);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.006;
      group.current.rotation.x = state.pointer.y * 0.012;
    }
  });
  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#a9d9ce" size={0.018} transparent opacity={0.58} sizeAttenuation />
      </points>
    </group>
  );
}

function SceneContents() {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 10));
  useFrame((state) => {
    const scroll = typeof window === 'undefined' ? 0 : window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetX = state.pointer.x * 0.48 + Math.sin(scroll * Math.PI * 2) * 0.22;
    const targetY = 0.15 + state.pointer.y * 0.24 - scroll * 0.65;
    const targetZ = 10.8 - scroll * 1.4;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.025);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.025);
    cameraTarget.current.set(0.5, -scroll * 0.25, 0);
    state.camera.lookAt(cameraTarget.current);
  });
  return (
    <>
      <color attach="background" args={['#050a0b']} />
      <fog attach="fog" args={['#050a0b', 9, 28]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[2, 3, 5]} intensity={38} color="#b5ffe9" distance={18} />
      <pointLight position={[-5, -2, -1]} intensity={24} color="#236c78" distance={16} />
      <spotLight position={[0, 7, 4]} intensity={18} angle={0.55} penumbra={0.8} color="#a4f8df" />
      <Stars radius={70} depth={38} count={1300} factor={2.2} saturation={0.15} fade speed={0.2} />
      <OrbitField />
      <Core />
    </>
  );
}

export default function WorldScene({ motionOn = true }: { motionOn?: boolean }) {
  return (
    <div className={`world-canvas ${motionOn ? '' : 'world-canvas-still'}`} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.2, 10.8], fov: 42 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} fallback={<div className="world-fallback" />}>
        <SceneContents />
      </Canvas>
    </div>
  );
}
