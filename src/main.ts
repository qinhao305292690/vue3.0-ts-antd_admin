import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import antd from '@/utils/antd'
import axios from '@/utils/axios'
import router from '@/router'
import store from './store';
import '@/utils/global.less'
import '@/authPermission'

const app = createApp(App);
Object.defineProperties(app.config.globalProperties, {
    $axios: {
        get: function get() {
            return axios
        }
    },
    $http: {
        get: function get() {
            return axios
        }
    }
});

app
    .use(antd)
    .use(router)
    .use(store)
    .mount('#app');
