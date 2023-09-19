const { ElMessage } = require('element-plus');
const { default: getToken } = require('../util/getToken');
import router from '../router/index';

const axios = require('axios').default;
axios.defaults.baseURL = '/api';

axios.interceptors.request.use(function (config) {
    if(!getToken())config.headers.Authorization = getToken() ;
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function(error) {
    switch(error.response.data.statusCode){
        case 401:
            if(error.response.config.url === '/user/login'){
                return false;
            }else{
                ElMessage({
                    message: '未登录',
                    type: 'fail'
                });
                router.push('login');
            }
            break;
    }
    return error.response.data;
});