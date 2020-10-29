const Bus = require('../model/bus')
const Booked = require('../model/booked')
const moment = require('moment')

exports.getSource = (req, res, next, from) => {
    req.Source = from;
    next();
}

exports.getDestination = (req, res, next, to) => {
    req.Destination = to;
    next();
}


exports.searchBus = (req, res) => {
    let { Source, Destination } = req
    Bus.find({ Source: Source, Destination: Destination })
        .exec((err, bus) => {
            if (err || bus.length===0) {
                return res.status(404).json({ Error: "No bus available ...!" })
            }
            else {
                bus[0].TravelDate = moment(Date.now()).format('DD-MM-YYYY')
                res.json(bus)
            }
        })
}

exports.getAllBus = (req, res) => {
    Bus.find()
        .exec((err, busList) => {
            if (err || !busList) {
                res.status(400).json({ message: "No bus right now" })
            }
            return res.json(busList)
        })
}

exports.deleteAllBus=(req,res)=>{
    Bus.remove()
    .exec((err,result)=>{
        if(err){res.status(400).json(err)}
        res.json({result:result})
    })
}

exports.addBus = (req, res) => {
    let Seats = {}
    let tempSeats = [...new Array(24)].map((arr,idx)=>{
        Seats[`Seat${idx+1}`] =false
        return true
    })
    req.body.Seats = Seats
    const newBus = new Bus({ ...req.body })
    console.log(newBus)
    newBus.save((err, bus) => {
        console.log("err",err)
        if (err) {
            return res.status(400).json({ message: "Failed to add new bus details" })
        }
        return res.json(bus)
    })
}


exports.removeBus = (req, res) => {
    Bus.findByIdAndDelete(req.BusDetails._id, (err) => {
        if (err) {
            return res.status(400).json({ message: "Failed to delete bus" })
        }
        res.json({ message: "Deleted Succesfully" })
    })
}


exports.updateBusDetails = (req, res) => {
    Bus.findOneAndUpdate({ _id: req.BusDetails._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, bus) => {
            if (err) {
                return res.status(400).json({ message: "Failed to update bus details" })
            }
            return res.json(bus)
        })
}

exports.getAllTickets=(req,res) => {
    Booked.find({})
    .exec((err,history) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        
        res.json(history)
    })
}