/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:44:57
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-11 21:39:34
 * @Description: 用户控制器
 */

//用户注册()
exports.register = {
  url: "",
  method: "get",
  controller: async function(ctx, next) {}
};

//  用户登陆
exports.login = {
  url: "/login",
  method: "get",
  controller: async function(ctx, next) {
    let userModel = ctx.$getMongoModel("users");
    console.log("userModel", userModel);
    ctx.body = "userModel";
  }
};
