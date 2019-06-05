/*
 * @Author: yongtian.hong
 * @Date: 2019-02-11 12:58:35
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-03-24 13:06:49
 * @Description: 用户模型
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 6
        },
        age: {
            type: Number,
            min: 18,
            max: 150
        },
        sex: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: "`{PATH}` 是 `{VALUE}`, 您必须确认您的性别!"
            }
        }
    },
    { collection: "users" }
);
module.exports = mongoose.model("user", userSchema);
