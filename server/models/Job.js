const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    unique: true,
  },
  companyName: String,
  description: String,
  salary: { type: Number, default: 0 },
  location: String,
})

const Job = mongoose.model('Job', jobSchema)
module.exports = Job
