import Movie from "./Movie";

const MovieList = ({ movies, onMovieSelect }) => {
    return (
      <ul className="list">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} onMovieSelect={onMovieSelect}/>
        ))}
      </ul>
    )
  }

export default MovieList;