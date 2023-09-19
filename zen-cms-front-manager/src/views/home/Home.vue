<template>
  <div class="main">
    <el-menu class="el-menu-vertical-demo sec-nav" default-active="/home" router id="nav-home">
      <el-menu-item index="/home">
        <span>网站信息</span>
      </el-menu-item>
      <el-menu-item index="/home/monitorService">
        <span>业务监测</span>
      </el-menu-item>
      <el-menu-item index="/home/monitorHardware">
        <span>硬件监测</span>
      </el-menu-item>
      <el-menu-item index="/home/footer">
        <span>页脚配置</span>
      </el-menu-item>
      <el-menu-item index="/home/systemData">
        <span>系统数据</span>
      </el-menu-item>
    </el-menu>
    <div>首页</div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Home"
}
</script>