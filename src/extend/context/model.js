const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function resolve(dir) {
  return path.join(__dirname, "../../" + dir);
}

// 添加控制器
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
    console.log("model", model_js_files);
    for (let js_file of model_js_files) {
      let modelObj = require(dirPath + "/" + js_file);
      let modelName = Object.keys(modelObj)[0];
      mongoose.model(modelName, modelObj[modelName]);
      // console.log("modelObj", modelObj[modelName]);
    }
  }
  console.log("spend", new Date() - startTime, "for load models");
}

registerModels("modules");

module.exports = {
  $getMongoModel: function(modelName) {
    return mongoose.model(modelName);
  }
};
