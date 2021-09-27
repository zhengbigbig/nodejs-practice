import * as querystring from 'querystring';
import md5 = require('md5');
import {Buffer} from 'buffer';
import {IncomingMessage} from 'http';

const https = require('https');

const errCodeMap: { [key: number]: string } = {
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

type BaiduResult = {
    error_code: string;
    from?: string;
    to?: string;
    trans_result?: {
        src: string;
        dst: string;
    }[];
    error_msg?: string;
}

export const translate = (word: string) => {
    const appId = '***';
    const appSecret = '***';
    const salt = Math.random();
    const sign = md5(appId + word + salt + appSecret);
    const query: string = querystring.stringify({
        q: word,
        from: 'auto',
        to: 'auto',
        appid: appId,
        salt,
        sign: sign,
    });
    const options = {
        hostname: 'api.fanyi.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    const req = https.request(options, (res: IncomingMessage) => {
        let chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });
        res.on('end', () => {
            const data = Buffer.concat(chunks).toString();
            const parseData: BaiduResult = JSON.parse(data);
            const result = parseData && parseData.trans_result && parseData.trans_result[0];
            if (result) {
                console.log(`输入：${result.src} -> 输出：${result.dst}`);
            } else {
                const num: number = parseInt(parseData.error_code);
                console.log(errCodeMap[num]);
            }

        });
    });

    req.on('error', (e:Error) => {
        console.log(e);
    });
    req.end();
};