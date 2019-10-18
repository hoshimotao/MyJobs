import React, { Component } from 'react'
// import axios from 'axios'
import service from '../../api'
import axios from 'axios'
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

  // handleChange = e => {
  //   const { name, value } = e.target
  //   this.setState({ [name]: value })

  handleFileSubmitToYourDB = e => {
    e.preventDefault()
    console.log(this.state)
    service
      .saveNewThing(this.state)
      .then(res => {
        console.log('added: ', res)
        // here you would redirect to some other page
      })
      .catch(err => {
        console.log('Error while adding the thing: ', err)
      })
    // axios
    // .post('/upload', { withCredentials: true })

    // .then(results => {
    //   //7 Back from the server .
    //   console.log('RESULTS!!!!!!!!!!!!!!!!!!!!!')
    //   console.log('APP.JS - THEN', this.state.imageUrl)
    //   this.setState({
    //     //8 set the state with data from DB
    //     theUser: results.data,
    //   })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
  handleFileUpload = e => {
    e.preventDefault()
    console.log('The file to be uploaded is: ')
    console.log('WHAT THE FUCK')

    const uploadData = new FormData()
    console.log(e.target, e.target.files[0])
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('imageUrl', e.target.files[0])

    service
      .handleUpload(uploadData)
      .then(response => {
        console.log('response is: ', response)
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        // this.setState({
        //   imageUrl: response.secure_url,
        // })
        this.props.setUser(response.user)
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err)
      })
  }

  render() {
    console.log(this, 'is this loading')
    return (
      <div className="updateFormatPic">
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
          encType="multipart/form-data"
          onSubmit={this.handleFileSubmitToYourDB}
        >
          <input type="file" name="imageUrl" onChange={this.handleFileUpload} />
          {/* <button type="submit"> Save </button> */}
        </form>
      </div>
    )
  }
}
