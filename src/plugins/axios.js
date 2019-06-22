"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from 'querystring';
import { Message } from 'iview';
import router from '../router/index'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: "http://119.23.243.252:8080"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if (config.method != 'get') {
      config.data = qs.stringify(config.data);
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['token'] = localStorage.getItem('token');

    
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error

    // !!!!!获取错误状态码
    // const { status } = error.response;
    // if(status == 401){
    //   Message.error('token失效，请重新登录！');
    //   // 清除token
    //   localStorage.removeItem('token');
    //   // 跳转到登录页面
    //   router.push('/login');
    // }

    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
