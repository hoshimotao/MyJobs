const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Job = require('../models/Job')
const User = require('../models/User')
const uploader = require('../configs/cloudinary-setup')

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

router.post(
  '/upload',
  [uploader.single('imageUrl'), isLoggedIn],
  (req, res, next) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'))
      return
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    User.findByIdAndUpdate(
      req.user._id,
      { pic: req.file.secure_url },
      { new: true }
    ).then(results => {
      console.log(results)
      res.json({ secure_url: req.file.secure_url, user: results })
    })
  }
)

module.exports = router
