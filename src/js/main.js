import { getBestMovies, getBestMoviesByGenre, getMovieDetails, getAllGenres } from './api.js';
import { displayBestMovie, displayTopRated, displayMovieDetailsModal, displayGenreDropdown } from './ui.js';

const bestMovieSection = document.getElementById('best-movie');
const topRatedSection = document.getElementById('top-rated');
const mysterySection = document.getElementById('mystery');
const comedySection = document.getElementById('comedy');
const detailsModal = document.getElementById('details-modal')
const genreMenu = document.getElementById('genre-menu');
const otherCategory = document.getElementById('other');


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
    const otherMovieIDs = ids.slice(1, 7);
    return Promise.all(otherMovieIDs.map(id => getMovieDetails(id)));
  })
  .then(movies => {
    displayTopRated(movies, topRatedSection);
  })

// 6 highest-rated movies in Mystery category
getBestMoviesByGenre('Mystery')
  .then(ids => {
    const movieIDs = ids.slice(0, 6);
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

// Movie Details Modal
getMovieDetails('118715').then(movie => {
    displayMovieDetailsModal(movie, detailsModal);
  })

// Genres Dropdown menu
getAllGenres().then(genres => {
  displayGenreDropdown(genres, genreMenu);

  const select = document.getElementById('genre-select');
  select.addEventListener('change', (event) => {
  const selectedGenre = event.target.value;
  if (selectedGenre) {
    getBestMoviesByGenre(selectedGenre).then(ids => {
      return Promise.all(ids.slice(0, 6).map(id => getMovieDetails(id)));
    }).then(movies => {
      displayTopRated(movies, otherCategory);
    });
  } else {
    otherCategory.innerHTML = "";
  }
 });
});
