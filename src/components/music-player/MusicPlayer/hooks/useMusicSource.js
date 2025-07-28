"use client";

import { useState, useEffect } from "react";
import { MusicSourceManager } from "../services/MusicSourceManager";

const CACHE_KEY = "netease_playlist_cache";
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

const musicSourceManager = new MusicSourceManager();

export const useMusicSource = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPlaylist = async () => {
    try {
      // Try to load from cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

        if (!isExpired) {
          setPlaylist(data);
          setIsLoading(false);

          // Refresh cache in background
          refreshPlaylistInBackground();
          return;
        } else {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // If no cache or expired, load from source
      await loadFromSource();
    } catch (err) {
      setError(err.message);
      setPlaylist([]);
      setIsLoading(false);
    }
  };

  const loadFromSource = async () => {
    setIsLoading(true);
    try {
      console.log("开始从源加载播放列表...");
      const source = musicSourceManager.getCurrentSource();
      console.log("当前音乐源:", source);

      const newPlaylist = await source.getPlaylist();
      console.log("获取到的播放列表:", newPlaylist);

      if (newPlaylist && newPlaylist.length > 0) {
        // Update cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: newPlaylist,
            timestamp: Date.now(),
          })
        );

        setPlaylist(newPlaylist);
        setError(null);
        console.log("播放列表加载成功，共", newPlaylist.length, "首歌曲");
      } else {
        console.error("播放列表为空");
        setError("播放列表为空");
        setPlaylist([]);
      }
    } catch (err) {
      console.error("加载播放列表失败:", err);
      setError(err.message);
      setPlaylist([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPlaylistInBackground = async () => {
    // 暂时禁用后台刷新，避免循环更新
    return;

    try {
      const source = musicSourceManager.getCurrentSource();
      const newPlaylist = await source.getPlaylist();

      // Update cache and state only if new data is different
      if (JSON.stringify(newPlaylist) !== JSON.stringify(playlist)) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: newPlaylist,
            timestamp: Date.now(),
          })
        );
        setPlaylist(newPlaylist);
      }
    } catch (err) {
      // Silent fail for background refresh
    }
  };

  const loadMetadata = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      return await source.getMetadata(trackId);
    } catch (err) {
      return null;
    }
  };

  const getAudioUrl = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      const url = await source.getAudioUrl(trackId);
      return url;
    } catch (err) {
      // 发生错误时直接返回直连URL
      return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
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

  // Load playlist on mount
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
    registerSource: musicSourceManager.registerSource.bind(musicSourceManager),
    reloadPlaylist: loadPlaylist,
  };
};
