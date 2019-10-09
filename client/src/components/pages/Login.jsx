import React, { Component } from 'react'
import api from '../../api'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      email: '',
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
    api
      .login(this.state.email, this.state.password)
      .then(result => {
        this.setState({
          isLoggedIn: true,
        })
        console.log(this)
        this.props.login()

        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}

        <div class="container">
          <div class="row vertical-offset-100">
            <div class="col-md-4 col-md-offset-4">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Please sign in</h3>
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
                        Login
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
