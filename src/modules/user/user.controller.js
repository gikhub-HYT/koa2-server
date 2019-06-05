/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:44:57
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-06-05 10:36:03
 * @Description: 用户控制器
 */
const userService = require("./user.service");
const jwtService = require("../../plugin/jwt");



//用户注册()
exports.register = {
    path: "/register",
    method: "post",
    controller: async function (ctx, next) {
        const msg = await userService.register(ctx);
        // let msg = "成功";
        ctx.body = {
            msg: msg
        };
    }
};

//  用户登陆
exports.login = {
    path: "/login",
    method: "get",
    controller: async function (ctx, next) {
        // 查找用户
        // 匹配了用户创建
        // const token = jwtService.createToken(ctx.params);

        console.log('login');
        ctx.body = {
            msg: "登陆成功!",
            token: token
        };
    }
};
