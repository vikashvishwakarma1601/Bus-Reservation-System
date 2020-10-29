import React, { useState, useContext } from 'react';
import { searchBus } from '../bus/helper';
import { isAuthenticated } from '../auth/helper';
import UserContext from '../../UserContext/UserContext';


const SearchBus = (props) => {

    const { dispatch } = useContext(UserContext)

    const [searchData, setSearchData] = useState({
        Bus_ID: '',
        Source: '',
        Destination: '',
        loading: false,
        Error: '',
        BusData: '',
        didRender: false
    })

    let [travelDate, setTravelDate] = useState({TravelDate:''})
    let {TravelDate} =  travelDate
    const { Source, Destination, loading, didRender, Error, BusData } = searchData

    const date = new Date()

    const handleChange = (inputField) => (event) => {
        console.log(inputField)
        if (inputField === 'TravelDate') {
            TravelDate = event.target.value
            console.log(travelDate,event.target.value)
            setTravelDate({TravelDate})
            console.log(TravelDate)

        }
        else {
            setSearchData({ ...searchData, [inputField]: event.target.value })
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchData({ ...searchData, loading: true, Error: '', didRender: false })
        searchBus({ Source, Destination, TravelDate })
            .then((data) => {
                if (data.Error) {
                    setSearchData({ ...searchData, Error: data.Error, loading: false, BusData: [], didRender: false })
                }
                else {
                    setSearchData({ ...searchData, didRender: true, loading: false, Error: '', BusData: data })
                }
            })
            .catch((err) => {
                setSearchData({ ...searchData, Error: "Failed to load data", loading: false, BusData: [], didRender: false })
            })
    }

    const errorMessage = () => {
        return (<div className="messageHandle" style={{ display: Error ? "block" : "none" }}>
            {Error}
        </div>)
    }

    const loadingData = () => {
        return (<div className="messageHandle" style={{ display: loading ? "block" : "none" }}>
            Loading data...
        </div>)
    }

    const handleBooking = (BusDetails) => {
        let newBusDetail = {...BusDetails}
        newBusDetail.TravelDate = TravelDate
        if (isAuthenticated()) {
            dispatch({ type: "STORE_BOOKING_DETAILS", BusDetails: newBusDetail })
            props.history.push('/user/book-ticket')
        }
        else {
            props.history.push('/login')
        }
    }

    const AvailableSeatInfo = (bus) => {
        let totalSeats = bus.Seats
        let AvailableSeats = [...new Array(24)].map((arr, idx) => {
            return totalSeats['Seat' + (idx + 1)] !== true ? true : false
        })
        return AvailableSeats.filter((Seat) => Seat === true).length
    }

    const performRender = () => {
        if (didRender) {
            return (
                <div className="bus-details">
                    <ul>
                        <li>
                            <ul>
                                <li>Bus Type</li>
                                <li>Departure</li>
                                <li>Arrival</li>
                                <li>Date</li>
                                <li>Available</li>
                                <li>Fare</li>
                                <li></li>
                            </ul>
                        </li>
                        <li>{BusData.map((bus, idx) => {
                            return (<ul key={idx}>
                                <li>{bus.BusType}</li>
                                <li>{bus.Departure}</li>
                                <li>{bus.Arrival}</li>
                                <li>{TravelDate}</li>
                                <li>{AvailableSeatInfo(bus)}</li>
                                <li>{bus.Fare}</li>
                                <li onClick={e => handleBooking(bus)} className="viewSeatBtn">View Seats</li>
                            </ul>
                            )
                        })}
                        </li>
                    </ul>
                </div>
            )
        }
    }

    const renderForm = () => {
        return (<>
            <div className="text-info">
                <h2>Find a Tour</h2>
                <p>Where would you like to go ?</p>
                {errorMessage()}
                {loadingData()}
            </div>
            <div className="search-form">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="location">
                        <div className="source-location">
                            <div className="cities">
                                <div className="city-list">
                                    <select onChange={handleChange("Source")}>
                                        <option value="">Select City</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Banglore">Banglore</option>
                                    </select>
                                    <div className="label-from"><span>From</span></div>
                                </div>
                                <div className="search-image">
                                    <div className="division-line"></div>
                                    <div className="city-image">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="city"
                                            className="svg-inline--fa fa-city fa-w-20" role="img"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                            <path fill="currentColor"
                                                d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="source-location">
                            <div className="cities">
                                <div className="city-list">
                                    <select onChange={handleChange("Destination")}>
                                        <option value="">Select City</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Banglore">Banglore</option>
                                    </select>
                                    <div className="label-from to"><span>To</span></div>
                                </div>
                                <div className="search-image">
                                    <div className="division-line"></div>
                                    <div className="city-image">
                                        <img src="/images/drop.png" alt="drop" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="onward">
                            <div className="dates-label"><span>Onward</span></div>
                            <input type="date" onChange={handleChange("TravelDate")} id="onward-date" />
                        </div>

                    </div>
                    <button className="search-btn">Search Bus</button>
                </form>
            </div>
        </>
        )
    }

    return (
        <>
            <section className="search-section">
                {renderForm()}
            </section>

            {performRender()}

        </>
    )
}


export default SearchBus;