import { PrismaClient } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
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

const main = async () => {
  // const searchResult = await axios.get<never, SearchMovieResult>(
  //   'https://www.googleapis.com/youtube/v3/search',
  //   {
  //     params: {
  //       part: 'snippet',
  //       channelId: process.env.CHANNEL_ID_OF_RYUJI,
  //       key: process.env.YOUTUBE_API_KEY,
  //     },
  //   },
  // );

  const existVideos = await prisma.video.findMany();
  const existVideoIdList = existVideos.map((video) => video.videoId);

  const url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    process.env.CHANNEL_ID_OF_RYUJI +
    '&key=' +
    process.env.YOUTUBE_API_KEY +
    '&maxResults=50';

  axios
    .get(url)
    .then(async (res: AxiosResponse<SearchMovieResult>) => {
      const videoList = res.data.items;
      console.log('videoList');
      console.log(videoList);

      const videoListForPrisma = videoList
        .filter((video) => video.id.videoId)
        .filter((video) => {
          return !existVideoIdList.includes(video.id.videoId);
        })
        .map((video) => {
          return {
            videoId: video.id.videoId,
            title: video.snippet.title,
            description: video.snippet.description,
          };
        });

      console.log('videoListForPrisma');
      console.log(videoListForPrisma);

      const result = await prisma.video.createMany({
        data: videoListForPrisma,
      });
      console.log('result');
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

main();
