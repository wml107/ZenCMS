import resourceApi from '../api/resource';

const moduleResource = {
    namespaced: true,
    state: {
        path: [],
        list: [],
    },
    mutations: {
        go(state, target, list){
            state.path = target;
            state.list = list;
        },
        refresh(state, list){
            state.list = list;
        },
        forward(state, target, list) {
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
        async go({commit}, {type, path}){
            const res = await resourceApi.getList(type, null, path);
            let target = [type].concat(path.split('/'));
            target = target.filter(item => item != '');
            commit('go', target, res);
            return true;
        },
        async refresh({commit, rootState}){
            let path = rootState.resource.path.slice(1).join('/');
            const res = await resourceApi.getList(rootState.resource.path[0], null, path);
            commit('refresh', res);
            return true;
        },
        async forward({commit, rootState}, target){
            if(!rootState.resource.list.includes(target)) return false;
            let path = rootState.resource.path.slice(1).concat([target]).join('/');
            let list = await resourceApi.getList(rootState.resource.path[0], null, path);
            commit('forward', target, list);
            return true;
        },
        async backward({commit, rootState}){
            if(rootState.resource.path.length < 2) return false;
            let path = rootState.resource.path.slice(1, rootState.resource.path.length - 1).join('/');
            let list = await resourceApi.getList(rootState.resource.path[0], null, path);
            commit('backward', list);
            return true;
        },
    },
    modules: {
    }
}
export default moduleResource;