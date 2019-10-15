import React, { Component } from 'react'
import api from '../../api'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      message: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.login()
        this.props.history.push('/') // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <div className="Login">
          {this.state.message && (
            <div className="info info-danger">{this.state.message}</div>
          )}

          <div className="container">
            <div className="row vertical-offset-100">
              <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title"> Sign Up </h3>
                  </div>
                  <div className="panel-body">
                    <form accept-charset="UTF-8">
                      <fieldset>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            name="name"
                            placeholder="Your name"
                            onChange={this.handleInputChange}
                          />{' '}
                        </div>

                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.email}
                            name="email"
                            placeholder="Email"
                            onChange={this.handleInputChange}
                          />{' '}
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            value={this.state.password}
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                          />{' '}
                        </div>

                        <button
                          className="btn btn-lg btn-success btn-block"
                          onClick={e => this.handleClick(e)}
                        >
                          Sign Up
                        </button>
                      </fieldset>
                    </form>
                    {this.state.message && (
                      <div className="info info-danger">
                        {this.state.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
