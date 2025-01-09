import WatchedMovie from "./WatchedMovie"

const WatchedMoviesList = ({ watched, onMovieSelect }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onMovieSelect={onMovieSelect}/>
      ))}
    </ul>
  )
}

export default WatchedMoviesList
