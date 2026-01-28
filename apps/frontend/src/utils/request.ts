import axios from "axios";
import { decamelizeKeys, camelizeKeys } from "./caseConverter";

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// 添加请求拦截器：前端 camelCase → 后端 snake_case
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.data = decamelizeKeys(config.data);
    // console.log("config", config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    response = camelizeKeys(response);
    // console.log("response", response);
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
