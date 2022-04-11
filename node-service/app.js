const express = require('express')
const router = require('./router')
const app = express()
const expressJwt = require('express-jwt')
const bodyParser = require('body-parser')
const tokenConfig = require('./config/tokenCofig')
// 链接数据库
require('./model/connect')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(router)
app.use(expressJwt({
  algorithms: ['256'], //加密算法，默认是HS256
  secret: tokenConfig.secret, //先前为了生成token设置的密钥
}).unless({ //指定不拦截的路由，我这里是登录路由不验证是否有token
  path: ['/login', '/registerUser']
}))
app.listen(3000, () => console.log('localhost:3000服务器已启动就绪...'))
