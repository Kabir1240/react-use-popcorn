import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"
import Logo from "./components/Logo"
import Searchbar from "./components/Searchbar"
import Results from "./components/Results"
import Main from "./components/Main"
import MovieList from "./components/MovieList";
import Box from "./components/Box"
import MoviesYouWatched from "./components/MoviesYouWatched"
import WatchedMoviesList from "./components/WatchedMoviesList"
import Loader from "./components/loader"
import ErrorMessage from "./components/ErrorMesage";
import MovieDetails from "./components/MovieDetails";

const omdb_api_key = process.env.REACT_APP_OMDB_API_KEY;


export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const handleMovieSelect = (id) => {
    setSelectedMovieId(id === selectedMovieId ? null : id);
  }

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  }

  useEffect(function() {
    async function fetchMovies() {
      try{
        setError('')
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${omdb_api_key}&s=${query}`);
        if(!res.ok) throw new Error("Error while fetching movies, please try again.")

        const data = await res.json();
        if(data.Response === "False") throw new Error(data.Error)
        setMovies(data.Search)
      }catch(error){
        setError(error.message)
      }finally{
        setIsLoading(false);
      }
    };

    if(query.length < 3){
      setMovies([])
      setError('')
      return;
    }
    fetchMovies()
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Searchbar query={query} setQuery={setQuery}/>
        <Results movies={movies}/>
      </Navbar>

      <Main>
        <Box isOpen={isOpen1} setIsOpen={setIsOpen1}>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!error && !isLoading && <MovieList movies={movies} onMovieSelect={handleMovieSelect}/>}
        </Box>

        <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
          {selectedMovieId ? <MovieDetails selectedMovieId={selectedMovieId} onCloseMovie={handleCloseMovie}/>
          : <>
              <MoviesYouWatched watched={watched}/>
              <WatchedMoviesList watched={watched}/>
            </>}
        </Box>
      </Main>
    </>
  );
}
