const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Job = require('../models/Job')
const User = require('../models/User')

router.post('/addJob', isLoggedIn, (req, res, next) => {
  console.log('we made it!')
  console.log('hey guy', req.body, req.user)

  Job.findById(req.body.id).then(jobFromDB => {
    User.findById(req.user._id).then(user => {
      user['listOfJobs'].push(jobFromDB)
      user.save().then(user => {
        res.json({ user })
      })
    })
  })
})

module.exports = router
