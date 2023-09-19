<template>
  <!-- 导航 -->
  <el-menu default-active="/home" class="el-menu-demo" mode="horizontal" router id="nav" v-if="!isLoginPage()">
    <el-menu-item index="/home">仪表盘</el-menu-item>
    <el-menu-item index="/resource">资源</el-menu-item>
    <el-menu-item index="/structure">内容组织结构</el-menu-item>
    <el-menu-item index="/post">动态</el-menu-item>
    <el-menu-item index="/user">用户</el-menu-item>
  </el-menu>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    isLoginPage() {
      return window.location.pathname === '/login';
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
#app{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#nav{
  padding-left: 7rem;
}
.main{
  flex: 1;
  display: flex;
  flex-direction: row;
}
.sec-nav{
  height: 100%;
}
</style>