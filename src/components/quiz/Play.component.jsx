import React, {Component, Fragment} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {StarHalf, WbIncandescent, AvTimer} from '@material-ui/icons';

import questions from '../../data/questions.json';
import {isEmpty} from '../../utils/is-empty';

import M from 'materialize-css';

const helmetContext = {};
 
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
        answer
      })
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  }

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
    const { currentQuestion } = this.state;

    
    return (
      <HelmetProvider context={helmetContext}>
        <Fragment>
          <Helmet>
            {' '}
            <title>Quiz Page</title>
          </Helmet>
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
                <span className="lifeline question-counter">1 / 15</span>
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
              <button>Previous</button>
              <button>Next</button>
              <button>Quit</button>
            </div>   
          </div> {/* Questions */}
        </Fragment>
      </HelmetProvider>
    );
  }
}

export default Play;
