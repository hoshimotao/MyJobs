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

router.get('/updateUser', isLoggedIn, (req, res, next) => {
  console.log(
    '#########################    HIIII   ############',
    this.user,
    isLoggedIn
  )
  res.json({
    user: req.user,
  })
})

router.post('/updateUser', isLoggedIn, (req, res, next) => {
  //4 listens to client
  // console.log('############ THIS IS THE REQ DOT USER #########', req.user)
  //5 MONGODB

  console.log(req.body)
  User.findByIdAndUpdate(req.user._id, req.body).then(results => {
    console.log(results)
    res.json({
      //6 sends data back to client
      name: req.body,
    })
  })
})
module.exports = router
