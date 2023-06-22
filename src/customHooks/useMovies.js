import { useEffect, useState } from "react";

const KEY = "ad502b6d";

export function useMovies(query, currentPage, setCurrentPage) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}&page=${currentPage}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
        setNumPages(Math.ceil(Number(data.totalResults) / 10));
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setNumPages(0);
      setCurrentPage(1);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query, currentPage, setCurrentPage]);

  return { movies, isLoading, error, numPages };
}
