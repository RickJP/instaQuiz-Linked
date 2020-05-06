           
import React, {Component, Fragment} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {StarHalf, WbIncandescent, AvTimer} from '@material-ui/icons';

import questionsData from '../../data/questions.json';
import {isEmpty} from '../../utils/is-empty';

import M from 'materialize-css';

import correctAnswerSound from '../../assets/audio/correctAnswer.wav';
import wrongAnswerSound from '../../assets/audio/wrongAnswer.wav';
// import buttonClickSound2 from '../../assets/audio/buttonClick.wav';
 import tenSecondCountdownSound from '../../assets/audio/buzzer_ten-second-countdown.mp3';
//import tenSecondCountdownSound from '../../assets/audio/buzzer_ten-second-countdown.wav';
import endOfQuizSound from '../../assets/audio/electricSweep_end-of-quiz.mp3';
import fiftyFifySound from '../../assets/audio/lightsaberClash_fifty-fifty.mp3';
import buttonClickSound from '../../assets/audio/fireArrow_button-click.mp3';
import hintSound from '../../assets/audio/bellSound_hint.mp3';


const helmetContext = {};

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.shuffleAnswers(questionsData),
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
      optionsHidden: [],
      prevRandomNo: [],
      prevButtonDisabled: true,
      nextButtonDisabled: false,

      time: {
        mins: 1,
        secs: 15
      }
    };
    this.interval = null;
    this.wrongAnswerSound = React.createRef();
    this.correctAnswerSound = React.createRef();
    this.buttonClickSound = React.createRef();
    this.hintSound = React.createRef();
    this.fiftyFifySound = React.createRef();
    this.endOfQuizSound = React.createRef();
    this.tenSecondCountdownSound = React.createRef();
  }

  componentDidMount() {
    const {questions, currentQuestion, prevQuestion, nextQuestion} = this.state;

    this.displayQuestions(
      questions,
      currentQuestion,
      prevQuestion,
      nextQuestion
    );
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    prevQuestion
  ) => {
    let {currentQuestionIndex} = this.state;

    if (!isEmpty(questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      prevQuestion = questions[currentQuestionIndex - 1];
      nextQuestion = questions[currentQuestionIndex + 1];
      const answer = currentQuestion.answer;

      this.setState(
        {
          currentQuestion,
          prevQuestion,
          nextQuestion,
          answer,
          numOfQuestions: questions.length,
          prevRandomNo: [],
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  shuffleAnswers = (questionsToUse) => {
    var questions = [];

    var options = [];
    var answer = '';

    for (var i in questionsToUse) {
      var item = questionsToUse[i];

      options = [item.A, item.B, item.C, item.D];
      answer = item.A;
      options.sort(() => Math.random() - 0.5);

      questions.push({
        question: item.question,
        options,
        answer: answer,
      });
    }
    return questions;
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswerSound.current.play();
      this.correctAnswer(true);
    } else {
      this.wrongAnswerSound.current.play();
      this.correctAnswer(false);
    }
  };

  playButtonSound = () => {
    this.buttonClickSound.current.play();
  };

  playthesound = () => {
    this.tenSecondCountdownSound.current.play();
  }

  handlePrevButton = () => {
    if (this.state.prevQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      );
    }
  };

  handleNextButton = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      );
    }
  };

  handleQuitButton = () => {
    if (window.confirm(`Do you really want to quit`)) {
      this.props.history.push('/');
    }
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach((option) => {
      option.style.visibility = 'visible';
    });

    this.setState({
      optionsHidden: []
    });
  };

 
  getIndexOfAnswer = () => {
    let indexOut;

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
      if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        indexOut = index;
      }
    });
    return indexOut;
  };

  generateRandomNumber = (maxValue) => {
    return Math.round(Math.random() * maxValue);
  };

  handleFiftyFify = () => {
    const options = document.querySelectorAll('.option');

    // if there are some fifty-fifties left and one has not been used
    if (this.state.fiftyFifty > 0 && this.state.optionsHidden.length === 0) {
      const indexOfAnswer = this.getIndexOfAnswer();
      let randomNumber;
      let randomNumbers = [];
    

      let count = 0;
      do {
        randomNumber = this.generateRandomNumber(3);
        if (
          randomNumber !== indexOfAnswer &&
          !randomNumbers.includes(randomNumber)
        ) {
          randomNumbers.push(randomNumber);
          count++;
        }
      } while (count < 2);
      console.log(randomNumbers);

      this.setState({
         optionsHidden: this.state.optionsHidden.concat(randomNumbers)
      }, () => {
        options.forEach((option, index) => {
          if (this.state.optionsHidden.includes(index)) {
            option.style.visibility = 'hidden';
          }
        });
        
      })

     
      
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
      }));
      this.fiftyFifySound.current.play();
    }
  };

  handleHints = () => {
    if (this.state.hints > 0 && !this.state.optionsHidden.length < 3) {
      const options = Array.from(document.querySelectorAll('.option'));
      const indexOfAnswer = this.getIndexOfAnswer();

      while (true) {
        const randNum = this.generateRandomNumber(3);
        if (
          randNum !== indexOfAnswer &&
          !this.state.optionsHidden.includes(randNum)
        ) {
          options.forEach((option, index) => {
            if (index === randNum) {
              option.style.visibility = 'hidden';
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                optionsHidden: prevState.optionsHidden.concat(randNum),
              }));
            }
          });
          break;
        }
        if (this.state.prevRandomNo.length >= 3) break;
      }
      this.hintSound.current.play();
    }
  };


  handleButtonClick = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'next-button':
        this.handleNextButton();
        break;
      case 'previous-button':
        this.handlePrevButton();
        break;
      case 'quit-button':
        this.handleQuitButton();
        break;
      default:
        break;
    }
    this.playButtonSound();
  };


  correctAnswer = (correct) => {
    M.toast({
      html: correct ? 'Correct Answer!' : 'Wrong Answer',
      classes: correct ? 'toast-valid' : 'toast-invalid',
      displayLength: 1000,
    });

    let score = 0;  let correctAnswers = 0;  let wrongAnswers = 1;
    if (correct) {
      score = 1;
      correctAnswers = 1;
      wrongAnswers = 0;
    }

    if (this.state.currentQuestionIndex !== this.state.questions.length - 1) {
      this.setState(
        (prevState) => ({
          score: prevState.score + score,
          wrongAnswers: prevState.wrongAnswers + wrongAnswers,
          correctAnswers: prevState.correctAnswers + correctAnswers,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.prevQuestion,
            this.state.nextQuestion
          );
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          score: prevState.score + score,
          correctAnswers: prevState.correctAnswers + correctAnswers,
          wrongAnswers: prevState.wrongAnswers + wrongAnswers,
          numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        }),
        () => {
          this.endQuiz();
        }
      );
    }
  }
  

  selectedTimeToMS = () => {
    return this.state.time.mins * 60 * 1000 + this.state.time.secs * 1000;
  };

  startTimer = () => {
    const countDownTime = Date.now() + this.selectedTimeToMS();
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // if timer has finished
      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              seconds: 0,
              minutes: 0,
            },
          },
          () => {
            this.endQuiz();
          }
        );
      } else {
        this.setState({
          time: {
            seconds,
            minutes,
          },
        });
      }
      console.log(seconds);
      if (minutes === 0 &&  seconds === 10) this.tenSecondCountdownSound.current.play();
      // if (seconds <= 1) this.tenSecondCountdownSound.current.stop();

      console.log(seconds);
    }, 1000);


  };

  handleDisableButton = () => {
    if (
      this.state.prevQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({prevButtonDisabled: true});
    } else {
      this.setState({prevButtonDisabled: false});
    }
    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numOfQuestions
    ) {
      this.setState({nextButtonDisabled: true});
      this.setState({prevButtonDisabled: true});
    }
  };

  endQuiz = () => {
    const {state} = this;
    const playerStats = {
      score: state.score,
      numOfQuestions: state.numOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints,
    };
    console.log(playerStats);
    this.endOfQuizSound.current.play();
    setTimeout(() => {
      this.props.history.push('/play/quizsummary', playerStats);
    }, 3000);
  };

  render() {
    const {
      questions,
      currentQuestion,
      numOfQuestions,
      currentQuestionIndex,
      time,
    } = this.state;

    return (
      <HelmetProvider context={helmetContext}>
        <Fragment>
          <Helmet>
            {' '}
            <title>Quiz Page</title>
          </Helmet>
          <Fragment>
            <audio
              ref={this.correctAnswerSound}
              id="correctAnswerSound"
              src={correctAnswerSound}
            ></audio>
            <audio
              ref={this.wrongAnswerSound}
              id="wrongAnswerSound"
              src={wrongAnswerSound}
            ></audio>
            <audio
              ref={this.buttonClickSound}
              id="buttonClickSound"
              src={buttonClickSound}
            ></audio>
            <audio
              ref={this.tenSecondCountdownSound}
              id="tenSecondCountdownSound"
              src={tenSecondCountdownSound}
            ></audio>
            <audio
              ref={this.hintSound}
              id="hintSound"
              src={hintSound}
            ></audio>
            <audio
              ref={this.fiftyFifySound}
              id="fiftyFifySound"
              src={fiftyFifySound}
            ></audio>
            <audio
              ref={this.endOfQuizSound}
              id="endOfQuizSound"
              src={endOfQuizSound}
            ></audio>
            


            
          </Fragment>
          <div className="questions noselect">
            <h2>Quiz Mode</h2>
            <div className="lifeline-container">
              <p>
                {' '}
                <StarHalf
                  onClick={this.handleFiftyFify}
                  className="icons"
                  id="fifty-fifty-icon"
                />
                <span className="lifeline-no">{this.state.fiftyFifty}</span>
              </p>
              <p>
                {' '}
                <WbIncandescent
                  onClick={this.handleHints}
                  className="icons"
                  id="hints-icon"
                />
                <span className="lifeline-no">{this.state.hints}</span>
              </p>
            </div>

            <div className="info-container">
              <p>
                <span>
                  <span id="question-counter">
                    {currentQuestionIndex + 1} / {numOfQuestions}
                  </span>
                </span>
              </p>
              <p>
                <span>
                  <span id="timer-no">
    {time.minutes}:{time.seconds < 10 ? '0' : ''}{time.seconds}
                  </span>
                </span>
                <AvTimer onClick={this.handleHints} id="timer-icon" />
              </p>
            </div>

            <h4 className="question">{currentQuestion.question}</h4>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option">
                {questions[currentQuestionIndex].options[0]}
              </p>
              <p onClick={this.handleOptionClick} className="option">
                {questions[currentQuestionIndex].options[1]}
              </p>
            </div>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option">
                {questions[currentQuestionIndex].options[2]}
              </p>
              <p onClick={this.handleOptionClick} className="option">
                {questions[currentQuestionIndex].options[3]}
              </p>
            </div>
            {/* <div className="btn-container">
              <button
                id="previous-button"
                disabled={this.state.prevButtonDisabled}
                onClick={this.handleButtonClick}
              >
                Previous
              </button>
              <button
                id="next-button"
                disabled={this.state.nextButtonDisabled}
                onClick={this.handleButtonClick}
              >
                Next
              </button>
              <button id="quit-button" onClick={this.handleButtonClick}>
                Quit
              </button>
            </div> */}
          </div>{' '}
          {/* Questions */}
        </Fragment>
      </HelmetProvider>
    );
  }
}

export default Play;
