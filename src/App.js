import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizInstructions from './components/quiz/Quiz-Instructions.component';

import Home from './components/Home.component';
import Play from './components/quiz/Play.component';



function App() {
  return (
    <Router>
      <Route exact path='/' component={ Home }></Route>
      <Route exact path='/play/instructions' component={ QuizInstructions }></Route>
      <Route exact path='/play/quiz' component={ Play }></Route>
    </Router>
  )
}

export default App;
