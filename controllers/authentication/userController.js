

/**
 * Created by zain.ahmed on 01/17/2020.
 * @file user Controller
 * User Function
 */

"use strict";
var mongoose = require('mongoose'),
    UserModel = mongoose.model('userSchema'),
    loginSchema = mongoose.model('loginSchema'),
    bcrypt = require('bcryptjs'),
    salt = bcrypt.genSaltSync(10),
    genericFunction = require('../../utils-funtions/genric-funtions'),
    { _responseWrapper } = require('../../utils-funtions/response-wapper'),
    utilitiesHelper = require('../../helpers/util-utilities');

/*
* =======================================================================
* --------------------------- USER METHODS ---------------------------
* =======================================================================
* */

exports.singupFN = async (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.role && req.body.password && req.body.email) {

        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        //Register new user
        let new_user = await genericFunction._basePost(UserModel, req.body);

        if (!new_user.status) {
            if (new_user.error['code'] == 11000)
                return _responseWrapper(false, 'alreadyExist', 409)
            return _responseWrapper(false, new_user.error['message'], 400)
        }

        req.userId = new_user._id;

        let authObject = {
            userId: new_user._id,
            ...req.body
        }

        // Create user auth
        let new_user_auth = await genericFunction._basePost(loginSchema, authObject);
        let obj = {
            ...new_user,
            userId: new_user.data._id
        }

        if (!new_user_auth.status)
            return _responseWrapper(false, new_user_auth.error['message'], 400)

        let token = await utilitiesHelper.generateJWTToken(obj);
        let response_data = {
            data: {
                token,
                userId: new_user.data._id,
                fullName: new_user.data.fullName,
                email: new_user.data.email,
                profilePic: new_user.data.profilePic,
                role: new_user_auth.data.role
            }
        };

        return _responseWrapper(true, 'User successfully', 201, response_data)


    } else {
        return _responseWrapper(false, 'requiredAll', 400)
    }
}



exports.fetchUserFN = async (req, res) => {
    let args = {
        query: { isDelete: false },
    };
    let result = await genericFunction._baseFetch(UserModel, args);
    if (!result.status)
        return _responseWrapper(false, new_user.error['message'], 202)

    return _responseWrapper(true, "fetchSuccess", 200, result)
}


exports.putUserFN = async (req, res) => {
    let result = await genericFunction._basePost(UserModel, req.body);
    if (!result.status) {
        if (result.error['code'] == 11000) {
            return _responseWrapper(
                false,
                "alreadyExist",
                202
            );
        }
    }
}


exports.deleteUserFN = async (req, res) => {
    let result = await genericFunction._basePost(UserModel, req.body);
    if (!result.status) {
        if (result.error['code'] == 11000) {
            return _responseWrapper(
                false,
                "alreadyExist",
                202
            );
        }
    }
}


