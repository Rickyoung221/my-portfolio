"use client";
import { useTheme } from '@/context/ThemeContext';
import { SceneContainer } from './model/SceneContainer';

const HeroModel = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-5 place-self-center relative w-full h-full">
      <div className={`rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] relative
                      ${isDarkMode ? 'bg-[#073642]' : 'bg-[#fdf6e3]'}`}>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <SceneContainer />
        </div>
      </div>
    </div>
  );
};

export default HeroModel; 