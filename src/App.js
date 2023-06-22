import { useState, useRef } from "react";
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorageState } from "./customHooks/useLocalStorageState";
import { Pagination } from "./components/Pagination";
import { ErrorMessage } from "./components/ErrorMessage";
import { Search } from "./components/Search";
import { Loader } from "./components/Loader";
import { SelectedMovie } from "./components/SelectedMovie";
import { MovieList } from "./components/MovieList";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMovieList } from "./components/WatchedMovieList";
import { Box } from "./components/Box";
import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { NumResults } from "./components/NumResults";
import { Main } from "./components/Main";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watchedMovies");
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, isLoading, error, numPages } = useMovies(
    query,
    currentPage,
    setCurrentPage
  );
  const watchedMoviesEle = useRef(null);

  function scrollUp() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleNextPage() {
    if (currentPage === numPages) return;
    setCurrentPage((currentPage) => currentPage + 1);
    scrollUp();
  }

  function handlePrevPage() {
    if (currentPage === 1) return;
    setCurrentPage((currentPage) => currentPage - 1);
    scrollUp();
  }

  function handleFirstPage() {
    if (currentPage !== 1) setCurrentPage(1);
    scrollUp();
  }

  function handleLastPage() {
    if (currentPage !== numPages) setCurrentPage(numPages);
    scrollUp();
  }

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    watchedMoviesEle.current.scrollIntoView({ behavior: "smooth" });
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) =>
      [...watched].filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults numPages={numPages} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && query.length > 2 && (
            <>
              <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
              <Pagination
                numPages={numPages}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                currentPage={currentPage}
                onFirstPage={handleFirstPage}
                onLastPage={handleLastPage}
              />
            </>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box reference={watchedMoviesEle}>
          <>
            {selectedId ? (
              <SelectedMovie
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
