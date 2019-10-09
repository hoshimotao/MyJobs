import React, { Component } from 'react'
import api from '../../api'

export default class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobTitle: '',
      companyName: '',
      description: '',
      salary: 0,
      message: null,
    }
  }
  render() {
    return (
      <div className="Secret">
        <h2> Your Jobs List </h2>

        <form>
          <input type="search" placeholder="Anything you want" />
        </form>
        <div className="result">{this.state.jobTitle}</div>

        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
  componentDidMount() {
    api
      .getSecret()
      .then(data => this.setState({ jobTitle: data.jobTitle }))
      .catch(err => this.setState({ message: err.toString() }))
  }
}
