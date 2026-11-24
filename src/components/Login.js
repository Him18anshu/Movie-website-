import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/authActions';
import { REFERENCE_BANNER_IMG } from '../services/tmdbApi';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    dispatch(
      loginUser({
        name: name.trim() || email.split('@')[0],
        email,
      })
    );
    navigate('/profile');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card bg-dark border-secondary text-light overflow-hidden shadow">
          <img
            src={REFERENCE_BANNER_IMG}
            alt="CineVault Banner"
            style={{ height: '140px', objectFit: 'cover' }}
          />
          <div className="p-4">
            <h3 className="fw-bold mb-1">Welcome Back</h3>
            <p className="text-secondary small mb-3">
              Sign in to manage your Favorites, Watchlist, and Custom Movies.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;