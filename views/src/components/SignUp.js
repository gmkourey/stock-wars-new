import React, {Component} from "react";
import axios from "axios";
import {auth} from "../firebase";

class SignUp extends Component {

    state = {
        userEmail: '',
        userPasswordOne: '',
        userPasswordTwo: '',
        initialAmount: 5000,
        passwordMatch: true
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.state.userEmail !== '' && this.state.userPasswordOne !== '' && (this.state.userPasswordOne === this.state.userPasswordTwo)) {
            auth.doCreateUserWithEmailAndPassword(this.state.userEmail, this.state.userPasswordOne)
            .then(user => {
                axios.post("/api/users", 
            {
                email: this.state.userEmail,
                initialAmount: parseInt(this.state.initialAmount),
                availableBalance: parseInt(this.state.initialAmount)
            }).then(dbRes => {
                console.log(dbRes)
            }).catch(err => {
                console.log(err);
            })
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
                        <label forhtml="userPasswordTwo">Inital Starting Amount:</label>
                        <select id="initialAmount" className="form-control" onChange={(event) => {this.setState({initialAmount: event.target.value}); console.log(this.state.initialAmount)}}>
                        <option value="5000">$5,000</option>
                        <option value="10000">$10,000</option>
                        <option value="25000">$25,000</option>
                        </select>
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