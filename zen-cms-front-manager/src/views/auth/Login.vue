<template>
    <el-form label-width="120px">
        <el-form-item label="账号">
            <el-input v-model="username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { ElMessage } from 'element-plus';
import { mapActions } from 'vuex'
export default {
    name: "Login",
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'login',
        ]),
        async onLogin() {
            const res = await this.login({
                username: this.username,
                password: this.password
            });
            if (!res) {
                ElMessage({
                    message: '账号或密码错误',
                    type: 'error',
                    duration: 1500
                });
            } else {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                    duration: 1500
                });
                this.$router.push('/home');
            }
        }
    }
}
</script>