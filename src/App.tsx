import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function SpinningLogo() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-0.5, -0.5, -0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
    </group>
  );
}

function AnimatedBox({ initialPosition }: { initialPosition: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition));
  const currentPosition = useRef(new THREE.Vector3(...initialPosition));

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    return new THREE.Vector3(
      current.x + randomDirection[0] * 3,
      0.5,
      current.z + randomDirection[1] * 3
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current);
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x));
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z));
      setTargetPosition(newPosition);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1);
      meshRef.current.position.copy(currentPosition.current);
    }
  });

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="#000000" linewidth={2} />
      </lineSegments>
    </mesh>
  );
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ];

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={[0.5, 0.5, 0.5]}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black', position: 'relative' }}>
      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '1rem' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px' }}>
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SpinningLogo />
              </Canvas>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginLeft: '1rem' }}>ChainSwitch</span>
          </div>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </nav>
      </header>
      <div style={{
        position: 'absolute', top: '33%', left: '50%',
        transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10, color: 'white'
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', maxWidth: '800px', margin: '0 auto' }}>
          A unified API for on-chain transactions
        </h1>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
          Route transactions from your dapp between L2 chains in real time
        </h2>
        <button style={{
          background: 'white', color: 'black', fontWeight: 'bold',
          padding: '0.75rem 1.5rem', borderRadius: '0.375rem', border: 'none',
          cursor: 'pointer', transition: 'background 0.3s'
        }}>
          Join waitlist
        </button>
      </div>
      <Canvas shadows camera={{ position: [30, 30, 30], fov: 50 }} style={{
        position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh'
      }}>
        <Scene />
      </Canvas>
    </div>
  );
}
