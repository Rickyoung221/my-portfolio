import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { CameraSetup } from './CameraSetup';
import { LightSetup } from './LightSetup';
import { UsagiModel } from './UsagiModel';

export const SceneContainer = () => {
  const { isDarkMode } = useTheme();

  return (
    <Canvas>
      <color attach="background" args={[isDarkMode ? '#073642' : '#fdf6e3']} />
      <Suspense fallback={null}>
        <CameraSetup />
        <LightSetup />
        <UsagiModel />
      </Suspense>
    </Canvas>
  );
}; 