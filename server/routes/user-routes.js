const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Job = require('../models/Job')
const User = require('../models/User')

router.post('/deleteAccount', isLoggedIn, (req, res, next) => {
  User.findByIdAndRemove(req.user._id).then(foundUser => {
    console.log('YOU DELETED SOMEONE!', foundUser)

    res.json({ message: 'user deleted' })
  })
})

router.get('/getUser', (req, res, next) => {
  res.json(req.user)
})

router.post('/updateUser', isLoggedIn, (req, res, next) => {
  //4 ---> IF LOGGED IN, FIND THE USER IN THE CURRENT DB AND UPDATE THE DATA WITH USERS INPUT

  //5 MONGODB

  console.log('THE USER ===== ', req.body)
  User.findByIdAndUpdate(req.user._id, req.body).then(results => {
    console.log(results)
    res.json(req.body) //6 sends data back to client
  })
})
module.exports = router
