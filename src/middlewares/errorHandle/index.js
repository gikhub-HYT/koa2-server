/*
 * @Author: yongtian.hong
 * @Date: 2018-10-14 17:56:07
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-01 15:25:38
 * @Description: 专门用于处理错误的中间件
 */

const log4js = require("../log4js/config");
const resLogger = log4js.getLogger("response");
const errLogger = log4js.getLogger("error");

async function errorHandle(ctx, next) {
  let ms = 0;
  let startTime = new Date();
  try {
    await next();
    ms = new Date() - startTime;
    // resLogger.info("响应时间", ms);
  } catch (error) {
    ms = new Date() - startTime;
    // errLogger.error(err);

    let status = error.status || 500;
    let message = error.message || "服务器内部错误";
    ctx.status = status;
    if (status === 403) {
      ctx.body = "403";
    }
    if (status === 404) {
      ctx.body = message;
    }
    if (status === 500) {
      ctx.body = "500";
    }
    // console.log("捕获错误", err);
    ctx.app.emit("error", error, ctx);
  }
}

module.exports = function(app) {
  app.on("error", function(error) {
    console.log("捕获错误", error);
  });
  return errorHandle;
};
