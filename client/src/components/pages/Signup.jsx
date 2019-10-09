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

          <div class="container">
            <div class="row vertical-offset-100">
              <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title"> Sign Up </h3>
                  </div>
                  <div class="panel-body">
                    <form accept-charset="UTF-8">
                      <fieldset>
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="text"
                            value={this.state.email}
                            name="email"
                            placeholder="Email"
                            onChange={this.handleInputChange}
                          />{' '}
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="password"
                            value={this.state.password}
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                          />{' '}
                        </div>

                        <button
                          class="btn btn-lg btn-success btn-block"
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
