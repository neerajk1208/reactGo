import React, { Component, PropTypes } from 'react';
import YouTubePlayer from 'react-youtube';
import { defaultVideoPlayerOptions } from '../constants/constants.js'
// import '../css/PreviewVideoContainer.css';

class PreviewVideoContainer extends Component {
  constructor (props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
    this.onReady = this.onReady.bind(this);
    this.renderLikes = this.renderLikes.bind(this);
    this.renderLike = this.renderLike.bind(this);
    this.addLikeToList = this.addLikeToList.bind(this);
    this.loadVideoAtLike = this.loadVideoAtLike.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.startQuestionTracker = this.startQuestionTracker.bind(this);
    this.stopQuestionTracker = this.stopQuestionTracker.bind(this);
    this.checkTimeForQuestion = this.checkTimeForQuestion.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.interval = null;
    this.setInitialState();
  }

  setInitialState () {
    this.state = {
      likes: [],
      duration: 0,
      questionAnswered: false,
      showQuestion: false,
      answer: ''
    }
  }

  renderLike (likeTime, key) {
    return (
      <div key={key} onClick={this.loadVideoAtLike.bind(this, likeTime)}> 
        Liked a moment at {likeTime}
      </div>
    )
  }

  updateAnswer (e) {
    this.setState({
      answer: e.target.value
    })
  }

  submitAnswer () {
    let that = this
    this.setState({
      showQuestion: false,
      questionAnswered: true
    }, function () {
      that.props.videoMethods.playVideo()
    })
  }

  renderQuestion () {
    if (this.state.showQuestion) {
      return (
        <div>
          <div> {this.props.feedbackFeatures.questionText} </div>
          <input type='text' onChange={this.updateAnswer} />
          <div onClick={this.submitAnswer}> Submit Answer </div>
        </div>
      )
    }
  }

  loadVideoAtLike (like) {
    this.props.videoMethods.loadVideoById(this.props.videoId, like)
  }

  renderLikes () {
    return this.state.likes.map(this.renderLike)
  }

  addLikeToList () {
    let likes = this.state.likes
    likes.push(this.props.videoMethods.getCurrentTime())
    this.setState({
      likes: likes
    })
  }


  onReady (event) {
    event.target.pauseVideo();
    this.props.setVideoMethods(event.target);
    this.setState({
      duration: this.props.videoMethods.getDuration()
    })
  }

  checkTimeForQuestion () {
    let currentTime = this.props.videoMethods.getCurrentTime()
    console.log('interval is working')
    if (currentTime >= this.props.feedbackFeatures.questionTime) {
      this.props.videoMethods.pauseVideo()
      this.setState({
        showQuestion: true
      })
    }
  }

  startQuestionTracker () {
    if (this.props.feedbackFeatures.question && !this.state.questionAnswered) {
      console.log('Successfully setting timer')
      this.interval = window.setInterval(this.checkTimeForQuestion, 1000)
    }
  }

  stopQuestionTracker () {
    if (this.props.feedbackFeatures.question) {
      console.log('Successfully stopping timer')
      window.clearInterval(this.interval)
    }
  }

  onStateChange (event) {
    if (event.data === 1) {
      console.log('Playing video')
      this.startQuestionTracker()
    } else if (event.data === 2) {
      console.log('Paused video')
      this.stopQuestionTracker()
    }
    // console.log(this.props.videoMethods.getCurrentTime())
  }

  renderVideoPlayer () {
    return (
      <div className='preview-video-player'>
        <YouTubePlayer
          videoId={this.props.videoId} 
          opts={defaultVideoPlayerOptions.previewMode} 
          onReady={this.onReady} 
          onStateChange={this.onStateChange}/>
      </div>
    )
  }

  renderLikeAMoment () {
    if (this.props.feedbackFeatures.likes) {
      return (
        <div className='like-a-moment' onClick={this.addLikeToList}>
          Like a moment
        </div>
      )
    }
  }

  renderBackButton () {
    return (
      <div onClick={this.props.changeToStep.bind(this, 2)}>
        Back to Customizing
      </div>
    )
  }

  render () {
    let pageTitle = 'Preview Video';
    return (
      <div id='preview-video-container'> 
        {pageTitle}
        {this.renderBackButton()}
        {this.renderLikeAMoment()}
        {this.renderQuestion()}
        {this.renderVideoPlayer()}
        {this.renderLikes()}
      </div>
    )
  }
}

export default PreviewVideoContainer