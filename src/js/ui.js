export const displayBestMovie = (movie, container) => {
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

  container.append(img, title, description, detailsButton);
};

export const displayTopRated = (movies, container) => {
  container.innerHTML = "";

  movies.forEach(movie => {
    const img = document.createElement('img');
    img.src = movie.image_url;
    img.alt = movie.title;
    img.title = movie.title;

    container.appendChild(img);
  });
};
