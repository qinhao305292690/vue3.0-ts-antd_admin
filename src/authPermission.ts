import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { storeActionMethod } from './store/enumStoreType'
// 进度条配置项这样写
NProgress.configure({
    showSpinner: false
});
// 不需要token验证的白名单
const whiteListRoute: string[] = [
    '/register'
]
router.beforeEach((to, from, next) => {
    const { getters: { getToken, userInfo }, commit, dispatch } = store
    const sessionToken = sessionStorage.getItem('TOKEN')
    NProgress.start();
    if (whiteListRoute.includes(to.path)) {
        next()
        return
    }
    if (to.path === '/login') {
        commit(storeActionMethod.SETTOKEN)
        next()
    } else if (sessionToken) {
        if (getToken && userInfo.userId) {
            next()
        } else {
            dispatch(storeActionMethod.GETUSERINFO, next)
        }
    } else {
        next('/login')
    }

})

router.afterEach(() => {
    NProgress.done();
})
