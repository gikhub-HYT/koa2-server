/*
 * @Author: yongtian.hong
 * @LastEditors: yongtian.hong
 * @Description: Jwt校验插件二次封装
 * @Date: 2019-03-10 17:19:28
 * @LastEditTime: 2019-03-24 23:59:58
 */
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
    createToken: function({ name, id } = params) {
        return jwt.sign(
            {
                name: name,
                _id: id
            },
            config.jwt.secret,
            { expiresIn: "2h" }
        );
    }
};
