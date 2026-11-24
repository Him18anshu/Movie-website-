import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite, toggleWatchlist } from '../redux/actions/movieActions';
import { getPosterUrl } from '../services/tmdbApi';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { favorites, watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="card bg-dark border-secondary text-light p-4 mb-4">
        <h3 className="fw-bold mb-1">{user?.name}'s Profile</h3>
        <p className="text-secondary mb-0">{user?.email}</p>
      </div>

      {/* Favorites Section */}
      <h4 className="fw-bold mb-3">♥ Favorite Movies ({favorites.length})</h4>
      {favorites.length === 0 ? (
        <p className="text-secondary mb-4">No favorite movies added yet.</p>
      ) : (
        <div className="row g-3 mb-5">
          {favorites.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <div className="card bg-dark border-secondary text-light p-3 d-flex flex-row gap-3 align-items-center">
                <img
                  src={getPosterUrl(movie.poster_path)}
                  alt={movie.title}
                  style={{ width: '60px', height: '85px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <div className="flex-grow-1">
                  <Link to={`/movie/${movie.id}`} className="text-white fw-bold text-decoration-none">
                    {movie.title}
                  </Link>
                  <div className="mt-2">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(toggleFavorite(movie))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Watchlist Section */}
      <h4 className="fw-bold mb-3">📌 My Watchlist ({watchlist.length})</h4>
      {watchlist.length === 0 ? (
        <p className="text-secondary">Your watchlist is empty.</p>
      ) : (
        <div className="row g-3">
          {watchlist.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <div className="card bg-dark border-secondary text-light p-3 d-flex flex-row gap-3 align-items-center">
                <img
                  src={getPosterUrl(movie.poster_path)}
                  alt={movie.title}
                  style={{ width: '60px', height: '85px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <div className="flex-grow-1">
                  <Link to={`/movie/${movie.id}`} className="text-white fw-bold text-decoration-none">
                    {movie.title}
                  </Link>
                  <div className="mt-2">
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => dispatch(toggleWatchlist(movie))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;