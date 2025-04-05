"use client";

/**
 * 音乐源接口
 * @interface MusicSource
 */
export class MusicSourceInterface {
  /**
   * 获取播放列表
   * @returns {Promise<Array<{
   *   id: string,
   *   title: string,
   *   src: string,
   *   cover?: string | null
   * }>>}
   */
  async getPlaylist() {
    throw new Error('Method not implemented');
  }

  /**
   * 获取音乐元数据（包括封面）
   * @param {string} trackId
   * @returns {Promise<{
   *   title: string,
   *   artist?: string,
   *   album?: string,
   *   cover?: string | null,
   *   duration?: number
   * }>}
   */
  async getMetadata(trackId) {
    throw new Error('Method not implemented');
  }

  /**
   * 获取音频源URL
   * @param {string} trackId
   * @returns {Promise<string>}
   */
  async getAudioUrl(trackId) {
    throw new Error('Method not implemented');
  }
} 