// 网易云音乐歌词获取API

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get("id");

  if (!trackId) {
    return Response.json(
      {
        code: 400,
        message: "Missing track ID",
      },
      { status: 400 }
    );
  }

  try {
    console.log(`获取歌词: ${trackId}`);

    // 使用网易云音乐官方API获取歌词
    const lyricsUrl = `https://music.163.com/api/song/lyric?id=${trackId}&lv=-1&kv=-1&tv=-1`;
    const lyricsResponse = await fetch(lyricsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://music.163.com/",
        Origin: "https://music.163.com",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (lyricsResponse.ok) {
      const lyricsData = await lyricsResponse.json();
      console.log("歌词API响应:", lyricsData);

      if (lyricsData.code === 200) {
        return Response.json(lyricsData);
      }
    }

    // 如果API失败，返回默认响应
    console.log("歌词API失败，返回默认歌词");
    return Response.json({
      code: 200,
      lrc: { lyric: "[00:00.00]暂无歌词" },
      tlyric: { lyric: "" },
      romalrc: { lyric: "" },
    });
  } catch (error) {
    return Response.json(
      {
        code: 500,
        message: error.message || "获取歌词失败",
      },
      { status: 500 }
    );
  }
}
