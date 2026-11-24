import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieDetails,
  toggleFavorite,
  toggleWatchlist,
} from '../redux/actions/movieActions';
import { getPosterUrl, REFERENCE_BANNER_IMG } from '../services/tmdbApi';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, favorites, watchlist, loading, error } = useSelector(
    (state) => state.movies
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-2 text-secondary">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!selectedMovie) return null;

  const isFav = favorites.some((f) => f.id === selectedMovie.id);
  const isWatch = watchlist.some((w) => w.id === selectedMovie.id);
  const castList = selectedMovie.credits?.cast?.slice(0, 8) || [];
  const genres = selectedMovie.genres || [];
  const languages =
    selectedMovie.spoken_languages?.map((l) => l.english_name).join(', ') ||
    selectedMovie.original_language?.toUpperCase() ||
    'English';

  return (
    <div className="card bg-dark border-secondary text-light p-4 shadow">
      <div className="mb-3">
        <Link to="/" className="btn btn-outline-light btn-sm">
          ← Back to Movies
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <img
            src={getPosterUrl(selectedMovie.poster_path)}
            alt={selectedMovie.title}
            className="img-fluid rounded shadow w-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = REFERENCE_BANNER_IMG;
            }}
          />
        </div>

        <div className="col-md-8">
          <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
            <h2 className="fw-bold mb-0">{selectedMovie.title}</h2>
            <span className="badge bg-warning text-dark fs-6">
              ⭐ {Number(selectedMovie.vote_average || 0).toFixed(1)} / 10
            </span>
          </div>

          <p className="text-secondary mb-3">
            <strong>Release Date:</strong> {selectedMovie.release_date || 'N/A'} &nbsp;|&nbsp;
            <strong>Language:</strong> {languages}
          </p>

          <div className="mb-3">
            {genres.map((g) => (
              <span key={g.id} className="badge bg-danger me-2">
                {g.name}
              </span>
            ))}
          </div>

          <h5>Overview</h5>
          <p className="text-light">{selectedMovie.overview || 'No description available.'}</p>

          {isAuthenticated ? (
            <div className="d-flex gap-2 my-4">
              <button
                className={`btn ${isFav ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => dispatch(toggleFavorite(selectedMovie))}
              >
                {isFav ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
              </button>
              <button
                className={`btn ${isWatch ? 'btn-info' : 'btn-outline-info'}`}
                onClick={() => dispatch(toggleWatchlist(selectedMovie))}
              >
                {isWatch ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          ) : (
            <div className="alert alert-secondary py-2 my-3">
              <Link to="/login" className="text-warning fw-bold">
                Sign in
              </Link>{' '}
              to save this movie to your Favorites or Watchlist.
            </div>
          )}

          <h5 className="mt-4">Top Cast</h5>
          {castList.length > 0 ? (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {castList.map((actor) => (
                <span key={actor.id} className="badge cast-badge p-2">
                  {actor.name}{' '}
                  {actor.character && <small className="text-secondary">({actor.character})</small>}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-secondary small">Cast information not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;