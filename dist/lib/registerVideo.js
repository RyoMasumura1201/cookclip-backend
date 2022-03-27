"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var axios_1 = __importDefault(require("axios"));
var dayjs_1 = __importDefault(require("dayjs"));
var prisma = new client_1.PrismaClient();
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var existVideos, existVideoIdList, url, videoListForPrisma, pageToken, publishedAfterDate, now, publishedBeforeDate, res, videoList, e_1, uniqueVideos, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.video.findMany()];
            case 1:
                existVideos = _a.sent();
                existVideoIdList = existVideos.map(function (video) { return video.videoId; });
                url = "https://www.googleapis.com/youtube/v3/search";
                videoListForPrisma = [];
                pageToken = "";
                publishedAfterDate = (0, dayjs_1["default"])(new Date(2018, 11, 1));
                now = (0, dayjs_1["default"])();
                _a.label = 2;
            case 2:
                if (!true) return [3 /*break*/, 9];
                publishedBeforeDate = publishedAfterDate.add(1, "month");
                _a.label = 3;
            case 3:
                if (!true) return [3 /*break*/, 8];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, axios_1["default"].get(url, {
                        params: {
                            part: "snippet",
                            channelId: process.env.CHANNEL_ID_OF_RYUJI,
                            key: process.env.YOUTUBE_API_KEY,
                            maxResults: 50,
                            type: "video",
                            pageToken: pageToken,
                            publishedAfter: publishedAfterDate.format(),
                            publishedBefore: publishedBeforeDate.format()
                        }
                    })];
            case 5:
                res = _a.sent();
                videoList = res.data.items;
                videoList
                    .filter(function (video) {
                    return !existVideoIdList.includes(video.id.videoId);
                })
                    .map(function (video) {
                    return {
                        videoId: video.id.videoId,
                        title: video.snippet.title,
                        description: video.snippet.description
                    };
                })
                    .forEach(function (video) {
                    videoListForPrisma.push(video);
                });
                console.log(videoListForPrisma.length);
                pageToken = res.data.nextPageToken;
                if (!pageToken) {
                    return [3 /*break*/, 8];
                }
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 3];
            case 8:
                publishedAfterDate = publishedBeforeDate;
                if (now.diff(publishedAfterDate, "month") < 1) {
                    return [3 /*break*/, 9];
                }
                return [3 /*break*/, 2];
            case 9:
                uniqueVideos = videoListForPrisma.filter(function (video, i, self) {
                    return self.findIndex(function (v) { return v.videoId === video.videoId; }) === i;
                });
                return [4 /*yield*/, prisma.video.createMany({
                        data: uniqueVideos
                    })];
            case 10:
                result = _a.sent();
                console.log("result");
                console.log(result);
                return [2 /*return*/];
        }
    });
}); };
main();
//# sourceMappingURL=registerVideo.js.map