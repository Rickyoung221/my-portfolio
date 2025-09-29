import { useRef, useCallback } from "react";

export const useAudioHover = (audioSrc) => {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  const playAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2; // 设置音量为20%，更柔和
      audioRef.current.preload = "auto"; // 预加载音频
    }

    if (!isPlayingRef.current) {
      // 淡入效果
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          // 音频开始播放后，逐渐增加音量
          const fadeIn = setInterval(() => {
            if (audioRef.current.volume < 0.2) {
              audioRef.current.volume += 0.02;
            } else {
              clearInterval(fadeIn);
            }
          }, 50);
        })
        .catch((error) => {
          console.log("音频播放失败:", error);
        });
      isPlayingRef.current = true;
    }
  }, [audioSrc]);

  const stopAudio = useCallback(() => {
    if (audioRef.current && isPlayingRef.current) {
      // 淡出效果
      const fadeOut = setInterval(() => {
        if (audioRef.current.volume > 0.02) {
          audioRef.current.volume -= 0.02;
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // 重置到开始位置
          audioRef.current.volume = 0.2; // 重置音量，为下次播放做准备
          clearInterval(fadeOut);
        }
      }, 50);
      isPlayingRef.current = false;
    }
  }, []);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      isPlayingRef.current = false;
    }
  }, []);

  return {
    playAudio,
    stopAudio,
    cleanup,
  };
};
