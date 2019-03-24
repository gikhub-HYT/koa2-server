/*
 * @Author: yongtian.hong
 * @LastEditors: yongtian.hong
 * @Description: 请求参数统一挂载至ctx.params
 * @Date: 2019-02-12 16:40:18
 * @LastEditTime: 2019-03-24 14:04:32
 */
module.exports = function() {
    return async (ctx, next) => {
        let method = ctx.method.toUpperCase();
        if (["GET", "DELETE"].includes(method)) {
            ctx.params = ctx.query;
        } else if (["POST", "PUT"].includes(method)) {
            ctx.params = ctx.request.body;
        }
        await next();
    };
};
