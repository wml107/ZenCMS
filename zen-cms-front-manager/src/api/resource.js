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
    //删除
    async del(resourceType, path, type){
        const res = await axios({
            method: 'put',
            url: '/resource/delete',
            data: {
                resourceType: resourceType,
                path: path,
                type: type,
            }
        });
        return res.data;
    },
    //重命名
    async rename(resourceType, path, newName){
        const res = await axios({
            method: 'put',
            url: '/resource/rename',
            data: {
                resourceType: resourceType,
                path: path,
                newName: newName,
            }
        });
        return res.data;
    },
    //下载
    async download(resourceType, path){
        const res = await axios({
            method: 'get',
            url: '/resource/download',
            params: {
                resourceType: resourceType,
                path: path,
            }
        });
        return res.data;
    },
}