/**
 * Simple mood -> song links mapping service.
 * This is intentionally static so it works without external API keys.
 * You can replace the implementation with calls to Spotify / YouTube APIs later.
 */

const MOOD_MAP = {
  happy: [
    { title: 'Happy - Pharrell Williams', url: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
    { title: 'Can’t Stop The Feeling! - Justin Timberlake', url: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
    { title: 'Walking on Sunshine - Katrina & The Waves', url: 'https://www.youtube.com/watch?v=iPUmE-tne5U' },
    { title: 'Uptown Funk - Mark Ronson ft. Bruno Mars', url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
    { title: 'Good as Hell - Lizzo', url: 'https://www.youtube.com/watch?v=SX_ViT4Ra7k' }
  ],
  sad: [
    { title: 'Someone Like You - Adele', url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
    { title: 'Skinny Love - Bon Iver', url: 'https://www.youtube.com/watch?v=ssdgFoHLwnk' },
    { title: 'Fix You - Coldplay', url: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
    { title: 'The Night We Met - Lord Huron', url: 'https://www.youtube.com/watch?v=KtlgYxa6BMU' },
    { title: 'Let Her Go - Passenger', url: 'https://www.youtube.com/watch?v=RBumgq5yVrA' }
  ],
  surprised: [
    { title: 'Surprise Yourself - Jack Garrett', url: 'https://www.youtube.com/watch?v=someexample1' },
    { title: 'Bohemian Rhapsody - Queen', url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' },
    { title: 'Take On Me - a-ha', url: 'https://www.youtube.com/watch?v=djV11Xbc914' },
    { title: 'Mr. Blue Sky - Electric Light Orchestra', url: 'https://www.youtube.com/watch?v=aQUlA8Hcv4s' },
    { title: 'You Make My Dreams - Hall & Oates', url: 'https://www.youtube.com/watch?v=HkM8mB9o3FE' }
  ],
  angry: [
    { title: 'Killing In The Name - Rage Against The Machine', url: 'https://www.youtube.com/watch?v=bWXazVhlyxQ' },
    { title: 'Break Stuff - Limp Bizkit', url: 'https://www.youtube.com/watch?v=ZpUYjpKg9KY' },
    { title: 'Given Up - Linkin Park', url: 'https://www.youtube.com/watch?v=Qm1u6h7nQK0' },
    { title: 'Bodies - Drowning Pool', url: 'https://www.youtube.com/watch?v=6bJ0sI9R8nE' },
    { title: 'Back In Black - AC/DC', url: 'https://www.youtube.com/watch?v=pAgnJDJN4VA' }
  ],
  neutral: [
    { title: 'Aaj Ki Raat - Don', url: 'https://www.youtube.com/watch?v=7yJtm4jRtCo' },
    { title: 'Sun Saathiya - ABCD 2', url: 'https://www.youtube.com/watch?v=9f8ChhP6GQY' },
    { title: 'Kabira - Yeh Jawaani Hai Deewani', url: 'https://www.youtube.com/watch?v=2n86NKg0S1s' },
    { title: 'Ranjha - Shershaah', url: 'https://www.youtube.com/watch?v=2W4A0oOQm3Q' },
    { title: 'Tere Bin - Sagar', url: 'https://www.youtube.com/watch?v=6YNq7e_ZE6U' }
  ]
}

async function getSongsForMood(mood) {
  if (!mood) return null
  const key = String(mood).trim().toLowerCase()
  if (MOOD_MAP[key]) return MOOD_MAP[key]
  return null
}

function getSupportedMoods() {
  return Object.keys(MOOD_MAP)
}

module.exports = { getSongsForMood, getSupportedMoods }
