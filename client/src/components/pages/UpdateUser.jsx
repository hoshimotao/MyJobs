import React, { Component } from 'react'
import axios from 'axios'
import api from '../../api'
import ReactDOM from 'react-router-dom'

export default class UpdateUser extends Component {
  state = {
    isLoggedIn: true,
    name: '',
    id: '',
    pic: '',
  }
  typeName = e => {
    this.setState({
      name: e.target.value,
    })
  }

  render() {
    console.log(this)
    return (
      <div className="updateFormatPic">
        Hello there, {this.props.theUser.name}
        <h2> Update Username </h2>
        <form
          className="alignPost"
          onSubmit={e => this.props.onSubmitHandler(e, this.state.name)}
        >
          {/*[1]  ---> SUBMIT NAME CHANGE ---> CALLS ONSUBMITHANDLER ---> APP.JS*/}{' '}
          <input
            onChange={this.typeName}
            id="update"
            type="text"
            name="name"
            placeholder="Name"
          />
          <button type="submit"> Save </button>
        </form>
        <br />
        <h2> Update Profile Picture </h2>
        <form
          id="changePic"
          action="/user/profile/image"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="file" name="photo" />
          <button type="submit"> Save </button>
        </form>
      </div>
    )
  }
}
