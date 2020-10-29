import React, { useState } from 'react';
import '../stylesheets/booking.css'

const SeatLayout = (props) => {


    const [bookDetail, setBookDetail] = useState({
        Seats: []
    })

    const { Seats } = bookDetail
    const handleSeatClass = (e) => {
        let SeatNo = e.target.innerText
        props.onAddSeat(e.target.innerText)
        if (!Seats.includes(SeatNo)) {
            e.target.classList.add('reserved')
            Seats.push(SeatNo)
        }
        else {
            let ind = Seats.indexOf(SeatNo)
            e.target.classList.remove('reserved')
            Seats.splice(ind, 1)
        }
        setBookDetail({ Seats })
    }

    const renderSingleSeat = (ind) => {
        if (props.AllSeats[ind]) {
            return (
                <div class="seat" onClick={e => handleSeatClass(e)}>{ind+1}</div>
            );
        }
        return (<div class="seat reserved">{ind+1}</div>);
    }

    const renderSeatRow = (ind) => {
        return (
            <div class="row">
                <div class="layout-1">
                    {renderSingleSeat(ind)}
                    {renderSingleSeat(ind + 1)}

                    {/* <div class={props.AllSeats[ind]===true ?"seat reserved" : "seat"} {...renderFunction(ind)}>{ind}</div>
                    <div class={props.AllSeats[ind+1]===true ?"seat reserved" : "seat"} onClick={e => handleSeatClass(e)}>{ind + 1}</div> */}
                </div>
                <div class="layout-2">
                    {renderSingleSeat(ind + 2)}
                    {renderSingleSeat(ind + 3)}

                    {/* <div class={props.AllSeats[ind+2]===true ?"seat reserved" : "seat"} onClick={e => handleSeatClass(e)}>{ind + 3}</div>
                    <div class={props.AllSeats[ind+3]===true ?"seat reserved" : "seat"} onClick={e => handleSeatClass(e)}>{ind + 4}</div> */}
                </div>
            </div>
        )
    }

    const renderSeats = () => {

        return (
            <div class="seat-viewer">
                <div class="seatTitle"><h2>SEATS</h2></div>
                <div class="seats">
                    {renderSeatRow(0)}
                    {renderSeatRow(4)}
                    {renderSeatRow(8)}
                    {renderSeatRow(12)}
                    {renderSeatRow(16)}
                </div>
            </div>
        )
    }

    return (<>
        {renderSeats()}
    </>
    )
}

export default SeatLayout;