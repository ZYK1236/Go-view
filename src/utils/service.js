import axios from "axios";
import { message } from "ant-design-vue";
import qs from "qs";

const service = axios.create({
  // api的base_url
  baseURL: "http://116.85.46.91:8080",
  timeout: 50000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    console.log("加载中...");
    //对post的内容序列化
    config.method === "post"
      ? (config.data = qs.stringify({ ...config.data }))
      : (config.params = { ...config.params });
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  (response) => {
    //成功请求到数据
    return response.data;
  },
  (error) => {
    //响应错误处理

    message.error(`接口地址: ${error.config.url}出错了,原因: ${error.message}`);
    console.log(`接口地址: ${error.config.url}出错了,原因: ${error.message}`);

    return Promise.reject(error);
  }
);

export default service;
