import React from "react";
import "./login-styles.css";
import LoginForm from "./login";

function LoginPage(){
    return(
        <div className="login-page">
            <div className="frosted-glass">
                <h1 className="durres">Tenerife</h1>
                <h1 className="shoes">Shoes</h1>
            </div>
            <LoginForm />
        </div>
    )
}

export default LoginPage;