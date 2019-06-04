const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = new Router({
  prefix: "/api/"
});

const resolve = dir => {
  return path.join(__dirname, "../", dir);
};

// 配置控制器
function setController(mapping, moduleName) {
  let path = moduleName + mapping["path"];
  // let path = mapping["url"];
  let method = mapping["method"].toLowerCase();
  let controller = mapping["controller"];
  if (["put", "post", "delete", "get", "patch"].includes(method)) {
    router[method](path, controller);
  } else if (!method) {
    console.error(`the field method in module ${moduleName} can not be empty!`);
  } else {
    console.error(`invalid method: ${method}`);
  }
}

// 路由映射
function routerMap(mappings, filename) {
  let keys = Object.keys(mappings);
  if (keys.includes("controller") && keys.includes("method")) {
    setController(mappings, filename);
  } else {
    keys.forEach(key => {
      setController(mappings[key], filename);
    });
  }
}

// 添加控制器
function addControllers(targetPath) {

  let modulesPath = resolve(targetPath);

  let modules = fs.readdirSync(modulesPath);

  Object.keys(modules).forEach((key) => {
    let module_name = modules[key];
    let modulePath = path.resolve(modulesPath, module_name);
    files = fs.readdirSync(modulePath);
    //过滤取出每个模块的所有模块的控制器文件
    let controller_js_files = files.filter(f => {
      return f.endsWith("controller.js");
    });
    // 读取模块所有的控制器文件
    for (let js_file of controller_js_files) {
      let mapping = require(`${path.resolve(modulePath, js_file)}`);
      console.log("mapping", mapping);
      routerMap(mapping, module_name);

    }
  })
}

module.exports = function (dir) {
  let startTime = new Date();
  let modules_dir = dir || "modules";
  addControllers(modules_dir);
  console.log("路由扫描耗时", new Date() - startTime);
  return router;
};
