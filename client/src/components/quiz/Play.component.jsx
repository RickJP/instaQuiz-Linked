import React, {Component, Fragment} from 'react';
// import ReactDOM from 'react-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import { WbIncandescent, AvTimer} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import dq1 from '../../data/definitions/1.json';
import dq2 from '../../data/definitions/2.json';
import dq3 from '../../data/definitions/3.json';
import dq4 from '../../data/definitions/4.json';

import cq1 from '../../data/cloze/1.json';
import cq2 from '../../data/cloze/2.json';
import cq3 from '../../data/cloze/3.json';
import cq4 from '../../data/cloze/4.json';

import {isEmpty} from '../../utils/is-empty';

import M from 'materialize-css';

import correctAnswerSound from '../../assets/audio/correctAnswer.wav';
import wrongAnswerSound from '../../assets/audio/wrongAnswer.wav';
import tenSecondCountdownSound from '../../assets/audio/buzzer_ten-second-countdown.mp3';
import endOfQuizSound from '../../assets/audio/electricSweep_end-of-quiz.mp3';
import fiftyFifySound from '../../assets/audio/lightsaberClash_fifty-fifty.mp3';
import buttonClickSound from '../../assets/audio/fireArrow_button-click.mp3';
import hintSound from '../../assets/audio/bellSound_hint.mp3';

const helmetContext = {};

class Play extends Component {
  constructor(props) {
    super(props);  

    const { id } = this.props.match.params;
    const questionsData = (id === 'd1') ? dq1 : (id === 'd2') ? dq2 :
                          (id === 'd3') ? dq3 : (id === 'd4') ? dq4 :
                          (id === 'c1') ? cq1 : (id === 'c2') ? cq2 :
                          (id === 'c3') ? cq3 : (id === 'c4') ? cq4 :
                          console.log('No questions avaliable')

    
    this.state = {
      questions: this.shuffleQandA(questionsData),
      currentQuestion: {},
      // nextQuestion: {},
      // prevQuestion: {},
      numOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      optionsHidden: [],
      indexOfAnswer: 0,
      areWrongAnswers: {
        A: false,
        B: false,
        C: false,
        D: false,
      },
      // prevRandomNo: [],
      // prevButtonDisabled: true,
      // nextButtonDisabled: false,
      time: {
        mins: 1,
        secs: 15,
      },
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
    this.displayQuestionAndOptions(
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

  displayQuestionAndOptions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    prevQuestion,
    indexOfAnswer
  ) => {
    let {currentQuestionIndex} = this.state;

    if (!isEmpty(questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      prevQuestion = questions[currentQuestionIndex - 1];
      nextQuestion = questions[currentQuestionIndex + 1];

      indexOfAnswer = questions[currentQuestionIndex].indexOfAnswer;

      this.setState(
        {
          currentQuestion,
          prevQuestion,
          nextQuestion,
          numOfQuestions: questions.length,
          prevRandomNo: [],
          indexOfAnswer,
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  shuffleQandA = (questionsData) => {
    let questions = [];
    let options = [];
  
    // Shuffles questions
    questionsData.sort(() => Math.random() - 0.5);
   
    for (let i in questionsData) {
      let item = questionsData[i];

      options = [item.A, item.B, item.C, item.D];

      // Shuffle answers
      options.sort(() => Math.random() - 0.5);


      questions.push({
        question: item.question,
        options,
        indexOfAnswer: options.indexOf(item.A),
      });
    }
    return questions;
  };

  isLastQuestion = () => {
    return this.state.currentQuestionIndex > this.state.questions.length - 1;
  };

  // Check whether it is a correct answer or not
  handleOptionClick = (e) => {
    if (!this.isLastQuestion()) {
      const {indexOfAnswer} = this.state;
      if (parseInt(e.target.id) === indexOfAnswer) {
        
        this.correctAnswerSound.current.play();
        this.correctAnswer(true);
      } else {
        this.wrongAnswerSound.current.play();
        this.correctAnswer(false);
      }
    }
  };

  playButtonSound = () => {
    this.buttonClickSound.current.play();
  };

  playthesound = () => {
    this.tenSecondCountdownSound.current.play();
  };

  handlePrevButton = () => {
    if (this.state.prevQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestionAndOptions(
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
          this.displayQuestionAndOptions(
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
      optionsHidden: [],
    });
  };

  generateRandomNumber = (maxValue) => {
    return Math.round(Math.random() * maxValue);
  };

  handleFiftyFify = () => {
    const options = document.querySelectorAll('.option');

    // if there are some fifty-fifties left and one has not been used
    if (this.state.fiftyFifty > 0 && this.state.optionsHidden.length === 0) {
      //const indexOfAnswer = this.getIndexOfAnswer();
      let randomNumber;
      let randomNumbers = [];

      let count = 0;
      do {
        randomNumber = this.generateRandomNumber(3);
        if (
          randomNumber !== this.state.indexOfAnswer &&
          !randomNumbers.includes(randomNumber)
        ) {
          randomNumbers.push(randomNumber);
          count++;
        }
      } while (count < 2);

      this.setState(
        {
          optionsHidden: this.state.optionsHidden.concat(randomNumbers),
        },
        () => {
          options.forEach((option, index) => {
            if (this.state.optionsHidden.includes(index)) {
              option.style.visibility = 'hidden';
            }
          });
        }
      );

      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
      }));
      this.fiftyFifySound.current.play();
    }
  };

  handleHints = () => {
    if (this.state.hints > 0 && this.state.optionsHidden.length <= 2) {
      const options = Array.from(document.querySelectorAll('.option'));

      while (true) {
        const randNum = this.generateRandomNumber(3);
        if (
          randNum !== this.state.indexOfAnswer &&
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

  highlightWrongAnswers = () => {
    const areWrongAnswers = {
      A: true,
      B: true,
      C: true,
      D: true,
    };
    switch (this.state.indexOfAnswer) {
      case 0:
        areWrongAnswers.A = false;
        break;
      case 1:
        areWrongAnswers.B = false;
        break;
      case 2:
        areWrongAnswers.C = false;
        break;
      case 3:
        areWrongAnswers.D = false;
        break;
      default:
        console.error('Something went wrong');
    }
    return areWrongAnswers;
  };

  correctAnswer = (correct) => {
    // Display the toast popup
    M.toast({
      html: correct ? 'Correct Answer!' : 'Wrong Answer',
      classes: correct ? 'toast-valid' : 'toast-invalid',
      displayLength: 1000,
    });

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 1;
    let areWrongAnswers = {};

    // Check if it is the correct answer
    // setup variables in either case
    if (correct) {
      score = 1;
      correctAnswers = 1;
      wrongAnswers = 0;

      //TODO -> add function to create gems after each correct answer
      // const gemsGained = React.createElement('h3', {}, '*');
      // ReactDOM.render(
      //   gemsGained,
      //   document.getElementById('create')
      // )
    } else {
      areWrongAnswers = this.highlightWrongAnswers();
    }

    if (this.state.currentQuestionIndex !== this.state.questions.length - 1) {
      setTimeout(() => {
        areWrongAnswers = {A: false, B: false, C: false, D: false};
        this.setState(
          (prevState) => ({
            score: prevState.score + score,
            wrongAnswers: prevState.wrongAnswers + wrongAnswers,
            correctAnswers: prevState.correctAnswers + correctAnswers,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
            areWrongAnswers,
          }),
          () => {
            console.log(this.state.currentQuestionIndex);
            this.displayQuestionAndOptions(
              this.state.questions,
              this.state.currentQuestion,
              this.state.prevQuestion,
              this.state.nextQuestion
            );
          }
        );
      }, 700);

      // Setup display for highlighting wrong answers
      this.setState({
        areWrongAnswers,
      });
    } else {
      this.setState(
        (prevState) => ({
          score: prevState.score + score,
          correctAnswers: prevState.correctAnswers + correctAnswers,
          wrongAnswers: prevState.wrongAnswers + wrongAnswers,
          numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
          // areWrongAnswers,  //CHANGED
        }),
        () => {
          this.endQuiz();
        }
      );
    }
  };

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

      // Play 10 second countdown sound
      if (minutes === 0 && seconds === 10)
        this.tenSecondCountdownSound.current.play();
      // if (seconds <= 1) this.tenSecondCountdownSound.current.stop();
    }, 1000);
  };

  // Disable previous and next buttons when appropriate
  // disable previous on first question & next button on last question
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
      // Disable both buttons on the last question
      this.setState({nextButtonDisabled: true});
      this.setState({prevButtonDisabled: true});
    }
  };

  // Record the player stats for the end of quiz
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
    this.endOfQuizSound.current.play();
    setTimeout(() => {
      // Display the quiz summary page
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
      areWrongAnswers,
      hints,
      fiftyFifty,
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
              src={correctAnswerSound}
            ></audio>
            <audio ref={this.wrongAnswerSound} src={wrongAnswerSound}></audio>
            <audio ref={this.buttonClickSound} src={buttonClickSound}></audio>
            <audio
              ref={this.tenSecondCountdownSound}
              src={tenSecondCountdownSound}
            ></audio>
            <audio ref={this.hintSound} id="hintSound" src={hintSound}></audio>
            <audio ref={this.fiftyFifySound} src={fiftyFifySound}></audio>
            <audio ref={this.endOfQuizSound} src={endOfQuizSound}></audio>
          </Fragment>
          <div className="quiz noselect">
            <h2 className="quiz-title">InstaQuiz</h2>

            <div id="create"></div>

            <div className="top-panel">
              <div className="lifeline-container">
                <p>
                  <FontAwesomeIcon
                    onClick={this.handleFiftyFify}
                    icon={['fa', 'adjust']}
                    className={`icons fifty-fifty-icon ${
                      fiftyFifty === 0 ? 'empty' : ''
                    }`}
                  />{' '}
                  {/* <StarHalf
                    onClick={this.handleFiftyFify}
                    className={`icons fifty-fifty-icon ${fiftyFifty === 0 ? "empty" : ""}`}
                  /> */}
                  <span className="lifeline-no">{fiftyFifty}</span>
                </p>
                <p>
                  {' '}
                  <WbIncandescent
                    onClick={this.handleHints}
                    className={`icons hints-icon ${hints === 0 ? 'empty' : ''}`}
                  />
                  <span className="lifeline-no">{hints}</span>
                </p>
              </div>

              <div className="info-container">
                <p>
                  <span id="question-counter">
                    {currentQuestionIndex + 1} / {numOfQuestions}
                  </span>
                </p>
                <p>
                  <span id="timer-no">
                    {time.minutes}:{time.seconds < 10 ? '0' : ''}
                    {time.seconds}
                  </span>

                  <AvTimer className="timer-icon" />
                </p>
              </div>
            </div>

            <h4 className="question">{currentQuestion.question}</h4>


            <div className="options-container">
              <div className="column">
                <p
                  id="0"
                  onClick={this.handleOptionClick}
                  className={`option ${areWrongAnswers.A ? 'wrongAnswer' : ''}`}
                >
                  {questions[currentQuestionIndex].options[0]}
                </p>
                <p
                  id="1"
                  onClick={this.handleOptionClick}
                  className={`option ${areWrongAnswers.B ? 'wrongAnswer' : ''}`}
                >
                  {questions[currentQuestionIndex].options[1]}
                </p>
              </div>

              <div className="column">
                <p
                  id="2"
                  onClick={this.handleOptionClick}
                  className={`option ${areWrongAnswers.C ? 'wrongAnswer' : ''}`}
                >
                  {questions[currentQuestionIndex].options[2]}
                </p>
                <p
                  id="3"
                  onClick={this.handleOptionClick}
                  className={`option ${areWrongAnswers.D ? 'wrongAnswer' : ''}`}
                >
                  {questions[currentQuestionIndex].options[3]}
                </p>
              </div>
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
