const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Job = require('../models/Job')
const dbtitle = 'MyJobs'
// mongoose.connect(`mongodb://localhost/${dbtitle}`)
const bcrypt = require('bcrypt')
const User = require('../models/User')

const bcryptSalt = 10
require('../configs/database')

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

let users = [
  {
    username: 'alice',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: 'bob',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
  },
]

let jobs = [
  {
    jobTitle: 'Front End Web Developer',
    companyName: 'Bang Energy',
    description:
      'Bang Energy Performance Beverages and Sports Nutrition has been producing epic innovations for 25 years. We are hiring super creative, ultra-positive and high…',
    location: 'Weston, FL',
  },
  {
    jobTitle: 'Front-End Developer',
    companyName: 'BankUnited',
    description:
      'The Front End Developers will design and develop applications that deliver value to our customers. She/he will work closely with the product owner, other…',
    location: 'Miami, FL',
  },
  {
    jobTitle: 'Full Stack Developer - React/Redux',
    companyName: 'Ascendo Resources',
    description:
      'The Front End Developers will design and develop applications that deliver value to our customers. She/he will work closely with the product owner, other…',
    location: 'Fort Lauderdale, FL',
    salary: 96000,
  },
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`)
    console.log(usersCreated.map(u => u._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

Job.insertMany(jobs)
  .then(jobs => {
    jobs.forEach(jobs => {
      console.log(`${jobs.title} added!`)
    })
    mongoose.connection.close()
    console.log(':)')
  })
  .catch(error => {
    console.log(error)
  })
