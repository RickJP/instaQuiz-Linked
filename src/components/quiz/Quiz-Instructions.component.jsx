import React, { Fragment} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Link} from 'react-router-dom';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const helmetContext = {};

const QuizInstructions = () => (
  <HelmetProvider context={helmetContext}>
    <Fragment>
      <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
      <div className="instructions container">
        <h1>How to Play the Quiz</h1>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className="browser-default" id="main-list">
          <li>The quiz lasts 15 minutes, and ends as soon as your timer finishes.</li>
          <li>Each turn consists of 15 questions.</li>
          <li>And has 4 options.
            {/* <img src={options} alt="Select options example"/> */}
          </li>
          <li>Click your selected answer.
            {/* <img src={answer} alt="Select an answer example"/> */}
          </li>
          <li>
            Each answer has two lifelines:
            <ul id="sublist">
              <li>Two 50/50 Chances</li>
              <li>Five Hints</li>
            </ul>
          </li>
          <li>
            Select a 50/50 lifeline by clicking the icon
            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
            will remove 2 wrong answers, leaving one correct and one wrong answer.
            {/* <img src={fifty-fifty} alt="Quiz App 50/50 example"/> */}
          </li>
          <li>
            Use a hint by clicking the icon
            <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
            It will remove one wrong answer.
            {/* <img src={hints} alt="Hints example"/> */}
          </li>
          <li>Feel free to quit the game at any time. Your score will be shown.</li>
          <li>The timer starts as soon as the quiz loads.</li>
        </ul>
        <div className="btn-container">
           {/* <div><span className="back-to-main-menu-btn"><Link to="/">Go back</Link></span></div>
           <div><span className="play-quiz-btn"><Link to="/play/quiz">Start</Link></span></div> */}

           <Link className="back-to-main-menu-btn" to="/">Go back</Link>
           <Link className="play-quiz-btn" to="/play/quiz">Start</Link>
        </div>
        
      </div>
    </Fragment>
  </HelmetProvider>
);


export default QuizInstructions;
