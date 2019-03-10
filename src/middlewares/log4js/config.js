const path = require("path");
const log4js = require("log4js");
// 日志输出的目录
let baseLogPath = path.resolve(__dirname, "../../../logs");
//错误日志目录
let errorPath = "/error";
//错误日志文件名称
let errorFileName = "/error";
//错误输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

//响应日志目录
let responsePath = "/response";
//响应日志文件名
let responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

//log4js配置项
module.exports = log4js.configure({
  baseLogPath: baseLogPath,
  appenders: {
    app: {
      type: "console"
    },
    error: {
      type: "dateFile",
      filename: errorLogPath,
      pattern: "-yyyy-MM-dd-hh.log",
      alwaysIncludePattern: true,
      encoding: "utf-8",
      maxLogSize: 1000,
      numBackups: 3,
      path: errorPath
    },
    response: {
      type: "dateFile",
      filename: responseLogPath,
      pattern: "-yyyy-MM-dd-hh.log",
      alwaysIncludePattern: true,
      encoding: "utf-8",
      maxLogSize: 1000,
      numBackups: 3,
      path: responsePath
    }
  },
  categories: {
    default: {
      level: "all",
      appenders: ["app"]
    },
    resLogger: {
      level: "info",
      appenders: ["response"]
    },
    errorLogger: {
      level: "error",
      appenders: ["error"]
    }
  },
  pm2: true,
  pm2InstanceVar: "INSTANCE_ID"
});
