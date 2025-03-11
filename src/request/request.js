import axios from "axios";
import { useNavigate } from "react-router";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "", // 基础请求地址
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error("请求错误：", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    const res = response.data;

    // 这里可以根据后端的数据结构进行相应的处理
    if (res.code === 200) {
      return res.data;
    }
    // 处理其他状态码
    console.error("接口请求失败：", res.message);
    return Promise.reject(new Error(res.message || "接口请求失败"));
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem("token");
          // 可以在这里添加路由跳转逻辑
          navigate("/login");
          break;
        case 403:
          console.error("没有权限访问该资源");
          break;
        case 404:
          console.error("请求的资源不存在");
          break;
        case 500:
          console.error("服务器错误");
          break;
        default:
          console.error(`未知错误：${error.response.status}`);
      }
    } else {
      console.error("网络错误：", error.message);
    }
    return Promise.reject(error);
  },
);

// 导出实例
export default service;
