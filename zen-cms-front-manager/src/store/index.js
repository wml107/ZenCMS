import { createStore } from 'vuex';
import moduleUser from './user';
import moduleResource from './resource';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: moduleUser,
    resource: moduleResource,
  }
});
