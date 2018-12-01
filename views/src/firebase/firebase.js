import firebase from "firebase";

var config = {
    apiKey: "AIzaSyCVhHiKbsoZDFdOEyvQnk8rc7SjNoWG_9Q",
    authDomain: "stock-wars.firebaseapp.com",
    databaseURL: "https://stock-wars.firebaseio.com",
    projectId: "stock-wars",
    storageBucket: "stock-wars.appspot.com",
    messagingSenderId: "61160885970"
  };
  firebase.initializeApp(config);

  const auth = firebase.auth();

  export {
      auth
  }