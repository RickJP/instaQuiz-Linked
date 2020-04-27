import React, {Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <title>Insta Quiz</title>
    <div id='home'>
      <section>
        <div>
        {/* <FontAwesomeIcon icon={['fab', 'apple']} /> */}
        <span><FontAwesomeIcon icon={['fab', 'accusoft']} className="faIcon" /></span>
        <h1>Quiz App</h1>
        <div className="play-button-container">
          <ul>
            <li><Link to='/play/instructions'></Link></li>
          </ul>
        </div>
        <div className="auth-container">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;
