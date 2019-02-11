/*
 * @Author: yongtian.hong
 * @Date: 2018-12-11 20:21:34
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-02-11 12:50:15
 * @Description: 基于axios的服务端请求客户端封装,
 */

const axios = require("axios");
const config = require("../../config");

const QS = require("qs");

const http = axios.create({
  baseURL: config.api
});

const request = axios.create({
  baseURL: config.api
});

//请求拦截
axios.interceptors.request.use(config => {
  console.log("request", {
    method: config.method,
    url: config.url,
    params: config.data || config.params,
    header: config.headers
  });
  return config;
});
// 响应拦截;
axios.interceptors.response.use(response => {
  console.log("response", {
    method: response.config.method,
    url: response.config.url,
    data: response.config.data || response.config.params,
    header: response.config.headers
  });
  return response;
});

function methodMap(ctx) {
  const HTTP = axios.create({
    baseURL: config.api
  });
}

module.exports = {
  http: http,
  $get: function(url, params, config = {}) {
    return http
      .get(url, Object.assign({ params: params }, config))
      .then(res => {
        return [null, res.data];
      })
      .catch(err => {
        return [err, null];
      });
  },
  $post: function(url, params, config = {}) {
    return http.post(url, params, config).then(
      res => {
        return [null, res.data];
      },
      err => {
        console.log("post", err);
        return [err, null];
      }
    );
  },
  $delete: function(url, params, config = {}) {
    return http
      .delete(url, Object.assign({ params: params }, config))
      .then(res => {
        return [null, res];
      })
      .catch(err => {
        return [err, null];
      });
  },
  $put: function(url, params, config = {}) {
    return http
      .put(url, QS.stringify(params), config)
      .then(res => {
        return [null, res.data];
      })
      .catch(err => {
        return [err, null];
      });
  }
};
