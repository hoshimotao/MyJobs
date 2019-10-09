const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Job = require('../models/Job')

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    jobTitle: 'Donna is the best',
    user: req.user,
  })
})

// pull all jobs and display them on backend page
router.get('/jobs', (req, res, next) => {
  Job.find().then(someJob => {
    res.json(someJob)
  })
})

module.exports = router
