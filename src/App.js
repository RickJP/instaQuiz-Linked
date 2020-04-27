import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Home from './components/Home';


function App() {
  return (
    <Router>
      <Route path='/' component={ Home }></Route>
    </Router>
  )
}

export default App;
