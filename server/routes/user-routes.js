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

module.exports = router
