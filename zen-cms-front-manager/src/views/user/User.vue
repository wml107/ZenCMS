<template>
    <div class="main">
        <router-view />
    </div>
</template>
<script>
import { mapState } from 'vuex';
import  normalizePath from '../../utils/normalizePath';
export default {
    name: "User",
    data() {
        return {
            activeIndex: normalizePath(this.$route.path)
        }
    },
    watch:{
        $route: function(){
            this.activeIndex = normalizePath(this.$route.path);
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
}
</script>