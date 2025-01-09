const WatchedMovie = ({ movie, onMovieSelect, onDeleteWatched }) => {
    return (
      <li>
        <img src={movie.poster} alt={`${movie.title} poster`} onClick={() => onMovieSelect(movie.imdbID)} />
        <h3 onClick={() => onMovieSelect(movie.imdbID)}>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating ? movie.userRating : "N/A"}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>

          <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
        </div>
      </li>
      )
  }

export default WatchedMovie;