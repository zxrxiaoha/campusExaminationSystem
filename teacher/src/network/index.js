import axios from 'axios'
import Vue from 'vue';
const http = axios.create({
  baseURL: 'http://localhost:5000/api'
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.t_user) {
    config.headers.Authorization = JSON.parse(localStorage.t_user).t_token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // location.replace("/teacher/login")
  return Promise.reject(error);
});
export default http