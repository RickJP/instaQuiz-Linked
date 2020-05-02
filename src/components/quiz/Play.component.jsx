import React, {Component, Fragment} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {StarHalf, WbIncandescent, AvTimer} from '@material-ui/icons';

import questions from '../../data/questions.json';
import {isEmpty} from '../../utils/is-empty';

import M from 'materialize-css';

<<<<<<< HEAD
import correctAnswerSound from '../../assets/audio/correctAnswer.wav';
import wrongAnswerSound from '../../assets/audio/wrongAnswer.wav';
import buttonClickSound from '../../assets/audio/buttonClick.wav';


const helmetContext = {};
 
=======
const helmetContext = {};
<<<<<<< HEAD

>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
=======
 
>>>>>>> 79e506e... ammended email
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      prevQuestion: {},
      answer: '',
      numOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {}
    };
  }

  componentDidMount() {
    const { questions, currentQuestion, prevQuestion, nextQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, prevQuestion, nextQuestion);
  }



  displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, prevQuestion) => {
    let { currentQuestionIndex } = this.state;

    if (!isEmpty(questions)) {
      currentQuestion = questions[currentQuestionIndex];
      prevQuestion = questions[currentQuestionIndex - 1];
      nextQuestion = questions[currentQuestionIndex + 1];
      const answer = currentQuestion.answer;

      this.setState({
        currentQuestion,
        prevQuestion,
        nextQuestion,
<<<<<<< HEAD
        answer,
        numOfQuestions: questions.length
=======
        answer
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
      })
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
<<<<<<< HEAD
      document.getElementById('correctAnswerSound').play();
      this.correctAnswer();
    } else {
      document.getElementById('wrongAnswerSound').play();
=======
      this.correctAnswer();
    } else {
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
      this.wrongAnswer();
    }
  }

<<<<<<< HEAD
  handleButtonClick = () => {
    this.playButtonSound();
  }

  playButtonSound = () => {
    document.getElementById('buttonClickSound').play();
  }

=======
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
  correctAnswer = () => {
    M.toast({
      html: 'Correct Answer!',
      classes: 'toast-valid',
      displayLength: 1500
    });
    this.setState((prevState) => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
    })
  }

  wrongAnswer = () => {
    navigator.vibrate(800);
    M.toast({
      html: 'Wrong Answer!',
      classes: 'toast-invalid',
      displayLength: 1500
    });
    this.setState((prevState) => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
    }), () => {
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.prevQuestion, this.state.nextQuestion);
    })
  }

  render() {
<<<<<<< HEAD
    const { currentQuestion, numOfQuestions, currentQuestionIndex} = this.state;
=======
    const { currentQuestion } = this.state;
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question

    
    return (
      <HelmetProvider context={helmetContext}>
        <Fragment>
          <Helmet>
            {' '}
            <title>Quiz Page</title>
          </Helmet>
<<<<<<< HEAD
          <Fragment>
              <audio id="correctAnswerSound" src={correctAnswerSound}></audio>
              <audio  id="wrongAnswerSound" src={wrongAnswerSound}></audio>
              <audio  id="buttonClickSound" src={buttonClickSound}></audio>
            </Fragment>
=======
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
          <div className='questions'>
            <h2>Quiz Mode</h2>
            <div className='lifeline-container'>
              <p>
                <span>
                  {' '}
                  <StarHalf style={{fontSize: 24, color: 'red'}} />
                </span>
                <span className='lifeline'>2</span>
              </p>
              <p>
                <span>
                  {' '}
                  <WbIncandescent style={{fontSize: 24, color: 'orange'}} />
                </span>
                <span className='lifeline'>5</span>
              </p>
            </div>  {/* lifeline-container */}

            <div className='lifeline-container'>
              <p>
                <span>
              {' '}
<<<<<<< HEAD
    <span className="lifeline question-counter">{currentQuestionIndex + 1} / {numOfQuestions}</span>
=======
                <span className="lifeline question-counter">1 / 15</span>
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
                </span>
              </p>
              <p>
                <span>
                  {' '}
                  <span className="lifeline">2:15</span> 

                </span>
                <AvTimer style={{fontSize: 24, color: 'blue'}} />
              </p>
            </div>  {/* lifeline-container */}

          <h4 className='question'>{currentQuestion.question}</h4>
            <div className='options-container'>
              <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionA}</p>
              <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionB}</p>
            </div>
            <div className='options-container'>
              <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionC}</p>
              <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionD}</p>
            </div>
            <div className='btn-container'>
<<<<<<< HEAD
              <button onClick={this.handleButtonClick} >Previous</button>
              <button onClick={this.handleButtonClick} >Next</button>
              <button onClick={this.handleButtonClick} >Quit</button>
=======
              <button>Previous</button>
              <button>Next</button>
              <button>Quit</button>
>>>>>>> 689e887... create instructions, home & play components, add styling; Now adds questions allows options to be selected; displays next question
            </div>   
          </div> {/* Questions */}
        </Fragment>
      </HelmetProvider>
    );
  }
}

export default Play;