const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const BookedSchema = new mongoose.Schema({
    BusType: { type: String, required: true, trim: true, maxlength: 6 },
    Destination: { type: String, required: true },
    Source: { type: String, required: true },
    Fare: { type: Number, required: true },
    Name:{type:Array,default:[],required: true},
    Age:{type:Array,default:[],required: true},
    Gender:{type:Array,default:[],required: true},
    Seats: { type: Array, required: true },
    Arrival:{type:String,required: true},
    Departure:{type:String,required: true},
    TravelDate: { type: String, required: true },
    User: {type: ObjectId,ref:"User"},
    TransactionId: { type: Date,Unique: true }

}, { timestamps: true })

BookedSchema.methods = {
    getTransactionId: function (){
        return Date.now()
    }
}


const Booked = mongoose.model("Booked", BookedSchema)

module.exports = Booked;