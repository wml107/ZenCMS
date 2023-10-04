<template>
    <div id="role">
        <div id="role-operation">
            <el-button @click="refreshRole" :loading="refreshRoleBtnLock">刷新</el-button>
            <el-button v-if="user.account.role === 0" @click="createRoleVisible = true"
                :loading="refreshRoleBtnLock">添加角色</el-button>
        </div>
        <el-table class="role-list" :data="role" stripe flexible>
            <el-table-column fixed prop="id" label="id" />
            <el-table-column prop="rolename" label="角色" />
            <el-table-column property="claims" label="权限" />
            <el-table-column label="操作" #default="scope">
                <el-button v-if="user.account.role === 0" size="small"
                    @click="showUpdateRoleInput(scope.$index)">编辑</el-button>
                <el-button v-if="user.account.role === 0" size="small" type="danger" :loading="delRoleBtnLock"
                    @click="onDelRole(scope.$index)">删除</el-button>
            </el-table-column>
        </el-table>
        <el-dialog v-model="createRoleVisible" @close="createRoleInputReset" title="添加角色">
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
        </el-dialog>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { mapState, mapActions } from 'vuex';
import claims from '../../constants/claims';
import { ro } from 'element-plus/es/locale';
export default {
    name: "UserRole",
    data() {
        return {
            refreshRoleBtnLock: false,
            delRoleBtnLock: false,
            createRoleBtnLock: false,
            updateRoleBtnLock: false,
            createRoleVisible: false,
            updateRoleVisible: false,
            claimOptions: claims,
            createRoleInput: {
                rolename: "",
                claims: []
            },
            updateRoleInput: {
                rolename: "",
                claims: [],
                updateNow: ""
            }
        }
    },
    computed: {
        ...mapState([
            'user'
        ]),
        role() {
            let role = [];
            for (let i = 0; i < this.user.role.length; i++) {
                role.push(this.user.role[i]);
                if (role[i].claims.length === 0) role[i].claims = '无';
            }
            return role;
        }
    },
    methods: {
        createRoleInputReset() {
            this.createRoleInput = {
                rolename: "",
                claims: []
            };
        },
        showUpdateRoleInput(index) {
            this.updateRoleInput = {
                rolename: this.user.role[index].rolename,
                claims: this.user.role[index].claims,
                updateNow: index,
            };
            this.updateRoleVisible = true;
        },
        ...mapActions([
            'listRole',
            'createRole',
            'updateRole',
            'delRole'
        ]),
        async refreshRole() {
            this.refreshRoleBtnLock = true;
            await this.listRole();
            this.refreshRoleBtnLock = false;
        },
        async onCreateRole() {
            //按钮防抖
            this.createRoleBtnLock = true;
            //参数校验
            switch (this.createRoleInput.rolename) {
                case '':
                    ElMessage({
                        message: '角色名不能为空',
                        type: 'error',
                        duration: 1500
                    });
                    this.createRoleBtnLock = false;
                    return;
                case 'super':
                    ElMessage({
                        message: '角色名不能为super，这是根用户权限！',
                        type: 'error',
                        duration: 1500
                    });
                    this.createRoleBtnLock = false;
                    return;
            }
            //调用数据层
            const res = await this.createRole({ rolename: this.createRoleInput.rolename, claims: this.createRoleInput.claims });
            this.createRoleBtnLock = false;
            //回显结果
            if (res.statusCode === 200) {
                this.listRole();
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                });
                this.createRoleVisible = false;
            }
        },
        async onUpdateRole(index) {
            //按钮防抖
            this.updateRoleBtnLock = true;
            //参数校验
            switch (this.updateRoleInput.rolename) {
                case '':
                    ElMessage({
                        message: '角色名不能为空',
                        type: 'error',
                        duration: 1500
                    });
                    this.updateRoleBtnLock = false;
                    return;
                case 'super':
                    ElMessage({
                        message: '角色名不能为super，这是根用户权限！',
                        type: 'error',
                        duration: 1500
                    });
                    this.updateRoleBtnLock = false;
                    return;
            }
            //调用数据层
            const res = await this.updateRole({ oldRolename: this.user.role[index].rolename, rolename: this.updateRoleInput.rolename, claims: this.updateRoleInput.claims });
            this.updateRoleBtnLock = false;
            //结果回显
            if (res.statusCode === 200) {
                this.listRole();
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
                this.updateRoleVisible = false;
            }
        },
        async onDelRole(index) {
            this.delRoleBtnLock = true;
            const res = await this.delRole(this.user.role[index].rolename);
            if (res.statusCode === 200) ElMessage({
                message: '删除成功',
                type: 'success',
                duration: 1000
            })
            await this.listRole();
            this.delRoleBtnLock = false;
        },
    },
    mounted() {
        this.listRole();
    }
}
</script>
<style>
#role {
    flex: 1;
    margin-left: 4rem;
}

.role-list th,
.role-list td {
    padding-left: 20px !important;
}
</style>