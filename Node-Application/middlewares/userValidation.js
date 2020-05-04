let Joi = require('joi');

module.exports = {
    varifyBody: (req, res, next) => {
        let dataToValidate = req.body;
        let schema = Joi.object().keys({
            userId: Joi.string().alphanum().min(6).max(10).required(),
            password: Joi.string().alphanum().min(6).max(10).required(),
            emailId: Joi.string().email().required(),
        });
        let result = Joi.validate(dataToValidate, schema);
        if(result.error==null){
            next();
        }else{
            console.log(result.error.details[0].message)
            res.send({
                success:false,
                message:result.error.details[0].message
            })
        }
    }
}
