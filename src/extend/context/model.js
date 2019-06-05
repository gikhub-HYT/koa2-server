const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
function resolve(dir) {
    return path.join(__dirname, "../../" + dir);
}

// 注册数据模型
function registerModels(modulesPath) {
    let startTime = new Date();
    let basePath = resolve(modulesPath);
    let modules = fs.readdirSync(basePath);
    for (let model_name of modules) {
        let dirPath = basePath + "/" + model_name;
        files = fs.readdirSync(dirPath);
        //过滤取出所有的模块的对象模型
        let model_js_files = files.filter(f => {
            return f.endsWith("model.js");
        });
        // console.log("model", model_js_files);
        for (let js_file of model_js_files) {
            // let modelName = js_file.replace(".model.js", "").trim();
            let schema = require(dirPath + "/" + js_file);
            mongoose.model(model_name, schema);
        }
    }
    console.warn("spend", new Date() - startTime + "ms", "for load models");
}

// 加载目标文件夹下指定类型的文件
function loadTargetfiles(modulesPath, extname) {
    let startTime = new Date();
    let basePath = resolve(modulesPath);
    let modules = fs.readdirSync(basePath);
    for (let model_name of modules) {
        let dirPath = basePath + "/" + model_name;
        files = fs.readdirSync(dirPath);
        //过滤取出所有的模块的对象模型
        let model_js_files = files.filter(f => {
            return f.endsWith(extname);
        });
        for (let js_file of model_js_files) {
            let targetPath = path.join(dirPath, "/", js_file);
            console.log("targetPath", targetPath);
            require(targetPath);
        }
    }
    console.warn("spend", new Date() - startTime + "ms", "for load models");
}

//执行模型注入
// registerModels("modules");

// 加载模型文件
// loadTargetfiles("modules", "model.js");

module.exports = {
    findModel: function(modelName) {
        return mongoose.model(modelName);
    }
};
