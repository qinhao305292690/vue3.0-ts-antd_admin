<template>
    <div class="login">
        <a-card style="width: 430px;margin:0 auto;position:relative;top:100px" title="请输入用户名和密码">
            <a-form ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="用户名" v-bind="validateInfos.accountName">
                    <a-input allowClear placeholder="请输入用户名" v-model:value="modelRef.accountName" />
                </a-form-item>
                <a-form-item label="密码" v-bind="validateInfos.password">
                    <a-input allowClear placeholder="请输入密码" v-model:value="modelRef.password" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
                    <a-button :loading="loading" type="primary" @click.prevent="onSubmit">登录</a-button>
                    <a-button style="margin-left: 15px;" @click="$router.push('/register')">注册</a-button>
                    <a-button style="margin-left: 15px;" @click="resetFields">重置</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { Form } from 'ant-design-vue';
import { reactive, toRaw, ref, getCurrentInstance } from 'vue';
import { login } from '@/api/login'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { storeActionMethod } from '@/store/enumStoreType'
interface IUser {
    accountName: string,
    password: string
}

const useForm = Form.useForm;
let labelCol = { span: 4 }
let wrapperCol = { span: 14 }
let modelRef = reactive<IUser>({
    accountName: 'admin',
    password: '123',
})
const rulesRef = reactive({
    accountName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
let loading = ref<Boolean>(false)
let store = useStore()
let $router = useRouter()
const { proxy } = getCurrentInstance() as any

const onSubmit = (): void => {
    validate()
        .then(() => {
            loading.value = true
            login<IUser>(toRaw(modelRef))
                .then(({ data, message, code }) => {
                    if (code === 0) {
                        proxy.$message.success(message)
                        store.commit(storeActionMethod.SETTOKEN, data.token) // 把token保存到vuex中
                        $router.replace('/')
                    } else {
                        proxy.$message.error(message)
                    }
                    loading.value = false
                })
        })
        .catch(err => {
            console.log('error', err);
        });
}
</script>
<style lang="less">
.login {
    height: 100%;
    background-image: url(../assets/bg.png);
}
</style>
