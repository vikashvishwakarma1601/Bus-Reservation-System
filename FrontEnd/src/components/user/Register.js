import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { register } from '../auth/helper'
import '../stylesheets/authPanel.css'


const Register = () => {

    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Gender: '',
        Mobile: '',
        Error: '',
        Success: false,
    })

    let [isGenderVerified, verifiedGender] = useState(false)

    const { Name, Email, Password, Gender, Mobile, Success, Error } = formData

    let isEmailVerified = false,
        isPasswordVerified = false,
        isMobileVerified = false,
        isNameVerified = false


    const SignUpForm = () => {
        return (

            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="username">Name :</label>
                <div className="form-group">
                    <div><i className="fa fa-user"></i></div><span></span>
                    <input onChange={handleChange("Name")} value={Name} type="name" id="username" placeholder="Enter your name" name="username" />
                </div><br />
                {nameValidateError()}
                <br />
                <label htmlFor="userEmail">Email :</label>
                <div className="form-group">
                    <div><i className="fa fa-envelope"></i></div><span></span>
                    <input onChange={handleChange("Email")} value={Email} type="email" id="userEmail" placeholder="Enter your email" name="email" />
                </div><br />
                {emailValidateError()}
                <br />

                <label htmlFor="mobile">Mobile :</label>
                <div className="form-group">
                    <div><i className="fa fa-phone"></i></div><span></span>
                    <input onChange={handleChange("Mobile")} value={Mobile} type="number" id="mobile" placeholder="Contact number" name="mobile" />
                </div><br />
                {mobileValidateError()}
                <br />
                <label>Gender :</label>
                <div className="form-group gender">

                    <div className="genderMale">
                        <input value={Gender} onChange={handleChange("Gender")} type="radio" id="male" name="gender" value="Male" />
                        <label className="male" htmlFor="male"><div><i className="fa fa-male"></i></div></label>
                    </div>
                    <span></span>
                    <div className="genderFemale">
                        <input value={Gender} onChange={handleChange("Gender")} type="radio" id="female" name="gender" value="Female" />
                        <label className="female" htmlFor="female"><div><i className="fa fa-female"></i></div></label>
                    </div>

                </div><br />


                <label htmlFor="pwd">Password :</label>
                <div className="form-group">
                    <div><i className="fa fa-key"></i></div><span></span>
                    <input onChange={handleChange("Password")} value={Password} type="Password" id="pwd" placeholder="Password" name="password" />
                </div><br />
                {passwordValidateError()}
                <br />
                {renderBtn()}
                <Link to="/login">Existing User?<span>Login Here</span></Link>
                {/* <a href="#">Existing User?<span>Login Here</span> </a> */}
            </form>
        )
    }

    const renderBtn = () => {
        if (isEmailVerified && isPasswordVerified && isMobileVerified && isNameVerified && isGenderVerified){
            return <button>Register</button>
               
        }
    }

    const handleChange = (inputField) => (event) => {
        if (inputField === 'Gender') {
            verifiedGender(true)
            setFormData({ ...formData, [inputField]: event.target.value })
        } 
        else {
            setFormData({ ...formData, [inputField]: event.target.value })

        }
    }


    const handleSubmit = event => {
        event.preventDefault()
        if (isEmailVerified && isPasswordVerified && isMobileVerified && isNameVerified) {
            setFormData({ ...formData, Error: false })
            register({ Name, Email, Password, Gender, Mobile })
                .then((data) => {
                    if (data.Message) {
                        setFormData({ ...formData, Error: data.message, success: false })
                    }
                    else {
                        setFormData({
                            ...formData,
                            Name: '',
                            Password: '',
                            Gender: '',
                            Mobile: '',
                            Email: '',
                            Error: '',
                            Success: true
                        })
                    }
                })
                .catch((error) => {
                    setFormData({ ...formData, Error: "Failed to register", success: false })
                })
        }
        else {
            console.log("asdasd", isEmailVerified, isPasswordVerified, isMobileVerified, isNameVerified)
        }

    }



    const errorMessage = () => {
        return (<div className="message" style={{ display: Error ? "block" : "none" }}>
            {Error}
        </div>)
    }



    const successMessage = () => {
        return (<div className="message" style={{ display: Success ? "block" : "none" }}>
            Account created successfully. Please <Link to="/login">Login Here</Link>
        </div>)
    }

    const passwordValidateError = () => {
        if (Password) {
            if (Password.length < 6) {
                return (
                    <><span className="verification" >Password must be 5 characters long</span><br /></>
                )
            }
            else {
                isPasswordVerified = true
            }
        }
    }

    const emailValidateError = () => {
        const regexp = RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (Email.length > 0 && !regexp.test(Email)) {

            return (<><span className="verification" >Email is Invalid</span><br /></>)
        }
        if (regexp.test(Email)) {
            isEmailVerified = true
        }

    }

    const nameValidateError = () => {
        if (Name && Name.length < 3) {
            return (<><span className="verification" >Name must be 3 characters long</span><br /></>)
        }
        if (Name && Name.length > 3) {
            isNameVerified = true
        }
    }

    const mobileValidateError = () => {
        if (Mobile && (Mobile.length !== 10)) {

            return (<><span className="verification" >Invalid mobile number</span><br /></>)
        }
        if (Mobile && Mobile.length == 10) {
            isMobileVerified = true
        }
    }

    return (
        <div className="container register-container">
            <div className="img-wrapper">
                <img src="images/Person.svg" alt="person standing at bus stop" />
            </div>

            <div className="form-control">
                <div className="head">
                    <h1>User Signup</h1>
                </div>
                {errorMessage()}
                {successMessage()}
                {SignUpForm()}
            </div>
        </div>
    )
}

export default Register;