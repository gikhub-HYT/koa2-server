/*
 * @Author: yongtian.hong
 * @Date: 2019-02-09 21:46:23
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-13 01:02:41
 * @Description:
 */
const mongoose = require("mongoose");
const userModel = mongoose.model("user");
class User {
  constructor() {
    this.model = userModel;
  }
  register(ctx) {
    const user = ctx.createModelInstance("user", ctx.params);
    return new Promise((resolve, reject) => {
      user.save(function(err) {
        if (err) {
          reject(err.message);
        } else {
          resolve("注册成功");
        }
      });
    }).then(
      res => {
        return res;
      },
      err => {
        return err;
      }
    );
  }
}

module.exports = new User();
