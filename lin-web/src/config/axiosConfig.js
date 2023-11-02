import axios from 'axios';
import { Loading } from 'element-ui';
import Vue from 'vue'

// 创建 Axios 实例
const instance = axios.create({
    // baseURL: 'https://api.example.com', // 设置基础 URL
    // timeout: 5000, // 设置请求超时时间
});

let loadingInstance;
// 请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 加载中
        loadingInstance = Loading.service({fullscreen: true});
        // 在发送请求之前做些什么
        // 可以在这里添加请求头、修改请求数据等
        return config;
    },
    function (error) {
        loadingInstance.close();
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    function (response) {
        loadingInstance.close();
        let resultInfo = response.data;
        let {code, message} = resultInfo;
        if (code !== 10000) {
            // 获取全局 Vue 实例
            const app = Vue.prototype.$bus;
            app.$message.error(message);
        }
        return resultInfo;
    },
    function (error) {
        loadingInstance.close();
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default instance;