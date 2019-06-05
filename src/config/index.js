/*
 * @Author: yongtian.hong
 * @Date: 2019-02-06 23:23:49
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-06-04 10:23:05
 * @Description: 项目基础配置
 */
const path = require("path");

const resolve = dir => {
    return path.resolve(__dirname, "../", dir);
};
module.exports = {
    port: 3100,
    enableMongodb: false,
    enableHistoryMode: false,
    staticDir: resolve("static/dist2"),
    koaBody: require("./koaBody"),
    router: require("./router"),
    jwt: require("./jwt")
};
