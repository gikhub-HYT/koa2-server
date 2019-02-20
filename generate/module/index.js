// index.js

const { log, resolve, mkdir, generateFile } = require("../util");

// 导出模板
const {
  controllerTemplate,
  serviceTemplate,
  modelTemplate
} = require("./template");

async function createModule(moduleName) {
  const new_mudule_dir = resolve("src/modules/", moduleName);
  await mkdir(new_mudule_dir);
  const controller_js = resolve(new_mudule_dir, `${moduleName}.controller.js`);
  const service_js = resolve(new_mudule_dir, `${moduleName}.service.js`);
  const model_js = resolve(new_mudule_dir, `${moduleName}.model.js`);
  await generateFile(controller_js, controllerTemplate(moduleName));
  await generateFile(service_js, serviceTemplate(moduleName));
  await generateFile(model_js, modelTemplate(moduleName));
  log.success(`\n${moduleName}模块创建完成\n`);
}

log.warn("请输入要生成的模块名称,新生成的模块src/modules/目录下\n");
log.warn("结束请输入 end\n");

process.stdin.on("data", async chunk => {
  // 获取输入名称
  const inputName = String(chunk)
    .trim()
    .toString();
  // 判断是否为终止命令
  if (inputName === "end") {
    process.stdin.emit("end");
    return;
  }
  // 创建模块
  await createModule(inputName);
});

process.stdin.on("end", () => {
  process.exit();
});
