"use client";

import { MusicSourceInterface } from "./MusicSourceInterface";

export class NeteaseMusicSource extends MusicSourceInterface {
  constructor(playlistId = "13153655441") {
    super();
    this.playlistId = playlistId;
    this.apiBaseUrl = "/api/netease"; // 需要创建的API端点
  }

  setPlaylistId(playlistId) {
    this.playlistId = playlistId;
  }

  async getPlaylist() {
    try {
      console.log(`正在获取歌单 ${this.playlistId}...`);
      const response = await fetch(
        `${this.apiBaseUrl}/playlist?id=${this.playlistId}`
      );
      if (!response.ok) throw new Error("获取网易云歌单失败");
      const data = await response.json();

      console.log("API返回数据:", data);

      // 处理网易云音乐API返回的不同可能的结构
      let tracks = [];

      // 方式1: 标准网易云API返回格式
      if (data.result && Array.isArray(data.result.tracks)) {
        tracks = data.result.tracks;
        console.log("使用标准格式，找到", tracks.length, "首歌曲");
      }
      // 方式2: 直接歌曲数组
      else if (Array.isArray(data.tracks)) {
        tracks = data.tracks;
        console.log("使用直接数组格式，找到", tracks.length, "首歌曲");
      }
      // 方式3: 歌曲数组可能在songs字段中
      else if (Array.isArray(data.songs)) {
        tracks = data.songs;
        console.log("使用songs格式，找到", tracks.length, "首歌曲");
      }
      // 方式4: 单个歌曲对象
      else if (data.songs && Array.isArray(data.songs)) {
        tracks = data.songs;
        console.log("使用嵌套songs格式，找到", tracks.length, "首歌曲");
      }
      // 方式5: 检查是否有任何歌曲数据
      else if (
        data.result &&
        data.result.tracks &&
        Array.isArray(data.result.tracks)
      ) {
        tracks = data.result.tracks;
        console.log("使用result.tracks格式，找到", tracks.length, "首歌曲");
      }

      if (!tracks.length) {
        console.error("未找到歌曲数据，数据结构:", data);
        throw new Error("获取的歌单格式不正确或歌单为空");
      }

      return tracks.map((track) => {
        // 处理不同的字段命名（标准API vs 第三方API）
        const artists = track.artists || track.ar || [];
        const album = track.album || track.al || {};
        const name = track.name || track.title || "未知歌曲";

        return {
          id: track.id.toString(),
          name: name,
          artists: artists.map((a) => ({
            id: a.id?.toString() || "",
            name: a.name || "未知歌手",
          })),
          album: {
            id: album.id?.toString() || "",
            name: album.name || "未知专辑",
            picUrl: album.picUrl || null,
          },
          duration: track.duration || track.dt || 0,
          fee: track.fee || 0,
          pop: track.pop || track.popularity || 0,
        };
      });
    } catch (error) {
      console.error("获取歌单失败:", error);
      return [];
    }
  }

  async getMetadata(trackId) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/song/detail?ids=${trackId}`
      );
      if (!response.ok) throw new Error("获取歌曲详情失败");
      const data = await response.json();

      // 打印完整的返回数据，便于调试
      console.log("歌曲详情返回数据:", JSON.stringify(data));

      // 检查不同可能的数据结构，并确保ID匹配
      let song = null;

      // 尝试标准格式，确保ID匹配
      if (data.songs && data.songs.length > 0) {
        song = data.songs.find((s) => s.id.toString() === trackId.toString());
      }
      // 尝试result格式，确保ID匹配
      else if (
        data.result &&
        data.result.songs &&
        data.result.songs.length > 0
      ) {
        song = data.result.songs.find(
          (s) => s.id.toString() === trackId.toString()
        );
      }
      // 直接使用歌单中的歌曲数据，确保ID匹配
      else if (
        data.result &&
        data.result.tracks &&
        data.result.tracks.length > 0
      ) {
        song = data.result.tracks.find(
          (t) => t.id.toString() === trackId.toString()
        );
      }

      if (!song) {
        console.error("未找到匹配的歌曲详情,返回数据结构:", data);
        throw new Error("获取的歌曲详情格式不正确");
      }

      // 适应不同的字段命名，并添加ID验证
      const metadata = {
        id: song.id.toString(), // 添加ID字段用于验证
        title: song.name,
        artist:
          (song.artists || song.ar)?.map((a) => a.name).join("/") || "未知歌手",
        album: (song.album || song.al)?.name || "未知专辑",
        cover: (song.album || song.al)?.picUrl || null,
        duration: song.duration || (song.dt ? song.dt / 1000 : 0),
      };

      // 验证返回的数据是否与请求的trackId匹配
      if (metadata.id !== trackId.toString()) {
        console.error("元数据ID不匹配:", {
          expected: trackId,
          got: metadata.id,
        });
        throw new Error("元数据ID不匹配");
      }

      return metadata;
    } catch (error) {
      console.error("获取歌曲详情失败:", error);
      return {
        id: trackId,
        title: `歌曲 ID: ${trackId}`,
        artist: "未知歌手",
        album: "未知专辑",
        cover: null,
        duration: 0,
      };
    }
  }

  async getAudioUrl(trackId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/song/url?id=${trackId}`);
      if (!response.ok) throw new Error("获取歌曲URL失败");
      const data = await response.json();

      // 打印完整的返回数据，便于调试
      console.log("歌曲URL返回数据:", JSON.stringify(data));

      // 尝试不同的数据结构
      let url = null;

      if (data.data && data.data[0] && data.data[0].url) {
        url = data.data[0].url;
      } else if (
        data.result &&
        data.result.data &&
        data.result.data[0] &&
        data.result.data[0].url
      ) {
        url = data.result.data[0].url;
      }

      if (!url) {
        console.error("未找到歌曲URL,返回数据结构:", data);
        // 备选方案：尝试使用固定URL格式
        return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
      }

      return url;
    } catch (error) {
      console.error("获取歌曲URL失败:", error);
      // 备选方案：尝试使用固定URL格式
      return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
    }
  }
}
