const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment')
const config = require("../../config/config.js")

const logFormat = function (options) {
    const timestamp = options.timestamp();
    const level = options.level.toUpperCase();
    const message = options.message || '';
    let module = 'default';
    // meta中module，标记日志来自哪个模块
    if (options.meta && options.meta.module) {
        module = options.meta.module;
    }
    const formatted = `[${timestamp}] [${level}] ${module} - `;
    if (options.colorize) {
        const colorStr = winston.config.colorize(options.level, formatted);
        return `${colorStr}${message}`;
    }
    return `${formatted}${message}`;
}


// 格式化响应信息
const messageFormat = winston.format.printf(info => {
    return ` ${info}`;
});

// 错误日志格式化

const errorFormat = function (options) {
    //返回字符串给logger
    return options.timestamp() + ' ' + options.level.toUpperCase() + ''
        (options.message ? options.message : "") + (options.meta && Object.keys(options.meta).length ?
            '\n\t' + JSON.string(options.meta) : "");

}

// 错误文件输出
const errorTransportFile = new (winston.transports.DailyRotateFile)({
    name: 'error',
    level: "error",
    filename: 'logs/error/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    timestamp: () => {
        return Date.now()
    },
    formatter: errorFormat,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
// 错误文件输出
const responseTransportFile = new (winston.transports.DailyRotateFile)({
    level: 'info',
    name: 'response',
    filename: config.basePath + '/logs/response/response.log',
    datePattern: 'YYYY-MM-DD HH:mm:ss',
    timestamp: () => {
        return Date.now()
    },
    formatter: errorFormat,
    zippedArchive: true,
    maxSize: '20M',
    maxFiles: '14d'
});

// 控制台输出
const transportConsole = new winston.transports.Console({
    level: 'debug',
    json: false,
    prettyPrint: true,
    colorize: true,
});

const logger = winston.createLogger({
    format: winston.format.combine(
        messageFormat
    ),
    transports: [
        // transportConsole,
        responseTransportFile,
        errorTransportFile
    ]
});


module.exports = logger