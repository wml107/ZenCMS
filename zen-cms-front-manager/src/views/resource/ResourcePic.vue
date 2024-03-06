<template>
    <div>
        资源-图片
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { mapState, mapActions } from 'vuex';
export default {
    name: "ResourcePic",
    data() {
        return {
            newPassword: ''
        }
    },
    computed: {
        ...mapState('resource',[
            'resource'
        ])
    },
    mounted: function(){
        this.go({type: 'pic', path: ''});
    },
    methods: {
        ...mapActions('resource',[
            'go',
            'refresh',
            'forward',
            'backward',
        ]),
        
    }
}
</script>