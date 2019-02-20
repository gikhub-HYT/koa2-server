// index.js
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

// 日志打印
const log = {
  warn: message => console.log(chalk.green(`${message}`)),
  success: message => console.log(chalk.blue(`${message}`)),
  error: error => console.log(chalk.red(`${error}`))
};

// 获取相对路径
const resolve = (...file) => {
  const src = path.resolve(__dirname, "../");
  return path.resolve(src, ...file);
};

// 创建文件
const generateFile = async (path, data) => {
  if (fs.existsSync(path)) {
    log.error(`${path}文件已存在`);
    return;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", err => {
      if (err) {
        log.error(err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// 创建文件夹
const mkdir = async directory => {
  var exists = fs.existsSync(directory);
  if (exists) {
    log.error(`${directory} 已存在,请重新输入`);
    return;
  } else {
    fs.mkdirSync(directory);
  }
};

function generate() {
  let inputName = "";
  return {
    start: function() {
      process.stdin.on("data", async chunk => {
        // 获取输入名称
        inputName = String(chunk)
          .trim()
          .toString();
      });
      return this;
    },
    creat: function(callback) {
      callback(inputName);
      return this;
    },
    end: function() {
      process.stdin.emit("end");
      process.stdin.on("end", () => {
        log.warn("exit");
        process.exit();
      });
    }
  };
}

module.exports = {
  log: log,
  resolve: resolve,
  mkdir: mkdir,
  generateFile: generateFile
};
