const User = require('../model/user')
const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/tokenCofig')
const fetchStatus = require('./fetchStatus')
const loginRoute = {
  api: '/login',
  callback(req, res) {
    const {accountName, password} = req.body
    User.findOne({
      accountName,
      password
    }, function (err, data) {
      if (err) return res.status(503).json({message: '服务异常', code: -1})
      if (data) {
        const token = jwt.sign(req.body, tokenConfig.secret, {expiresIn: tokenConfig.expiresIn});
        // 验证通过
        res.json(fetchStatus({token}, '登录成功'));
      } else {
        res.json(fetchStatus(402, '用户名或者密码错误!'));
      }
    })
  }
}
const getUserInfoRoute = {
  api: '/getUserInfo',
  callback(req, res) {
    console.log(req.body,'req.body');
    res.json(fetchStatus({
      userId: '2134',
      userName: '秦昊joyc',
      age: '18',
      gender: '1',
      avatar: ''
    }, '查询用户信息成功!'))
  }
}
const registerUser = {
  api: '/registerUser',
  callback(req, res) {
    console.log(req.body);
    const {accountName} = req.body
    User.findOne({
      accountName
    }, function (err, data) {
      if (err) return res.status(503).json({message: '服务异常', code: -1})
      if (data) {
        // 验证通过
        res.json(fetchStatus(-1,'用户名已存在!'));
      } else {
        // 如果用户不存在走的逻辑
        new User(req.body).save(function (err) {
          if (!err) {
            res.json(fetchStatus('注册用户成功'))
          } else {
            return res.status(503).json(fetchStatus(-1, '服务出现问题'))
          }
        })
      }
    })

  }
}
module.exports = {
  loginRoute,
  registerUser,
  getUserInfoRoute
}
