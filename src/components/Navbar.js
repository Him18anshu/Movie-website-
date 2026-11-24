import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { favorites, watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-danger fs-4" to="/">
          🎬 CineVault
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Popular Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Movie Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-movie">
                + Add Movie
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile{' '}
                {isAuthenticated && (
                  <span className="badge bg-danger ms-1">
                    {favorites.length + watchlist.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className="text-light small me-2">
                  Hi, <strong>{user?.name}</strong>
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link className="btn btn-danger btn-sm px-3" to="/login">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;