import React, { Component } from 'react'
import api from '../../api'
import axios from 'axios'
import serverUrl from '../../configServer.js'

export default class Home extends Component {
  state = {
    jobs: [],
    filteredJob: [],
  }

  componentDidMount() {
    // 1 home page loads
    api
      .getJobs() // 2 runs function called get Jobs
      .then(jobs => {
        // 7. - GOT RESPONSE FROM BACKEND ROUTER.GET /JOBS
        this.setState({
          // 8 - SET THE STATE TO THE FOLLOWING
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
    console.log('Add to Profile')
    console.log(e.target.id)

    let id = e.target.id

    axios
      .post(`${serverUrl}/addJob`, { id }, { withCredentials: true })
      .then(results => {
        console.log(results)
        console.log(results.data.message)
      })
      .catch(err => console.log(err))
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

        {this.state.filteredJob.map((
          eachJob,
          i //9 MAP THROUGH THE FILTERED JOBS AND DISPLAY RESULTS
        ) => (
          <div key={i} className="listWidth">
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
