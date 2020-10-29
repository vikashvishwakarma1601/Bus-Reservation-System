const User = require('../model/user')
const Bus = require('../model/bus')
const mongoose = require('mongoose')
const Booked = require('../model/booked')

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            return res.status(400).json({ message: "User does not exist" })
        }
        req.Profile = user
        next()
    })
}

exports.getAllUsers = (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({ message: "Something went wrong" })
            }
            res.json(users)
        })
}

exports.getUser = (req, res) => {
    req.Profile.UserPassword = undefined
    req.Profile.createdAt = undefined
    req.Profile.updatedAt = undefined
    return res.json(req.Profile)
}

exports.removeAllUser = (req,res)=>{
    User.remove()
    .exec((err,result)=>{
        if(err){ return res.json({Error:"Not able to remove all user"})}
        res.json(result)
    })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.Profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({ message: "You are not authorized to update this user" })
            }
            user.UserPassword = undefined
            user.UserPassword = undefined
            user.createdAt = undefined
            user.updatedAt = undefined
            res.json(user)
        })
}



exports.updateBusData = (req, res, next) => {
    let { Seats, Bus_ID } = req.body
    let obj = {}
    Seats = Seats.map(seat => {
        let s = 'Seats.Seat' + seat
        obj[s] = true
        return true
    })

    Bus.findOneAndUpdate({ _id: Bus_ID },
        { $set: { ...obj } },
        { new: true, useFindAndModify: false },
        (err, bus) => {
            if (err) return res.status(400).json({ message: "Unable to Book Ticket..." })
            req.Bus_Detail = bus
        })
    next()
}

exports.bookTicket = (req, res) => {
    let ticket = req.body
    let date = new Date()
    let ticketDetail = {
        Name: ticket.Name,
        Age: ticket.Age,
        Gender: ticket.Gender,
        BusType: ticket.BusType,
        Source: ticket.Source,
        Destination: ticket.Destination,
        Fare: ticket.Fare * ticket.Seats.length + 120*ticket.Seats.length,
        User: req.Profile._id,
        Seats: ticket.Seats,
        Arrival: ticket.Arrival,
        Departure: ticket.Departure,
        TravelDate: ticket.TravelDate,
        TransactionId: date.getDay() + '' + date.getMonth() + '' + date.getFullYear() + '' + date.getSeconds()
    }

    let newTicket = new Booked(ticketDetail)
    newTicket.save((err, tickets) => {
        if (err) {
            return res.status(400).json({ message: "Unable to book ticket" })
        }
        res.json(tickets)
    })
}

exports.removeALLTickets = (req, res) => {
    Booked.remove()
        .exec((err, result) => {
            if (err) { res.status(400).json({ message: "failed to Delete" }) }
            res.json({ result: result })
        })
}

exports.removeTicket = (req, res) => {
    Booked.findByIdAndDelete({ ...req.body })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({ Error: "Unable to remove ticket" })
            }
            res.json({ message: "Successfully Removed ..!" })
        })
}


exports.getBookedTicketList = (req, res) => {
    Booked.find({ User: req.Profile._id })
        .exec((err, user) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ Error: "Failed to get data" })
            }
            res.json({ ...user })
        })
}