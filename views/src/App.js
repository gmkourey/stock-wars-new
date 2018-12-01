import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import MainPage from "./components/MainPage";

const App = () =>
  <Router>
      <>
        <Route exact path="/" component={MainPage}/> 
      </>
  </Router>


export default App;
