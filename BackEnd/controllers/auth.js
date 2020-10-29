const User = require('../model/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.login = (req, res) => {
    let { Email, Password } = req.body;
    User.findOne({ Email }, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: "User does not exist" })
        }
        if (!user.authenticate(Password)) {
            return res.status(401).json({ message: "Email and Password does not exists" })
        }

        const authToken = jwt.sign({ _id: user._id }, "BUS-BOOKING-SECRET")
        const { _id, Email, Gender, Name } = user
        res.cookie("authToken", authToken)
        res.cookie("UserID",_id)
        return res.status(200).json({ authToken, user: { _id, Email, Gender, Name }})
    })
}

exports.logout = (req, res) => {
    res.clearCookie("authToken")
    return res.json({ message: "Logout successful..!" })
}

exports.register = async (req, res) => {
    const newUser = User(req.body)
    await newUser.save((err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: "User does not created successfully" })
        }
        else {
            return res.json({Email:user.Email,
            Name:user.Name,
            id:user._id
            })
        }
    })
}


// Protected Routes
exports.isLoggedIn = expressJwt({
    secret: "BUS-BOOKING-SECRET",
    userProperty: "auth"
})


exports.isAuthenticated = (req, res, next) => {
    let check = req.Profile && req.auth && req.Profile._id == req.auth._id;
    if (!check) {
        return res.status(403).json({ message: "UNAUTHORIZED ACCESS" })
    }
    next()
}