const logger = require("./config");
const format = require("./format");
var log = {};

//封装错误日志
log.error = function(ctx, error, resTime, startTime) {
  if (ctx && error) {
    logger.error(format.formatError(ctx, error, resTime, startTime));
  }
};

//封装响应日志
log.response = function(ctx, resTime, startTime) {
  if (ctx) {
    logger.info(format.formatRes(ctx, resTime, startTime));
  }
};

module.exports = log;
