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
    url:
      'https://www.indeed.com/viewjob?cmp=Bang-Energy&t=Front+End+Web+Developer&jk=aadfb342d14c397b&sjdu=QwrRXKrqZ3CNX5W-O9jEvRfQ2IAUyuwhAgxPW4jiRzUzieTkoXpMNqh5yaKj9w9s4bRpU7T3vUJl1T0h_Rey3qbmLvQ8DJJvzTuyCa6N6Yg&tk=1dmtmrsc00g2k001&adid=3589824&pub=4a1b367933fd867b19b072952f68dceb&vjs=3',
  },
  {
    jobTitle: 'Front-End Developer',
    companyName: 'BankUnited',
    description:
      'The Front End Developers will design and develop applications that deliver value to our customers. She/he will work closely with the product owner, other…',
    location: 'Miami, FL',
    url:
      'https://www.indeed.com/viewjob?jk=e496058021e2ece4&tk=1dmtmsmo5p855800&from=serp&vjs=3&advn=5087532304236268&adid=143634164&sjdu=o4-SOnWFj7zDQa1x_oNfXeJWJNWJOwgHGoqjB_1ZytAzxju9q4VAXDOce0Sw0t3_UZ18BG2TXdDM-nNBFL2Nm9indWX5StTjkLDGr18am0U_JGG7gIAwMv0q56buYBpmLroMKZ8hiqEOkq-E_6iidw',
  },
  {
    jobTitle: 'Full Stack Developer - React/Redux',
    companyName: 'Ascendo Resources',
    description:
      'The Front End Developers will design and develop applications that deliver value to our customers. She/he will work closely with the product owner, other…',
    location: 'Fort Lauderdale, FL',
    salary: 96000,
    url:
      'https://www.indeed.com/viewjob?cmp=Ascendo-Resources&t=Full+Stack+Developer&jk=5d75c56bd73ba155&sjdu=QwrRXKrqZ3CNX5W-O9jEvRQls7y2xdBHzhqWkvhd5FH5yILIeiAABmCL06dhi3qcuEnyfJIF8-a-cT4uJx15Nsd0XbAq-bVKA1KiXn1HD1E&tk=1dmtmtibj0g2k000&adid=260420257&pub=4a1b367933fd867b19b072952f68dceb&vjs=3',
  },
  {
    jobTitle: 'Junior Web Developer',
    companyName: 'Enovate Solutions',
    description:
      'We are seeking a Web Developer responsible for both back-end and front-end development, including creating WordPress themes and plugins.',
    location: 'Coral Gables, FL',
    url:
      'https://www.indeed.com/viewjob?jk=cca55224b6aa9241&q=Junior+Web+Developer&l=Miami&tk=1dmtmuhhip8t8801&from=web&vjs=3',
  },
  {
    jobTitle: 'Full Stack Developer',
    companyName: 'Truck Hub',
    description:
      'TruckHub is SaaS for modern trucking companies. We are a startup going after the 800+ billion dollar trucking industry. Slim PHP Framework For Routing.',
    location: 'Miami, FL 33166',
    url:
      'https://www.indeed.com/viewjob?cmp=DGD-TRANSPORT&t=Full+Stack+Developer&jk=859dedcc274178e6&sjdu=Zzi_VW2ygsY1fzh3Ma9ZsE4zIT1NTXCwgFBhdjeTC3ODt_cCWDrZo6DKXDLKycMTZ_B4cXoadqBSMFD_sJhYtQ&tk=1dmtmc8jo0g2k001&adid=136538311&pub=4a1b367933fd867b19b072952f68dceb&vjs=3',
  },
  {
    jobTitle: 'Web Programmer',
    companyName: 'Optimum7',
    description:
      'Growing American Technology Company is seeking a dedicated, professional with at least 2 years Web Programming experience for Izmir Office.',
    location: 'Miami, FL 33133 (North Coconut Grove area)',
    url:
      'https://www.indeed.com/viewjob?cmp=Optimum7&t=Web+Programmer&jk=f8ef6693795fcce7&q=Web+Programmer&vjs=3',
  },
  {
    jobTitle: 'Programmer/Developer',
    companyName: 'Paragon Automated Systems, Inc.',
    description:
      'In a collaborative teamenvironment, contribute by developing and unit-testing. Developingcomputer programs and mobile-friendly responsive website design.',
    location: 'Pembroke Pines, FL',
    url:
      'https://www.indeed.com/viewjob?cmp=Paragon-Automated-Systems,-Inc.&t=Programmer+Developer&jk=2017bc1cc7fb1629&q=Programmer%2FDeveloper&vjs=3',
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
