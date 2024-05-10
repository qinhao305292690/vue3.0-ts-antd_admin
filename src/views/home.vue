<template>
    <div class="box">
        hi,home
        <a-button @click="$router.push('/project')" type="link">跳转到项目列表</a-button>
        <a-button @click="downImage">点击下载图片</a-button>
        <Project></Project>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fileStur } from '@/api/test';
import { downLoadFile } from '@/utils/downLoadFile'
import Project from '@/views/project/project'
const $router = useRouter()
onMounted(() => {
    console.log(Project);
})
const downImage = () => {
    // const targetWindow: any = window.open('http://localhost:8080');
    // setTimeout(() => {
    //     targetWindow.postMessage('来自10002的消息', 'http://localhost:10001')
    // }, 3000)
    console.log(window.parent.opener);
    window.parent.opener.postMessage('你好大神', "http://localhost:8080");
    // fileStur().then(res => {
    //     downLoadFile(res, '头像' + Date.now())
    // })
}
</script>
<style scoped lang="less"></style>
