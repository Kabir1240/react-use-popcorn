import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState"


export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query)

  const handleMovieSelect = (id) => {
    setSelectedMovieId(id === selectedMovieId ? null : id);
  }

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  }

  const handleAddWatched = (movie) => {
    try{
      if(watched.find((watchedMovie) => watchedMovie.imdbID === movie.imdbID)) throw new Error("movie already in watchlist")
      setWatched((watched) => [...watched, movie])
    }catch (error){
      alert(error.message)
    }finally{
      handleCloseMovie()
    }
  }

  const handleChangeRating = (movieId, rating) => {
    try{
      setWatched((watched) => watched.map((movie) => movie.imdbID === movieId ? {...movie, userRating: rating} : movie))
      console.log(watched);
    }catch (error){
      alert(error.message)
    }
  }

  const handleDeleteWatched = (movieId) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId))
  }


  return (
    <>
      <Navbar>
        <Logo />
        <Searchbar query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>

      <Main>
        <Box isOpen={isOpen1} setIsOpen={setIsOpen1} >
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!error && !isLoading && <MovieList movies={movies} onMovieSelect={handleMovieSelect} />}
        </Box>

        <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
          {selectedMovieId ? 
              <MovieDetails
                key={selectedMovieId}
                selectedMovieId={selectedMovieId} 
                onCloseMovie={handleCloseMovie} 
                onAddWatched={handleAddWatched}
                onChangeRating={handleChangeRating}
                movieRating={watched.find((watchedMovie) => watchedMovie.imdbID === selectedMovieId)?.userRating} />
          : <>
              <MoviesYouWatched watched={watched} />
              <WatchedMoviesList watched={watched} onMovieSelect={handleMovieSelect} onDeleteWatched={handleDeleteWatched} />
            </>}
        </Box>
      </Main>
    </>
  );
}
