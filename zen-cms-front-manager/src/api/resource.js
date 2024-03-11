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
    //新建目录
    async createCatalog(name, type, path){
        const res = await axios({
            method: 'post',
            url: '/resource/createCatalog',
            data: {
                catalogName: name,
                resourceType: type,
                path: path
            }
        });
        return res.data;
    },
}