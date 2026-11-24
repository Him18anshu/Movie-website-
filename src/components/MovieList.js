import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchPopularMovies,
  toggleFavorite,
  toggleWatchlist,
} from '../redux/actions/movieActions';
import { getPosterUrl, REFERENCE_BANNER_IMG } from '../services/tmdbApi';

const MovieList = () => {
  const dispatch = useDispatch();
  const { popularMovies, customMovies, favorites, watchlist, loading, error } = useSelector(
    (state) => state.movies
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const allMovies = [...customMovies, ...popularMovies];

  return (
    <div>
      {/* Reference Link Featured Hero Banner */}
      <div
        className="hero-banner mb-4 shadow"
        style={{ backgroundImage: `url('${REFERENCE_BANNER_IMG}')` }}
      >
        <div className="hero-overlay">
          <span className="badge bg-danger mb-2">FEATURED SHOWCASE</span>
          <h1 className="fw-bold display-6">Explore Unlimited Movies</h1>
          <p className="text-light mb-3 col-md-8">
            Browse trending blockbusters, search by title, add custom movie entries, and build your personal watchlist.
          </p>
          <div className="d-flex gap-2">
            <Link to="/search" className="btn btn-danger">
              Search Movies
            </Link>
            <Link to="/add-movie" className="btn btn-outline-light">
              + Add Movie Details
            </Link>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold m-0">Popular Movies</h3>
        <span className="text-secondary small">{allMovies.length} Movies Available</span>
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-secondary">Fetching movies...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        {allMovies.map((movie) => {
          const isFav = favorites.some((f) => f.id === movie.id);
          const isWatch = watchlist.some((w) => w.id === movie.id);

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={movie.id}>
              <div className="card movie-card text-light">
                <img
                  src={getPosterUrl(movie.poster_path)}
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = REFERENCE_BANNER_IMG;
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fs-6 fw-bold mb-0">{movie.title}</h5>
                    <span className="badge bg-warning text-dark">
                      ⭐ {Number(movie.vote_average || 0).toFixed(1)}
                    </span>
                  </div>

                  <p className="small text-info text-uppercase mb-1">
                    Language: {movie.original_language || 'EN'}
                  </p>

                  <p className="card-text small text-secondary flex-grow-1">
                    {movie.overview
                      ? `${movie.overview.slice(0, 90)}...`
                      : 'No description available.'}
                  </p>

                  <div className="d-grid gap-2 mt-2">
                    <Link to={`/movie/${movie.id}`} className="btn btn-danger btn-sm">
                      View Details
                    </Link>

                    {isAuthenticated && (
                      <div className="btn-group btn-group-sm">
                        <button
                          className={`btn ${isFav ? 'btn-warning' : 'btn-outline-warning'}`}
                          onClick={() => dispatch(toggleFavorite(movie))}
                        >
                          {isFav ? '♥ Favorited' : '♡ Favorite'}
                        </button>
                        <button
                          className={`btn ${isWatch ? 'btn-info' : 'btn-outline-info'}`}
                          onClick={() => dispatch(toggleWatchlist(movie))}
                        >
                          {isWatch ? '✓ Watchlist' : '+ Watchlist'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;