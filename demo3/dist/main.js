"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
var querystring = __importStar(require("querystring"));
var md5 = require("md5");
var buffer_1 = require("buffer");
var https = require('https');
var errCodeMap = {
    52000: '成功',
    52001: '请求超时，请重试',
    52002: '系统错误，请重试',
    52003: '未授权用户',
    54000: '必填参数为空',
    54001: '签名错误',
    54003: '访问频率受限',
    54004: '账户余额不足',
    54005: '长query请求频繁',
    58000: '客户端IP非法',
    58001: '译文语言方向不支持',
    58002: '服务当前已关闭',
    90107: '认证未通过或未生效'
};
var translate = function (word) {
    var appId = '20181015000219786';
    var appSecret = '3i4I9Df7Ku4z3kiKWxCY';
    var salt = Math.random();
    var sign = md5(appId + word + salt + appSecret);
    var query = querystring.stringify({
        q: word,
        from: 'auto',
        to: 'auto',
        appid: appId,
        salt: salt,
        sign: sign,
    });
    var options = {
        hostname: 'api.fanyi.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    var req = https.request(options, function (res) {
        var chunks = [];
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
        res.on('end', function () {
            var data = buffer_1.Buffer.concat(chunks).toString();
            var parseData = JSON.parse(data);
            var result = parseData && parseData.trans_result && parseData.trans_result[0];
            if (result) {
                console.log("\u8F93\u5165\uFF1A" + result.src + " -> \u8F93\u51FA\uFF1A" + result.dst);
            }
            else {
                var num = parseInt(parseData.error_code);
                console.log(errCodeMap[num]);
            }
        });
    });
    req.on('error', function (e) {
        console.log(e);
    });
    req.end();
};
exports.translate = translate;
