<template>
  <!-- 导航 -->
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router id="nav">
    <el-menu-item index="/home">仪表盘</el-menu-item>
    <el-menu-item index="/resource">资源</el-menu-item>
    <el-menu-item index="/structure">内容组织结构</el-menu-item>
    <el-menu-item index="/post">动态</el-menu-item>
    <el-menu-item index="/user">用户</el-menu-item>
  </el-menu>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import getToken from './utils/getToken';
export default {
  data() {
    return {
      activeIndex: '/' + (window.location.pathname.split('/')[1] === '' ? 'home' : window.location.pathname.split('/')[1])
    }
  },
  mounted() {
  },
  computed: {
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