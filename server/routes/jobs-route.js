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

router.post('/deleteJob', isLoggedIn, (req, res, next) => {
  const selectedJobId = req.body.id
  User.findById(req.user._id).then(foundUser => {
    console.log('BEGINNING', foundUser.listOfJobs.length)
    filteredJobs = [...foundUser.listOfJobs]
    foundUser.listOfJobs = filteredJobs.filter(job => {
      console.log(job._id, '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-', selectedJobId)
      return job._id != selectedJobId
    })
    console.log('END', foundUser.listOfJobs.length)
    foundUser.save();
    res.json(foundUser.listOfJobs)
  })
})

module.exports = router
