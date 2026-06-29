const express = require('express')
const moodController = require('../controllers/mood.controller')

const moodRouter = express.Router()

// GET /api/mood/recommend/:mood
// example: GET /api/mood/recommend/happy
moodRouter.get('/recommend/:mood', moodController.recommendSongs)
// GET /api/mood/recommend/:mood
// Example: GET /api/mood/recommend/happy
moodRouter.get('/recommend/:mood', moodController.recommendSongs)

// Also keep POST for backward compatibility (body)
moodRouter.post('/recommend', moodController.recommendSongs)

module.exports = moodRouter
