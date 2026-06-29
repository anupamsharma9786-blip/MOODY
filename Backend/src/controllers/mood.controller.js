const moodService = require('../services/mood.service')

/**
 * POST /api/mood/recommend
 */
async function recommendSongs(req, res) {
  try {
    // Accept mood from URL param or body. Example: GET /recommend/happy or POST { mood }
    const mood = req.params && req.params.mood ? req.params.mood : req.body && req.body.mood
    if (!mood) return res.status(400).json({ error: 'Missing mood in request (param or body)' })

    const songs = await moodService.getSongsForMood(mood)
    if (songs === null) {
      const supported = moodService.getSupportedMoods ? moodService.getSupportedMoods() : []
      return res.status(400).json({ error: 'Unsupported mood', supported })
    }
    return res.json({ mood, songs })
  } catch (err) {
    console.error('recommendSongs error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { recommendSongs }
