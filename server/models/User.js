const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  listOfJobs: Array,
  pic: {type: String, default: 'https://i.stack.imgur.com/l60Hf.png'},
  personalLink: String,
})

const User = mongoose.model('User', userSchema)
module.exports = User
