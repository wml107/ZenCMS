<template>
    <div id="account">
        <el-descriptions title="账户信息" column="2" border="{{ true }}">
            <el-descriptions-item label="用户名">{{ user.account.username }}</el-descriptions-item>
            <el-descriptions-item label="id">{{ user.account.id }}</el-descriptions-item>
            <el-descriptions-item label="角色">{{ user.account.role }}</el-descriptions-item>
            <el-descriptions-item label="权限">
                <template v-if="user.account.role==='super'">全部</template>
                <template v-else v-for="item in user.account.claims">{{ item }}</template>
            </el-descriptions-item>
        </el-descriptions>
        <el-form inline>
            <el-form-item id="password-update-input" label="修改密码">
                <el-input type="password" show-password input-style="width: 12rem;" v-model="newPassword" />
            </el-form-item>
            <el-form-item id="password-update-btn">
                <el-button type="primary" @click="onUpdatePassword">修改</el-button>
            </el-form-item>
        </el-form>
        <el-button id="account-quit-btn" type="primary" @click="onQuit">登出</el-button>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { mapState, mapActions } from 'vuex';
export default {
    name: "UserAccount",
    data() {
        return {
            newPassword: ''
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
    methods: {
        ...mapActions([
            'quit'
        ]),
        async onQuit() {
            const res = await this.quit();
            if (res.statusCode === 200) {
                ElMessage({
                    message: '已登出',
                    type: 'success',
                    duration: 1500
                });
                this.$router.push('/login');
            } else {
                ElMessage({
                    message: res.msg,
                    type: 'error',
                    duration: 1500
                });
            }
        }
    }
}
</script>
<style>
#account {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;

    padding-top: 5rem;
}

#password-update-input>label {
    justify-content: flex-start !important;
}

#password-update-btn {
    margin-left: 1.5rem;
    margin-right: 0;
}

#account-quit-btn {
    width: 23.5rem;
}
</style>