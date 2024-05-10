import axios from 'axios'
import { message } from 'ant-design-vue'

axios.defaults.headers.post['Content-Type'] = 'application/json';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 60000,
    headers: {
        'content-type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config: any) => {
        const token = sessionStorage.getItem('TOKEN')
        if (token) config.headers.authorization = 'Bearer ' + token
        return config
    },
    err => Promise.reject(err))

// http response 拦截器
instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        if (response.status === 200) {
            return response.config.responseType === 'blob' ? response.data : {
                ...response.data
            }
        } else if (response.status === 401) {
            console.error('请返回登录页');

        }
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        message.error('请求失败!')
        return Promise.reject(error) // 返回接口返回的错误信息
    })
export default instance
