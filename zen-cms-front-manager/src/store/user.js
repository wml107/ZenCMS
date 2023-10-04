import user from '../api/user';
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
            const res = await userApi.updatePassword(newPassword);
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
            if (res.statusCode === 200) {
                for(let i=0; i<res.data.length; i++){
                    if(res.data[i].rolename === null){
                        res.data[i].rolename = '角色不存在(id:'+res.data[i].role+')';
                        res.data[i].claims = '无';
                    }
                    if(res.data[i].role === 0){
                        res.data[i].rolename = 'super';
                        res.data[i].claims = "全部";
                    }
                    if(res.data[i].claims === ''){
                        res.data[i].claims = '无';
                    }
                }
                context.commit('setUser', res.data);
            }
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