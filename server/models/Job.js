const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
  jobTitle: {
    type: String,
  },
  companyName: String,
  description: String,
  salary: { type: Number, default: 0 },
  location: String,
  url: String,
})

const Job = mongoose.model('Job', jobSchema)
module.exports = Job
