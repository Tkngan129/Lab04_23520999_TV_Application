const API_KEY = "YOUR_API_KEY";

const BASE_URL = "https://api.themoviedb.org/3";

const safeJson = async (res) => {
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
};

export const fetchPopular = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await safeJson(res);
    return (data && data.results) || [];
  } catch (e) {
    return [];
  }
};

export const fetchTopRated = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await safeJson(res);
    return (data && data.results) || [];
  } catch (e) {
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await safeJson(res);
    return (data && data.results) || [];
  } catch (e) {
    return [];
  }
};
