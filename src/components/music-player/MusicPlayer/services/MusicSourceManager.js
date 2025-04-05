"use client";

import { LocalMusicSource } from './LocalMusicSource';

export class MusicSourceManager {
  constructor() {
    this.sources = {
      local: new LocalMusicSource()
    };
    this.currentSource = 'local';
  }

  /**
   * 注册新的音乐源
   * @param {string} name 
   * @param {MusicSourceInterface} source 
   */
  registerSource(name, source) {
    this.sources[name] = source;
  }

  /**
   * 切换音乐源
   * @param {string} name 
   */
  switchSource(name) {
    if (!this.sources[name]) {
      throw new Error(`Music source '${name}' not found`);
    }
    this.currentSource = name;
  }

  /**
   * 获取当前音乐源
   * @returns {MusicSourceInterface}
   */
  getCurrentSource() {
    return this.sources[this.currentSource];
  }
} 