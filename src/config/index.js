/*
 * @Author: yongtian.hong
 * @Date: 2019-02-06 23:23:49
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-11 13:27:36
 * @Description: 项目基础配置
 */
const path = require("path");
const resolve = dir => {
  return path.resolve(__dirname, dir);
};
module.exports = {
  base: {
    host: "",
    port: 3000,
    historyMode: true,
    staticDir: resolve("../static")
  },
  db: {
    useMongodb: true
  },
  koaBody: {
    multipart: true,
    formidable: {
      maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    },
    jsonLimit: "20mb",
    formLimit: "1mb",
    textLimit: "1mb"
  }
};
