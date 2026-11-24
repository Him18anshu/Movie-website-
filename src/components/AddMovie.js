import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCustomMovie } from '../redux/actions/movieActions';
import { REFERENCE_BANNER_IMG } from '../services/tmdbApi';

const AddMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    poster: REFERENCE_BANNER_IMG,
    languages: 'English, Hindi',
    description: '',
    rating: '8.5',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    dispatch(addCustomMovie(formData));
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="card bg-dark border-secondary text-light p-4 shadow">
          <h3 className="fw-bold mb-3">Add Movie Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Movie Title *</label>
              <input
                type="text"
                name="title"
                className="form-control bg-secondary text-white border-0"
                placeholder="Enter movie title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Poster Image URL</label>
              <input
                type="url"
                name="poster"
                className="form-control bg-secondary text-white border-0"
                placeholder="https://..."
                value={formData.poster}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Languages</label>
                <input
                  type="text"
                  name="languages"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="e.g., English, Hindi"
                  value={formData.languages}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Rating (0 - 10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="rating"
                  className="form-control bg-secondary text-white border-0"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                rows="3"
                className="form-control bg-secondary text-white border-0"
                placeholder="Write a short synopsis..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-bold">
              Save Movie to Library
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;