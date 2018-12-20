import React from "react";

const Navbar = (props) => {
    return (
        <>
        <div id="navbar">
            <h1 className="headerTitle">Stock Wars</h1>
            {props.isSignedIn ?
            <button className="logoutButton btn btn-primary" onClick={() => props.signOut()}>Logout</button> :
            <></>
            }
        </div>
      </>
    )
}

export default Navbar;