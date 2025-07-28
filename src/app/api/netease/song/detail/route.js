// 网易云音乐歌曲详情API - 简化版本

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids"); // 歌曲ID

  if (!ids) {
    return Response.json({ error: "缺少歌曲ID参数" }, { status: 400 });
  }

  try {
    console.log(`获取歌曲详情: ${ids}`);

    // 使用官方API获取歌曲详情
    const apiUrl = `https://music.163.com/api/song/detail?ids=[${ids}]`;
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://music.163.com/",
        Origin: "https://music.163.com",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("歌曲详情API响应:", data);

      if (data.songs && data.songs.length > 0) {
        return Response.json(data);
      }
    }

    // 如果API失败或没有数据，返回默认响应
    console.log("API失败，返回默认歌曲信息");
    return Response.json({
      songs: [
        {
          id: ids,
          name: `歌曲 ID: ${ids}`,
          artists: [{ name: "未知歌手" }],
          album: { name: "未知专辑", picUrl: null },
          duration: 0,
        },
      ],
      code: 200,
    });
  } catch (error) {
    console.error("获取歌曲详情失败:", error);

    // 返回默认响应
    return Response.json({
      songs: [
        {
          id: ids,
          name: `歌曲 ID: ${ids}`,
          artists: [{ name: "未知歌手" }],
          album: { name: "未知专辑", picUrl: null },
          duration: 0,
        },
      ],
      code: 200,
    });
  }
}
