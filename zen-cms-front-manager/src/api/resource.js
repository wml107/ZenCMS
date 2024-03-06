import axios from "axios"

export default {
    //获取资源列表
    async getList(type, binType, path){
        const res = await axios({
            method: 'get',
            url: '/resource/list',
            params: {
                resourceType: type,
                binType: binType,
                path: path
            }
        });
        return res.data;
    },
}