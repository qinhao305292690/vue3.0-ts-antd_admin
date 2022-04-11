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
// 用户信息表
const UserInfo = mongoose.model('UserInfo', studentSchema);
module.exports = UserInfo
