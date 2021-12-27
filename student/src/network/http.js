import axios from 'axios'
const http = axios.create({
   baseURL: 'http://localhost:5000/api'
  //baseURL: 'http://466x3521o6.qicp.vip:48921/api'
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.s_user) {
    config.headers.Authorization = JSON.parse(localStorage.s_user).s_token;
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
  // location.replace("/student/login")
  return Promise.reject(error);
});
export default http