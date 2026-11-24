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
} from '../actions/types';

const initialState = {
  popularMovies: [],
  customMovies: [],
  searchResults: [],
  selectedMovie: null,
  favorites: [],
  watchlist: [],
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
    case SEARCH_MOVIES_REQUEST:
    case FETCH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        loading: false,
        popularMovies: action.payload,
      };

    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };

    case FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedMovie: action.payload,
      };

    case FETCH_MOVIES_FAILURE:
    case SEARCH_MOVIES_FAILURE:
    case FETCH_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_CUSTOM_MOVIE:
      return {
        ...state,
        customMovies: [action.payload, ...state.customMovies],
      };

    case TOGGLE_FAVORITE: {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }

    case TOGGLE_WATCHLIST: {
      const exists = state.watchlist.some((m) => m.id === action.payload.id);
      return {
        ...state,
        watchlist: exists
          ? state.watchlist.filter((m) => m.id !== action.payload.id)
          : [...state.watchlist, action.payload],
      };
    }

    default:
      return state;
  }
};

export default movieReducer;