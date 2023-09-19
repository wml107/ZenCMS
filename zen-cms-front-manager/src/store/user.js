import userApi from '../api/user';

const moduleUser = {
    state: {
    },
    mutations: {
    },
    actions: {
        async login(context, {
            username, 
            password
        }) {
            const res = await userApi.login(username, password);
            return res;
        }
    },
    modules: {
    }
}
export default moduleUser;