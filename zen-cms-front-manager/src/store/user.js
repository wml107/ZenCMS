import userApi from '../api/user';

const moduleUser = {
    state: {
        account: {
            username: '---',
            id: '---',
            role: '---',
            rolename: '---',
            claims: []
        },
        role: [],
        user: []
    },
    mutations: {
        setAccount(state, account) {
            state.account = account;
        },
        resetAccount(state) {
            state.account = {
                username: '---',
                id: '---',
                role: '---',
                rolename: '---',
                claims: []
            }
        },
        setRole(state, role) {
            state.role = role;
        },
        setUser(state, user){
            state.user = user;
        }
    },
    actions: {
        async login(context, {
            username,
            password
        }) {
            const res = await userApi.login(username, password);
            if (res.statusCode === 200) context.commit('setAccount', res.data);
            return res;
        },
        async autoLogin(context) {
            const res = await userApi.autoLogin();
            if (res.statusCode === 200) context.commit('setAccount', res.data);
            return res;
        },
        async quit(context) {
            const res = await userApi.quit();
            if (res.statusCode === 200) context.commit('resetAccount');
            return res;
        },
        async updatePassword(context, newPassword) {
            const res = await userApi.passwordUpdate(newPassword);
            return res;
        },
        async listRole(context) {
            const res = await userApi.listRole();
            if (res.statusCode === 200) context.commit('setRole', res.data);
            return res;
        },
        async createRole(context, {
            rolename,
            claims
        }) {
            const res = await userApi.createRole(rolename, claims);
            return res;
        },
        async updateRole(context, {
            oldRolename,
            rolename,
            claims
        }) {
            const res = await userApi.updateRole(oldRolename, rolename, claims);
            return res;
        },
        async delRole(context, rolename) {
            const res = await userApi.delRole(rolename);
            return res;
        },
        async listUser(context) {
            const res = await userApi.listUser();
            if (res.statusCode === 200) context.commit('setUser', res.data);
            return res;
        },
        async createUser(context, {
            username,
            roleId,
            password
        }) {
            const res = await userApi.createUser(username, password, roleId);
            return res;
        },
        async updateUser(context, updateData) {
            const res = await userApi.updateUser(updateData);
            return res;
        },
        async delUser(context, username) {
            const res = await userApi.delUser(username);
            return res;
        },
    },
    modules: {
    }
}
export default moduleUser;