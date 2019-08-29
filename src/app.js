

require('./util/fileImporter');

const Koa = require("koa");
const koaBody = require("koa-body");
const static = require("koa-static");
const cors = require("koa-cors");
const config = require("./config");
const historyMode = importMiddlewares("historyMode");
const mongoDb = require("./db/connect");
// const sessionStore = require("./middlewares/sessionStore");
const requestHandle = importMiddlewares("requestHandle");
const errorHandle = importMiddlewares("errorHandle");
const contextExtend = require("./extend/context");
const app = new Koa();

//控制是否启用mongodb
if (config.useMongodb) {
    mongoDb.start(function () {
        console.log("数据库连接成功!");
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
// 支持前端history模式
if (config.useHistoryMode) {
    app.use(historyMode({ whiteList: ["/api"] }));
}
// 配置静态资源文件路径
app.use(static(config.staticDir));
//请求参数格统一挂载处理
app.use(requestHandle());
//加载路由文件
const router = require("./router")();
app.use(router.routes(), router.allowedMethods());
//启动服务
app.listen(config.port);

console.log("potr:" + config.port, "服务启动成功");
