const mongoose = require('mongoose')

const BusSchema = new mongoose.Schema({
    BusType: { type: String, required: true, trim: true, maxlength: 6 },
    Source: { type: String, required: true },
    Destination: { type: String, required: true },
    Arrival: { type: String, required: true },
    Departure: { type: String, required: true },
    Fare: { type: Number, required: true },
    Seats: {
        type: Object, required: true
    },
}, { timestamps: true })


const Bus = mongoose.model("Bus", BusSchema)

module.exports = Bus;