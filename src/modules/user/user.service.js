/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:46:23
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-07-20 20:00:55
 * @Description:
 */

const userModel = importModel("user");
const jwtService = importPlugin("jwt");

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



        const token = jwtService.createToken();

        return token;

        // ctx.body = token;
        // const user = new userModel({ name: name });
        // console.log("userModel", user);
        // user.save();
    }
}

module.exports = new User();
