import React, {Component} from "react";
import {auth} from "../firebase";

class SignIn extends Component {

    state = {
        userEmail: '',
        userPasswordOne: '',
        passwordMatch: true,
        errorLoggingIn: false
    }

    onSubmit = (event) => {
        event.preventDefault();

        auth.doSignInWithEmailAndPassword(this.state.userEmail, this.state.userPasswordOne)
            .then(res => {
                
            })
            .catch(err => {
                this.setState({errorLoggingIn: true});
            })
    }

    render () {
        return (
                <div className="signUpInForm">
                    <h3>Sign In</h3>
                    <hr/>
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        <label forhtml="userEmail">Email:</label>
                        <input type="email" id="userEmail" className="form-control" onChange={(event) => this.setState({userEmail: event.target.value})}/>
                        <label forhtml="userPasswordOne">Password:</label>
                        <input type="password" id="userPasswordOne" className="form-control" onChange={(event) => this.setState({userPasswordOne: event.target.value})}/>
                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
                    {this.state.errorLoggingIn ?
                    <p style={{backgroundColor:"rgba(256,0,0,0.5)", color: "white", border: "solid 1px red", padding: 5}}>Your email or password is incorrect. Please try again.</p> :
                    <></>}
                </div>
        )
    }

}

export default SignIn;