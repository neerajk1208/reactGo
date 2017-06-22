import React, { Component, PropTypes } from 'react';
import { retrieveVideoId } from '../utils/utils.js';
// import '../css/uploadVideoContainer.css';

class UploadVideoContainer extends Component {
  constructor (props) {
    super(props)
    this.changeVideoLink = this.changeVideoLink.bind(this)
    this.next = this.next.bind(this)
    this.validate = this.validate.bind(this)
    this.setInitialState()
  }

  setInitialState () {
    this.state = {
      videoLink: '', 
      isValid: false
    }
  }

  changeVideoLink (event) {
    this.setState({
      videoLink: event.target.value
    }, function() {
      this.setState({
        isValid: this.validate()
      })
    })
  }

  next () {
    var videoId = retrieveVideoId(this.state.videoLink)
    this.props.setVideoId(videoId)
    this.props.changeToStep(2)
  }

  validate () {
    return (this.state.videoLink !== '')
  }

  render () {
    return (
      <div id='upload-video-container'>
        <input value={this.state.videoURL} placeholder='YouTube link here' onChange={this.changeVideoLink}/>
        <button className={this.state.isValid ? 'next-button' : 'hidden'} onClick={this.next}> Next </button>
      </div>
    )
  }
}

UploadVideoContainer.propTypes = {
  saveVideoId: PropTypes.func
}


export default UploadVideoContainer;
