/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:06:21
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-06-05 21:01:54
 * @Description: ctx对象拓展
 */

const fs = require("fs");
const path = require("path");

// 被拓展对象
let Extends = {
    // http: require("../../plugin/axios")
};
// 不挂载到context的白名单
let whiteList = ["index.js", "http.js", 'model.js'];

// 
function loadExtendFiles() {
    let files = fs.readdirSync(__dirname);
    // 过滤掉白名单中的拓展
    files = files.filter(function (file) {
        if (!whiteList.includes(file)) return file;
    });
    for (let file of files) {
        // console.log("file", file);
        let filePath = path.join(__dirname, file);
        Extends[file] = require(filePath);
    }
}

//拓展函数
function contextExtend(app, targetObj) {
    for (let key in targetObj) {
        app.context[key] = targetObj[key];
    }
}

loadExtendFiles();

//对外暴露拓展函数
module.exports = function (app) {
    for (let target in Extends) {
        contextExtend(app, Extends[target]);
    }
};
