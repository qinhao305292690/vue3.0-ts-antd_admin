const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
  accountName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String
  },
  userName: {
    required: true,
    type: String
  },
  age: {
    required: true,
    type: String
  },
  gender: {
    required: true,
    type: String
  },
  avatar: {
    required: false,
    type: String
  },
})
// 用户表
const User = mongoose.model('User', studentSchema);
// find // 查询所有,第一个参数是条件  findOne 查出来的第一个
// Cat.find({}, (err, data) => {
//   console.log(data);
// })
// 符合条件的全部删掉
// Cat.remove( {
//   name: 'qinhaojoyc'
// },(err,data) => {
//   console.log(data);
// })
// 更新 TODO: 必须userSchema里面声明定义过的字段才可以
// Cat.findByIdAndUpdate('61c95de44210292ebc1b5842', {
//   password: '4455',
//   email: 'hujianfeng@126.com'
// }, function (err, ret) {
//   if (!err) {
//     console.log(ret);
//   }
// })
// kitty.save((err) => {
//   if (!err){
//     console.log('成功');
//   } else {
//     console.log('失败了');
//   }
//
// })
module.exports = User
