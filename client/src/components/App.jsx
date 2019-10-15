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
      theUser: {},
      name: '',
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

  componentDidMount() {
    api.getUser().then(user => {
      console.log(user)
      this.setState({
        theUser: user,
      })
    })
  }

  handleLogoutClick(e) {
    this.setState({
      isLoggedIn: false,
    })
    api.logout()
  }

  updateUser = (e, name) => {
    // 3 ---> RUN UPDATE USER ---> TIME TO POST THAT NEW INFO WAS ENTERED BY USER ---> GO TO USERROUTES
    e.preventDefault()
    console.log('APP.JS - UPDATE USER CALLED')
    axios 
      .post(
        'http://localhost:5000/api/updateUser',
        { name: name }, 
        { withCredentials: true }
      )


      .then(results => {
        //7 Back from the server .
        console.log('APP.JS - THEN', results.data)
        this.setState({
          //8 set the state with data from DB
          theUser: results.data,
          // theUser: results.data,
        })
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
              <UpdateUser
                theUser={this.state.theUser}
                onSubmitHandler={this.updateUser}  // 2 ---> FUNCTION FOUND ---> CALLS UPDATE USER FUNCTION ABOVE---^^^
                {...props}/>
            )}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}



