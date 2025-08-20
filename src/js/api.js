/**
 * Get the best-rated movies from the API (page 1 and 2).
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of movie IDs.
 */
 export const getBestMovies = async () => {
  const baseUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const page1 = fetch(baseUrl).then(res => res.json());
  const page2 = fetch(baseUrl + '&page=2').then(res => res.json());

  const [data1, data2] = await Promise.all([page1, page2])
  const allMovies = [...data1.results, ...data2.results];
  return allMovies.map(movie => movie.id);
};

/**
 * Get the best-rated movies from the API for a given genre (page 1 and 2).
 *
 * @param {string} genre - The movie genre to filter by (e.g., "Comedy", "Mystery").
 * @returns {Promise<string[]>} A promise that resolves to an array of movie IDs.
 */
export const getBestMoviesByGenre = async (genre) => {
  const baseUrl = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`;
  const page1 = fetch(baseUrl).then(res => res.json());
  const page2 = fetch(baseUrl + '&page=2').then(res => res.json());

  const [data1, data2] = await Promise.all([page1, page2]);
  const allMovies = [...data1.results, ...data2.results];
  return allMovies.map(movie => movie.id);
};

/**
 * Get detailed information for a specific movie by its ID.
 *
 * @param {string} id - The ID of the movie to fetch.
 * @returns {Promise<Object>} A promise that resolves to an object containing detailed movie information.
 */
export const getMovieDetails = async (id) => {
  const response = await fetch(`http://localhost:8000/api/v1/titles/${id}`);
  const data = await response.json();
  return data;
};


/**
 * Fetch all available movie genres from the API.
 *
 * @returns {Promise<Array<{id: number, name: string}>>}
 *   A promise that resolves to an array of genre objects,
 *   each containing:
 *     - id: The genre's unique identifier
 *     - name: The name of the genre
 */
export const getAllGenres = async () => {
  const baseUrl = `http://localhost:8000/api/v1/genres/`;
  const pageUrls = [
    baseUrl,
    baseUrl + '?page=2',
    baseUrl + '?page=3',
    baseUrl + '?page=4',
    baseUrl + '?page=5',
  ];

  const pagePromises = pageUrls.map(url => fetch(url).then(res => res.json()));
  const pagesData = await Promise.all(pagePromises);

  const allGenres = pagesData.flatMap(page => page.results);
  return allGenres;
};
