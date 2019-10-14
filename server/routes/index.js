const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Job = require('../models/Job')

router.get('/secret', isLoggedIn, (req, res, next) => {
  //4. Listen to client on route /secret
  //May do DB stuff here
  //5
  res.json({
    //6.  Send data back to client
    user: req.user,
  })
})

// pull all jobs and display them on backend page
router.get('/jobs', (req, res, next) => {
  // 4 - get request matches axios call = check

  Job.find().then(allTheJobs => {
    // 5 - find ALL JOBS IN DB

    res.json(allTheJobs) // 6 - RESPONDS with ALL THE JOBS
  })
})

module.exports = router
