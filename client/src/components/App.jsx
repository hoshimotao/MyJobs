import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Secret from './pages/Secret'
import { Login } from './pages/Login'
import Signup from './pages/Signup'
import UpdateUser from './pages/UpdateUser'
import api from '../api'
import axios from 'axios'

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

  updateUser = (e, name) => {
    //2 calls this functoin
    e.preventDefault()
    console.log(e.target.children)
    console.log('sadfsdfg')
    axios //3 do post request
      .post(
        'http://localhost:5000/api/updateUser',
        { name: name }, //FIXME
        { withCredentials: true }
      )
      .then(results => {
        //7 Back from the server .
        console.log('hello', results.data)
        this.setState(
          {
            //8 set the state with data from DB
            name: results.data,
          },
          () => console.log(results.data)
        )
      })
      .catch(err => {
        console.log(err)
      })
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
          {this.state.isLoggedIn && (
            <Link to="/updateUser">Update Profile</Link>
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
          <Route
            path="/updateUser"
            render={props => (
              <UpdateUser onSubmitHandler={this.updateUser} {...props} />
            )}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}
