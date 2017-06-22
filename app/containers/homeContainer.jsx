import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadVideoContainer from './uploadVideoContainer.jsx';
import CustomizeVideoContainer from './customizeVideoContainer.jsx';
import PreviewVideoContainer from '../containers/previewVideoContainer.jsx';
// import '../css/homeContainer.css';

class HomeContainer extends Component {
  constructor (props) {
    super(props);
    this.setVideoId = this.setVideoId.bind(this);
    this.setVideoMethods = this.setVideoMethods.bind(this);
    this.setFeedbackFeatures = this.setFeedbackFeatures.bind(this);
    this.changeToStep = this.changeToStep.bind(this);
    this.setInitialState();
  }

  setInitialState () {
    this.state = {
      step: 1,
      videoId: '',
      videoMethods: {},
      feedbackFeatures: {}
    }
  }

  setVideoId (videoId) {
    this.setState({
      videoId: videoId,
    })
  }

  changeToStep (step) {
    this.setState({
      step: step
    })
  }

  setFeedbackFeatures (feedbackFeatures) {
    this.setState({
      feedbackFeatures: feedbackFeatures
    })
  }

  setVideoMethods (methods) {
    this.setState({
      videoMethods: methods
    })
  }

  renderStep () {
    if (this.state.step === 1) {
      return (
        <UploadVideoContainer setVideoId={this.setVideoId} changeToStep={this.changeToStep} />
      )
    } else if (this.state.step === 2) {
      return (
        <CustomizeVideoContainer videoId={this.state.videoId} setVideoMethods={this.setVideoMethods} videoMethods={this.state.videoMethods} changeToStep={this.changeToStep} setFeedbackFeatures={this.setFeedbackFeatures} />
      )
    } else if (this.state.step === 3) {
      return (
        <PreviewVideoContainer videoId={this.state.videoId} setVideoMethods={this.setVideoMethods} videoMethods={this.state.videoMethods} feedbackFeatures={this.state.feedbackFeatures} changeToStep={this.changeToStep} />
      )
    }
  }

  render () {
    return (
      <div> 
        <div>
          HOME
        </div>
        {this.renderStep()}
      </div>
    )
  }
}

export default HomeContainer