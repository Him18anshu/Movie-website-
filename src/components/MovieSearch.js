import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchMovies } from '../redux/actions/movieActions';
import { getPosterUrl, REFERENCE_BANNER_IMG } from '../services/tmdbApi';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.movies);

  // Dynamically updates search results as user types (with 400ms debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchMovies(query));
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  return (
    <div>
      <div className="card bg-dark border-secondary p-4 mb-4">
        <h3 className="fw-bold mb-3">Search Movies</h3>
        <input
          type="text"
          className="form-control form-control-lg bg-secondary text-white border-0"
          placeholder="Type movie name (e.g., Cyro, Inception, Interstellar)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-danger" role="status"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && query.trim() !== '' && searchResults.length === 0 && (
        <div className="alert alert-secondary">No movies found for "{query}".</div>
      )}

      <div className="row g-4">
        {searchResults.map((movie) => (
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
                <p className="small text-secondary flex-grow-1">
                  {movie.overview ? `${movie.overview.slice(0, 85)}...` : 'No description.'}
                </p>
                <Link to={`/movie/${movie.id}`} className="btn btn-danger btn-sm mt-2">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;