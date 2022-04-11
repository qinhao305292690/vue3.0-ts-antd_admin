const express = require('express')
const app = express()
const router = express.Router()
const {loginRoute,getUserInfoRoute,registerUser} = require('../api/login')
    // 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    })
})
router.post(loginRoute.api, loginRoute.callback) // 登录接口
router.get(getUserInfoRoute.api, getUserInfoRoute.callback) // 获取用户信息接口
router.post(registerUser.api, registerUser.callback) // 注册接口

module.exports = router
