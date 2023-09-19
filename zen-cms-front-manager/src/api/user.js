import axios from "axios"

export default {
    async login(username, password){
        const res = axios({
            method: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            }
        });
        return res;
    }
}