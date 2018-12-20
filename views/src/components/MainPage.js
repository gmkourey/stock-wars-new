import React, {Component} from "react";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import {firebase} from "../firebase";
import {auth} from "../firebase";

class MainPage extends Component {

    state = {
        signUpVisible: true,
        signedIn: false,
        signedInUser: null
    }

    componentDidMount() {

        firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({ signedIn: true, signedInUser: authUser.email })
            } else {
                this.setState({ signedIn: false })
            }
        });

    }



    signUpIn() {
        if(this.state.signUpVisible === true) {
            this.setState({signUpVisible: false});
        } else {
            this.setState({signUpVisible: true});
        }
    }

    signedIn() {
        this.setState({signedIn: true});
    }

    signOut() {
        auth.doSignOut();
        this.setState({signedIn: false});
    }


    render() {

        return (
            <>
            <Navbar signOut={() => this.signOut()} isSignedIn={this.state.signedIn}/>
            {!this.state.signedIn ?
            <LandingPage signUpStatus={this.state.signUpVisible} signUpIn={() => this.signUpIn()}/>
            :
            <Dashboard signedInUser={this.state.signedInUser}/>
            }
            </>
        )
    }

}

export default MainPage;