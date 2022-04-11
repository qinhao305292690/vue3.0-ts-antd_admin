<template>
    <div class="user-info">
        <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
                {{ store.getters.userInfo.userName }} - {{ gender }}
                <DownOutlined />
            </a>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a class="hjf" @click="message.info('暂未开放')" href="javascript:;">修改密码</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a class="hjf" @click="loginOut" href="javascript:;">退出登录</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
import { message, Modal } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { computed } from 'vue'
const $router = useRouter()
const loginOut = () => {
    Modal.confirm({
        title: '提示',
        content: '确定要退出登录吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            $router.push('/login')
        }
    })
}
const store = useStore()
const gender = computed(() => store.getters.userInfo.gender === '1' ? '男' : '女')
</script>

<style scoped lang="less">
.user-info {
    float: right;
    padding-right: 15px;
}
.hjf {
    color: #666;
}
</style>
