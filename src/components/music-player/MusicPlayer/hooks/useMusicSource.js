"use client";

import { useState, useEffect } from 'react';
import { MusicSourceManager } from '../services/MusicSourceManager';

const musicSourceManager = new MusicSourceManager();

export const useMusicSource = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPlaylist = async () => {
    try {
      setIsLoading(true);
      const source = musicSourceManager.getCurrentSource();
      const newPlaylist = await source.getPlaylist();
      setPlaylist(newPlaylist);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPlaylist([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMetadata = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      return await source.getMetadata(trackId);
    } catch (err) {
      console.error('Error loading metadata:', err);
      return null;
    }
  };

  const getAudioUrl = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      return await source.getAudioUrl(trackId);
    } catch (err) {
      console.error('Error getting audio URL:', err);
      return null;
    }
  };

  const switchSource = async (sourceName) => {
    try {
      musicSourceManager.switchSource(sourceName);
      await loadPlaylist();
    } catch (err) {
      setError(err.message);
    }
  };

  // 初始加载播放列表
  useEffect(() => {
    loadPlaylist();
  }, []);

  return {
    playlist,
    isLoading,
    error,
    loadMetadata,
    getAudioUrl,
    switchSource,
    registerSource: musicSourceManager.registerSource.bind(musicSourceManager)
  };
}; 