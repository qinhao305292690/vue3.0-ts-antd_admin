<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo">wo shi log</div>
            <layout-menu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <SHeade />
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item v-for="item in route.matched[0].children">{{ item.name }}</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">qinhaojoyc ©2022 Created</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import LayoutMenu from '@/components/LayoutMenu.jsx'
import SHeade from '@/layout/SHeade.vue'
import { useRoute } from 'vue-router'
interface Idata {
    collapsed: Boolean
}
export default defineComponent({
    components: {
        SHeade,
        LayoutMenu
    },
    setup() {
        const data = reactive({
            collapsed: false
        }) as Idata
        const route = useRoute()
        return {
            ...toRefs(data),
            route
        }
    }
});
</script>
<style scoped lang="less">
.logo {
    height: 60px;
}
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
</style>