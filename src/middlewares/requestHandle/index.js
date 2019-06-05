/*
 * @Author: yongtian.hong
 * @LastEditors: yongtian.hong
 * @Description: 请求参数统一挂载至ctx.params
 * @Date: 2019-02-12 16:40:18
 * @LastEditTime: 2019-06-04 10:19:10
 */
module.exports = function () {
    return async (ctx, next) => {
        let method = ctx.method.toUpperCase();
        if (["GET", "DELETE"].includes(method)) {
            ctx.params = ctx.query;
        } else if (["POST", "PUT"].includes(method)) {
            ctx.params = ctx.request.body;
        }
        console.log('requestUrl', ctx.url)
        await next();
    };
};
