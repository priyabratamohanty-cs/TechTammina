let express = require('express');
let Router = express.Router();
let jwt = require('jsonwebtoken');

let userModel = require('../models/Users');
let validation = require('../middlewares/userValidation');
let token = require('../middlewares/tokenVerify');

Router.post('/i/user/registration', validation.varifyBody, (req, res) => {
    let newUser = new userModel(req.body);
    newUser.save((err) => {
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
                message: 'User Registered Successfully',
            })
        }
    })
});

Router.post('/r/user/login', (req, res) => {
    userModel.findOne({ userId: req.body.userId }).lean().exec((err, user) => {
        if (err) {
            res.send({
                success: false,
                message: 'internal Error occured',
                error: err
            })
        } else if (!user) {
            res.send({
                success: false,
                message: 'Entered user has not registered yet',
            })
        } else {
            if (user.password == req.body.password) {
                delete user.password;
                delete user._id;
                let token = jwt.sign({ userId: user.userId }, 'techtammina');
                //give other option like time validation limit for more security
                res.send({
                    success: true,
                    message: 'login success',
                    token: token,
                    data: user
                })
            } else {
                res.send({
                    success: false,
                    message: 'Invalid Credentials'
                })
            }

        }
    })
});

Router.get('/r/users', token.varifyToken, (req, res) => {
    userModel.find({}).exec((err, data) => {
        if (err) {
            res.send({
                success: false,
                message: 'Internal Error occured while Reading data from DB',
                error: err
            })
        } else if(data.length>0) {
            res.send({
                success: true,
                message: 'Users found Successfully',
                data:data
            })
        }else{
            res.send({
                success: false,
                message: 'No Users Found'
            })
        }
    })
})

module.exports = Router;