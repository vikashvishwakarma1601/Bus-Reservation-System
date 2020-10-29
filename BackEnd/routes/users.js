const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser, bookTicket,removeAllUser, getBookedTicketList, removeTicket, removeALLTickets, getAllUsers, updateBusData } = require('../controllers/user')
const { isLoggedIn, isAuthenticated } = require('../controllers/auth')

router.param("UserId", getUserById);

router.get('/user/getallusers', getAllUsers);

router.get('/user/removeallusers', removeAllUser);

router.get('/user/delete-all-ticket', removeALLTickets);

router.get('/user/delete-ticket', isLoggedIn, isAuthenticated, removeTicket);

router.get("/user/:UserId", isLoggedIn, isAuthenticated, getUser);

router.put("/user/:UserId", isLoggedIn, isAuthenticated, updateUser);

router.post('/user/:UserId/bookTicket', isLoggedIn, isAuthenticated, updateBusData, bookTicket);

router.get('/tickets/user/:UserId', isLoggedIn, isAuthenticated, getBookedTicketList);


module.exports = router;

