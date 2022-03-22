import { PrismaClient } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
const prisma = new PrismaClient();

type YoutubeMovie = {
  kind: string;
  etag: string;
  id: { kind: string; videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: [Object];
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

type SearchMovieResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  reginCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeMovie[];
};

type videoForPrisma = {
  title: string;
  videoId: string;
  description: string;
};

const main = async () => {
  const existVideos = await prisma.video.findMany();
  const existVideoIdList = existVideos.map((video) => video.videoId);

  const url = "https://www.googleapis.com/youtube/v3/search";
  const videoListForPrisma: videoForPrisma[] = [];
  let pageToken = "";
  while (true) {
    try {
      const res: AxiosResponse<SearchMovieResult> = await axios.get(url, {
        params: {
          part: "snippet",
          channelId: process.env.CHANNEL_ID_OF_RYUJI,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: 50,
          type: "video",
          pageToken: pageToken,
        },
      });

      const videoList = res.data.items;
      videoList
        .filter((video) => {
          return !existVideoIdList.includes(video.id.videoId);
        })
        .map((video) => {
          return {
            videoId: video.id.videoId,
            title: video.snippet.title,
            description: video.snippet.description,
          };
        })
        .forEach((video) => {
          videoListForPrisma.push(video);
        });
      console.log(videoListForPrisma.length);
      console.log(res.data.nextPageToken);
      pageToken = res.data.nextPageToken;
      if (!pageToken) {
        break;
      }
    } catch (e) {
      console.log(e);
      break;
    }
  }

  const uniqueVideos = videoListForPrisma.filter((video, i, self) => {
    return self.findIndex((v) => v.videoId === video.videoId) === i;
  });

  const result = await prisma.video.createMany({
    data: uniqueVideos,
  });
  console.log("result");
  console.log(result);
};

main();
