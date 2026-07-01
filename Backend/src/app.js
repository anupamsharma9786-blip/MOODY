const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const { applyTimestamps } = require('./models/userModel');


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://moody-lilac.vercel.app",
    credentials:true
}))

const authRouter = require('./routes/auth.routes');
const moodRouter = require('./routes/mood.routes');



app.use("/api/auth", authRouter)
app.use("/api/mood", moodRouter)


module.exports = app