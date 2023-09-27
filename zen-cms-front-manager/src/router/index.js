import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import getToken from '../utils/getToken.js'
//store
import store from '../store/index.js';
//Login
import Login from '../views/auth/Login.vue';
//NotFound
import NotFound from '../views/NotFound.vue';
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
    path: '/404',
    name: '404',
    component: NotFound
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
        component: UserRole,
        meta: {
          claim: 'UserR'
        }
      },
      {
        path: '/user/user',
        name: "User",
        component: UserUser,
        meta: {
          claim: 'UserR'
        }
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  //通过检验token的方法确认有没有登录。
  //但有token是必要条件，而非充要条件，因为也有可能是个无效token，但这无所谓，无效token会在自动登录环节返回401由拦截器跳转到登录页，这里只检查cookie就足够。
  const hasToken = getToken();
  if (!hasToken && (to.name !== 'Login' && to.name !== '404')) {
    //未登录跳转登录页
    ElMessage({
      message: '未登录',
      type: 'message',
      duration: 1500
    });
    return '/login';
  } else if (hasToken && to.name === 'Login') {
    //已登录访问登录页跳转首页
    return '/home';
  }

  //拦截不具备权限的用户访问权限页
  if (
    //条件：权限为super
    store.state.user.account.role !== 'super' &&
    //或者权限列表有相应权限
    //存在权限列表
    (store.state.user.account.claims instanceof Array &&
      //存在权限要求
      to.meta.claim !== undefined &&
      //满足权限要求
      !store.state.user.account.claims.includes(to.meta.claim))
  ) {
    //要是通不过鉴权，就返回上一级
    const temp = to.path.split('/');
    let redirect = "";
    for (let i = 1; i < temp.length - 1; i++) {
      redirect += '/';
      redirect += temp[i];
    }
    if (redirect === "") redirect += '/';
    return redirect;
  }
});

export default router
