const logger = require("./config");
const format = require("./format");

let log = {};

//封装错误日志
log.error = function(ctx, error, resTime) {
  if (ctx && error) {
    logger.error(format.formatError(ctx, error, resTime));
  }
};

//封装响应日志
log.response = function(ctx, resTime) {
  if (ctx) {
    logger.info(format.formatRes(ctx, resTime, startTime));
    logger.info("响应");
  }
};

module.exports = log;
