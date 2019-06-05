/*
 * @Author: yongtian.hong
 * @LastEditors: yongtian.hong
 * @Description: token 校验配置
 * @Date: 2019-03-24 22:31:53
 * @LastEditTime: 2019-06-03 09:52:33
 */
module.exports = {
    secret: "valr",
    header: {},
    payLoad: {},
    //免授权接口白名单
    whiteList: {
        path: [/\/api\/user\/login/, /\/user\/register/, /\/login/]
    }
};
