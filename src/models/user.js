const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    password: String,
    name: String, 
    address: String, 
    age: Number, 
    phone: Number, 
    avatar: String
})

const Usuario =  mongoose.model('User', userSchema);
module.exports = Usuario;