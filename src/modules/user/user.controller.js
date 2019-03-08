/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:44:57
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-21 09:22:04
 * @Description: 用户控制器
 */
const userService = require("./user.service");

//用户注册()
exports.register = {
  path: "/register",
  method: "post",
  controller: async function(ctx, next) {
    const msg = await userService.register(ctx);
    ctx.body = {
      msg: msg
    };
  }
};

//  用户登陆
exports.login = {
  url: "/login",
  method: "get",
  controller: async function(ctx, next) {
    // ctx.model("user").find;
    ctx.body = {
      msg: "登陆成功!"
    };
  }
};
