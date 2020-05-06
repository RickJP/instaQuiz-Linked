import React, {Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import buttonClickSound from '../assets/audio/fireArrow_button-click.mp3';

const playButtonClickSound = () => {
  document.getElementById('buttonClickSound').play();
};

const Home = () => (
  <Fragment>
    <title>Insta Quiz</title>
    <div id="home" className="noselect">
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
                <Link onClick={playButtonClickSound} className="play-button" to="/play/quiz">
                  Play
                </Link>
               
              </li>
            </ul>
          </div>
          <div className="auth-container">
            <Link className="auth-buttons" id="login-button" to="/login">
              Login
            </Link>
            <Link className="auth-buttons" id="signup-button" to="/register">
              Register
            </Link>
          </div>
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;
