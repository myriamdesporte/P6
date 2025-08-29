export const displayBestMovie = (movie, container, onDetailsClick) => {
  container.innerHTML = "";

  const mediaDiv = document.createElement('div');
  mediaDiv.classList.add('best-movie-media');

  const img = document.createElement('img');
  img.src = movie.image_url;
  img.alt = movie.title;
  img.title = movie.title;

  img.onerror = () => {
      img.src = '../src/assets/placeholder.png';
    };

  mediaDiv.appendChild(img);

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('best-movie-details')

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('best-movie-info');

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const description = document.createElement('p');
  description.textContent = movie.description || "Aucune description disponible.";

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('details-button');

  const detailsButton = document.createElement('button');
  detailsButton.textContent = "Détails";
  detailsButton.addEventListener('click', () => {
    if (onDetailsClick) {
      onDetailsClick(movie.id);
    }
  });

  buttonDiv.appendChild(detailsButton);

  infoDiv.append(title, description);

  detailsDiv.append(infoDiv, buttonDiv)

  container.append(mediaDiv, detailsDiv);
};

export const displayTopRated = (movies, container, categoryName, onDetailsClick, onSeeMoreClick) => {
  container.innerHTML = "";

  if (categoryName) {
    const title = document.createElement('h1');
    title.textContent = categoryName;
    container.appendChild(title);
  }

  const grid = document.createElement('div');
  grid.classList.add('top-rated-grid');
  grid.dataset.expanded = 'false'

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const img = document.createElement('img');
    img.src = movie.image_url;
    img.alt = movie.title;
    img.title = movie.title;
    img.onerror = () => { img.src = '../src/assets/placeholder.png'; };

    const overlay = document.createElement('div');
    overlay.classList.add('movie-overlay');

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;

    const detailsButton = document.createElement('button');
    detailsButton.textContent = "Détails";
    if (onDetailsClick) {
      detailsButton.addEventListener('click', () => { onDetailsClick(movie.id); });
    }

    overlay.append(movieTitle, detailsButton);
    movieCard.append(img, overlay);
    grid.appendChild(movieCard);
  });

  container.appendChild(grid);

  const seeMoreButton = document.createElement('button');
  seeMoreButton.classList.add('see-more');
  seeMoreButton.textContent = 'Voir plus';
  if (onSeeMoreClick) {
    seeMoreButton.addEventListener('click', () => { onSeeMoreClick(grid, seeMoreButton); });
  }

  container.appendChild(seeMoreButton);
};

export const displayMovieDetailsModal = (movie, container) => {
  container.innerHTML = "";

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const img = document.createElement('img');
  img.src = movie.image_url;
  img.alt = movie.title;
  img.title = movie.title;

  img.onerror = () => {
      img.src = '../src/assets/placeholder.png';
    };

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const details1 = document.createElement('p')
  details1.textContent = `${movie.year} - ${movie.genres.join(', ')}`;

  const details2 = document.createElement('div')
  details2.textContent = `${movie.duration} minutes (${movie.countries.join('/ ')})`;

  const imdb_score = document.createElement('p');
  imdb_score.textContent = `IMDB score: ${movie.imdb_score}/10`;

  const box_office_income = document.createElement('p');
  const total_income = (movie.usa_gross_income + movie.worldwide_gross_income) / 1_000_000;
  box_office_income.textContent = `Recettes au box office: $${total_income.toFixed(1)}m`;

  const directors = document.createElement('p');
  directors.textContent = `Réalisé par: ${movie.directors.join(', ')}`;

  const description = document.createElement('p');
  description.textContent = movie.long_description;

  const actors = document.createElement('p');
  actors.textContent = `Avec: ${movie.actors.join(', ')}`;

  const closeButton = document.createElement('button');
  closeButton.textContent = "Fermer";
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => {
    container.style.display = 'none';
    container.innerHTML = '';
  });

  modalContent.append(img, title, details1, details2, imdb_score, box_office_income, directors, description, actors, closeButton);

  container.appendChild(modalContent);
  container.style.display = 'flex';
};

export const displayGenreDropdown = (genres, container) => {
  container.innerHTML = "";

  const label = document.createElement('label');
  label.setAttribute('for', 'genre-select');

  const select = document.createElement('select');
  select.id = 'genre-select';

  // Default option
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.textContent = "-- Sélectionnez un genre --";
  select.appendChild(defaultOption);

  // Genres list
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.name;
    option.textContent = genre.name;
    select.appendChild(option);
  });

  container.append(label, select);
};
