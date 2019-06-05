/*
 * @Author: yongtian.hong
 * @LastEditors: yongtian.hong
 * @Description: token校验中间件
 * @Date: 2019-03-24 22:34:41
 * @LastEditTime: 2019-04-04 13:36:24
 */
const jwt = require("koa-jwt");
const config = require("../../config");

//token校验失败处理中间件
function jwtErrorHandle() {
    return function(ctx, next) {
        return next().catch(err => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body =
                    "Protected resource, use Authorization header to get access\n";
            } else {
                throw err;
            }
        });
    };
}
// token检验中间件
function setConfig() {
    return jwt({ secret: config.jwt.secret }).unless(config.jwt.whiteList);
}

module.exports = {
    errorHandle: jwtErrorHandle,
    setConfig: setConfig
};
