import React, { Component, PropTypes } from 'react';
import YouTubePlayer from 'react-youtube';
import { defaultVideoPlayerOptions } from '../constants/constants.js'
// import '../css/customizeVideoContainer.css';

class CustomizeVideoContainer extends Component {
  constructor (props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
    this.setQuestionTime = this.setQuestionTime.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.changeLikeState = this.changeLikeState.bind(this);
    this.changeQuestionState = this.changeQuestionState.bind(this);
    this.next = this.next.bind(this);
    this.setInitialState();
    this.onReady = this.onReady.bind(this);
  }

  setInitialState () {
    this.state = {
      likes: false,
      question: false,
      comments: false,
      questionTime: undefined,
      questionText: ''
    }
  }

  onReady (event) {
    event.target.pauseVideo();
    this.props.setVideoMethods(event.target)
  }

  onStateChange (event) {
    console.log(this.props.videoMethods.getCurrentTime())
  }

  setQuestionTime () {
    let currentTime = this.props.videoMethods.getCurrentTime()
    console.log('the current time is: ', currentTime)
    this.setState({
      questionTime: currentTime
    })
  }

  renderVideoPlayer () {
    return (
      <div className='video-player'>
        <YouTubePlayer
          videoId={this.props.videoId} 
          opts={defaultVideoPlayerOptions.customizeMode} 
          onReady={this.onReady} 
          onStateChange={this.onStateChange}/>
      </div>
    )
  }

  changeLikeState () {
    this.setState({
      likes: !this.state.likes
    })
  }

  changeQuestionState () {
    this.setState({
      question: !this.state.question
    })
  }

  renderLikes () {
    return (
      <div className={this.state.likes ? 'likes-selected' : 'likes-deselected'} onClick={this.changeLikeState}>
        Likes 
      </div>
    )
  }

  renderQuestion () {
    return (
      <div className={this.state.question ? 'question-selected' : 'question-deselected'} onClick={this.changeQuestionState}>
        Question 
      </div>
    ) 
  }

  renderQuestionTime () {
    if (this.state.question) {
      return (
        <div className='question-time'>
        {this.state.questionTime ? this.state.questionTime : 'Move video and click to select question time.'}
        </div>
      )
    }
  }

  saveQuestion (e) {
    this.setState({
      questionText: e.target.value
    })
  }

  renderQuestionInput () {
    if (this.state.question) {
      return (
        <input type='text' onChange={this.saveQuestion} />
      )
    }
  }

  renderQuestionSelectionButton () {
    return (
      <div className={this.state.question ? 'question-selection-button': 'hidden'} onClick={this.setQuestionTime}>
        Set question to current time 
      </div>
    )
  }

  renderFeaturesBox () {
    return (
      <div className='features-box-container'>
        Features
        {this.renderLikes()}
        {this.renderQuestion()}
      </div>
    )
  }

  next () {
    let feedbackFeatures = {
      likes: this.state.likes,
      question: this.state.question,
      questionTime: this.state.questionTime,
      questionText: this.state.questionText
    }
    this.props.setFeedbackFeatures(feedbackFeatures)
    this.props.changeToStep(3)
  }

  renderNextButton () {
    return (
      <div onClick={this.next}> Next </div>
    )
  }

  render () {
    let pageTitle = 'Customize the Video';
    return (
      <div id='customize-video-container'> 
        {pageTitle}
        {this.renderFeaturesBox()}
        {this.renderQuestionTime()}
        {this.renderQuestionInput()}
        {this.renderQuestionSelectionButton()}
        {this.renderNextButton()}
        {this.renderVideoPlayer()}
      </div>
    )
  }
}

export default CustomizeVideoContainer