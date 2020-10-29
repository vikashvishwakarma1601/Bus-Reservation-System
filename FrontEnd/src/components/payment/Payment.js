import React, { useContext, useState } from 'react';
import '../stylesheets/payment.css'
import { API } from '../backend';
import { bookTicket } from './helper'
import UserContext from '../../UserContext/UserContext';


const Payment = ({ history }) => {

    const { userBusDetail } = useContext(UserContext)

    if (!userBusDetail || Object.keys(userBusDetail).length === 0) {
        history.push('/')
    }


    const [formData, setFormData] = useState({
        Card: '',
        CVV: '',
        Error: '',
        Success: false
    })

    const { Card, CVV, Success, Error } = formData

    let isCardNoVerified = false,
        isCVVVerified = false

    const cardValidateError = () => {
        if (Card && (Card.length < 16 || Card.length > 16)) {
            return (<><span className="verification" > It must be 16 digit</span><br /></>)
        }
        if (Card && Card.length === 16) {
            isCardNoVerified = true
        }
    }

    const cvvValidateError = () => {
        if (CVV && (CVV.length <3 || CVV.length >4)) {
            return (<><span className="verification" >Invalid CVV / CVC</span><br /></>)
        }
        if (Card && (CVV.length === 3 || CVV.length === 4)) {
            isCVVVerified = true
        }
    }



    const renderYear = () => {
        return (
            <>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
            </>
        )
    }


    const renderMonths = () => {
        return (
            <>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </>
        )
    }

    const renderPaymentCardImg = () => {
        return (
            <div className="credit-card">
                <div className="card-img">
                    <img src="../images/credit-card.svg" alt="credit-card" />
                </div>
                <div className="accept-card">
                    <div><img src="../images/payment/rupay.svg" alt="rupay" /></div>
                    <div><img src="../images/payment/VISA.svg" alt="VISA" /></div>
                    <div><img src="../images/payment/master-card.svg" alt="Master Card" /></div>
                    <div><img src="../images/payment/american-xpress.svg" alt="american-xpress" /></div>
                </div>
            </div>
        )
    }


    const handleChange = (inputField) => (event) => {
        setFormData({ ...formData, [inputField]: event.target.value })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        if (isCVVVerified && isCardNoVerified) {
            let newBusDetail = { ...userBusDetail }
            newBusDetail.Bus_ID = userBusDetail._id
            bookTicket({ ...newBusDetail })
                .then(() => {
                    history.push('/user/ticket-history')
                })
                .catch(error => {
                    setFormData({ ...formData, Error: "Unable to book ticket" })
                })
        }

    }


    const renderPaynBtn = ()=>{
        if(isCVVVerified && isCardNoVerified){
            return <button className="pay-btn" >Pay Now</button>
        }
    }

    const renderPaymentCard = () => {
        return (
            <div className="payment-detail">
                <h1>PAYMENT</h1>
                <p>Pay with Credit/Debit Card</p>
                <form className="payment-form" onSubmit={e => handleSubmit(e)}>
                    <label htmlFor="card-number">Credit card number</label><br />
                    <input type="number" id="card-number" onChange={handleChange("Card")} placeholder="4584 XXXX XXXX 0123" />
                    <br />
                    {cardValidateError()}
                    <br />
                    <label htmlFor="month" className="exp-label">Expiration</label>
                    <div className="expiration-container">
                        <div className="exp-date">
                            <div className="exp-month">
                                <select id="month">
                                    {renderMonths()}
                                </select>
                            </div>
                            <i className="fa -fa-arrow-down"></i>
                            <div className="arrow">
                                <img src="../images/arrow.png" alt="arrow" />
                            </div>
                        </div>

                        <div className="exp-date">
                            <div className="exp-year">
                                <select>
                                    {renderYear()}
                                </select>
                            </div>
                            <div className="arrow">
                                <img src="../images/arrow.png" alt="arrow" />
                            </div>
                        </div>
                    </div>
                    <label htmlFor="cvv" className="cvv-label">CVC/ CVV</label>
                    <div className="cvv-block">
                        <input type="number" id="cvv" onChange={handleChange("CVV")} />
                        <span>3 or 4 digits code</span>
                    </div>
                    {cvvValidateError()}
                    {renderPaynBtn()}
                    
                </form>
            </div>
        )
    }


    return (
        <section className="payment-container">
            {renderPaymentCardImg()}
            {renderPaymentCard()}
        </section>


    )
}

export default Payment;