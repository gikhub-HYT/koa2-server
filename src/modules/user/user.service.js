/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:46:23
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-06-03 09:29:10
 * @Description:
 */
const userModel = require("./user.model");
const jwtService = require("../../plugin/jwt");

class User {
    constructor() {
        this.model = userModel;
    }

    /*********
     * 用户注册服务
     *
     *
     * **********/
    register(ctx) {
        const { name, pwds } = ctx.params;
        const user = new userModel({ name: name });
        return new Promise((resolve, reject) => {
            user.save(function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("注册成功");
                }
            });
        });
    }

    /***********
     * @Describtion 用户登陆
     * @params {name:String,psw:String}
     * @return {token,msg}
     ***************/
    login(ctx) {

        const { name, psw } = ctx.params;

        const token = jwtService.createToken({ name: "hty", id: 1314 });

        // ctx.body = token;
        // const user = new userModel({ name: name });
        // console.log("userModel", user);
        // user.save();
    }
}

module.exports = new User();
