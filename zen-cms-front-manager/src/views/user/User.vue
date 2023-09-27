<template>
    <div class="main">
        <el-menu mode="vertical" class="sec-nav" :default-active="activeIndex" router id="nav-user">
            <el-menu-item index="/user">
                <span>账户</span>
            </el-menu-item>
            <el-menu-item index="/user/role"
                v-if="user.account.role === 'super' || (user.account.claims instanceof Array && user.account.claims.includes('UserR'))">
                <span>角色</span>
            </el-menu-item>
            <el-menu-item index="/user/user"
                v-if="user.account.role === 'super' || (user.account.claims instanceof Array && user.account.claims.includes('UserR'))">
                <span>用户</span>
            </el-menu-item>
        </el-menu>
        <router-view />
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: "User",
    data() {
        return {
            activeIndex: window.location.pathname
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
}
</script>