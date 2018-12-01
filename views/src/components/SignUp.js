import React, {Component} from "react";
import {auth} from "../firebase";

class SignUp extends Component {

    state = {
        userEmail: '',
        userPasswordOne: '',
        userPasswordTwo: '',
        passwordMatch: true
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.state.userEmail !== '' && this.state.userPasswordOne !== '' && (this.state.userPasswordOne === this.state.userPasswordTwo)) {
            auth.doCreateUserWithEmailAndPassword(this.state.userEmail, this.state.userPasswordOne)
            .then(user => {
                
            })
            .catch(err => {
                console.log(err);
            })
        } else if ((this.state.userPasswordOne !== this.state.userPasswordTwo)) {
            this.setState({passwordMatch: false})
        }
    }

    render () {
        return (
                <div className="signUpInForm">
                    <h3>Sign Up</h3>
                    <hr/>
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        <label forhtml="userEmail">Email:</label>
                        <input type="email" id="userEmail" className="form-control" onChange={(event) => this.setState({userEmail: event.target.value})}/>
                        <label forhtml="userPasswordOne">Password:</label>
                        <input type="password" id="userPasswordOne" className="form-control" onChange={(event) => this.setState({userPasswordOne: event.target.value})}/>
                        <label forhtml="userPasswordTwo">Verify Password:</label>
                        <input type="password" id="userPasswordTwo" className="form-control" onChange={(event) => this.setState({userPasswordTwo: event.target.value})}/>
                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
                    {!this.state.passwordMatch ? 
                    <p style={{backgroundColor:"rgba(256,0,0,0.5)", color: "white", border: "solid 1px red", padding: 5}}>Your passwords don't match. Please correct and try again.</p> :
                    <></>}
                </div>
        )
    }

}

export default SignUp;