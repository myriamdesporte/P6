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
  const allMovieIDs = await getBestMovies();

  const bestMovieID = allMovieIDs[0];
  const bestMovieSection = document.querySelector('#best-movie');

  const otherMovieIDs = allMovieIDs.slice(1, 7);
  const topRatedSection = document.querySelector('#top-rated');

  const [bestMovie, topRatedMovies] = await Promise.all([
    getMovieDetails(bestMovieID),
    Promise.all(otherMovieIDs.map(id => getMovieDetails(id))),
  ]);

  displayBestMovie(bestMovie, bestMovieSection, onDetailsClick);
  displayTopRated(topRatedMovies, topRatedSection, null, onDetailsClick, onSeeMoreClick);
}

// Load the six top-rated movies in a given category
const loadCategory = async (categoryName, sectionId) => {
  const allCategoryIDs = await getBestMoviesByGenre(categoryName);
  const categoryMovieIDs = allCategoryIDs.slice(0, 6);

  const categoryMovies = await Promise.all(categoryMovieIDs.map(id => getMovieDetails(id)));
  displayTopRated(categoryMovies, document.querySelector(`#${sectionId}`), categoryName, onDetailsClick, onSeeMoreClick);
};

// Load Movie Details
const loadMovieDetails = async (id, modalId) => {
  const movie = await getMovieDetails(id);
  displayMovieDetailsModal(movie, document.querySelector(`#${modalId}`));
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

// Callback function triggered when a "Details" button is clicked
const onDetailsClick = (id) => {
  loadMovieDetails(id, 'modal')
};

// Callback function triggered when a "SeeMore" button is clicked
const onSeeMoreClick = (grid, button) => {
  const isExpanded = grid.dataset.expanded === 'true';

  if (!isExpanded) {
    grid.style.height = 'auto';
    button.textContent = 'Voir moins';
    grid.dataset.expanded = 'true';
  } else {
    grid.style.height = '660px';
    button.textContent = 'Voir plus';
    grid.dataset.expanded = 'false';
  }
};


const init = () => {
  loadBestMovies();
  loadCategory('Mystery', 'first-category');
  loadCategory('Comedy', 'second-category');
  loadGenreDropdown();
};

init();
