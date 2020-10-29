const express = require('express')
const { addBus, getAllBus, updateBusDetails,getAllTickets ,deleteAllBus,searchBus,getSource,getDestination} = require('../controllers/bus')
const router = express.Router()



router.param("from",getSource);

router.param("to",getDestination);

router.put('/bus/:BusId', updateBusDetails);

router.post('/bus/add-bus', addBus);

router.get('/bus/search/:from/:to', searchBus);

router.get('/bus/get-all-bus', getAllBus);

router.get('/bus/get-all-history', getAllTickets);

router.get('/bus/delete-bus', deleteAllBus);



module.exports = router;