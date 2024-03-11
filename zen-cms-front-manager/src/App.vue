<template>
  <Header></Header>
  <router-view />
</template>

<script>
import Header from './components/Header.vue';
import { mapActions } from 'vuex';
import getToken from './utils/getToken';
export default {
  data() {
    return {
    }
  },
  components: {
    Header
  },
  methods: {
    ...mapActions([
      'autoLogin'
    ]),
  },
  async created() {
    //自动登录
    const hasToken = getToken();
    if (hasToken && window.location.pathname !== '/login') {
      await this.autoLogin();
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>