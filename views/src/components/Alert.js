import React from "react";

const Alert = (props) => {

    return (
        <div className="alert alert-danger">
            {props.children}
        </div>
    )
}

export default Alert