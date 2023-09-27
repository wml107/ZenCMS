const { ElMessage } = require('element-plus');
const { default: getToken } = require('../utils/getToken');
import router from '../router/index';
import { CookieApi } from '../utils/Cookie';

const axios = require('axios').default;
axios.defaults.baseURL = '/api';

axios.interceptors.request.use(function (config) {
    //接收cookie存储的时候，服务端设置cookie中包含的特殊字符会被浏览器自动编码后存储，这样一来和服务端当初发的就对不上了，用之前需要先decode解码。
    if(getToken()) config.headers.Authorization = decodeURIComponent(getToken());
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function(error) {
    //data不是对象，不符合文档约定的数据交换格式。说明发生了服务器也无从知晓的未知错误。
    if(!(error.response.data instanceof Object)){
        ElMessage({
            message: '服务器内部错误，请联系系统管理员。',
            type: 'info',
            duration: 1500
        });
    }else{
    //已知错误，根据状态码处理
        switch(error.response.data.statusCode){
            case 401:
                if(error.response.config.url === '/user/login'){
                }else{
                    ElMessage({
                        message: '未登录',
                        type: 'fail'
                    });
                    CookieApi.delCookie('Authorization');
                    router.push('/login');
                }
                break;
            case 403:
                ElMessage({
                    message: '权限不足',
                    type: 'fail'
                });
                break;
        }
    }
    return error.response;
});