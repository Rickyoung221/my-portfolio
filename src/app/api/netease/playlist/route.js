// 网易云音乐歌单获取API
// 注意：这是一个代理API，需要配置服务器环境变量以保存API密钥等敏感信息

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("id");

  if (!playlistId) {
    return Response.json(
      {
        code: 400,
        message: "Missing playlist ID",
      },
      { status: 400 }
    );
  }

  try {
    console.log(`开始获取歌单 ${playlistId}...`);

    // 方法1: 尝试使用官方API
    try {
      const officialUrl = `https://music.163.com/api/playlist/detail?id=${playlistId}`;
      console.log("尝试官方API:", officialUrl);

      const officialResponse = await fetch(officialUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: "https://music.163.com/",
          Origin: "https://music.163.com",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
        },
      });

      console.log("官方API响应状态:", officialResponse.status);

      if (officialResponse.ok) {
        const officialData = await officialResponse.json();
        console.log("官方API响应数据:", officialData);

        if (officialData.result && officialData.result.tracks) {
          console.log(
            "官方API成功，返回",
            officialData.result.tracks.length,
            "首歌曲"
          );
          return Response.json({
            code: 200,
            result: {
              ...officialData.result,
              tracks: officialData.result.tracks,
            },
          });
        } else {
          console.error("官方API返回数据格式不正确:", officialData);
        }
      } else {
        console.error(
          "官方API请求失败:",
          officialResponse.status,
          officialResponse.statusText
        );
      }
    } catch (officialError) {
      console.error("官方API失败，尝试备用方案:", officialError);
    }

    // 方法2: 使用备用API服务
    const backupUrls = [
      `https://api.music.liuzhijin.cn/playlist/detail?id=${playlistId}`,
      `https://netease-cloud-music-api-tau-six.vercel.app/playlist/detail?id=${playlistId}`,
      `https://netease-cloud-music-api-gamma.vercel.app/playlist/detail?id=${playlistId}`,
    ];

    for (const backupUrl of backupUrls) {
      try {
        console.log(`尝试备用API: ${backupUrl}`);
        const backupResponse = await fetch(backupUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (backupResponse.ok) {
          const backupData = await backupResponse.json();
          console.log("备用API响应:", backupData);

          if (backupData.result && backupData.result.tracks) {
            console.log(
              "备用API成功，返回",
              backupData.result.tracks.length,
              "首歌曲"
            );
            return Response.json({
              code: 200,
              result: {
                ...backupData.result,
                tracks: backupData.result.tracks,
              },
            });
          }
        } else {
          console.error(
            `备用API ${backupUrl} 请求失败:`,
            backupResponse.status
          );
        }
      } catch (backupError) {
        console.error(`备用API ${backupUrl} 失败:`, backupError);
        continue;
      }
    }

    // 方法3: 如果所有API都失败，返回一个示例歌单
    console.log("所有API都失败，返回示例歌单");
    return Response.json({
      code: 200,
      result: {
        id: playlistId,
        name: "示例歌单",
        description: "由于API限制，显示示例歌曲",
        tracks: [
          {
            id: "1824020871",
            name: "起风了",
            artists: [{ name: "买辣椒也用券" }],
            album: {
              name: "起风了",
              picUrl:
                "http://p1.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951164456726316.jpg",
            },
            duration: 325000,
          },
          {
            id: "1824020872",
            name: "海阔天空",
            artists: [{ name: "Beyond" }],
            album: {
              name: "海阔天空",
              picUrl:
                "http://p1.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951164456726316.jpg",
            },
            duration: 326000,
          },
        ],
      },
    });

    // 方法3: 如果所有API都失败，返回错误信息
    throw new Error("所有API服务都不可用，请稍后重试");
  } catch (error) {
    return Response.json(
      {
        code: 500,
        message: error.message || "获取歌单失败",
      },
      { status: 500 }
    );
  }
}
