<template>
  <div class="detail">
    <div class="content">{{content}}</div>
    <a-input type="text" v-model:value="val" />
    <a-button @click="send">发送</a-button>
  </div>
</template>
<script setup lang="ts">
    import {ref, onBeforeUnmount} from 'vue'
    import {sendMessage} from "@/api/test";

    let val = ref('');
    let content = ref('');
    const chatEventSource = new EventSource(  'http://localhost:8888/chat');
    chatEventSource.onmessage = event => {
        const message = event.data;
        console.log(message, 'message');
        content.value += message
    }

    let send = () => {
        sendMessage({value: val}).then(res => {
            console.log(res, 'ressss');
            val.value = ''
        })
    }
    onBeforeUnmount(() => {
        //关闭链接
        console.log('关闭连接');
        chatEventSource.close()
    })
</script>
<style scoped lang="less">
.content {
  width: 80%;
  height: 200px;
  border: 1px solid #adadad;
}
</style>
