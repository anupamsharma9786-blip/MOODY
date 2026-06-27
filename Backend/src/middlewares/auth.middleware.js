const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const redis = require('../config/cache')

async function identifyUser(req, res, next){
    const token = req.cookies.token


    if(!token){
        return res.status(409).json({
            message:"token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"invalid token"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded

    next()
}

module.exports = {
    identifyUser
}