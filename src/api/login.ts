import axios from '@/utils/axios'
const login = <T>(data: T): Promise<any> => axios({
    method: 'post',
    url: '/login',
    data
})
const getuserInfo = (): Promise<any> => axios({
    method: 'get',
    url: '/getuserInfo'
})
const registerUser = <T>(data: T): Promise<any> => axios({
    method: 'post',
    url: '/registerUser',
    data
})
export {
    login,
    registerUser,
    getuserInfo
}