import { getBestMovies, getBestMoviesByGenre, getMovieDetails } from './api.js';
import { displayBestMovie, displayTopRated } from './ui.js';
const bestMovieSection = document.getElementById('best-movie');
const topRatedSection = document.getElementById('top-rated');
const mysterySection = document.getElementById('mystery');
const comedySection = document.getElementById('comedy');

// Best movie
getBestMovies()
  .then(ids => {
    const bestMovieID = ids[0];
    return getMovieDetails(bestMovieID);
  })
  .then(movie => {
    displayBestMovie(movie, bestMovieSection);
  })

// Next 6 highest-rated movies
getBestMovies()
  .then(ids => {
    const otherMovieIDs = ids.slice(1, 7); // on prend les suivants
    return Promise.all(otherMovieIDs.map(id => getMovieDetails(id)));
  })
  .then(movies => {
    displayTopRated(movies, topRatedSection);
  })

// 6 highest-rated movies in Mystery category
getBestMoviesByGenre('Mystery')
  .then(ids => {
    const movieIDs = ids.slice(0, 6); // on prend les suivants
    return Promise.all(movieIDs.map(id => getMovieDetails(id)));
  })
  .then(movies => {
    displayTopRated(movies, mysterySection);
  })

// 6 highest-rated movies in Comedy category
getBestMoviesByGenre('Comedy')
  .then(ids => {
    const movieIDs = ids.slice(0, 6); // on prend les suivants
    return Promise.all(movieIDs.map(id => getMovieDetails(id)));
  })
  .then(movies => {
    displayTopRated(movies, comedySection);
  })
