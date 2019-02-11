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
      let modelName = js_file.replace(".model.js", "").trim();
      let schema = require(dirPath + "/" + js_file);
      mongoose.model(modelName, schema);
    }
  }
  console.warn("spend", new Date() - startTime + "ms", "for load models");
}
//执行模型注入
registerModels("modules");

module.exports = {
  getMongoModel: function(modelName) {
    return mongoose.model(modelName);
  }
};
