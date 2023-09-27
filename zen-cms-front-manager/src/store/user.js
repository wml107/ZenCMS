import userApi from '../api/user';

const moduleUser = {
    state: {
        account: {
            username: '---',
            id: '---',
            role: '---',
            claims: []
        }
    },
    mutations: {
        setAccount(state, account) {
            state.account = account;
        },
        resetAccount(state){
            state.account = {
                username: '---',
                id: '---',
                role: '---',
                claims: []
            }
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
        async quit(context){
            const res = await userApi.quit();
            if( res.statusCode === 200) context.commit('resetAccount');
            return res;
        },
        async updatePassword(context, newPassword){
            const res = await userApi.updatePassword(newPassword);
            return res;
        }
    },
    modules: {
    }
}
export default moduleUser;