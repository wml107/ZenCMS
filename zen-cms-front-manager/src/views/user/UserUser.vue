<template>
    <div id="user">
        <div id="user-operation">
            <el-button @click="refreshUser" :loading="refreshUserBtnLock">刷新</el-button>
            <el-button v-if="user.account.role === 0" @click="createUserVisible = true">添加角色</el-button>
        </div>
        <el-table class="user-list" :data="transformedUser" stripe flexible>
            <el-table-column fixed prop="id" label="id" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="expire" label="上次登录时间" min-width="150" />
            <el-table-column label="角色">
                <template #default="scope">
                    <el-popover placement="left-start" title="权限" effect="dark" trigger="hover" :content="scope.row.claims">
                        <template #reference>
                            <el-tag>{{ scope.row.rolename }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" #default="scope" min-width="175">
                <el-button v-if="user.account.role === 0" size="small"
                    @click="showUpdateUserInput(scope.$index)">编辑</el-button>
                <el-button v-if="user.account.role === 0" size="small"
                    @click="showUpdatePasswordInput(scope.$index)">修改密码</el-button>
                <el-button v-if="user.account.role === 0" size="small" type="danger" :loading="delUserBtnLock"
                    @click="onDelUser(scope.$index)">删除</el-button>
            </el-table-column>
        </el-table>
        <el-dialog v-model="createUserVisible" @close="createUserInputReset" title="添加角色">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="createUserInput.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" show-password v-model="createUserInput.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="createUserInput.roleId">
                        <el-option v-for="item in roleOptionsForCreate" :key="item.id" :label="item.rolename"
                            :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onCreateUser" :loading="createUserBtnLock">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="updateUserVisible" title="编辑用户">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="updateUserInput.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" v-if="updateUserInput.roleId !== 0">
                    <el-select v-model="updateUserInput.roleId">
                        <el-option v-for="item in user.role" :key="item.id" :label="item.rolename" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onUpdateUser(updateUserInput.updateNow)" :loading="updateUserBtnLock">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="updatePasswordVisible" title="修改密码">
            <el-form>
                <el-form-item label="新密码">
                    <el-input type="password" show-password v-model="updatePasswordInput.password" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onUpdatePassword(updatePasswordInput.updateNow)"
                        :loading="updatePasswordBtnLock">
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
export default {
    name: "UserUser",
    data() {
        return {
            createUserVisible: false,
            updateUserVisible: false,
            updatePasswordVisible: false,
            refreshUserBtnLock: false,
            createUserBtnLock: false,
            updateUserBtnLock: false,
            updatePasswordBtnLock: false,
            delUserBtnLock: false,
            createUserInput: {
                username: "",
                roleId: -1,
                password: ''
            },
            updateUserInput: {
                username: "",
                roleId: -1,
                password: '',
                //此项用于标记所修改的到底是哪一条
                updateNow: ""
            },
            updatePasswordInput: {
                password: "",
                updateNow: ""
            }
        }
    },
    computed: {
        ...mapState([
            'user'
        ]),
        roleOptionsForCreate() {
            return [{
                id: -1,
                rolename: '未选择'
            },
            ...this.user.role
            ];
        },
        transformedUser() {
            const _user = [];
            for (let i = 0; i < this.user.user.length; i++) {
                _user.push(Object.assign({}, this.user.user[i]));
                if (this.user.user[i].rolename === null) {
                    _user[i].rolename = '角色不存在(id:' + this.user.user[i].role + ')';
                    _user[i].claims = '无';
                }
                if (this.user.user[i].role === 0) {
                    _user[i].rolename = 'super';
                    _user[i].claims = "全部";
                }
                if (_user[i].claims === '') {
                    _user[i].claims = '无';
                }
                _user[i].expire = _user[i].expire === 0 ? '未曾登录' : new Date(_user[i].expire).toLocaleString();
            }
            return _user;
        }
    },
    methods: {
        createUserInputReset() {
            this.createUserInput = {
                username: '',
                roleId: -1,
                password: ''
            };
        },
        showUpdateUserInput(index) {
            this.updateUserInput = {
                username: this.user.user[index].username,
                roleId: this.user.user[index].role,
                updateNow: index,
            };
            this.updateUserVisible = true;
        },
        showUpdatePasswordInput(index) {
            this.updatePasswordInput = {
                password: "",
                updateNow: index
            }
            this.updatePasswordVisible = true;
        },
        ...mapActions([
            'listRole',
            'listUser',
            'createUser',
            'updateUser',
            'delUser'
        ]),
        async refreshUser() {
            this.refreshUserBtnLock = true;
            await this.listUser();
            this.refreshUserBtnLock = false;
        },
        async onCreateUser() {
            //按钮防抖
            this.createUserBtnLock = true;
            //参数校验
            if (this.createUserInput.username === '') {
                ElMessage({
                    message: '用户名不能为空',
                    type: 'error',
                    duration: 1500
                });
                this.createUserBtnLock = false;
                return;
            }
            if (this.createUserInput.password === '') {
                ElMessage({
                    message: '密码不能为空',
                    type: 'error',
                    duration: 1500
                });
                this.createUserBtnLock = false;
                return;
            }
            switch (this.createUserInput.roleId) {
                case -1:
                    ElMessage({
                        message: '未选择角色',
                        type: 'error',
                        duration: 1500
                    });
                    this.createUserBtnLock = false;
                    return;
                case 0:
                    ElMessage({
                        message: '不能创建super用户',
                        type: 'error',
                        duration: 1500
                    });
                    this.createUserBtnLock = false;
                    return;
            }
            //调用数据层
            const res = await this.createUser({ username: this.createUserInput.username, roleId: this.createUserInput.roleId, password: this.createUserInput.password });
            this.createUserBtnLock = false;
            //回显结果
            if (res.statusCode === 200) {
                this.listUser();
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                });
                this.createUserVisible = false;
            }
        },
        async onUpdateUser(index) {
            //按钮防抖
            this.updateUserBtnLock = true;
            //参数校验
            if (this.updateUserInput.username === '') {
                ElMessage({
                    message: '用户名不能为空',
                    type: 'error',
                    duration: 1500
                });
                this.updateUserBtnLock = false;
                return;
            }
            //调用数据层
            let updateData = {
                oldUsername: this.user.user[index].username,
                username: this.updateUserInput.username
            };
            if (this.updateUserInput.roleId !== 0) updateData = Object.assign(updateData, { role: this.updateUserInput.roleId });
            const res = await this.updateUser(updateData);
            this.updateUserBtnLock = false;
            //结果回显
            if (res.statusCode === 200) {
                this.listUser();
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
                this.updateUserVisible = false;
            }
        },
        async onUpdatePassword(index) {
            //按钮防抖
            this.updatePasswordBtnLock = true;
            //参数校验
            if (this.updatePasswordInput.password === '') {
                ElMessage({
                    message: '密码不能为空',
                    type: 'error',
                    duration: 1000
                });
                this.updatePasswordBtnLock = false;
                return;
            }
            //调用数据层
            const res = await this.updateUser({ oldUsername: this.user.user[index].username, password: this.updatePasswordInput.password });
            this.updatePasswordBtnLock = false;
            //结果回显
            if (res.statusCode === 200) {
                this.listUser();
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
                this.updatePasswordVisible = false;
            }
        },
        async onDelUser(index) {
            this.delUserBtnLock = true;
            if (this.user.user[index].role === 0) {
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
        this.listRole();
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