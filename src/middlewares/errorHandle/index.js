/*
 * @Author: yongtian.hong
 * @Date: 2018-10-14 17:56:07
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-05-31 11:08:04
 * @Description: 专门用于处理错误的中间件
 */

const log4js = require("../../plugin/log4js/config");
const resLogger = log4js.getLogger("response");
const errLogger = log4js.getLogger("error");

const errorStatus = {
    403: '403',
    404: '404',

}

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
        ctx.status = error.status || 500;
        ctx.body = error.message || "服务器内部错误";
        // console.log("捕获错误", err);
        ctx.app.emit("error", error, ctx);
    }
}

module.exports = function (app) {
    // app.on("error", function(error) {
    //   console.log("捕获错误", error);
    // });
    return errorHandle;
};
