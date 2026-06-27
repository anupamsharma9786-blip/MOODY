const mongoose = require('mongoose')
const dns = require('dns')
dns.setServers(["1.1.1.1","8.8.8.8"])

async function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        console.log("error connecting to database",err)
    })
}

module.exports = connectDb