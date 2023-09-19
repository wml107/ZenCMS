import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//Element-Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//axios初始化
import './api/index';

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
