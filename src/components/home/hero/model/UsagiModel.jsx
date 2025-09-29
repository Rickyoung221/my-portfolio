import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAudioHover } from "@/hooks/useAudioHover";

export const UsagiModel = () => {
  const { scene } = useGLTF("/usagi.glb");
  const modelRef = useRef();
  const { viewport } = useThree();
  const mouse = useRef([0, 0]);
  const baseRotationY = Math.PI * 0.25; // 基础Y轴旋转

  // 音频播放hook
  const { playAudio, stopAudio, cleanup } = useAudioHover(
    "/usagi_cursor/3uniques.mp3"
  );

  useEffect(() => {
    const updateMouse = (event) => {
      // 将鼠标位置归一化到 -1 到 1 的范围
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", updateMouse);
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      cleanup(); // 清理音频资源
    };
  }, [cleanup]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    // 计算目标旋转
    const targetX = -mouse.current[1] * 0.2; // 上下视线移动

    // 计算左右旋转
    let rotationOffset;
    let zOffset;
    if (mouse.current[0] < 0) {
      // 左侧：使用更大的系数，并确保是负值（向左转）
      rotationOffset = Math.abs(mouse.current[0]) * -0.8;
      // 左侧：根据鼠标位置调整Z轴位置
      zOffset = Math.abs(mouse.current[0]) * 0.3;
    } else {
      // 右侧：保持原来的灵敏度
      rotationOffset = mouse.current[0] * 0.4;
      // 右侧：根据鼠标位置调整Z轴位置
      zOffset = mouse.current[0] * 0.3;
    }

    const targetY = baseRotationY + rotationOffset;

    // 平滑插值当前旋转到目标旋转
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetX,
      delta * 2
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetY,
      delta * 2
    );

    // 平滑插值Z轴位置
    modelRef.current.position.z = THREE.MathUtils.lerp(
      modelRef.current.position.z,
      zOffset,
      delta * 2
    );
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2}
      position={[0.5, -0.5, 0]}
      onPointerEnter={playAudio}
      onPointerLeave={stopAudio}
    />
  );
};
