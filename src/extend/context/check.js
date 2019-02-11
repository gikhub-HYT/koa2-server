/*
 * @Author: yongtian.hong
 * @Date: 2018-09-29 21:22:27
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-10 00:14:45
 * @Description: 数据类型与空数据校验
 */

function typeOf(target) {
  return {}.toString
    .call(target)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

module.exports = {
  isObject: function(target) {
    return typeOf(target) === "object" ? true : false;
  },
  isNumber: function(target) {
    return typeOf(target) === "number" ? true : false;
  },
  isArray: function(target) {
    return typeOf(target) === "array" ? true : false;
  },
  isBoolean: function(target) {
    return typeOf(target) === "boolean" ? true : false;
  },
  isRegexp: function(target) {
    return typeOf(target) === "regexp" ? true : false;
  },
  isJson: function(target) {
    return typeOf(target) === "json" ? true : false;
  },
  isString: function(target) {
    return typeOf(target) === "string" ? true : false;
  },
  isMath: function(target) {
    return typeOf(target) === "math" ? true : false;
  },
  isDate: function(target) {
    return typeOf(target) === "date" ? true : false;
  },
  isError: function(target) {
    return typeOf(target) === "error" ? true : false;
  },
  isEmpty: function(target) {
    console.log("this", this);
    if (target === null) {
      return true;
    } else if (typeof target === "undefined") {
      return true;
    } else if (target === NaN) {
      return true;
    } else if (isArray(target) || isString(target)) {
      return target.length === 0 ? true : false;
    } else if (isObject(target)) {
      return Object.keys(target).length === 0 ? true : false;
    }
  }
};
