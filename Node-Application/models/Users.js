let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    emailId:{type:String,required:true},
    createdAT: { type: Date,default:new Date() },
    updatedAT: { type: Date,default:new Date() }
});

module.exports = mongoose.model('users', userSchema,'users');