const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"usernaem is required"],
        unique: [true, "username should be unique"]
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true,"password is required"],
        select: false
    }
},
{
    timestamps: true
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel