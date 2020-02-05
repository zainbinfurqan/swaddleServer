const express = require('express');
const { addHealthProvier, fetchHealthProvier } = require('../controllers/healthProvider/healthProviderController')
const route = express.Router();

route.post('/', (req, res) => {
    addHealthProvier(req, res)
        .then(
            (success) => res.status(success.statusCode).send(success),
            (err) => { res.status(err.statusCode).send(err) }
        );
})

route.get('/', (req, res) => {
    fetchHealthProvier(req, res)
        .then(
            (success) => res.status(success.statusCode).send(success),
            (err) => { res.status(err.statusCode).send(err) }
        );
})



module.exports = route