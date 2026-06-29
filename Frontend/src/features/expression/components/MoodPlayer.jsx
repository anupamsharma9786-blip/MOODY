import { useEffect, useMemo, useRef } from 'react'
import { useMoodPlayer } from '../hooks/useMoodPlayer'

function MoodPlayer({ mood }) {
  const { songs, selectedSong, setSelectedSong, loading, error } = useMoodPlayer(mood)
  const audioRef = useRef(null)

  const embedUrl = useMemo(() => {
    if (!selectedSong?.url) return ''
    const videoId = extractYouTubeVideoId(selectedSong.url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&controls=1` : ''
  }, [selectedSong])

  useEffect(() => {
    if (!audioRef.current || !embedUrl) return

    const iframe = audioRef.current
    iframe.src = embedUrl
  }, [embedUrl])

  return (
    <div style={{ marginTop: 24, width: '100%', maxWidth: 640 }}>
      <h3 className="player-title">Recommended songs</h3>
      {loading && <p>Loading songs...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && songs.length === 0 && <p className="player-copy">No songs found for this mood.</p>}

      {songs.length > 0 && (
        <>
          <select
            value={selectedSong?.title || ''}
            onChange={(event) => {
              const song = songs.find((item) => item.title === event.target.value)
              setSelectedSong(song || null)
            }}
            className="player-select"
          >
            {songs.map((song) => (
              <option key={song.title} value={song.title}>
                {song.title}
              </option>
            ))}
          </select>

          {embedUrl ? (
            <div className="player-shell">
              <p className="player-copy">Now playing: {selectedSong?.title}</p>
              <div className="player-frame">
                <iframe
                  ref={audioRef}
                  title="Mood song player"
                  width="100%"
                  height="220"
                  src={embedUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="player-frame"
                  style={{ border: 0, borderRadius: 16 }}
                />
              </div>
            </div>
          ) : (
            <p className="player-copy">Preview is not available for this song link.</p>
          )}
        </>
      )}
    </div>
  )
}

export default MoodPlayer

function extractYouTubeVideoId(url) {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v') || ''
    }
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.split('/').filter(Boolean)[0] || ''
    }
  } catch {
    return ''
  }

  return ''
}
