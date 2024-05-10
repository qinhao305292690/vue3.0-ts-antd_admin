<template>
    <div class="register">
        <a-form @submit="submit" :model="formState" v-bind="layout">
            <a-form-item v-bind="validateInfos.accountName" label="帐号">
                <a-input v-model:value="formState.accountName" />
            </a-form-item>
            <a-form-item v-bind="validateInfos.password" label="密码">
                <a-input type="password" v-model:value="formState.password" />
            </a-form-item>

            <a-form-item v-bind="validateInfos.userName" label="姓名">
                <a-input v-model:value="formState.userName" />
            </a-form-item>
            <a-form-item label="年龄">
                <a-input-number v-model:value="formState.age" />
            </a-form-item>
            <a-form-item label="性别">
                <a-radio-group v-model:value="formState.gender">
                    <a-radio :value="1">男</a-radio>
                    <a-radio :value="0">女</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button :loading="loading" type="primary" html-type="submit">注册</a-button>
                <a-button style="margin-left: 15px" @click="$router.back()">返回</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { registerUser } from '@/api/login';
import { Modal, message } from 'ant-design-vue';
import { useRouter } from 'vue-router'
type User = {
    accountName: string
    password: string,
    userName: string,
    age: number,
    gender: 1 | 0 | '1' | '0'
}
export default defineComponent({
    setup() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        let $router = useRouter()

        const formState = reactive<User>({
            accountName: '',
            password: '',
            userName: '',
            age: 18,
            gender: 1
        });
        const loading = ref<Boolean>(false)
        const rulesRef = reactive({
            accountName: [{ max: 20, min: 3, required: true, type: 'string', message: '请输入用户名' }],
            password: [{ max: 20, min: 3, required: true, message: '请输入密码' }],
            userName: [{ max: 10, min: 2, required: true, message: '请输入姓名' }],
        });
        const useForm = Form.useForm;
        // eslint-disable-next-line no-unused-vars
        const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);
        const submit = () => {
            loading.value = true
            // eslint-disable-next-line no-unused-vars
            validate().then((res:any) => {
                registerUser(toRaw(formState)).then(({ code, message: msg }) => {
                    if (code === 0) {
                        Modal.confirm({
                            title: '提示',
                            content: '注册成功!',
                            okText: '登录',
                            cancelText: '继续注册',
                            onOk() {
                                $router.push('/login')
                            }
                        });
                    } else {
                        message.info(msg)
                    }
                    loading.value = false
                }).catch(() => loading.value = false)
            }).catch(() => loading.value = false)
        }
        return {
            formState,
            validateInfos,
            layout,
            loading,
            submit
        };
    },
});
</script>

<style scoped lang="less">
.register {
    padding: 40px 300px;
}
</style>
