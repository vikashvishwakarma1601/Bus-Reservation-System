import React, { useState, useEffect } from 'react';
import { getTickets } from './helper'
import '../stylesheets/history.css';

const Tickets = () => {

        const [userTicketDetails, setTicketDetails] = useState({
        ticketDetails: '',
        loading: false,
        Error: ''
    })

    const { ticketDetails, loading, Error } = userTicketDetails

    useEffect(() => {
        getTicketData()
    }, []);

    const getTicketData = () => {
        setTicketDetails({ ...userTicketDetails, loading: 'Your tickets are loading...', Error: '' })
        getTickets()
            .then((data) => {
                if (data.Error) {
                    setTicketDetails({ ...userTicketDetails, loading: '', Error: data.Error })
                }
                else {
                    setTicketDetails({ ...userTicketDetails, loading: '', Error: '', ticketDetails: { ...data } })
                }
            })
            .catch((err) => {
                setTicketDetails({ ...userTicketDetails, loading: '', Error: 'Failed to load ticket....', ticketDetails: '' })
            });
    }
    

    const renderLoadingMsg = () => {
        if (loading) {
            return (<div className="loading-msg" >
                {loading}
            </div>)
        }
        

    }

    const renderErrorMsg = () => {
        if(Error)
            return (<div className="loading-msg" >
                {loading}
            </div>)
    }


    const renderPasengerName = (Name) => {
        return Name.map((person => {
            return <span className="name">{person},</span>
        }))
    }

    const renderBooking = () => {
        let keys = Object.keys(userTicketDetails.ticketDetails)
        return keys.map(key => {
            return (

                <div class="ticket">
                    <div class="ticket-image">
                        <img src="/images/redbus.svg" alt="bus-img" />
                    </div>

                    <div class="ticket-body">

                        <div class="ticket-header">
                            <h2><span>STATUS</span>: BOOKED</h2>
                            <span>TRANSACTION ID : {userTicketDetails.ticketDetails[key].TransactionId}</span>
                        </div>

                        <div class="ticket-data">

                            <div class="row">
                                <div>
                                    <span>Bustype:</span>
                                    <span>{userTicketDetails.ticketDetails[key].BusType}</span>
                                </div>
                            </div>

                            <div class="name-row">
                                <span>Names: </span>
                                {renderPasengerName(userTicketDetails.ticketDetails[key].Name)}
                            </div>
                            <div class="name-row">
                                <span>Gender: </span>
                                {renderPasengerName(userTicketDetails.ticketDetails[key].Gender)}
                            </div>

                            <div class="row">
                                <div>
                                    <span>From:</span>
                                    <span>{userTicketDetails.ticketDetails[key].Source}</span>
                                </div>
                                <div>
                                    <span>To:</span>
                                    <span>{userTicketDetails.ticketDetails[key].Destination}</span>
                                </div>
                            </div>

                            <div class="row">
                                <div>
                                    <span>Arrival:</span>
                                    <span>{userTicketDetails.ticketDetails[key].Arrival}</span>
                                </div>
                                <div>
                                    <span>Departure:</span>
                                    <span>{userTicketDetails.ticketDetails[key].Departure}</span>
                                </div>
                            </div>

                            <div class="row travel">
                                <div>
                                    <span>DateofJourney:</span>
                                    <span>{userTicketDetails.ticketDetails[key].TravelDate}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }


    const renderHeader = () => {
        return (
            <div className="header-ticket">
                Tickets History
            </div>
        )
    }

    const renderEmptyHistory = () => {
        if (!ticketDetails && !loading) {
            return (
                <div className="loading-msg">
                    No ticket history found...
                </div>
            )
        }
    }

    return (
        <div class="history-conatiner">
            {renderHeader()}
            {renderErrorMsg()}
            {renderLoadingMsg()}
            {renderBooking()}
            {renderEmptyHistory()}

        </div>
    )
}

export default Tickets;