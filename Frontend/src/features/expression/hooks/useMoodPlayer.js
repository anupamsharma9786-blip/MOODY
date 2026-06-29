import { useEffect, useState } from 'react'
import { fetchMoodSongs } from '../services/mood.api'

export function useMoodPlayer(mood) {
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!mood || mood === 'neutral') {
      setSongs([])
      setSelectedSong(null)
      setError('')
      return
    }

    const loadSongs = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchMoodSongs(mood)
        const nextSongs = data?.songs || []
        setSongs(nextSongs)
        setSelectedSong(nextSongs[0] || null)
      } catch (err) {
        setError('Unable to load songs for this mood.')
        setSongs([])
        setSelectedSong(null)
      } finally {
        setLoading(false)
      }
    }

    loadSongs()
  }, [mood])

  return { songs, selectedSong, setSelectedSong, loading, error }
}
