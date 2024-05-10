const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const router = express.Router()
const mime = require('mime')
// const chatgpt = require('chatgpt'); // chatGPT
// const chatbot = new chatgpt.ChatGPT('YOUR_CHATGPT_API_KEY');
const {loginRoute, getUserInfoRoute, registerUser} = require('../api/login')
let socket = ''
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
let song = [
  '我', '懒', '得', '写', '你', '谷','歌', '搜', '到', '处', '皆','是', '只', '因', '你',
  '太', '懒', '浅', '唱', '动', '人', '说', '不', '出', '我', '试', '着', 'end',
]
let index = 0;
router.get('/chat', (req, res) => {
  socket = res
  console.log('收到');
  // 设置响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // res.setHeader('Access-Control-Allow-Origin', '*');

  // 向客户端发送消息
  socket.write(`data: 你好\n\n`);
  // setInterval(() => {
  //   res.write(`data: 爱情是什么?\n\n`);
  // }, 2000)
  // 处理消息
  // ...

});

router.post('/chat', (req, res) => {
  const message = req.body.message;
//
  console.log(message, 'message');
//   // 与ChatGPT交互
//   chatbot.sendMessage(message)
//     .then((response) => {
//       // 发送响应到客户端
//       res.json({ message: response });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
//
  setInterval(() => {
    const str = song[index];
    if (str) {
      // 方式1：格式是 data: xxx\n\n，事件要一对\n结束
      // stream.write(`data: ${song[index]}\n\n`)
      // 方式2,定义了event字段，自定义事件
      // stream.write(`event: custom\ndata: ${song[index]}\n\n`)
      // 发送的数据为json字符串
      socket.write(`data: ${song[index]}\n\n`)
    } else {
      socket.write('0')
    }
    index++
  }, 300)
  res.json({code: 1, message: '成功'});
});

router.post(loginRoute.api, loginRoute.callback) // 登录接口
router.get(getUserInfoRoute.api, getUserInfoRoute.callback) // 获取用户信息接口
router.post(registerUser.api, registerUser.callback) // 注册接口

router.get('/getFile', (req, res) => {
  const filePath = path.resolve(__dirname, `../public/1111.zip`);
  console.log(mime.getType(filePath), 'mime.getType(filePath)');
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
