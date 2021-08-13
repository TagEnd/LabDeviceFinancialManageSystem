// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

import './plugins/element.js'

import Qs from 'qs'
Vue.prototype.qs = Qs

import axios from 'axios'
// 设置默认请求头
axios.defaults.headers["Content-type"] = 'application/json;'
// 配置请求的根路径 
axios.defaults.baseURL = 'http://82.157.174.105:8081'

// 全局挂载axios
Vue.prototype.$http = axios

// axios request 请求拦截器
axios.interceptors.request.use(config=>{
    config.headers.token = window.sessionStorage.getItem('token');
    // console.log(config);
    return config;
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
