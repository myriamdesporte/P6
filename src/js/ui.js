export const displayBestMovie = (movie, container, onDetailsClick) => {
  container.innerHTML = "";

  const img = document.createElement('img');
  img.src = movie.image_url;
  img.alt = movie.title;

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const description = document.createElement('p');
  description.textContent = movie.description || "Aucune description disponible.";

  const detailsButton = document.createElement('button');
  detailsButton.textContent = "Détails";
  detailsButton.addEventListener('click', () => {
    if (onDetailsClick) {
      onDetailsClick(movie.id)
    }
  });

  container.append(img, title, description, detailsButton);
};

export const displayTopRated = (movies, container, categoryName, onDetailsClick) => {
  container.innerHTML = "";

  if (categoryName) {
    const title = document.createElement('h1');
    title.textContent = categoryName;
    container.appendChild(title);
  }

  movies.forEach(movie => {
    const img = document.createElement('img');
    img.src = movie.image_url;
    img.alt = movie.title;
    img.title = movie.title;

    if (onDetailsClick) {
      img.addEventListener('click', () => {onDetailsClick(movie.id)});
    }

    container.appendChild(img);
  });
};

export const displayMovieDetailsModal = (movie, container) => {
  container.innerHTML = "";

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const img = document.createElement('img');
  img.src = movie.image_url;
  img.alt = movie.title;
  img.title = movie.title;

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
  label.textContent = "Autres : ";
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
