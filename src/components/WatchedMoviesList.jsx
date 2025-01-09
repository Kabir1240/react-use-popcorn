import WatchedMovie from "./WatchedMovie"

const WatchedMoviesList = ({ watched, onMovieSelect, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onMovieSelect={onMovieSelect} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  )
}

export default WatchedMoviesList
