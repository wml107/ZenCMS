<template>
    <!-- 导航 -->
    <nav v-if="!isLogin" class="navbar sticky-top navbar-expand-lg" style="background-color: #6610f2; opacity: .9;">
        <div class="container-fluid">
            <a class="navbar-brand text-light" href="/home">ZenCMS</a>
            <div class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                style="border: none;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                    style="width: 1.7rem; height: 1.7rem; color: white;">
                    <path fill="currentColor"
                        d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64z">
                    </path>
                </svg>
            </div>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            仪表盘
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link class="dropdown-item" :to="{ name: 'HomeInfo' }">网站信息</router-link></li>
                            <li><router-link class="dropdown-item"
                                    :to="{ name: 'HomeMonitorService' }">业务监测</router-link></li>
                            <li><router-link class="dropdown-item"
                                    :to="{ name: 'HomeMonitorHardware' }">硬件监测</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'HomeFooter' }">页脚配置</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'HomeSystemData' }">系统数据</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            资源
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link class="dropdown-item" :to="{ name: 'ResourceArticle' }">内容</router-link>
                            </li>
                            <li><router-link class="dropdown-item"
                                    :to="{ name: 'ResourceHtmlPlugin' }">HTML插件</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'ResourcePic' }">图片</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'ResourceFile' }">文件</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'ResourceView' }">浏览内容</router-link>
                            </li>
                            <li><router-link class="dropdown-item" :to="{ name: 'ResourceEdit' }">编辑内容</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" href="/structure" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            内容组织
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" href="/post" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            动态
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            用户
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link class="dropdown-item" :to="{ name: 'Account' }">账户</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'Role' }">角色</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'UserUser' }">用户</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup name="Header">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const isLogin = ref(false);

watch(
    () => route.params,
    () => {
        if(route.matched.some(record => record.path === '/login')){
            isLogin.value = true;
        }else{
            isLogin.value = false;
        }
    },
    {
        immediate: true,
    }
);
</script>

<style scoped>
.container-fluid {
    padding: 0 2rem;
}
</style>