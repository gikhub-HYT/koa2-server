/*
 * @Author: yongtian.hong
 * @Date: 2019-02-20 19:33:27
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-07-20 20:10:59
 * @Description: 
 */
// index.js



const lazyCreator = require('lazy-creator')

// 导出模板
const {
  controllerTemplate,
  serviceTemplate,
  modelTemplate
} = require("./template");

lazyCreator
  .log(`请输入要生成的模块名称,新生成的模块src/modules/目录下\n`)
  .onInput((inputName, ctx) => {
    const targetPath = ctx.resolve(`src/modules/${inputName}`);
    const modelPath = ctx.resolve(`src/models`);
    ctx.generateFile(targetPath, `${inputName}.controller.js`, controllerTemplate(inputName));
    ctx.generateFile(targetPath, `${inputName}.service.js`, serviceTemplate(inputName));
    ctx.generateFile(modelPath, `${inputName}.js`, modelTemplate(inputName));
    ctx.log.success(`创建${inputName}模块成功`)
  })


