import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import MainPage from "./components/MainPage";
import {firebase} from "./firebase";
import {auth} from "./firebase";



class App extends React.Component {

// state = {
//   signedIn: false
// }

// componentWillMount() {

//   firebase.auth.onAuthStateChanged(authUser => {
//       if (authUser != null) this.setState({ signedIn: true })
//       if (!authUser) this.setState({ signedIn: false })
//   });

// }

render() {

  return (
  <Router>
      <>
        <Route exact path="/" component={MainPage}/>
      </>
  </Router>
  )}

}
export default App;
