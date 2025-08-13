export const getBestMovies = () => {
  const baseUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const page1 = fetch(baseUrl).then(res => res.json());
  const page2 = fetch(baseUrl + '&page=2').then(res => res.json());

  return Promise.all([page1, page2]).then(([data1, data2]) => {
    const allMovies = [...data1.results, ...data2.results];
    return allMovies.map(movie => movie.id);
  });
};

export const getBestMoviesByGenre = (genre) => {
  const baseUrl = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`;
  const page1 = fetch(baseUrl).then(res => res.json());
  const page2 = fetch(baseUrl + '&page=2').then(res => res.json());

  return Promise.all([page1, page2]).then(([data1, data2]) => {
    const allMovies = [...data1.results, ...data2.results];
    return allMovies.map(movie => movie.id);
  });
};

export const getMovieDetails = (id) => {
  return fetch(`http://localhost:8000/api/v1/titles/${id}`)
    .then(response => response.json());
};

export const getAllGenres = () => {
  const baseUrl = `http://localhost:8000/api/v1/genres/`;
  const pageUrls = [
    baseUrl,
    baseUrl + '?page=2',
    baseUrl + '?page=3',
    baseUrl + '?page=4',
    baseUrl + '?page=5',
  ];

  const pagePromises = pageUrls.map(url => fetch(url).then(res => res.json()));

  return Promise.all(pagePromises).then(pagesData => {
    const allGenres = pagesData.flatMap(page => page.results);
    return allGenres;
  });
};