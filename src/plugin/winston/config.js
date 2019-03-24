
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const date = require('../../util/dateFormate')
const moment = require('moment')

const procIndex = process.env.NODE_APP_INSTANCE == null ? 0 : process.env.NODE_APP_INSTANCE;

const logFormat = printf(info => {
    return `[${info.timestamp}][${info.level}]:${info.message}`;
});

const errorFormat = (options) => {
    console.log('fm')
    return options.timestamp()
}



const options = {
    'error': {
        level: "error",
        filename: './logs/error/' + procIndex + '/' + '%DATE%' + '.log',
        datePattern: 'YYYY-MM-DD',
        timestamp: function () { return moment().format('YYYY-MM-DD HH:mm:ss') },
        prepend: true,//布尔值，文件名是否以日期开始，默认是false
        createTree: true,//布尔值，是否使用文件夹存储日志
        formatter: errorFormat,
        zippedArchive: false,//布尔值，是否压缩回滚的日志文件。
        json: false,
        maxSize: '20m',
        maxFiles: '14'
    },
    'debug': {
        level: "debug",
        datePattern: 'YYYY-MM-DD',
        formatter: logFormat,
        timestamp: function () { return moment().format('YYYY-MM-DD HH:mm:ss') },
    }
}



module.exports = createLogger({
    format: combine(format.colorize(), timestamp(), logFormat),
    transports: [
        new transports.Console(options.debug),
        new DailyRotateFile(options.error)
    ]
});