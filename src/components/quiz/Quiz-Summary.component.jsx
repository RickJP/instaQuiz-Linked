import React, {Component, Fragment} from 'react';

import {HelmetProvider} from 'react-helmet-async';
// import {StarHalf, WbIncandescent, AvTimer} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import buttonClickSound from '../../assets/audio/fireArrow_button-click.mp3';

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      fiftyFiftyUsed: 0,
      hintsUsed: 0,
    };
  }

  componentDidMount() {
    const {state} = this.props.location;
    this.setState({
      score: (state.score / state.numOfQuestions) * 100,
      numOfQuestions: state.numOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: state.fiftyFiftyUsed,
      hintsUsed: state.hintsUsed,
    });
  }

  giveFeedback = (score) => {
    let feedback;
    // console.log(this.props.location);
    console.log(`SCORE IS ${score}`);

    if (score <= 30) {
      feedback = `You need more practice!!`;
    } else if (score > 30 && score <= 50) {
      feedback = `You can do better!`;
    } else if (score > 50 && score <= 70) {
      feedback = `Nice going`;
    } else if (score > 70 && score <= 80) {
      feedback = `Really good`;
    } else if (score > 80 && score <= 90) {
      feedback = `Fantastic!!`;
    } else {
      feedback = `You're a genuis!!!!!`;
    }
    return feedback;
  };

  render() {
    const helmetContext = {};

    const {state} = this.props.location;
    console.log(this.state.score);
    let stats;

    const feedback = this.giveFeedback(this.state.score);

    if (state !== undefined) {
      stats = (
        <Fragment >
          <div className="container">
            <h4>{feedback}</h4>
            <h2>{this.state.score.toFixed(0)}&#37;</h2>
            <span className="stat left">Total number of questions: </span>
            <span className="right">{this.state.numOfQuestions}</span> <br />

            <span className="stat left">Number of attempted questions: </span>
            <span className="right">{this.state.numberOfAnsweredQuestions}</span> <br />

            <span className="stat left">Correct Answers: </span>
            <span className="right">{this.state.correctAnswers}</span> <br />

            <span className="stat left">Wrong Answers: </span>
            <span className="right">{this.state.wrongAnswers}</span> <br />

            <span className="stat left">50-50's Used: </span>
            <span className="right">{this.state.fiftyFiftyUsed}</span> <br />

            <span className="stat left">Hints Used: </span>
            <span className="right">{this.state.hintsUsed}</span> <br />
          </div>
          <section>
          
          <ul>
            <li>
            <Link className="back-to-menu-btn" to="/">Back To Menu</Link>
            </li>
          </ul>
          <ul>
            <li>
            <Link className="play-quiz-btn" to="/play/quiz">Start</Link>
            </li>
          </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <Fragment>
          <h1 className="no-stats">No Stats are here. Try the Quiz!</h1>
          <ul>
            <li>
            <Link className="back-to-menu-btn" to="/">Back To Menu</Link>
            </li>
          </ul>
          <ul>
            <li>
            <Link className="play-quiz-btn" to="/play/quiz">Start</Link>
            </li>
          </ul>
          
          )
        </Fragment>
      );
    }

    return (
      <HelmetProvider context={helmetContext}>
        <Fragment>
          <title>InstaQuiz - Summary</title>
        </Fragment>
        {stats}
      </HelmetProvider>
    );
  }
}

export default QuizSummary;
