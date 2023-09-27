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
    }
}