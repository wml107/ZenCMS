<template>
    <div class="main">
        <el-menu mode="vertical" class="sec-nav" default-active="/user" router id="nav-user">
            <el-menu-item index="/user">
                <span>账户</span>
            </el-menu-item>
            <el-menu-item index="/user/role">
                <span>角色</span>
            </el-menu-item>
            <el-menu-item index="/user/user">
                <span>用户</span>
            </el-menu-item>
        </el-menu>
        <router-view />
    </div>
</template>
<script>
export default {
    name: "User"
}
</script>