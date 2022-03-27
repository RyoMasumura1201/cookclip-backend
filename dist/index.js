"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
app_1["default"].listen(process.env.PORT || 8080, function () {
    return console.log("\uD83D\uDE80 Server ready at: http://localhost:".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map