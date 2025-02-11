import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedBoxProps {
  initialPosition: [number, number, number];
  label?: string;
  onClick?: () => void;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ initialPosition, label, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition));
  const currentPosition = useRef(new THREE.Vector3(...initialPosition));
  const [hovered, setHovered] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const rotationSpeed = useRef(0);
  const startPosition = useRef(new THREE.Vector3(initialPosition[0], initialPosition[1] - 10, initialPosition[2]));

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
    // Start with entrance animation
    const entranceTimer = setTimeout(() => {
      setIsEntering(false);
    }, 1000);

    // Delay the start of random movement
    const movementTimer = setTimeout(() => {
      const interval = setInterval(() => {
        const newPosition = getAdjacentIntersection(currentPosition.current);
        newPosition.x = Math.max(-15, Math.min(15, newPosition.x));
        newPosition.z = Math.max(-15, Math.min(15, newPosition.z));
        setTargetPosition(newPosition);
      }, 1000); // Increased interval for smoother transitions
      return () => clearInterval(interval);
    }, 1000); // Delay random movement start

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(movementTimer);
    };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      if (isEntering) {
        // Smooth entrance animation
        currentPosition.current.lerp(new THREE.Vector3(...initialPosition), 0.05);
        meshRef.current.position.copy(currentPosition.current);
      } else {
        // Smoother movement transitions
        currentPosition.current.lerp(targetPosition, delta * 1.5);
        meshRef.current.position.copy(currentPosition.current);
      }
      
      // Click animation
      if (isClicked) {
        rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 15, 0.1);
        meshRef.current.rotation.y += rotationSpeed.current * delta;
        meshRef.current.rotation.x += rotationSpeed.current * delta;
        
        // Reset click state after one full rotation
        if (meshRef.current.rotation.y > Math.PI * 2) {
          setIsClicked(false);
          rotationSpeed.current = 0;
          meshRef.current.rotation.set(0, 0, 0);
        }
      } else {
        rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 0, 0.1);
      }
      
      // Smooth hover animation
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
  };

  return (
    <mesh
      ref={meshRef}
      position={startPosition.current}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? "#F6A3B0" : "#ffffff"} 
        opacity={0.9} 
        transparent 
      />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="#000000" linewidth={2} />
      </lineSegments>
      {label && (
        <>
          {/* Arrow line */}
          <line>
            <bufferGeometry>
              <float32BufferAttribute attach="attributes-position" args={[[0, 0.5, 0, 0, 1.2, 0], 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="white" />
          </line>

          {/* Arrow tip as a cone */}
          <mesh position={[0, 1.3, 0]}>
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshBasicMaterial color="white" />
          </mesh>

          {/* Always-facing text label */}
          <Billboard>
            <Text
              position={[0, 1.6, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {label}
            </Text>
          </Billboard>
        </>
      )}
    </mesh>
  );
};

export default AnimatedBox; 