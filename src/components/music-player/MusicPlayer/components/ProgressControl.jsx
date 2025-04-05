import ScrollingTitle from './ScrollingTitle';

const ProgressControl = ({
  isDarkMode,
  currentTime,
  duration,
  volume,
  title,
  onTimeChange,
  onVolumeChange,
  formatTime,
  getVolumeIcon
}) => {
  return (
    <div className="flex-1 min-w-0 w-full md:min-w-[200px] order-2 md:order-none">
      <ScrollingTitle title={title} isDarkMode={isDarkMode} />
      <div className="flex items-center space-x-1 md:space-x-2">
        <span className={`text-[10px] md:text-xs ${
          isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
        }`}>
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={onTimeChange}
          className={`w-full h-1.5 md:h-2 rounded-lg appearance-none cursor-pointer
                     ${isDarkMode 
                       ? 'bg-[#586e75] accent-[#93a1a1]' 
                       : 'bg-[#93a1a1] accent-[#586e75]'}`}
        />
        <span className={`text-[10px] md:text-xs ${
          isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
        }`}>
          {formatTime(duration)}
        </span>
      </div>
      {/* 音量控制 */}
      <div className="hidden md:flex items-center justify-center space-x-1.5 mt-1.5">
        <button
          onClick={() => onVolumeChange({ target: { value: volume === 0 ? 1 : 0 } })}
          className={`p-2 rounded-full hover:bg-[${isDarkMode ? '#586e75' : '#93a1a1'}]/20 transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${
              isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {getVolumeIcon()}
          </svg>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className={`w-16 h-0.5 rounded-lg appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:cursor-pointer
                   ${isDarkMode 
                     ? 'bg-[#586e75] accent-[#93a1a1] [&::-webkit-slider-thumb]:bg-[#93a1a1]' 
                     : 'bg-[#93a1a1] accent-[#586e75] [&::-webkit-slider-thumb]:bg-[#586e75]'}`}
        />
      </div>
    </div>
  );
};

export default ProgressControl; 