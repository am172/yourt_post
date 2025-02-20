const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    userName: {type:String, required: true, min:4},
    password:{type:String, required:true },
});

const UserModel = model('eluser', UserSchema);

module.exports = UserModel;