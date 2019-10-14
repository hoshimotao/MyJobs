import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Secret from './pages/Secret'
import { Login } from './pages/Login'
import Signup from './pages/Signup'
import api from '../api'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
    }
  }
  componentWillMount(e) {
    if (localStorage.user) {
      this.setState({
        isLoggedIn: true,
      })
    } else {
      this.setState({
        isLoggedIn: false,
      })
    }
  }
  handleLogoutClick(e) {
    this.setState({
      isLoggedIn: false,
    })
    api.logout()
  }

  logout = () => {
    console.log('Logged In!')
    this.setState({
      isLoggedIn: false,
    })
  }

  login = () => {
    console.log('Logged In!')
    this.setState({
      isLoggedIn: true,
    })
  }

  render() {
    console.log(this.state.isLoggedIn)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> My Jobs Search </h1>
          <NavLink to="/" exact>
            Home
          </NavLink>
          {!this.state.isLoggedIn && <NavLink to="/signup">Signup</NavLink>}
          {!this.state.isLoggedIn && <NavLink to="/login">Login</NavLink>}
          {this.state.isLoggedIn && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
          <NavLink to="/secret">My Jobs</NavLink>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={props => <Login {...props} login={this.login} />}
          />
          <Route
            path="/signup"
            render={props => <Signup {...props} login={this.login} />}
          />
          <Route
            path="/secret"
            render={props => <Secret {...props} logout={this.logout} />}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}
