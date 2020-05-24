import React, {Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import buttonClickSound from '../assets/audio/fireArrow_button-click.mp3';


const playButtonClickSound = () => {
  document.getElementById('buttonClickSound').play();
};

const Menu = () => (

  <Fragment>
    <title>Insta Quiz</title>
    <div className="home noselect">
      <audio
        id="buttonClickSound"
        src={buttonClickSound}
      ></audio>
      <section className="menu">
        <div>
          {/* <FontAwesomeIcon icon={['fab', 'apple']} /> */}
          <span>
            <FontAwesomeIcon icon={['fab', 'accusoft']} className="appLogo" />
          </span>
          <h1 className="quiz-title">InstaQuiz</h1>
          <div className="play-button-container">
            <ul>
              <li>
                {/* <Link onClick={playButtonClickSound} className="play-button" to="/play/quiz">
                  Play
                </Link> */}
              
                
                <div className="quiz-group">
                <p className="quiz-title">What do the Words Mean?</p>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/d1`}>
                  1
                </Link>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/d2`}>
                  2
                </Link>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/d3`}>
                  3
                </Link>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/d4`}>
                  4
                </Link>
                </div>
               
                <div className="quiz-group">
                <p className="quiz-title">What are the Missing Words?</p>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/c1`}>
                  1
                </Link>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/c2`}>
                  2
                </Link>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/c3`}>
                  3
                </Link>
                <Link onClick={playButtonClickSound} className="small-btn" to={`/play/quiz/c4`}>
                  4
                </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* <div className="auth-container">
            <Link className="auth-buttons" id="login-button" to="/login">
              Login
            </Link>
            <Link className="auth-buttons" id="signup-button" to="/register">
              Register
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  </Fragment>
);

export default Menu;
