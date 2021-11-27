import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:5000/api'
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.a_token) {//发请求前判断本地是否有token,如果有，携带请求头过去
    config.headers.Authorization = localStorage.a_token;
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
  return Promise.reject(error);
});
export default http