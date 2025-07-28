"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { parseBlob } from "music-metadata";
import { SiNeteasecloudmusic } from "react-icons/si";
import { MdQueueMusic, MdLyrics } from "react-icons/md";
import Controls from "./Controls";
import AlbumCover from "./AlbumCover";
import ProgressControl from "./ProgressControl";
import LoadingState from "./LoadingState";
import { formatTime, getVolumeIcon } from "./utils";
import { useMusicSource } from "./hooks/useMusicSource";
import { usePlaylistCache } from "./hooks/usePlaylistCache";
import { NeteaseMusicSource } from "./services/NeteaseMusicSource";
import PlaylistView from "./PlaylistView";
import { useAudioPreload } from "./hooks/useAudioPreload";
import LyricView from "./LyricView";
import { useLyricCache } from "./hooks/useLyricCache";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentCover, setCurrentCover] = useState(null);
  const [playlistId, setPlaylistId] = useState("13583418396"); // Default playlist ID
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const [currentTrackUrl, setCurrentTrackUrl] = useState(""); // Store current track URL
  const [audioQuality, setAudioQuality] = useState("standard"); // Default to lowest quality
  const [playlistInfo, setPlaylistInfo] = useState(null); // Playlist info state
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false); // 控制歌词显示
  const [preloadedTracks, setPreloadedTracks] = useState(new Set());
  const [isLoadingTrack, setIsLoadingTrack] = useState(false); // 防止重复加载
  const [lastTrackId, setLastTrackId] = useState(null); // 记录上次加载的歌曲ID
  const [playFailed, setPlayFailed] = useState(false); // 记录播放是否失败
  const [shouldLoadTrack, setShouldLoadTrack] = useState(true); // 控制是否应该加载新歌曲

  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();
  const {
    playlist,
    isLoading,
    loadMetadata,
    getAudioUrl,
    switchSource,
    registerSource,
  } = useMusicSource();
  const { preloadNextAudio, clearPreload, preloadedTrackId } =
    useAudioPreload();
  const { preloadLyrics } = useLyricCache();

  // Function to safely get current track
  const getCurrentTrack = () => {
    if (
      !playlist ||
      !playlist.length ||
      currentTrackIndex < 0 ||
      currentTrackIndex >= playlist.length
    ) {
      return null;
    }
    return playlist[currentTrackIndex];
  };

  // Register Netease music source - 只在组件挂载时初始化一次
  useEffect(() => {
    const initializePlayer = async () => {
      try {
        console.log("初始化播放器...");
        const neteaseSource = new NeteaseMusicSource(playlistId);
        registerSource("netease", neteaseSource);
        await switchSource("netease");
        setIsInitialized(true);
        console.log("播放器初始化完成");
      } catch (err) {
        console.error("播放器初始化失败:", err);
        setError("Failed to initialize player");
      }
    };

    initializePlayer();
  }, []); // 只在组件挂载时执行一次

  // 添加新的逻辑在加载完成后自动播放
  useEffect(() => {
    // 只有当初始化完成且有音乐地址时才尝试播放
    // 注意：由于浏览器自动播放策略，这里不自动播放
    if (isInitialized && currentTrackUrl && audioRef.current && !isPlaying) {
      console.log("音频已加载，等待用户交互后播放:", currentTrackUrl);
      // 不自动播放，等待用户点击播放按钮
    }
  }, [isInitialized, currentTrackUrl]); // 移除 isPlaying 依赖，避免循环

  // Update music source when playlist ID changes
  useEffect(() => {
    if (playlistId && playlistId !== "" && isInitialized) {
      console.log("歌单ID变化，重新加载:", playlistId);
      const neteaseSource = new NeteaseMusicSource(playlistId);
      registerSource("netease", neteaseSource);
      switchSource("netease");
    }
  }, [playlistId, isInitialized]);

  // Ensure currentTrackIndex is always valid
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      if (currentTrackIndex >= playlist.length) {
        console.log("当前歌曲索引超出范围，重置为0");
        setCurrentTrackIndex(0);
      }
    } else if (playlist && playlist.length === 0 && currentTrackIndex !== 0) {
      console.log("播放列表为空，重置歌曲索引为0");
      setCurrentTrackIndex(0);
    }
  }, [playlist]); // 只依赖 playlist，移除 currentTrackIndex 避免循环

  // Extract metadata from MP3 file (including cover)
  const extractMetadata = async (trackIndex) => {
    try {
      if (
        !playlist ||
        !playlist.length ||
        trackIndex === undefined ||
        !playlist[trackIndex]
      ) {
        return null;
      }

      const currentTrackId = playlist[trackIndex].id;
      const metadata = await loadMetadata(currentTrackId);

      // 验证返回的元数据是否匹配当前歌曲
      if (metadata && metadata.id === currentTrackId) {
        if (metadata.cover) {
          setCurrentCover(metadata.cover);
        } else if (playlist[trackIndex].album?.picUrl) {
          setCurrentCover(playlist[trackIndex].album.picUrl);
        } else {
          setCurrentCover(null);
        }
        return metadata;
      } else {
        console.warn("元数据不匹配当前歌曲，使用播放列表数据");
        // 使用播放列表中的数据作为备选
        setCurrentCover(playlist[trackIndex].album?.picUrl || null);
        return {
          id: currentTrackId,
          title: playlist[trackIndex].name,
          artist: playlist[trackIndex].artists?.[0]?.name || "未知歌手",
          album: playlist[trackIndex].album?.name || "未知专辑",
          cover: playlist[trackIndex].album?.picUrl || null,
          duration: playlist[trackIndex].duration || 0,
        };
      }
    } catch (error) {
      console.error("获取元数据失败:", error);
      setCurrentCover(null);
      return null;
    }
  };

  // Get and set current track URL
  const loadCurrentTrackUrl = async (trackIndex) => {
    if (
      !playlist ||
      !playlist.length ||
      trackIndex === undefined ||
      !playlist[trackIndex]
    ) {
      return;
    }

    try {
      setCurrentTrackUrl("");

      const trackId = playlist[trackIndex].id;
      console.log("获取歌曲URL:", trackId);

      // 使用我们的代理API，确保返回正确的音频数据
      const proxyUrl = `/api/netease/song/url?id=${trackId}`;
      setCurrentTrackUrl(proxyUrl);
      console.log("设置音频URL (代理):", proxyUrl);
    } catch (error) {
      console.error("设置音频URL失败:", error);
      // 如果API失败，尝试使用直连URL
      const trackId = playlist[trackIndex].id;
      const directUrl = `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
      setCurrentTrackUrl(directUrl);
      console.log("使用直连URL作为备选:", directUrl);
    }
  };

  // Extract new metadata and URL when changing tracks
  useEffect(() => {
    // 防止在播放列表为空时触发
    if (!playlist || playlist.length === 0) {
      return;
    }

    // 检查是否应该加载新歌曲
    if (!shouldLoadTrack) {
      console.log("跳过加载新歌曲");
      return;
    }

    let retryCount = 0;
    const maxRetries = 3;
    const initialDelay = 1000; // 1 second delay for first load

    // 添加防抖，避免频繁触发
    const timeoutId = setTimeout(() => {
      const loadTrackData = async () => {
        // 防止重复加载
        if (isLoadingTrack) {
          return;
        }

        // 检查当前歌曲是否已经加载过
        const currentTrack = playlist?.[currentTrackIndex];
        if (currentTrack && lastTrackId === currentTrack.id) {
          console.log("歌曲已加载过，跳过:", currentTrack.id);
          return;
        }

        try {
          setIsLoadingTrack(true);

          if (
            !isLoading &&
            playlist &&
            playlist.length > 0 &&
            currentTrackIndex >= 0 &&
            currentTrackIndex < playlist.length
          ) {
            console.log(
              "开始加载歌曲:",
              currentTrack?.name || currentTrackIndex
            );

            // Add delay for initial load
            if (!currentTrackUrl && retryCount === 0) {
              await new Promise((resolve) => setTimeout(resolve, initialDelay));
            }

            const metadata = await extractMetadata(currentTrackIndex);

            // If metadata failed and we haven't exceeded max retries
            if (!metadata && retryCount < maxRetries) {
              retryCount++;
              console.log(
                `Retrying metadata load (${retryCount}/${maxRetries})...`
              );
              setTimeout(loadTrackData, 1000 * retryCount); // Exponential backoff
              return;
            }

            await loadCurrentTrackUrl(currentTrackIndex);

            // 记录已加载的歌曲ID
            if (currentTrack) {
              setLastTrackId(currentTrack.id);
            }

            // 重置重试计数
            retryCount = 0;
          }
        } catch (error) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(
              `Retrying after error (${retryCount}/${maxRetries}):`,
              error
            );
            setTimeout(loadTrackData, 1000 * retryCount);
          } else {
            console.warn("Failed to load track data after retries:", error);
            retryCount = 0; // 重置重试计数
          }
        } finally {
          setIsLoadingTrack(false);
        }
      };

      loadTrackData();
    }, 500); // 增加防抖延迟到500ms

    return () => clearTimeout(timeoutId);
  }, [currentTrackIndex, playlist, shouldLoadTrack]); // 添加 shouldLoadTrack 依赖

  // Handle music source change
  const handleSourceChange = (source) => {
    setCurrentSource(source);
    switchSource(source);
    setShowSourceSelector(false);
  };

  // Handle playlist ID change
  const handlePlaylistIdChange = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setPlaylistId(e.target.value);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current || !currentTrackUrl) {
      console.log("无法播放：缺少音频元素或URL");
      return;
    }

    if (audioRef.current.paused) {
      console.log("开始播放");
      // 立即尝试播放，不需要延迟
      audioRef.current
        .play()
        .then(() => {
          console.log("播放成功");
          setIsPlaying(true);
          setPlayFailed(false); // 重置失败标志
        })
        .catch((error) => {
          console.log("播放失败，错误:", error);
          if (error.name === "NotAllowedError") {
            console.log("需要用户交互才能播放，请点击播放按钮");
          } else if (error.name === "NotSupportedError") {
            console.log("音频源不支持，阻止自动切换");
            setShouldLoadTrack(false); // 阻止自动加载新歌曲
          }
          // 设置播放失败标志
          setPlayFailed(true);
          setIsPlaying(false);
        });
    } else {
      console.log("暂停播放");
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Switch to next track
  const playNext = () => {
    if (!playlist || playlist.length === 0) {
      return;
    }
    console.log("切换到下一首歌曲");
    setShouldLoadTrack(true); // 允许加载新歌曲
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // Switch to previous track
  const playPrevious = () => {
    if (!playlist || playlist.length === 0) {
      return;
    }
    console.log("切换到上一首歌曲");
    setShouldLoadTrack(true); // 允许加载新歌曲
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  // Handle time update
  const handleTimeChange = (e) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Handle volume update
  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;
    const vol = Math.min(Math.max(parseFloat(e.target.value), 0), 1);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  // When playlist loads, extract playlist info
  useEffect(() => {
    if (!isLoading && playlist && playlist.length > 0) {
      // Try to extract playlist info from API response
      const fetchPlaylistInfo = async () => {
        try {
          // Only try to get playlist info for Netease music source
          const response = await fetch(
            `/api/netease/playlist?id=${playlistId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.result) {
              setPlaylistInfo({
                name: data.result.name || "Unknown Playlist",
                description: data.result.description || "",
                trackCount: data.result.trackCount || playlist.length,
                creator: data.result.creator?.nickname || "Unknown User",
                coverImgUrl: data.result.coverImgUrl,
              });
              return;
            }
          }

          // If cannot get detailed info, use simple info
          setPlaylistInfo({
            name: "Playlist " + playlistId,
            trackCount: playlist.length,
            description: "",
          });
        } catch (error) {
          setPlaylistInfo({
            name: "Playlist " + playlistId,
            trackCount: playlist.length,
            description: "",
          });
        }
      };

      fetchPlaylistInfo();
    }
  }, [playlist, isLoading, playlistId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log("音频元数据加载完成，时长:", audio.duration);
      // 不自动播放，等待用户交互
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      console.log("歌曲播放结束");
      // 只有在正常播放结束时才切换到下一首
      if (audio.currentTime > 0 && audio.duration > 0 && !playFailed) {
        console.log("正常播放结束，切换到下一首");
        playNext();
      } else {
        console.log("播放失败或异常结束，不自动切换");
        setIsPlaying(false);
        setPlayFailed(false); // 重置失败标志
      }
    };

    const handleError = () => {
      console.log("音频播放错误");
      const mediaError = audio.error;
      if (mediaError) {
        console.log("媒体错误:", mediaError);
        // 设置播放失败标志
        setPlayFailed(true);
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []); // 只在组件挂载时绑定事件监听器

  // Handle track selection from playlist
  const handleTrackSelect = (index) => {
    console.log("用户选择歌曲:", index);
    setShouldLoadTrack(true); // 允许加载新歌曲
    setCurrentTrackIndex(index);
    setPlayFailed(false); // 重置播放失败标志
    setShowPlaylist(false);
    // 不自动播放，等待用户点击播放按钮
  };

  // 在当前歌曲加载完成后预加载下一首
  useEffect(() => {
    if (duration > 0 && playlist?.length > 1) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      const nextTrackId = playlist[nextIndex].id;

      if (nextTrackId !== preloadedTrackId) {
        preloadNextAudio(nextTrackId, audioQuality);
      }
    }
  }, [duration, currentTrackIndex, playlist]);

  // 切换播放列表时清理预加载
  useEffect(() => {
    clearPreload();
  }, [playlistId]);

  // Toggle lyrics display
  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  // Handle lyrics seek
  const handleLyricSeek = (time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // 当歌曲变化时预加载歌词
  useEffect(() => {
    if (
      !isLoading &&
      playlist &&
      playlist.length > 0 &&
      currentTrackIndex >= 0
    ) {
      const currentTrack = playlist[currentTrackIndex];
      if (currentTrack && currentTrack.id) {
        // 预加载当前歌曲的歌词
        preloadLyrics(currentTrack.id);

        // 如果有下一首歌曲，也预加载它的歌词
        if (playlist.length > 1) {
          const nextIndex = (currentTrackIndex + 1) % playlist.length;
          const nextTrack = playlist[nextIndex];
          if (nextTrack && nextTrack.id) {
            preloadLyrics(nextTrack.id);
          }
        }
      }
    }
  }, [currentTrackIndex, playlist, isLoading, preloadLyrics]);

  const EmptyPlaylist = ({ isDarkMode }) => (
    <div
      className={`flex flex-col items-center justify-center h-16 space-y-2 ${
        isDarkMode ? "text-[#839496]" : "text-[#657b83]"
      }`}
    >
      <span className="text-sm">No songs in playlist</span>
      <span className="text-xs opacity-75">Please try another playlist ID</span>
    </div>
  );

  const ErrorState = ({ isDarkMode, message }) => (
    <div
      className={`flex flex-col items-center justify-center h-16 space-y-2 ${
        isDarkMode ? "text-[#839496]" : "text-[#657b83]"
      }`}
    >
      <span className="text-sm">Failed to load playlist</span>
      <span className="text-xs opacity-75">
        {message || "Please try again later"}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center items-center pb-1 md:pb-8 z-50 pointer-events-none">
      <div className="relative w-[75%] md:w-[600px] max-w-[650px]">
        {/* LyricView component - positioned above the player */}
        {!isLoading && playlist && playlist.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 flex justify-center w-full mb-8 px-2 md:px-0">
            <div style={{ width: "100%", maxWidth: "750px", margin: "0 auto" }}>
              <LyricView
                isDarkMode={isDarkMode}
                currentTrackId={getCurrentTrack()?.id}
                currentTime={currentTime}
                isVisible={showLyrics}
                onClose={() => setShowLyrics(false)}
                onSeek={handleLyricSeek}
                albumCover={currentCover}
              />
            </div>
          </div>
        )}

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative pointer-events-auto w-full backdrop-blur-md rounded-lg md:rounded-2xl p-1.5 md:p-4 shadow-lg
                   ${
                     isDarkMode
                       ? "bg-[#073642]/80 border-[#586e75]"
                       : "bg-[#eee8d5]/80 border-[#93a1a1]"
                   }
                   border`}
        >
          {/* Add playlist view */}
          {showPlaylist && !isLoading && playlist && playlist.length > 0 && (
            <PlaylistView
              isDarkMode={isDarkMode}
              playlist={playlist}
              currentTrackIndex={currentTrackIndex}
              onTrackSelect={handleTrackSelect}
              onClose={() => setShowPlaylist(false)}
            />
          )}

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSourceSelector(!showSourceSelector)}
                className={`text-xs px-2 py-1 rounded-md hidden sm:block ${
                  isDarkMode
                    ? "bg-[#002b36] text-[#839496]"
                    : "bg-[#fdf6e3] text-[#657b83]"
                }`}
              >
                <div className="flex items-center gap-1">
                  <SiNeteasecloudmusic className="w-3 h-3" />
                  <span>Netease Music</span>
                </div>
              </button>

              {/* Display playlist name and track count */}
              {playlistInfo && (
                <div
                  className={`text-xs hidden sm:block ${
                    isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
                  }`}
                >
                  {playlistInfo.name}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Lyrics button - Updated for better visibility */}
              {!isLoading && playlist && playlist.length > 0 && (
                <button
                  onClick={toggleLyrics}
                  className={`text-xs px-2 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                    isDarkMode
                      ? showLyrics
                        ? "bg-[#073642] text-[#93a1a1]"
                        : "hover:bg-[#073642] text-[#839496] bg-[#002b36]"
                      : showLyrics
                      ? "bg-[#eee8d5] text-[#586e75]"
                      : "hover:bg-[#eee8d5] text-[#657b83] bg-[#fdf6e3]"
                  }`}
                  aria-label="Show lyrics"
                >
                  <div className="flex items-center gap-1">
                    <MdLyrics className="w-4 h-4" />
                    <span className="hidden sm:inline">Lyrics</span>
                  </div>
                </button>
              )}

              {/* Playlist button and track counter combined */}
              {!isLoading && playlist && playlist.length > 0 && (
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    isDarkMode
                      ? showPlaylist
                        ? "bg-[#073642] text-[#93a1a1]"
                        : "hover:bg-[#073642] text-[#839496] bg-[#002b36]"
                      : showPlaylist
                      ? "bg-[#eee8d5] text-[#586e75]"
                      : "hover:bg-[#eee8d5] text-[#657b83] bg-[#fdf6e3]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <MdQueueMusic className="w-4 h-4" />
                    <span className="hidden sm:inline">Playlist</span>
                  </div>
                  <span className="opacity-75">
                    {currentTrackIndex + 1}/{playlist.length}
                  </span>
                </button>
              )}
            </div>

            {/* Source selector popup */}
            {showSourceSelector && (
              <div
                className={`absolute top-0 transform -translate-y-full mt-[-8px] z-10 rounded-md shadow-lg p-2 hidden sm:block ${
                  isDarkMode
                    ? "bg-[#002b36] text-[#839496]"
                    : "bg-[#fdf6e3] text-[#657b83]"
                }`}
              >
                <div className="flex flex-col">
                  <div className="mt-2">
                    <div className="text-xs mb-2 opacity-80">
                      Enter your Netease Cloud Music playlist ID
                      <div className="text-[10px] mt-1 opacity-60">
                        (You can find it in the playlist URL:
                        music.163.com/playlist?id=...)
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Playlist ID"
                        defaultValue={playlistId}
                        onKeyPress={handlePlaylistIdChange}
                        className={`text-xs flex-1 px-2 py-1.5 rounded-md outline-none border ${
                          isDarkMode
                            ? "bg-[#073642] text-[#839496] border-[#586e75] focus:border-[#839496]"
                            : "bg-[#eee8d5] text-[#657b83] border-[#93a1a1] focus:border-[#657b83]"
                        }`}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector(
                            'input[placeholder="Enter Playlist ID"]'
                          );
                          if (input && input.value) {
                            setPlaylistId(input.value);
                            setShowSourceSelector(false);
                          }
                        }}
                        className={`text-xs px-4 py-1.5 rounded-md transition-colors ${
                          isDarkMode
                            ? "bg-[#268bd2] hover:bg-[#2aa198] text-[#fdf6e3]"
                            : "bg-[#268bd2] hover:bg-[#2aa198] text-[#fdf6e3]"
                        }`}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isInitialized || isLoading ? (
            <LoadingState isDarkMode={isDarkMode} />
          ) : error ? (
            <ErrorState isDarkMode={isDarkMode} message={error} />
          ) : !playlist || playlist.length === 0 ? (
            <EmptyPlaylist isDarkMode={isDarkMode} />
          ) : (
            <>
              <audio
                ref={audioRef}
                src={currentTrackUrl}
                preload="auto"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.log("音频元素错误:", e);
                  console.log("当前音频URL:", currentTrackUrl);
                  // 移除自动切换到下一首的逻辑
                }}
                onLoadStart={() => {
                  console.log("开始加载音频:", currentTrackUrl);
                }}
                onCanPlay={() => {
                  console.log("音频可以播放:", currentTrackUrl);
                }}
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
                  title={getCurrentTrack()?.name || "Loading..."}
                  artist={
                    getCurrentTrack()?.artists?.[0]?.name || "Unknown Artist"
                  }
                  onTimeChange={handleTimeChange}
                  onVolumeChange={handleVolumeChange}
                  formatTime={formatTime}
                  getVolumeIcon={getVolumeIcon}
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
    </div>
  );
};

export default MusicPlayer;
