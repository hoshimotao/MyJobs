import React, { Component } from 'react'
// import axios from 'axios'
import service from '../../api'
// import ReactDOM from 'react-router-dom'

export default class UpdateUser extends Component {
  state = {
    isLoggedIn: true,
    name: '',
    id: '',
    imageUrl: '',
  }
  typeName = e => {
    this.setState({
      name: e.target.value,
    })
  }

  handleFileUpload = e => {
    console.log('The file to be uploaded is: ', e.target.files[0])

    const uploadData = new FormData()
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('imageUrl', e.target.files[0])

    service
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState(
          {
            imageUrl: response.secure_url,
          },
          () => {
            console.log(this.state)
          }
        )
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err)
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
        <form id="changePic" encType="multipart/form-data">
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          <button type="submit"> Save </button>
        </form>
      </div>
    )
  }
}
