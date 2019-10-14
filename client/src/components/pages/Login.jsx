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

        <div className="container">
          <div className="row vertical-offset-100">
            <div className="col-md-4 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Please sign in</h3>
                </div>
                <div className="panel-body">
                  <form accept-charset="UTF-8">
                    <fieldset>
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
