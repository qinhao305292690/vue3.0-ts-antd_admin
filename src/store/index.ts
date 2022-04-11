import { createStore } from 'vuex'
import userInfo from '@/store/module/userInfo'
import { storeActionMethod } from './enumStoreType';
import { getuserInfo } from '@/api/login';
interface IUserinfoData {
    readonly age: string | number
    readonly avatar?: string
    readonly gender: "1" | "0"
    readonly userId: string
    readonly userName: string
}
interface IState {
    userInfoData: IUserinfoData,
    token?: string
}
const userInfoData: IUserinfoData = {
    age: '',
    gender: '0',
    userId: '',
    userName: ''
}
const state: IState = {
    userInfoData,
    token: ''
}
const store = createStore({
    state,
    getters: {
        getToken: ({ token }) => token,
        userInfo: ({ userInfoData }) => userInfoData
    },
    mutations: {
        [storeActionMethod.SETTOKEN](state, token: string = '') {
            sessionStorage.setItem('TOKEN', token) // 将token保存到session里面
            state.token = token
        },
        [storeActionMethod.SETUSERINFODATA](state, userInfoData) {
            state.userInfoData = userInfoData
        }
    },
    actions: {
        [storeActionMethod.GETUSERINFO]({ commit }, next) {
            getuserInfo().then(({ data }) => {
                commit(storeActionMethod.SETUSERINFODATA, data)
                next()
            })
        }
    },
    modules: {
        userInfo
    }
})

export default store
