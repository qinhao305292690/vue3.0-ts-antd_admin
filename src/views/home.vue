<template>
    <div class="box">
        hi,home
        <a-button @click="$router.push('/project')" type="link">跳转到项目列表</a-button>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const $router = useRouter()
</script>
<style scoped lang="less">
</style>