<template>
    <div class="main">
        <el-menu mode="vertical" class="sec-nav" :default-active="activeIndex" router id="nav-user" style="position: fixed; z-index: 1000;">
            <el-menu-item index="/user">
                <span>账户</span>
            </el-menu-item>
            <el-menu-item index="/user/role"
                v-if="user.account.role === 0 || (user.account.claims instanceof Array && user.account.claims.includes('UserR'))">
                <span>角色</span>
            </el-menu-item>
            <el-menu-item index="/user/user"
                v-if="user.account.role === 0 || (user.account.claims instanceof Array && user.account.claims.includes('UserR'))">
                <span>用户</span>
            </el-menu-item>
        </el-menu>
        <router-view />
    </div>
</template>
<script>
import { mapState } from 'vuex';
import  normalizePath from '../../utils/normalizePath';
export default {
    name: "User",
    data() {
        return {
            activeIndex: normalizePath(this.$route.path)
        }
    },
    watch:{
        $route: function(){
            this.activeIndex = normalizePath(this.$route.path);
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
}
</script>