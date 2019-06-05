/*
 * @Author: yongtian.hong
 * @Date: 2018-09-29 21:22:27
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-05-31 17:58:21
 * @Description: 数据类型与空数据校验
 */

function typeOf(target) {
    return ({}).toString.call(target).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

const isObject = (target) => {
    return typeOf(target) === "object" ? true : false;
}
const isArray = (target) => {
    return typeOf(target) === "array" ? true : false;
}
const isEmpty = (target) => {
    if (isObject(target)) return Object.keys(target).length === 0;
    if (isArray(target)) return target.length === 0;
    return !target;
}
module.exports = {
    isEmpty,
    isObject,
    isArray
}
