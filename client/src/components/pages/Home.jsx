import React, { Component } from 'react'
import api from '../../api'
import axios from 'axios'

export default class Home extends Component {
  state = {
    jobs: [],
    filteredJob: [],
  }

  componentDidMount() {
    api
      .getJobs()
      .then(jobs => {
        this.setState({
          jobs: jobs,
          filteredJob: jobs,
        })
      })
      .catch(err => console.error(err))
  }

  showJobs = e => {
    console.log(this.state.jobs)

    let searchResult = this.state.jobs.filter(eachJob => {
      return eachJob.jobTitle.toLowerCase().includes(e.target.value)
    })
    this.setState(
      {
        filteredJob: searchResult,
      },
      () => console.log(this.state.filteredJob)
    )
  }

  addToProfile = e => {
    console.log('ELLO THERE')
    console.log(e.target.id)

    let id = e.target.id

    axios
      .post(
        'http://localhost:5000/api/addJob',
        { id },
        { withCredentials: true }
      )
      .then(results => {
        console.log(results)
        console.log(results.data.message)
      })
  }

  render() {
    console.log(this.state.jobs)
    return (
      <div className="Home">
        <h1 className="bigTitle"> Your search starts here </h1>
        <p> Potential jobs at your finger tips </p>
        <br />
        {/* SEARCH BOX */}
        <input type="search" onChange={this.showJobs} placeholder="Search" />

        {this.state.filteredJob.map((eachJob, i) => (
          <div className="listWidth">
            <div>
              <li key={i}>
                <span className="jobTitle"> {eachJob.jobTitle} </span>
                <span className="companyName"> {eachJob.companyName}</span>
                <p className="description"> {eachJob.description} </p>
                <br />
                <span className="location"> Location: {eachJob.location} </span>
              </li>
            </div>
            <div className="addToListSymbol">
              <h2
                id={eachJob._id}
                onClick={this.addToProfile}
                className="plusSign"
              >
                {' '}
                ADD{' '}
              </h2>
            </div>
          </div>
        ))}
        <hr />
      </div>
    )
  }
}
