import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//bootstrap
import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.min.js' //引用bootstrap的js
//Element-Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//axios初始化
import './api/index';

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
