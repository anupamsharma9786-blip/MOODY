import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://moody-13mt.onrender.com'

export async function fetchMoodSongs(mood) {
  if (!mood) {
    return { mood: null, songs: [] }
  }

  const response = await axios.get(`${API_BASE_URL}/api/mood/recommend/${encodeURIComponent(mood)}`)
  return response.data
}
