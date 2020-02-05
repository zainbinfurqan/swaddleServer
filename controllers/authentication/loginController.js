

/**
 * Created by zain.ahmed on 01/17/2020.
 * @file Login Controller
 * User Function
 */

"use strict";
var mongoose = require('mongoose'),
    LoginModel = mongoose.model('loginSchema'),
    cacheModel = mongoose.model('cacheSchema'),
    bcrypt = require('bcryptjs'),
    salt = bcrypt.genSaltSync(10),
    genericFunction = require('../../utils-funtions/genric-funtions'),
    jwt_token = require('../../utils-funtions/jwt-functions'),
    { _responseWrapper } = require('../../utils-funtions/response-wapper')

/*
* =======================================================================
* --------------------------- LOGIN METHODS ---------------------------
* =======================================================================
* */

exports.LoginFN = async (req, res) => {

    if (req.body.email && req.body.password) {

        let query = {
            email: req.body.email
        };

        let parameterToGet = "userId password email role";

        let args = {
            query,
            parameterToGet
        };

        let auth = await GenericProcedure._baseFetch(LoginUser, args, "FindOne");

        if (!auth.data)
            return _responseWrapper(
                false,
                "You have entered an invalid email or password",
                400
            );

        if (bcrypt.compareSync(req.body.password, auth.data.password)) {
            let query = {
                email: auth.data.email
            };

            let parameterToGet = "fullName profilePic email ";

            let args_ = {
                query,
                parameterToGet
            };

            let user_ = await GenericProcedure._baseFetch(RegisterUser, args_, "FindOne");
            let obj = {
                ...user_,
                userId: user_.data._id
            }

            let token = await utilitiesHelper.generateJWTToken(obj);
            let response_data = {
                data: {
                    token,
                    userId: auth.data.userId,
                    role: auth.data.role,
                    fullName: user_.data.fullName,
                    // _id: auth.data._id,
                    email: auth.data.email,
                    profilePic: user_.data.profilePic
                }
            };
            req.userId = auth.data.userId;
            ActivityLog.setActivityLogFN(
                req,
                "User Login",
                ActivityLog.schemasName["login"] + " login @ belief challenges",
                {}
            );

            return _responseWrapper(
                true,
                "User logged in successfully",
                200,
                response_data
            );
        } else {
            return _responseWrapper(
                false,
                "You have entered an invalid email or password",
                400
            );
        }
    } else {
        return _responseWrapper(false, "requiredAll", 400);
    }

}

exports.LogOutFN = async (req, res) => {

    let apiToken = req.headers["authorization"];
    if (apiToken) {
        await cacheHelper.removeSession(
            // cacheHelper.cacheInstance["session-cache"],
            apiToken
        );
        // req.userId = req.body.userId
        // ActivityLog.setActivityLogFN(
        //     req,
        //     "Logout",
        //     "[" + req.method + "]: logout @ lemostre",
        //     {}
        // );
        return _responseWrapper(true, "Logout successfully", 200);
    } else return _responseWrapper(false, "Authorization token is required", 401);
}

// exports.fetchLoginFN = async (req, res) => {

// }


// exports.putLoginFN = async (req, res) => {

// }


// exports.deleteLoginFN = async (req, res) => {

// }


