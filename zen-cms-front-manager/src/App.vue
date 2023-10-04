<template>
  <!-- 导航 -->
  <!-- 必须要这样设置，导航栏的高亮才能跟着路由跳转，Element这个的识别非常蠢，最优解就是绑定到route上，然后再经过一定的处理 -->
  <el-menu :default-active="'/' + (this.$route.path.split('/')[1] === '' ? 'home' : this.$route.path.split('/')[1])" class="el-menu-demo" mode="horizontal" router id="nav" style="position: sticky; top: 0; z-index: 1000;">
    <el-menu-item id="nav-home-btn" index="/home">仪表盘</el-menu-item>
    <el-menu-item index="/resource">资源</el-menu-item>
    <el-menu-item index="/structure">内容组织结构</el-menu-item>
    <el-menu-item index="/post">动态</el-menu-item>
    <el-menu-item id="nav-user-btn" index="/user">用户</el-menu-item>
  </el-menu>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import getToken from './utils/getToken';
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'autoLogin'
    ]),
  },
  async created() {
    //自动登录
    const hasToken = getToken();
    if (hasToken && window.location.pathname !== '/login') {
      await this.autoLogin();
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#nav {
  padding-left: 7rem;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.sec-nav {
  height: 100%;
}
</style>