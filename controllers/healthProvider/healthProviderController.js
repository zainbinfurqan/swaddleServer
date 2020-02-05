

/**
 * Created by zain.ahmed on 01/17/2020.
 * @file Category Controller
 * User Function
 */

"use strict";
var mongoose = require('mongoose'),
    HealthProviderModel = mongoose.model('healthProviderSchema'),
    genericFunction = require('../../utils-funtions/genric-funtions'),
    { _responseWrapper } = require('../../utils-funtions/response-wapper')

/*
* ===============================================================================
* --------------------------- HEALTH PROVIDER METHODS ---------------------------
* ==============================================================================
* */


exports.addHealthProvier = async (req, res) => {
    console.log(req.body.healthProviderName)
    if (req.body.healthProviderName) {

        let healthProviderName = await genericFunction._basePost(HealthProviderModel, req.body)
        if (!healthProviderName.status) {
            if (healthProviderName.error['code'] == 11000)
                return _responseWrapper(false, "alreadyExist", 400);
            return _responseWrapper(false, healthProviderName.error['message'], 400);
        }
        return _responseWrapper(true, "createSuccess", 200)


    } else {
        return _responseWrapper(false, "please reqiured all fields", 400)
    }

}


exports.fetchHealthProvier = async (req, res) => {

    let matchObj = {}
    console.log(req.query)
    if (req.query.search) {
        console.log("seacher")
        // let searchVariable = {req.query.search, $options : 'i'}
        matchObj['healthProviderName'] = { $regex: new RegExp(req.query.search, 'i') }
    }

    let arg = {
        query: [
            {
                $match: { ...matchObj, isDelete: false }
            },
        ]
    };
    console.log(arg.query[0].$match)

    let healthProviderName = await genericFunction._baseFetch(HealthProviderModel, arg ,'Aggregate')
    console.log(healthProviderName)
    if (!healthProviderName.status) {
        return _responseWrapper(false, healthProviderName.error['message'], 400);
    }
    return _responseWrapper(true, "fetch successfully", 200, healthProviderName)
}


// exports.putCategoryFN = async (req, res) => {

//     if (req.body.category_id) {

//         let arg = {
//             query: {
//                 _id: req.body.category_id
//             },
//             updateObject: req.body,
//         }
//         let update_category = await GenericProcedure._basePut(CategoryModel, arg, "findOneAndUpdate");

//         if (!update_category.status)
//             return _responseWrapper(false, update_category.error["message"], 400);

//         return _responseWrapper(true, 'updateSuccess', 200, update_category)

//     } else {
//         return _responseWrapper(false, "please reqiured all fields", 400)

//     }

// }


// exports.deleteCategoryFN = async (req, res) => {

//     if (req.body.category_id) {

//         let arg = {
//             query: {
//                 _id: req.body.category_id
//             },
//             updateObject: {
//                 isDelete: true
//             },
//         }
//         let update_category = await GenericProcedure._basePut(CategoryModel, arg, "findOneAndUpdate");

//         if (!update_category.status)
//             return _responseWrapper(false, update_category.error["message"], 400);

//         return _responseWrapper(true, 'updateSuccess', 200, update_category)

//     } else {
//         return _responseWrapper(false, "please reqiured all fields", 400)

//     }

// }


