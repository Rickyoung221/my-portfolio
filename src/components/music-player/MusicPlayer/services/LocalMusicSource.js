"use client";

import { parseBlob } from "music-metadata";
import { MusicSourceInterface } from "./MusicSourceInterface";

export class LocalMusicSource extends MusicSourceInterface {
  async getPlaylist() {
    try {
      const response = await fetch("/api/music");
      if (!response.ok) throw new Error("Failed to load music list");
      const musicFiles = await response.json();

      return musicFiles.map((file) => ({
        id: file.title, // 使用文件名作为ID
        title: file.title,
        src: file.src,
        cover: null, // 初始为空，后续通过getMetadata获取
      }));
    } catch (error) {
      console.error("Error loading playlist:", error);
      return [];
    }
  }

  async getMetadata(trackId) {
    try {
      const response = await fetch(`/music/${trackId}.mp3`);
      const buffer = await response.arrayBuffer();
      const metadata = await parseBlob(new Blob([buffer]));

      let coverUrl = null;
      if (metadata.common.picture && metadata.common.picture.length > 0) {
        const picture = metadata.common.picture[0];
        const blob = new Blob([picture.data], { type: picture.format });
        coverUrl = URL.createObjectURL(blob);
      }

      return {
        title: metadata.common.title || trackId,
        artist: metadata.common.artist,
        album: metadata.common.album,
        cover: coverUrl,
        duration: metadata.format.duration,
      };
    } catch (error) {
      console.error("Error extracting metadata:", error);
      return {
        title: trackId,
        cover: null,
      };
    }
  }

  async getAudioUrl(trackId) {
    return `/music/${trackId}.mp3`;
  }
}
