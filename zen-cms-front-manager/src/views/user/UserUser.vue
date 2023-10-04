<template>
    <div id="user">
        <div id="user-operation">
            <el-button @click="refreshUser" :loading="refreshUserBtnLock">刷新</el-button>
            <!-- <el-button v-if="user.account.role === 0" @click="createRoleVisible = true"
                    :loading="refreshRoleBtnLock">添加角色</el-button> -->
        </div>
        <el-table class="user-list" :data="user.user" stripe flexible>
            <el-table-column fixed prop="id" label="id" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="expire" label="上次登录时间" />
            <el-table-column label="角色">
                <template #default="scope">
                    <el-popover placement="left-start" title="权限" effect="dark" trigger="hover" :content="scope.row.claims">
                        <template #reference>
                            <el-tag>{{ scope.row.rolename }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" #default="scope">
                <!-- <el-button v-if="user.account.role === 0" size="small"
                    @click="showUpdateRoleInput(scope.$index)">编辑</el-button> -->
                <el-button v-if="user.account.role === 0" size="small" type="danger" :loading="delUserBtnLock"
                    @click="onDelUser(scope.$index)">删除</el-button>
            </el-table-column>
        </el-table>
        <!-- <el-dialog v-model="createRoleVisible" @close="createRoleInputReset" title="添加角色">
            <el-form>
                <el-form-item label="角色名">
                    <el-input v-model="createRoleInput.rolename" autocomplete="off" />
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="createRoleInput.claims" multiple placeholder="无">
                        <el-option v-for="item in claimOptions" :key="item.name" :label="item.name + ' | ' + item.comment"
                            :value="item.name" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onCreateRole">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="updateRoleVisible" title="编辑角色">
            <el-form>
                <el-form-item label="角色名">
                    <el-input v-model="updateRoleInput.rolename" autocomplete="off" />
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="updateRoleInput.claims" multiple placeholder="无">
                        <el-option v-for="item in claimOptions" :key="item.name" :label="item.name + ' | ' + item.comment"
                            :value="item.name" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onUpdateRole(updateRoleInput.updateNow)">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog> -->
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { mapState, mapActions } from 'vuex';
export default {
    name: "userUser",
    data() {
        return {
            refreshUserBtnLock: false,
            delUserBtnLock: false
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
    methods: {
        ...mapActions([
            'listUser',
            'delUser'
        ]),
        async refreshUser() {
            this.refreshUserBtnLock = true;
            await this.listUser();
            this.refreshUserBtnLock = false;
        },
        async onDelUser(index) {
            this.delUserBtnLock = true;
            if(this.user.user[index].role === 0){
                ElMessage({
                    message: '不能删除根用户',
                    type: 'error',
                    duration: 1500
                });
                this.delUserBtnLock = false;
                return;
            }
            const res = await this.delUser(this.user.user[index].username);
            if (res.statusCode === 200) ElMessage({
                message: '删除成功',
                type: 'success',
                duration: 1000
            })
            await this.listUser();
            this.delUserBtnLock = false;
        },
    },
    mounted() {
        this.listUser();
    }
}
</script>
<style>
#user {
    flex: 1;
    margin-left: 4rem;
}

.user-list th,
.user-list td {
    padding-left: 20px !important;
}
</style>