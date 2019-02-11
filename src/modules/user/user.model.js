/*
 * @Author: yongtian.hong
 * @Date: 2019-02-11 12:58:35
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-11 21:51:32
 * @Description: 用户模型
 */

const Schema = require("../../db/schema");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 6
    },
    age: {
      type: Number,
      min: 18,
      max: 30,
      required: true
    },
    sex: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "`{PATH}` 是 `{VALUE}`， 您必须确认您的性别!"
      },
      required: true
    }
  },
  { collection: "users" }
);

module.exports = userSchema;
