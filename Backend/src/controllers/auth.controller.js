const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const redis = require('../config/cache')


async function registerUser(req, res) {
    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists ," + (isUserAlreadyExists.email === email ? "email alreay exists" : "username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' })

    res.cookie("token", token)

    res.status(201).json({
        message: " Account created successfully",
        user: {
            email: user.email,
            username: user.username,
        }
    })
}

async function loginUser(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }


    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "Logged in successfully",
        user: {
            username: user.username,
            email: user.email,

        }
    })

}

async function getMe(req,res) {
    const user = req.user
    return res.status(200).json({
        message:"User Fetched successfully",
        user
    })
}

async function logout(req,res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token,Date.now().toString(), "EX", 60*60)

    res.status(200).json({
        message:"logout successfully"
    })
}
module.exports ={
    registerUser,
    loginUser,
    getMe,
    logout
}