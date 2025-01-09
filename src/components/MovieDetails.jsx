import { useEffect, useState } from "react";
import Loader from "./loader";
import ErrorMessage from "./ErrorMesage";
import StarRating from "./StarRating"


const omdb_api_key = process.env.REACT_APP_OMDB_API_KEY;

export default function MovieDetails({ selectedMovieId, onCloseMovie, onAddWatched, onChangeRating, movieRating }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [movieDetails, setMovieDetails] = useState({});
    const [rating, setRating] = useState(movieRating ? movieRating : null);

    const {
        Title: title,
        Director: director,
        Runtime: runtime,
        Genre: genre,
        Plot: plot,
        Poster: poster,
        Released: released,
        imdbRating,
        Year: year,
        Actors: actors
     } = movieDetails;

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedMovieId,
            title,
            year,
            poster,
            userRating: rating,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
        };
        onAddWatched(newWatchedMovie);
    }

    const handleChangeRating = (rating) => {
        setRating(rating)
        onChangeRating(selectedMovieId, rating)
    }

    useEffect(function() {
    async function fetchMovieDetails() {
        try{
            setError('')
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${omdb_api_key}&i=${selectedMovieId}`);
            if(!res.ok) throw new Error("Error while fetching movies, please try again.")

            const data = await res.json();
            if(data.Response === "False") throw new Error(data.Error)
            setMovieDetails(data)
        }catch(error){
            setError(error.message)
            // console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    fetchMovieDetails()
    }, []);

    useEffect(function() {
        if(!title) return
        document.title = `Movie | ${title}`;

        // clean up function
        return () => document.title = "usePopcorn"
    }, [title])

    return (
        <div className="details">
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error}/>}
            {!isLoading && !error && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`poster of ${title}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>{imdbRating} IMDB Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            <StarRating 
                                maxRating={10} 
                                size={24} 
                                onSetRating={handleChangeRating}
                                defaultRating={rating} />
                            <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed by: {director}</p>
                    </section>
                </>)}
        </div>
    )
}