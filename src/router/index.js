const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = new Router({
  prefix: "/api"
});

const resolve = dir => {
  return path.join(__dirname, "../", dir);
};

// 配置控制器
function setController(mapping, filename) {
  // let path = filename + mapping["url"];
  let path = mapping["url"];
  console.log("url", path);
  let method = mapping["method"].toLowerCase();
  let controller = mapping["controller"];
  if (["put", "post", "delete", "get", "patch"].includes(method)) {
    router[method](path, controller);
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
function addControllers(modulesPath) {
  let basePath = resolve(modulesPath);
  let modules = fs.readdirSync(basePath);
  for (let module_name of modules) {
    let dirPath = basePath + "/" + module_name;
    files = fs.readdirSync(dirPath);
    //过滤取出所有的模块的控制器文件
    let controller_js_files = files.filter(f => {
      return f.endsWith("controller.js");
    });
    console.log("controllers", controller_js_files);
    for (let js_file of controller_js_files) {
      let filename = "/".concat(js_file.replace(".js", "").trim());
      // let filename = "/".concat(js_file.replace(".js", "").trim());
      let mapping = require(dirPath + "/" + js_file);
      routerMap(mapping, module_name);
    }
  }
}

module.exports = function(dir) {
  let startTime = new Date();
  let modules_dir = dir || "modules";
  addControllers(modules_dir);
  console.log("routerInitTime", new Date() - startTime);
  return router;
};
