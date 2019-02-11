const Koa = require("koa");
const koaBody = require("koa-body");
const static = require("koa-static");
const cors = require("koa-cors");
const config = require("./config");
const router = require("./router")();
const historyMode = require("./middlewares/historyMode");
const mongoDb = require("./db/connect");
// const sessionStore = require("./middlewares/sessionStore");
// const requestHandle = require("./middlewares/requestHandle");
const errorHandle = require("./middlewares/errorHandle");
const contextExtend = require("./extend/context");
const app = new Koa();

//控制是否启用mongodb
if (config.db.useMongodb) {
  mongoDb.start(function() {
    console.log("mongodb数据库连接成功!");
  });
}

// 拓展context
contextExtend(app);
//错误处理
app.use(errorHandle(app));
//解决跨域问题
app.use(cors());
// 解析请求体
app.use(koaBody(config.koaBody));
//session
// app.use(sessionStore(app));
// 支持前端history模式
if (config.base.historyMode) {
  app.use(historyMode({ whiteList: ["/api"] }));
}
// 配置静态资源文件路径
app.use(static(config.base.staticDir));
//请求参数格式化
// app.use(requestHandle());
// 路由中间件
app.use(router.routes(), router.allowedMethods());
//启动服务
app.listen(config.base.port);

console.log("potr:" + config.base.port, "服务启动成功");
