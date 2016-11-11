const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed'
const BASE_URL = 'https://api.themoviedb.org/3/movie'
export const NOW_PLAYING_URL = `${BASE_URL}/now_playing?api_key=${API_KEY}`
export const TOP_RATED_URL= `${BASE_URL}/top_rated?api_key=${API_KEY}`

const IMAGE_URI_PREFIX = 'https://image.tmdb.org/t/p/original'
const IMAGE_URI_PREFIX_LOW = 'https://image.tmdb.org/t/p/w45'

export const getPosterUrl = posterPath => `${IMAGE_URI_PREFIX}/${posterPath}`
export const getPosterUrlLow = posterPath => `${IMAGE_URI_PREFIX_LOW}/${posterPath}`

export const getYouTubeUrl = id => (
 fetch(`https://api.themoviedb.org/3/movie/${id}/trailers?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`)
   .then((response) => response.json())
   .then((response) => `https://www.youtube.com/watch?v=${response.youtube[0].source}`)
)

export const fetchMovies = url => (
  fetch(url)
    .then((response) => response.json())
    .then((response) => response.results)
)
