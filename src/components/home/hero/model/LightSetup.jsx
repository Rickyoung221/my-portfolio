export const LightSetup = () => {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.8} />
      {/* 聚光灯 */}
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.4} 
        penumbra={0.5}
        intensity={1.5}
      />
      {/* 补光 */}
      <pointLight position={[-5, 0, -5]} intensity={0.5} />
    </>
  );
}; 