const express = require('express');
const {LoginFN,LogOutFN} = require('../controllers/authentication/loginController')
const route = express.Router();

route.post('/login', (req, res) => {
    LoginFN(req, res)
        .then(
            (success) => res.status(success.statusCode).send(success),
            (err) => { res.status(err.statusCode).send(err) }
        );
})

route.post('/logout', (req, res) => {
    LogOutFN(req, res)
        .then(
            (success) => res.status(success.statusCode).send(success),
            (err) => { res.status(err.statusCode).send(err) }
        );
})



module.exports = route