const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const router = express.Router()
const mime = require('mime')
const {loginRoute, getUserInfoRoute, registerUser} = require('../api/login')
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

router.get('/getFile', (req, res) => {
  const filePath = path.resolve(__dirname, `../public/README.md`);
  res.header("content-type", mime.getType(filePath));
  //格式必须为 binary，否则会出错
  // 创建文件可读流
  const cs = fs.createReadStream(filePath);
  cs.on("data", chunk => {
    res.write(chunk);
  })
  cs.on("end", () => {

    // res.status(200);
    res.send();
  })
}) // 注册接口

module.exports = router
