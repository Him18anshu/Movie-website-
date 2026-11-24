import axios from 'axios';

// Apni TMDb API key yahan paste kar (https://www.themoviedb.org/settings/api)
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_API_KEY';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const REFERENCE_BANNER_IMG = 'https://www.vidpaw.com/img/topics/cyro-se.jpg';

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Fallback sample movies (Reference image included) agar API key set na ho
export const SAMPLE_MOVIES = [
  {
    id: 101,
    title: 'Cyro: Beyond the Horizon',
    poster_path: REFERENCE_BANNER_IMG,
    original_language: 'en',
    overview: 'An elite cybernetic navigator uncovers a hidden signal across deep space that threatens humanity.',
    vote_average: 8.6,
    release_date: '2026-05-15',
    genres: [{ id: 1, name: 'Sci-Fi' }, { id: 2, name: 'Action' }],
    credits: {
      cast: [
        { id: 1, name: 'Aarav Mehta', character: 'Commander Cyro' },
        { id: 2, name: 'Elena Vance', character: 'Dr. Lyra' },
        { id: 3, name: 'Kenji Sato', character: 'Kael' },
      ],
    },
  },
  {
    id: 102,
    title: 'Inception',
    poster_path: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    original_language: 'en',
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
    vote_average: 8.4,
    release_date: '2010-07-16',
    genres: [{ id: 1, name: 'Action' }, { id: 3, name: 'Thriller' }],
    credits: {
      cast: [
        { id: 4, name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
        { id: 5, name: 'Joseph Gordon-Levitt', character: 'Arthur' },
      ],
    },
  },
  {
    id: 103,
    title: 'Interstellar',
    poster_path: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    original_language: 'en',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
    vote_average: 8.7,
    release_date: '2014-11-07',
    genres: [{ id: 4, name: 'Adventure' }, { id: 5, name: 'Drama' }],
    credits: {
      cast: [
        { id: 6, name: 'Matthew McConaughey', character: 'Cooper' },
        { id: 7, name: 'Anne Hathaway', character: 'Brand' },
      ],
    },
  },
];

export const getPosterUrl = (posterPath) => {
  if (!posterPath) return REFERENCE_BANNER_IMG;
  if (posterPath.startsWith('http')) return posterPath;
  return `${IMAGE_BASE_URL}${posterPath}`;
};

export const apiFetchPopularMovies = () => tmdbClient.get('/movie/popular');

export const apiSearchMovies = (query) =>
  tmdbClient.get('/search/movie', { params: { query } });

export const apiFetchMovieDetails = (movieId) =>
  tmdbClient.get(`/movie/${movieId}`, {
    params: { append_to_response: 'credits' },
  });