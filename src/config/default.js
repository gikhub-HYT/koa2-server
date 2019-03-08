/*
 * @Author: yongtian.hong
 * @Date: 2019-02-12 21:25:44
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-12 22:49:59
 * @Description:项目基本配置
 */
const path = require("path");
const resolve = dir => {
  return path.resolve(__dirname, "../", dir);
};
module.exports = {
  port: 3000,
  useMongodb: true,
  useHistoryMode: true,
  staticDir: resolve("static/dist")
};
