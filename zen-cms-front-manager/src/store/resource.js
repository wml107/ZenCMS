import path from 'path';
import resourceApi from '../api/resource';

const moduleResource = {
    namespaced: true,
    state: {
        path: [],
        list: [],
    },
    mutations: {
        go(state, {target, list}) {
            state.path = target;
            state.list = list;
        },
        refresh(state, list) {
            state.list = list;
        },
        forward(state, {target, list}) {
            state.push(target);
            state.path = state.path;
            state.list = list;
        },
        backward(state, list) {
            if (state.path.length < 2) return;
            state.path.pop();
            state.path = state.path;
            state.list = list;
        }
    },
    actions: {
        async go({ commit }, { type, path }) {
            const res = await resourceApi.getList(type, null, path);
            let target = [type].concat(path.split('/'));
            target = target.filter(item => item != '');
            commit('go', {target: target, list: res.data});
            return true;
        },
        async refresh({ commit, rootState }) {
            let path = rootState.resource.path.slice(1).join('/');
            const res = await resourceApi.getList(rootState.resource.path[0], null, path);
            commit('refresh', res.data);
            return true;
        },
        async forward({ commit, rootState }, target) {
            if (!rootState.resource.list.includes(target)) return false;
            let path = rootState.resource.path.slice(1).concat([target]).join('/');
            let list = await resourceApi.getList(rootState.resource.path[0], null, path);
            commit('forward', {target: target, list: list});
            return true;
        },
        async backward({ commit, rootState }) {
            if (rootState.resource.path.length < 2) return false;
            let path = rootState.resource.path.slice(1, rootState.resource.path.length - 1).join('/');
            let list = await resourceApi.getList(rootState.resource.path[0], null, path);
            commit('backward', list);
            return true;
        },
        async createCatalog({ dispatch, rootState }, { name }) {
            const res = await resourceApi.createCatalog(name, rootState.resource.path[0], rootState.resource.path.slice(1).join('/'));
            if (res.statusCode === 200) {
                dispatch('refresh');
                return true;
            }else return false;
        },
        async del({ dispatch, rootState }, { name }){
            if(rootState.resource.path[0] != 'bin'){
                //删到回收站
                let resourceType = rootState.resource.path[0], 
                    type = 'bin', 
                    path = rootState.resource.path.slice(1, rootState.resource.path.length - 1).concat([name]).join('/');
                const res = await resourceApi.del(resourceType, path, type);
                if(res.statusCode === 200) {
                    dispatch('refresh');
                    return true;
                }else return false;
            }else{
                //永久删除
            }
        },
        async rename({ dispatch, rootState}, { fileName, newName }){
            let resourceType = rootState.resource.path[0],
                path = rootState.resource.path.slice(1, rootState.resource.path.length - 1).concat([fileName]).join('/');
            const res = await resourceApi.rename(resourceType, path, newName);
            if(res.statusCode === 200) {
                dispatch('refresh');
                return true;
            }else return false;
        },
        async download({ rootState }, { name }){
            let resourceType = rootState.resource.path[0],
                path = rootState.resource.path.slice(1, rootState.resource.path.length - 1).concat([name]).join('/');
            const res = await resourceApi.download(resourceType, path);
            console.log(res)
        }
    },
    modules: {
    }
}
export default moduleResource;