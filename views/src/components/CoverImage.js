import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const CoverImage = (props) => {

    return (
            <div className="coverBackground container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="coverText">
                            <h1 className="display-4">Learn The Stock Market For Real</h1>
                            <h2>Learn how the real stock market works by using fake money</h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="signUpIn">
                            {props.signUpStatus ? 
                            <>
                            <SignUp/> 
                            <p>Already a user? Login <span className="signUpInChange" onClick={() => props.signUpIn()}>here</span></p>
                            </>
                            :
                            <>
                            <SignIn/>
                            <p>Not a user yet? Sign up <span className="signUpInChange" onClick={() => props.signUpIn()}>here</span></p>
                            </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
    )

}

export default CoverImage;