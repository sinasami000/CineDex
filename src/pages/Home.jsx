import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";
function Home({ storedMovies, setMovies }) {
  const [trendingPageCount, setTrendingPageCount] = useState(1);
  const [regularPageCount, setRegularPageCount] = useState(1);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [regularLoading, setReqularLoading] = useState(true);
  const API_KEY = "d57381ec58bf6bd7bf0af593e71fc800";
  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&&page=${trendingPageCount}`
      )
      .then((res) => {
        const filtered = res.data.results.filter(
          (item) => item.media_type !== "person"
        );
        setTrending((prevItems) => [...prevItems, ...filtered]);
        setTrendingLoading(false);
      });
  }, [trendingPageCount]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${regularPageCount}`
      )
      .then((res) => {
        setPopular((prevPopular) => [...prevPopular, ...res.data.results]);
        setReqularLoading(false);
      });
  }, [regularPageCount]);
  if (regularLoading || trendingLoading) {
    return <LoadingAnimation />;
  }
  function moreTrendingButton() {
    setTrendingPageCount(trendingPageCount + 1);
  }
  function moreRegularMovieButton() {
    setRegularPageCount(regularPageCount + 1);
  }
  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <title>CineDex || Home</title>
      <NavBar />
      <SearchBox />
      <h1 className="text-3xl font-bold mb-3">Trending Movies</h1>
      <div className="trending-movies grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {trending.length > 0 ? (
          trending.map((movie, index) => (
            <MovieCard
              setMovies={setMovies}
              storedMovies={storedMovies}
              key={index}
              movie={movie}
              id={movie.id}
              movie_name={
                movie.original_title ||
                movie.name ||
                movie.original_name ||
                movie.title
              }
              poster_url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              release_date={movie.release_date || movie.first_air_date || ""}
              genre_ids={movie.genre_ids}
              type={movie.media_type || "Movie"}
              vote_average={movie.vote_average}
            />
          ))
        ) : (
          <div>No movies to show</div>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          disabled={!trendingPageCount > 20}
          onClick={moreTrendingButton}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer rounded-lg transition duration-200"
        >
          Show More
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-3 mt-3">Regular Movies</h1>
      <div className="regular-movies grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {popular.length > 0 ? (
          popular.map((movie, index) => (
            <MovieCard
              setMovies={setMovies}
              storedMovies={storedMovies}
              key={index}
              id={movie.id}
              movie={movie}
              movie_name={
                movie.original_title ||
                movie.name ||
                movie.original_name ||
                movie.title
              }
              poster_url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              release_date={movie.release_date || movie.first_air_date || ""}
              genre_ids={movie.genre_ids}
              type={movie.media_type || "Movie"}
              vote_average={movie.vote_average}
            />
          ))
        ) : (
          <div>No movies to show</div>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          disabled={!regularPageCount > 20}
          onClick={moreRegularMovieButton}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer rounded-lg transition duration-200"
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default Home;
