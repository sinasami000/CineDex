import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import MovieCard from "../components/MovieCard";
import LoadingAnimation from "../components/LoadingAnimation";

function SearchPage({ storedMovies, setMovies }) {
  const { movie_name } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?query=${movie_name}&api_key=d57381ec58bf6bd7bf0af593e71fc800`
      )
      .then((res) => {
        setResults(
          res.data.results.filter((each) => each.media_type !== "person")
        );
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="w-full text-white min-h-screen bg-zinc-800">
      <NavBar />
      <SearchBox />
      <div className="container">
        <h1 className="text-indigo-400">Seach Results for "{movie_name}"</h1>
        {results && results.length > 0 ? (
          <>
            <h1 className="text-indigo-400">Results: {results.length}</h1>
            <div className="search-movies grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
              {results.length > 0 ? (
                results.map((movie) => (
                  <MovieCard
                    storedMovies={storedMovies}
                    setMovies={setMovies}
                    key={movie.id}
                    id={movie.id}
                    movie={movie}
                    movie_name={movie.original_title || movie.name}
                    poster_url={`https://image.tmdb.org/t/p/w500/${
                      movie.poster_path || movie.backdrop_path
                    }`}
                    release_date={movie.release_date || movie.first_air_date}
                    genre_ids={movie.genre_ids}
                    vote_average={movie.vote_average}
                    type={movie.media_type}
                  />
                ))
              ) : (
                <div>No movies to show</div>
              )}
            </div>
          </>
        ) : (
          <div>No Movie Found</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
