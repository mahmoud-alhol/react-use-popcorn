import { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import Search from "./Search";
import NumResults from "./NumResults";
import MovieSearch from "./MovieSearch";
import Box from "./Box";
import WatchedSummary from "./WatchedSummary";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import WatchedMoviesList from "./WatchedMoviesList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

const key = "333b2099";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {!isLoading && !error && <MovieSearch movies={movies} onClick={handleSelectMovie} />}
          {isLoading && <Loading />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              movieKey={key}
              selectedId={selectedId}
              onClose={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <ul>
                <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </ul>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
