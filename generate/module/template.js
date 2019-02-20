/*
 * @Author: yongtian.hong
 * @LastEditors: yongtian.hong
 * @Description: 模块模板
 * @Date: 2019-02-20 19:33:27
 * @LastEditTime: 2019-02-20 20:18:09
 */
const modelTemplate = function(moduleName) {
  return `
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;
  const ${moduleName}Schema = new Schema({},{ collection: ${moduleName}});
  module.exports = mongoose.model(${moduleName}, ${moduleName}Schema);
  `;
};

const controllerTemplate = function(moduleName) {
  return ` 
  const ${moduleName}Service=require("./${moduleName}.serviice.js");
  exports.${moduleName} = {
    url: "/${moduleName}",
    method: "post",
    controller: async function(ctx, next) {
      
    }
  };`;
};

const serviceTemplate = function(moduleName) {
  return `
  const ${moduleName}Model=require("./${moduleName}.model");
  class ${moduleName}Service{};
  module.exports=new ${moduleName}Service()`;
};

module.exports = {
  controllerTemplate,
  serviceTemplate,
  modelTemplate
};