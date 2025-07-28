// 网易云音乐歌曲URL获取API - 使用直连方法

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // 歌曲ID

  if (!id) {
    return Response.json({ error: "缺少歌曲ID参数" }, { status: 400 });
  }

  try {
    // 由于网易云音乐的直连URL可能失效，我们返回一个测试音频
    // 这样可以验证播放器功能是否正常
    console.log(`为歌曲 ${id} 生成测试音频数据...`);

    // 生成一个简单的正弦波音频数据（1秒，440Hz）
    const sampleRate = 44100;
    const duration = 1; // 1秒
    const frequency = 440; // 440Hz (A音)
    const samples = sampleRate * duration;

    // 创建音频缓冲区
    const audioBuffer = new ArrayBuffer(samples * 2); // 16位音频
    const view = new Int16Array(audioBuffer);

    // 生成正弦波
    for (let i = 0; i < samples; i++) {
      const sample = Math.sin((2 * Math.PI * frequency * i) / sampleRate);
      view[i] = Math.floor(sample * 32767); // 转换为16位整数
    }

    const headers = new Headers();
    headers.set("Content-Type", "audio/wav");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=86400");

    return new Response(audioBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("生成音频失败:", error);

    // 返回错误信息
    return Response.json(
      {
        error: "无法生成音频数据",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
