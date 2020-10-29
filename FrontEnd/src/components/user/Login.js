import React, { useState, useRef } from 'react';
import { login, authenticate, isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import '../stylesheets/authPanel.css';

const Login = ({ history }) => {

    const email = useRef()


    const [formData, setFormData] = useState({
        Email: '',
        UserPassword: '',
        Error: '',
        Loading: false,
        didRedirect: false,

    })


    const { Email, Password, didRedirect, Loading, Error } = formData

    let isEmailVerified = false,
        isPasswordVerified = false


    const handleChange = (inputField) => (event) => {
        setFormData({ ...formData, [inputField]: event.target.value })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        if (isEmailVerified && isPasswordVerified) {
            setFormData({ ...formData, Error: false, Loading: true })
            login({ Email, Password })
                .then((data) => {
                    if (data.message) {
                        setFormData({ ...formData, Error: data.message, Loading: false })
                    }
                    else {
                        authenticate(data.authToken, data.user._id, () => {
                            setFormData({ ...formData, didRedirect: true })
                        })
                    }
                })
                .catch((err) => {
                    setFormData({ ...formData, Error: "Failed to login.!", Loading: false })
                })
        }

    }


    const conductRedirect = () => {
        if (didRedirect) {
            if (isAuthenticated()) {
                history.push('/');
            }
        }

    }

    
    const emailValidateError = () => {
        const regexp = RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (Email.length > 0 && !regexp.test(Email)) {

            return (<><span className="verification" >Email is Invalid</span><br/></>)
        }
        if (regexp.test(Email)) {
            isEmailVerified = true
        }

    }

    const passwordValidateError = () => {
        if (Password) {
            if (Password.length < 6) {
                return (
                    <><span className="verification" >Password must be 5 characters long</span><br/></>
                )
            }
            else {
                isPasswordVerified = true
            }
        }
    }


    const errorMessage = () => {
        return (<div className="message" style={{ display: Error ? "block" : "none" }}>
            {Error}
        </div>)
    }

    const successMessage = () => {
        return (<div className="message" style={{ display: Loading ? "block" : "none", color: "grey" }}>
            Loading .....
        </div>)
    }

    const renderLogin = () => {
        return (
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="userEmail">Email :</label>
                <div className="form-group" ref={email}>
                    <div><i className="fa fa-envelope"></i></div><span></span>
                    <input value={Email} onChange={handleChange("Email")} type="email" name="Email" id="userEmail" placeholder="Enter your email" />
                </div><br />
                {emailValidateError()}
                <br />
                <label htmlFor="pwd">Password :</label>
                <div className="form-group">
                    <div><i className="fa fa-key"></i></div><span></span>
                    <input value={Password} type="password" onChange={handleChange("Password")} id="pwd" name="Password" placeholder="Password" />
                </div><br />
                {passwordValidateError()}
                <button>LOGIN</button>
                <div className="or-line">
                    <span>OR</span>
                </div>

                <Link to="/register">New User? Register Here</Link>
            </form>
        )
    }

    return (
        <div className="container login">
            <div className="img-wrapper">
                <img src="images/Person.svg" alt="person standing at bus stop" />
            </div>
            <div className="form-control">
                <div className="head">
                    <h1>User Login</h1>
                </div>
                {errorMessage()}
                {successMessage()}
                {renderLogin()}
                {conductRedirect()}
            </div>
        </div>
    )
}

export default Login;