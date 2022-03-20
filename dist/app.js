"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userController_1 = __importDefault(require("./controllers/userController"));
var bookmarkController_1 = __importDefault(require("./controllers/bookmarkController"));
var videoController_1 = __importDefault(require("./controllers/videoController"));
var app = (0, express_1["default"])();
require('dotenv').config();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello express\n');
});
app.use('/users', userController_1["default"]);
app.use('/bookmarks', bookmarkController_1["default"]);
app.use('/videos', videoController_1["default"]);
exports["default"] = app;
//# sourceMappingURL=app.js.map