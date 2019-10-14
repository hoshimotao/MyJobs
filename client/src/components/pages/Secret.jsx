import React, { Component } from 'react'
import api from '../../api'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true,
      jobTitle: '',
      companyName: '',
      description: '',
      salary: 0,
      message: null,
      listOfJobs: [],
      filteredJobs: [],
      url: '',
    }
  }

  componentDidMount() {
    //1. Visit the page
    api
      .getSecret() //2. getSecret() is called

      .then(data => {
        console.log(data)
        this.setState({
          jobTitle: data.jobTitle,
          filteredJobs: data.user.listOfJobs,
          listOfJobs: data.user.listOfJobs,
         
        })
      }) //7.  Take data and set it to state
      .catch(err =>
        this.setState({
          message: err.toString(),
        })
      )
  }

  showJobs = e => {
    e.preventDefault()
    console.log(this.state.listOfJobs)

    let searchResult = this.state.listOfJobs.filter(eachJob => {
      return eachJob.jobTitle.toLowerCase().includes(e.target.value)
    })
    this.setState(
      {
        filteredJobs: searchResult,
      },
      () => console.log(this.state.filteredJobs)
    )
  }

  deleteAccount = e => {
    e.preventDefault()
    let id = e.target.id

    window.confirm('Are you sure you want to delete your account?')
    if (window.confirm) {
      axios
        .post(
          'http://localhost:5000/api/deleteAccount',
          { id },
          { withCredentials: true }
        )
        .then(account => {
          console.log('ACCOUNT DELETED!!!!!!!', account)
          this.props.logout()
          this.setState({
            isLoggedIn: false,
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  handleClick(e) {
    console.log('handled')
    e.preventDefault()

    return false
  }

  deleteFromProfile = e => {
    e.preventDefault()
    console.log('Delete from Profile')
    console.log(e.target.id)
    let id = e.target.id

    axios
      .post(
        'http://localhost:5000/api/deleteJob',
        { id },
        { withCredentials: true }
      )
      .then(results => {
        console.log('hello', results.data)
        this.setState(
          {
            filteredJobs: results.data,
          },
          () => console.log(results.data)
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    console.log(this.state.listOfJobs)
    if (!this.state.isLoggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div className="Secret">
        <h2> Your Jobs List </h2>
        <form>
          <input
            type="search"
            onChange={this.showJobs}
            placeholder="Anything you want"
          />
        </form>
        <div className="result">{this.state.jobTitle}</div>{' '}
        {/*8.  Show data on screen*/}
        {this.state.filteredJobs.map((
          eachJob,
          i //9 MAP THROUGH THE FILTERED JOBS AND DISPLAY RESULTS
        ) => (
          <div key={i} className="listWidth">
            <div>
              <li key={i}>
                <a href={eachJob.url}>
                  <span className="jobTitle"> {eachJob.jobTitle} </span>
                </a>
                <span className="companyName"> {eachJob.companyName}</span>
                <p className="description"> {eachJob.description} </p>
                <br />
                <span className="location"> Location: {eachJob.location} </span>
              </li>
            </div>
            <div className="addToListSymbol">
              <h2
                id={eachJob._id}
                onClick={this.deleteFromProfile}
                className="deleteJob"
              >
                {' '}
                DISCARD{' '}
              </h2>
            </div>
          </div>
        ))}
        <div>
          <button onClick={this.deleteAccount} className="removeAccount">
            {' '}
            Deactivate Account{' '}
          </button>
        </div>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
}
