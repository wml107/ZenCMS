<template>
    <div id="account">
        <el-form label-width="120px" inline>
            <el-form-item label="修改密码">
                <el-input v-model="username" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">修改</el-button>
            </el-form-item>
        </el-form>
        <el-button id="account-quit-btn" type="primary" @click="onLogin">登出</el-button>
    </div>
</template>
<script>
export default {
    name: "UserAccount"
}
</script>
<style>
#account{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;

    padding-top: 5rem;
}
#account-quit-btn{
    width: 24rem;
}
</style>