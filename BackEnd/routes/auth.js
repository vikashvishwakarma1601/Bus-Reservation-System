var express = require('express');
var router = express.Router();

const {login,logout,register} = require('../controllers/auth')


router.post('/auth/login',login);

router.post('/auth/register',register);

router.get('/auth/logout', logout);


module.exports = router;

