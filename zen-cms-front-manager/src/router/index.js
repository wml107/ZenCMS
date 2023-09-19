import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import  getToken  from '../util/getToken.js'
//Login
import Login from '../views/auth/Login.vue';
//Home
import Home from '../views/home/Home.vue';
import HomeInfo from '../views/home/HomeInfo.vue';
import HomeMonitorService from '../views/home/HomeMonitorService';
import HomeMonitorHardware from '../views/home/HomeMonitorHardware.vue';
import HomeFooter from '../views/home/HomeFooter';
import HomeSystemData from '../views/home/HomeSystemData.vue';
//Resource
import Resource from '../views/resource/Resource.vue';
import ResourceArticle from '../views/resource/ResourceArticle.vue';
import ResourceHtmlPlugin from '../views/resource/ResourceHtmlPlugin.vue';
import ResourcePic from "../views/resource/ResourcePic.vue";
import ResourceFile from "../views/resource/ResourceFile.vue";
import ResourceView from "../views/resource/ResourceView.vue";
import ResourceEdit from "../views/resource/ResourceEdit.vue";
//Structure
import Structure from '../views/structure/Structure.vue';
//Post
import Post from '../views/post/Post.vue';
//User
import User from "../views/user/User.vue";
import UserAccount from '../views/user/UserAccount.vue';
import UserRole from '../views/user/UserRole.vue';
import UserUser from '../views/user/UserUser.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home',
        name: 'HomeInfo',
        component: HomeInfo
      },
      {
        path: '/home/monitorService',
        name: 'HomeMonitorService',
        component: HomeMonitorService
      },
      {
        path: '/home/monitorHardware',
        name: 'HomeMonitorHardware',
        component: HomeMonitorHardware
      },
      {
        path: '/home/footer',
        name: 'HomeFooter',
        component: HomeFooter
      },
      {
        path: '/home/systemData',
        name: 'HomeSystemData',
        component: HomeSystemData
      }
    ]
  },
  {
    path: '/resource',
    name: 'Resource',
    component: Resource,
    children: [
      {
        path: '/resource',
        name: 'ResourceArticle',
        component: ResourceArticle
      },
      {
        path: '/resource/htmlPlugin',
        name: 'ResourceHtmlPlugin',
        component: ResourceHtmlPlugin
      },
      {
        path: '/resource/pic',
        name: 'ResourcePic',
        component: ResourcePic
      },
      {
        path: '/resource/file',
        name: 'ResourceFile',
        component: ResourceFile
      },
      {
        path: '/resource/view',
        name: 'ResourceView',
        component: ResourceView
      },
      {
        path: '/resource/edit',
        name: 'ResourceEdit',
        component: ResourceEdit
      },
    ]
  },
  {
    path: '/structure',
    name: "Structure",
    component: Structure
  },
  {
    path: '/post',
    name: "Post",
    component: Post
  },
  {
    path: '/user',
    name: "User",
    component: User,
    children: [
      {
        path: '/user',
        name: 'Account',
        component: UserAccount
      },
      {
        path: '/user/role',
        name: 'Role',
        component: UserRole
      },
      {
        path: '/user/user',
        name: "User",
        component: UserUser
      },
    ]
  },
  //这里是希望适配一些边界情况，在用户输入一些客户端识别不了的url的情况下，都跳转到首页。但是不知道怎么的，vue-router的通配符不太起作用，就只能用这种动态路由的方式凑活一下。
  //但这也只是一个临时的补救，因为通配符只能解决它这一级的路由输入意料之外的参数，没有办法递归的定义很多层的边界情况，这里只写了两层，应付大多数情况。
  {
    path: '/:q',
    redirect: '/home'
  },
  {
    path: '/:q/:q',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  const hasToken = getToken();
  if(!hasToken && to.name !== 'Login'){
    ElMessage({
      message: '未登录',
      type: 'message',
      duration: 1500
    });
    return '/login';
  }else if(hasToken && to.name === 'Login'){
    return '/home';
  }
});

export default router
