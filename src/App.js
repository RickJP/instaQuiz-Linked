import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizInstructions from './components/quiz/Quiz-Instructions.component';

import Menu from './components/Menu.component';
import Play from './components/quiz/Play.component';
import QuizSummary from './components/quiz/Quiz-Summary.component';
import NotFound from './components/NotFound.component';


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/' component={ Menu }></Route>
      <Route exact path='/play/instructions' component={ QuizInstructions }></Route>
      <Route exact path='/play/quiz' component={ Play }></Route>
      <Route exact path='/play/quizsummary' component={ QuizSummary }></Route>
      <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  )
}

export default App;
