import React from "react";
import SignUp from "./SignUp";

const LoginModal = () => {

    const style = {
        marginLeft: (window.innerWidth/2) - 150
    }

    const backgroundStyle = {
        width: window.innerWidth,
        height: window.innerHeight,
        zIndex: -50,
        backgroundColor:"black",
        position: "absolute"
    }

    return (
        <div style={backgroundStyle}>
            <div style={style} className="signUpInForm">
                <SignUp/>
            </div>
        </div>

    )
}

export default LoginModal;