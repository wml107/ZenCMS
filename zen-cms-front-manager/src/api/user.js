import axios from "axios"

export default {
    async login(username, password){
        const res = await axios({
            method: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            }
        });
        return res.data;
    },
    async autoLogin(){
        const res = await axios({
            method: 'get',
            url: '/user/autoLogin'
        });
        return res.data;
    },
    async quit(){
        const res = await axios({
            method: 'get',
            url: '/user/quit'
        });
        return res.data;
    },
    async passwordUpdate(newPassword){
        const res = await axios({
            method: 'post',
            url: 'user/updatePassword',
            data: {
                newPassword: newPassword
            }
        });
        return res.data;
    },
    async listRole(){
        const res = await axios({
            method: 'get',
            url: 'user/listRole'
        });
        return res.data;
    },
    async createRole(rolename, claims){
        const res = await axios({
            method: 'post',
            url: 'user/createRole',
            data: {
                rolename: rolename,
                claims: claims
            }
        });
        return res.data;
    },
    async updateRole( oldRolename, rolename, claims){
        const res = await axios({
            method: 'post',
            url: 'user/updateRole',
            data: {
                oldRolename: oldRolename,
                rolename: rolename,
                claims: claims
            }
        });
        return res.data;
    },
    async delRole(rolename){
        const res = await axios({
            method: 'post',
            url: 'user/delRole',
            data: {
                rolename: rolename
            }
        });
        return res.data;
    },
    async listUser(){
        const res = await axios({
            method: 'get',
            url: 'user/listUser'
        });
        return res.data;
    },
    async createUser(username, password, roleId){
        const res = await axios({
            method: 'post',
            url: 'user/createUser',
            data: {
                username: username,
                password: password,
                role: roleId
            }
        });
        return res.data;
    },
    async delUser(username){
        const res = await axios({
            method: 'post',
            url: 'user/delUser',
            data: {
                username: username
            }
        });
        return res.data;
    }
}