"use client";
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { parseBlob } from 'music-metadata';
import Controls from './Controls';
import AlbumCover from './AlbumCover';
import ProgressControl from './ProgressControl';
import { formatTime, getVolumeIcon } from './utils';
import { useMusicSource } from './hooks/useMusicSource';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentCover, setCurrentCover] = useState(null);
  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();
  const { playlist, isLoading, loadMetadata, getAudioUrl } = useMusicSource();

  // 提取MP3文件的元数据（包括封面）
  const extractMetadata = async (trackIndex) => {
    try {
      if (!playlist || !playlist.length || trackIndex === undefined || !playlist[trackIndex]) {
        console.log('Waiting for playlist to load...');
        return;
      }

      const metadata = await loadMetadata(playlist[trackIndex].id);
      if (metadata && metadata.cover) {
        setCurrentCover(metadata.cover);
      } else {
        setCurrentCover(null);
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
      setCurrentCover(null);
    }
  };

  // 当切换歌曲时提取新的元数据
  useEffect(() => {
    if (!isLoading && playlist.length > 0) {
      extractMetadata(currentTrackIndex);
    }
  }, [currentTrackIndex, playlist, isLoading]);

  // 播放/暂停切换
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  // 切换到下一首
  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // 切换到上一首
  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  // 处理时间更新
  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // 处理音量更新
  const handleVolumeChange = (e) => {
    const vol = Math.min(Math.max(parseFloat(e.target.value), 0), 1);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (isPlaying) {
        audio.play().catch(error => {
          console.log("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      playNext();
    };

    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center items-center pb-1 md:pb-8 z-50 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto w-[75%] mx-auto md:mx-4 md:w-[600px] backdrop-blur-md rounded-lg md:rounded-2xl p-1.5 md:p-4 shadow-lg
                   ${isDarkMode 
                     ? 'bg-[#073642]/80 border-[#586e75]' 
                     : 'bg-[#eee8d5]/80 border-[#93a1a1]'}
                   border`}
      >
        {!isLoading && playlist.length > 0 && (
          <>
            <audio
              ref={audioRef}
              src={playlist[currentTrackIndex].src}
              preload="auto"
            />
            
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
              <AlbumCover
                currentCover={currentCover}
                isDarkMode={isDarkMode}
                isPlaying={isPlaying}
              />

              <ProgressControl
                isDarkMode={isDarkMode}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                title={playlist[currentTrackIndex].title}
                onTimeChange={handleTimeChange}
                onVolumeChange={handleVolumeChange}
                formatTime={formatTime}
                getVolumeIcon={() => getVolumeIcon(volume)}
              />

              <Controls
                isDarkMode={isDarkMode}
                isPlaying={isPlaying}
                onPlayPrevious={playPrevious}
                onTogglePlay={togglePlay}
                onPlayNext={playNext}
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MusicPlayer; 