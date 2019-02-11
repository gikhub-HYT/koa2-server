/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:06:21
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-11 15:46:01
 * @Description: ctx对象拓展
 */

const fs = require("fs");
const path = require("path");

// 被拓展对象
let Extends = {};

function extend() {
  let files = fs.readdirSync(__dirname);

  files = files.filter(function(file) {
    if (file != "index.js") return file;
  });

  for (let file of files) {
    // console.log("file", file);
    let filePath = path.join(__dirname, file);
    Extends[file] = require(filePath);
  }
}

extend();

//拓展函数
function contextExtend(app, targetObj) {
  for (let key in targetObj) {
    // console.log("key", key);
    app.context[key] = targetObj[key];
  }
}

//对外暴露拓展函数
module.exports = function(app) {
  for (let target in Extends) {
    contextExtend(app, Extends[target]);
  }
};
