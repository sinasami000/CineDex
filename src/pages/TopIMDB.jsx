import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import MovieCard from "../components/MovieCard";
import LoadingAnimation from "../components/LoadingAnimation";
function TopIMDB({ storedMovies, setMovies }) {
  const [movies, setTopMovies] = useState([]);
  const API_KEY = "d57381ec58bf6bd7bf0af593e71fc800";
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`, {
      headers: { accept: "application/json" },
    })
      .then((r) => r.json())
      .then((d) => setTopMovies(d.results));
  }, []);
  if (!movies.length > 0) {
    return <LoadingAnimation />;
  }
  return (
    <div className="bg-zinc-800 w-full">
      <NavBar />
      <SearchBox />
      <div className="movies-movies grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              storedMovies={storedMovies}
              setMovies={setMovies}
              key={movie.id}
              id={movie.id}
              movie={movie}
              movie_name={movie.original_title}
              poster_url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              release_date={movie.release_date}
              genre_ids={movie.genre_ids}
              vote_average={movie.vote_average}
            />
          ))}
      </div>
    </div>
  );
}

export default TopIMDB;
