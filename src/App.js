import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import AddMovie from './components/AddMovie';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-movie"
            element={
              <PrivateRoute>
                <AddMovie />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;