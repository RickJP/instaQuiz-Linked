import React, {Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <title>Insta Quiz</title>
    <div id='home' className="noselect">
      <section>
        <div>
        {/* <FontAwesomeIcon icon={['fab', 'apple']} /> */}
        <span><FontAwesomeIcon icon={['fab', 'accusoft']} className="appLogo" /></span>
        <h1 className="quiz-title">InstaQuiz</h1>
        <div className="play-button-container">
          <ul>
            <li><Link className="play-button" to='/play/instructions'>Play</Link></li>
          </ul>
        </div>
        <div className="auth-container">
          <Link className="auth-buttons" id="login-button" to='/login'>Login</Link>
          <Link className="auth-buttons" id="signup-button" to='/register'>Register</Link>
        </div>
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;
