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
    const title = document.createElement('h2');
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

  // --- Close buttons ---
  const closeModal = () => {
    container.style.display = 'none';
    container.innerHTML = '';
    document.body.classList.remove('modal-open');
  };

  const closeButtonTop = document.createElement('button');
  closeButtonTop.textContent = "❌";
  closeButtonTop.setAttribute('aria-label', 'Fermer');
  closeButtonTop.classList.add('close-button', 'close-top');
  closeButtonTop.addEventListener('click', closeModal);

  const closeButtonBottom = document.createElement('button');
  closeButtonBottom.textContent = "Fermer";
  closeButtonBottom.setAttribute('aria-label', 'Fermer');
  closeButtonBottom.classList.add('close-button', 'close-bottom');
  closeButtonBottom.addEventListener('click', closeModal);

  // --- Text info ---
  const title = document.createElement('h2');
  title.textContent = movie.title || "Titre indisponible";

  const details1 = document.createElement('p');
  details1.textContent = `${movie.year || 'N/A'} - ${(movie.genres || []).join(', ')}`;

  const details2 = document.createElement('p');
  details2.textContent = `${movie.duration || '?'} minutes (${(movie.countries || []).join('/ ')})`;

  const imdb_score = document.createElement('p');
  imdb_score.textContent = `IMDB score: ${movie.imdb_score || 'N/A'}/10`;

  const usa = movie.usa_gross_income || 0;
  const worldwide = movie.worldwide_gross_income || 0;
  const total_income = (usa + worldwide) / 1_000_000;
  const box_office_income = document.createElement('p');
  box_office_income.textContent = `Recettes au box office: $${total_income.toFixed(1)}m`;

  const directorsLabel = document.createElement('p');
  directorsLabel.textContent = "Réalisé par: ";
  directorsLabel.classList.add('directed-by-label');

  const directorsText = document.createElement('p');
  directorsText.textContent = `${(movie.directors || []).join(', ')}`;
  directorsText.classList.add('movie-directors');

  const directorsContent = document.createElement('div');
  directorsContent.classList.add('directors-content');
  directorsContent.append(directorsLabel, directorsText);

  const movieInfo = document.createElement('div');
  movieInfo.classList.add('movie-info');
  movieInfo.append(title, details1, details2, imdb_score, box_office_income);

  const movieTopDetails = document.createElement('div');
  movieTopDetails.classList.add('movie-top-details');
  movieTopDetails.append(movieInfo, directorsContent);

  // --- Images ---
  const mobileImage = document.createElement('img');
  mobileImage.src = movie.image_url;
  mobileImage.alt = `Affiche du film ${movie.title}`;
  mobileImage.title = movie.title;
  mobileImage.classList.add('mobile-img');
  mobileImage.onerror = () => {
    mobileImage.src = '../src/assets/placeholder.png';
  };

  const desktopImage = document.createElement('img');
  desktopImage.src = movie.image_url;
  desktopImage.alt = `Affiche du film ${movie.title}`;
  desktopImage.title = movie.title;
  desktopImage.classList.add('desktop-img');
  desktopImage.onerror = () => {
    desktopImage.src = '../src/assets/placeholder.png';
  };

  // --- Actors ---
  const actorsLabel = document.createElement('p');
  actorsLabel.textContent = "Avec: ";
  actorsLabel.classList.add('with-label');

  const actorsText = document.createElement('p');
  actorsText.textContent = `${(movie.actors || []).join(', ')}`;
  actorsText.classList.add('movie-actors');

  const actorsContent = document.createElement('div');
  actorsContent.classList.add('actors-content');
  actorsContent.append(actorsLabel, actorsText);

  // --- Description ---
  const description = document.createElement('p');
  description.textContent = movie.long_description || "Aucune description disponible.";
  description.classList.add('movie-description');

  // --- Modal Header & Footer ---
  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');
  modalHeader.append(movieTopDetails, desktopImage, closeButtonTop);

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');
  modalFooter.append(closeButtonBottom);

  // --- Compose Modal ---
  modalContent.append(modalHeader, description, mobileImage, actorsContent, modalFooter);
  container.appendChild(modalContent);
  container.style.display = 'flex';

  document.body.classList.add('modal-open');
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
