import { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import Search from "./Search";
import NumResults from "./NumResults";
import MovieSearch from "./MovieSearch";
import Box from "./Box";
import WatchedSummary from "./WatchedSummary";
import WatchedMovie from "./WatchedMovie";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import WatchedMoviesList from "./WatchedMoviesList";

const key = "333b2099";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("rush");
  const [selectedId, setSelectedId] = useState(null);

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

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`);
          if (!res.ok) throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
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
