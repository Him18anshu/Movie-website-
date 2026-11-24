import {
  FETCH_MOVIES_REQUEST,
  FETCH_POPULAR_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  ADD_CUSTOM_MOVIE,
  TOGGLE_FAVORITE,
  TOGGLE_WATCHLIST,
} from './types';
import {
  TMDB_API_KEY,
  SAMPLE_MOVIES,
  apiFetchPopularMovies,
  apiSearchMovies,
  apiFetchMovieDetails,
} from '../../services/tmdbApi';

export const fetchPopularMovies = () => async (dispatch) => {
  dispatch({ type: FETCH_MOVIES_REQUEST });
  try {
    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
      dispatch({ type: FETCH_POPULAR_SUCCESS, payload: SAMPLE_MOVIES });
      return;
    }
    const response = await apiFetchPopularMovies();
    dispatch({
      type: FETCH_POPULAR_SUCCESS,
      payload: response.data.results,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MOVIES_FAILURE,
      payload: error.response?.data?.status_message || 'Failed to fetch popular movies.',
    });
  }
};

export const searchMovies = (query) => async (dispatch, getState) => {
  if (!query.trim()) {
    dispatch({ type: SEARCH_MOVIES_SUCCESS, payload: [] });
    return;
  }

  dispatch({ type: SEARCH_MOVIES_REQUEST });
  try {
    const { customMovies } = getState().movies;
    const localMatches = customMovies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );

    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
      const sampleMatches = SAMPLE_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      );
      dispatch({
        type: SEARCH_MOVIES_SUCCESS,
        payload: [...localMatches, ...sampleMatches],
      });
      return;
    }

    const response = await apiSearchMovies(query);
    dispatch({
      type: SEARCH_MOVIES_SUCCESS,
      payload: [...localMatches, ...response.data.results],
    });
  } catch (error) {
    dispatch({
      type: SEARCH_MOVIES_FAILURE,
      payload: error.response?.data?.status_message || 'Error searching movies.',
    });
  }
};

export const fetchMovieDetails = (movieId) => async (dispatch, getState) => {
  dispatch({ type: FETCH_DETAILS_REQUEST });
  try {
    const { customMovies, popularMovies } = getState().movies;
    const localMovie = [...customMovies, ...popularMovies, ...SAMPLE_MOVIES].find(
      (m) => String(m.id) === String(movieId)
    );

    if (String(movieId).startsWith('custom-') || TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
      if (localMovie) {
        dispatch({ type: FETCH_DETAILS_SUCCESS, payload: localMovie });
      } else {
        dispatch({ type: FETCH_DETAILS_FAILURE, payload: 'Movie not found.' });
      }
      return;
    }

    const response = await apiFetchMovieDetails(movieId);
    dispatch({
      type: FETCH_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DETAILS_FAILURE,
      payload: error.response?.data?.status_message || 'Failed to load movie details.',
    });
  }
};

export const addCustomMovie = (movieData) => ({
  type: ADD_CUSTOM_MOVIE,
  payload: {
    id: `custom-${Date.now()}`,
    title: movieData.title,
    poster_path: movieData.poster,
    original_language: movieData.languages,
    overview: movieData.description,
    vote_average: parseFloat(movieData.rating) || 0,
    release_date: new Date().toISOString().split('T')[0],
    genres: [{ id: 99, name: 'User Added' }],
    credits: { cast: [] },
  },
});

export const toggleFavorite = (movie) => ({
  type: TOGGLE_FAVORITE,
  payload: movie,
});

export const toggleWatchlist = (movie) => ({
  type: TOGGLE_WATCHLIST,
  payload: movie,
});