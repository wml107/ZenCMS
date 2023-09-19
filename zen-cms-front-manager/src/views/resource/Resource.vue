<template>
    <div class="main">
        <el-menu class="el-menu-vertical-demo sec-nav" default-active="/resource" router id="nav-resource">
            <el-menu-item index="/resource">
                <span>内容</span>
            </el-menu-item>
            <el-menu-item index="/resource/htmlPlugin">
                <span>HTML插件</span>
            </el-menu-item>
            <el-menu-item index="/resource/pic">
                <span>图片</span>
            </el-menu-item>
            <el-menu-item index="/resource/file">
                <span>文件</span>
            </el-menu-item>
            <el-menu-item index="/resource/view">
                <span>浏览内容</span>
            </el-menu-item>
            <el-menu-item index="/resource/edit">
                <span>编辑内容</span>
            </el-menu-item>
        </el-menu>
        <div>资源模块</div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: "Resource"
}
</script>