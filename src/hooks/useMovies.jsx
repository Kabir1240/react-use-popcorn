import { useEffect, useState } from "react";

// get the API key from https://www.omdbapi.com/
const omdb_api_key = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query) {
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(function() {
    const controller = new AbortController()
    async function fetchMovies() {
        try{
        setError('')
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${omdb_api_key}&s=${query}`, { signal: controller.signal });
        if(!res.ok) throw new Error("Error while fetching movies, please try again.")

        const data = await res.json();
        if(data.Response === "False") throw new Error(data.Error)
        setMovies(data.Search)
        }catch(error){
        if (error.name !== "AbortError"){
            setError(error.message)
        } 
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

    return () => controller.abort();
    }, [query]);

    return {movies, isLoading, error}
}