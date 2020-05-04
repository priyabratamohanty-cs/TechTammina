let express = require('express');
let Router = express.Router();
let jwt = require('jsonwebtoken');

let batchModel = require('../models/Batch');
let token = require('../middlewares/tokenVerify');

Router.post('/i/batch',token.varifyToken,(req, res) => {
    let newBatch = new batchModel(req.body);
    newBatch.save((err) => {
        if (err) {
            if (err.code == 11000) {
                res.send({
                    success: false,
                    message: 'User Already Registered, please choose another userId'
                })
            } else if (err.name == "ValidationError") {
                console.log(Object.keys(err.errors))
                res.send({
                    success: false,
                    message: Object.keys(err.errors)[0] + ' field is required'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Internal Error occured while saving data in to DB',
                    error: err
                })
            }
        } else {
            res.send({
                success: true,
                message: 'Batch Registered Successfully',
            })
        }
    })
});


Router.get('/r/batches', token.varifyToken, (req, res) => {
    batchModel.find({}).exec((err, data) => {
        if (err) {
            res.send({
                success: false,
                message: 'Internal Error occured while Reading data from DB',
                error: err
            })
        } else if(data.length>0) {
            res.send({
                success: true,
                message: 'Batches found Successfully',
                data:data
            })
        }else{
            res.send({
                success: false,
                message: 'No batch Found'
            })
        }
    })
});

module.exports = Router;



