import {
  getBestMovies,
  getBestMoviesByGenre,
  getMovieDetails,
  getAllGenres
} from './api.js';

import {
  displayBestMovie,
  displayTopRated,
  displayMovieDetailsModal,
  displayGenreDropdown
} from './ui.js';

// Load best movie and next six top-rated movies
const loadBestMovies = async () => {
  const ids = await getBestMovies();

  const bestMovieID = ids[0];
  const bestMovieSection = document.querySelector('#best-movie');

  const otherMovieIDs = ids.slice(1, 7);
  const topRatedSection = document.querySelector('#top-rated');

  const [bestMovie, topRatedMovies] = await Promise.all([
    getMovieDetails(bestMovieID),
    Promise.all(otherMovieIDs.map(id => getMovieDetails(id))),
  ]);

  displayBestMovie(bestMovie, bestMovieSection);
  displayTopRated(topRatedMovies, topRatedSection);
}

// Load the six top-rated movies in a given category
const loadCategory = async (categoryName, categorySection) => {
  const ids = await getBestMoviesByGenre(categoryName);
  const movieIDs = ids.slice(0, 6);

  const movies = await Promise.all(movieIDs.map(id => getMovieDetails(id)));
  displayTopRated(movies, document.querySelector(`#${categorySection}`), categoryName);
};

// Load Movie Details
const loadMovieDetails = async (id, modalSection) => {
  const movie = await getMovieDetails(id);
  displayMovieDetailsModal(movie, document.querySelector(`#${modalSection}`));
}

// Load genre dropdown menu
const loadGenreDropdown = async () => {
  const genres = await getAllGenres();
  const genreMenu = document.querySelector('#genre-menu');
  displayGenreDropdown(genres, genreMenu);

  const select = genreMenu.querySelector('select');
  select.addEventListener('change', async (event) => {
    const selectedGenre = event.target.value;

    if (selectedGenre) {
      loadCategory(selectedGenre, 'other');
    } else {
      document.querySelector('#other').innerHTML = "";
    }
  });
};

const init = async () => {
  loadBestMovies()
  loadCategory('Mystery', 'first-category');
  loadCategory('Comedy', 'second-category');
  loadMovieDetails('88763', 'modal')
  loadGenreDropdown();
};

init();
