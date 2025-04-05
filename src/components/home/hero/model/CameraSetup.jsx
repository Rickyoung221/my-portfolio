import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CameraSetup = () => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (camera && controlsRef.current) {
      camera.position.set(1.443, 0.796, 3.562);
      const targetPosition = new THREE.Vector3(-1.530, 0.775, 0.341);
      controlsRef.current.target.copy(targetPosition);
      camera.rotation.set(-0.006, 0.745, 0.004);
      controlsRef.current.update();
    }
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault fov={45} near={0.1} far={1000} />
      <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}; 