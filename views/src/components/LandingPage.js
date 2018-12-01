import React from "react";
import CoverImage from "./CoverImage";

const LandingPage = (props) => {

        return (
            <>
            <CoverImage signUpStatus={props.signUpStatus} signUpIn={() => props.signUpIn()}/>
            </>
        )
}

export default LandingPage;