import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext/UserContext';
import SeatLayout from './SeatLayout';
import '../stylesheets/booking.css';

const Bookings = ({ history }) => {

    const { userBusDetail, dispatch } = useContext(UserContext)

    if (!userBusDetail || Object.keys(userBusDetail).length === 0) {
        history.push('/')
    }

    let SeatsDetail = [];
    const seatInfo = () => {
        let totalSeats = userBusDetail.Seats
        SeatsDetail = [...new Array(24)].map((arr, idx) => {
            return totalSeats['Seat' + (idx + 1)] !== true ? true : false
        })
    }


    const [userDetail, setUserDetail] = useState({
        Name: [],
        Age: [],
        Gender: [],
        Seats: [],
        isGenderVerified : false
    })

    let [isGenderVerified,verifiedGender] = useState(false)

    let isNameVerified = false,
        isAgeVerified = false

        const { Name, Age, Gender, Seats } = userDetail

    const handleSeatNumber = (SeatNo) => {
        if (!Seats.includes(SeatNo)) {
            Name.push('')
            Age.push('')
            Gender.push('')
            Seats.push(SeatNo)
        }
        else {
            let ind = Seats.indexOf(SeatNo)
            Name.splice(ind, 1)
            Age.splice(ind, 1)
            Gender.splice(ind, 1)
            Seats.splice(ind, 1)
        }
        setUserDetail({ ...userDetail, Name, Age, Gender, Seats })
    }

    const handleChange = (inputField, idx) => (event) => {
        let data = userDetail[inputField]
        data[idx] = event.target.value
        if(inputField==='Gender'){
            verifiedGender(true)
            setUserDetail({ ...userDetail, [inputField]: [...data] })
        }
        else{
        setUserDetail({ ...userDetail, [inputField]: [...data] })

        }
        
    }

    const renderSeatsDetails = () => {
        return Seats.map((seat, idx) => {
            if (Seats.length > idx + 1) {
                return seat + ','
            }
            else
                return seat
        })
    }

    const nameValidateError = (ind) => {
        if (Name[ind] && Name[ind].length < 3) {
            return (<><span className="verification" >Name must be 3 characters long</span><br /></>)
        }
        if (Name[ind] && Name[ind].length > 3) {
            isNameVerified = true
        }
    }

    const ageValidateError = (ind) => {
        if (Age[ind] && Number(Age[ind]) > 110) {
            return (<><span className="verification" >Too old</span><br /></>)
        }
        if (Age[ind] && Number(Age[ind]) < 0) {
            return (<><span className="verification" >Never born</span><br /></>)
        }
        if (Age[ind] > 0 && Number(Age[ind]) < 110 && Number(Age[ind]) > 0) {
            isAgeVerified = true
        }
    }


    const renderForm = (ind) => {
        return (
            <form class="form-control">
                <label for="Name">Name :</label>
                <div class="form-group">
                    <div><i class="fa fa-user"></i></div><span></span>
                    <input type="Name" onChange={handleChange('Name', ind)} id="Name" value={Name[ind]} placeholder="Enter your name" />
                </div><br />
                {nameValidateError(ind)}
                <br />
                <label for="Age">Age :</label>
                <div class="form-group">
                    <div><i class="fa fa-child"></i></div><span></span>
                    <input type="Number" onChange={handleChange('Age', ind)} id="Age" value={Age[ind]} placeholder="Enter your Age" />
                </div><br />
                {ageValidateError(ind)}
                <br />
                <label>Gender :</label>
                <div class="form-group gender">
                    <div class="genderMale">
                        <input type="radio" id={'Male' + [ind]} name={'Gender' + [ind]} value="Male" onChange={handleChange('Gender', ind)} {...Gender === 'Male' ? 'Checked' : ''} />
                        <label class="male" htmlFor={'Male' + [ind]}>
                            <div><i class="fa fa-male"></i></div>
                        </label>
                    </div>
                    <span></span>
                    <div class="genderFemale">
                        <input type="radio" id={'Female' + [ind]} name={'Gender' + [ind]} onChange={handleChange('Gender', ind)} value="Female" {...Gender === 'Male' ? 'Checked' : ''} />
                        <label class="female" htmlFor={'Female' + [ind]}>
                            <div><i class="fa fa-female"></i></div>
                        </label>
                    </div>
                </div><br />
            </form>
        )
    }

    const handleBookingData = () => {
        const newBusDetail = { ...userBusDetail, ...userDetail }
        if (isNameVerified && isAgeVerified && isGenderVerified) {
            dispatch({ type: "STORE_BOOKING_DETAILS", BusDetails: newBusDetail })
            history.push('/user/payment')
        }

    }

    const renderPaynBtn = ()=>{
        if(isNameVerified && isAgeVerified && isGenderVerified){
            return <button className="pay-btn" onClick={e => handleBookingData()}>Click to Proceed</button>
        }
    }


    const renderBookingSummary = () => {
        return (
            <div class="booking-summary">
                <div class="head">
                    Booking Summary
                </div>
                <div class="detail-container">
                    <div class="details">
                        <span>Bus-Type :</span>
                        <span>{userBusDetail.BusType}</span>
                    </div>
                    <div class="details">
                        <span>From :</span>
                        <span>{userBusDetail.Source}</span>
                    </div>
                    <div class="details">
                        <span>To :</span>
                        <span>{userBusDetail.Destination}</span>
                    </div>
                    <div class="details">
                        <span>Date :</span>
                        <span>{userBusDetail.TravelDate}</span>
                    </div>
                    <div class="details">
                        <span>Seat No :</span>
                        <span>{renderSeatsDetails()}</span>
                    </div>
                </div>

                <div class="booking-form">
                    {Name.map((name, idx) => {
                        return renderForm(idx)
                    })}
                </div>
                <div class="details">
                    <span>Total Seat :</span>
                    <span>{Seats.length}</span>
                </div>

                <div class="details">
                    <span>Fare :</span>
                    <span>{'\u20B9'} {Seats.length * userBusDetail.Fare}</span>
                </div>

                <div class="details">
                    <span>Service Tax :</span>
                    <span>{'\u20B9'} {(Seats.length >= 1 ? 120 : 0)}</span>
                </div>

                <div class="details">
                    <span>Total Charges :</span>
                    <span>{'\u20B9'} {(Seats.length * userBusDetail.Fare) + (Seats.length * 120)}</span>
                </div>
                {renderPaynBtn()}
                
            </div>
        )
    }

    

    return (
        <div class="main-body">
            {seatInfo()}
            <SeatLayout onAddSeat={seatNo => handleSeatNumber(seatNo)} AllSeats={SeatsDetail} />
            {renderBookingSummary()}
        </div>
    )
}

export default Bookings;