

/**
 * Created by zain.ahmed on 01/17/2020.
 * @file Login Controller
 * User Function
 */

"use strict";
var mongoose = require('mongoose'),
    LoginModel = mongoose.model('loginSchema'),
    bcrypt = require('bcryptjs'),
    genericFunction = require('../../utils-funtions/genric-funtions'),
    { _responseWrapper } = require('../../utils-funtions/response-wapper')

/*
* =======================================================================
* --------------------------- LOGIN METHODS ---------------------------
* =======================================================================
* */

exports.addLoginFN = async (req, res) => {

    if (req.body.email && req.body.password) {
        console.log(req.body)

        let query = {
            email: req.body.email
        };

        let parameterToGet = "userId password email ";

        let args = {
            query,
            parameterToGet
        };

        let login_data = await genericFunction._baseFetch(LoginModel, args, "FindOne");

        console.log(login_data);

        return _responseWrapper(true, "loginsuccessfully", 200)

    } else {
        return _responseWrapper(false, "please reqiured all fields", 400)
    }

}



exports.fetchLoginFN = async (req, res) => {

}


exports.putLoginFN = async (req, res) => {

}


exports.deleteLoginFN = async (req, res) => {

}


