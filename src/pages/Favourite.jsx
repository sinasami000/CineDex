import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
function Favourite({ storedMovies, setMovies }) {
  console.log(storedMovies);
  return (
    <div className="bg-zinc-800 text-white min-h-screen w-full">
      <title>Favourite Movies/tv series</title>
      <NavBar />
      {storedMovies.length > 0 ? (
        <>
          <h1>Total Favourite movies: {storedMovies.length}</h1>
          <div className="fvt-movies grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {storedMovies.map((movie) => (
              <MovieCard
                storedMovies={storedMovies}
                setMovies={setMovies}
                key={movie.id}
                fvt={true}
                id={movie.id}
                movie={movie}
                movie_name={movie.original_title || movie.name}
                poster_url={`https://image.tmdb.org/t/p/w500/${
                  movie.poster_url || movie.backdrop_path
                }`}
                release_date={movie.release_date || movie.first_air_date}
                genre_ids={movie.genre_ids}
                vote_average={movie.vote_average}
                type={movie.media_type}
              />
            ))}
          </div>
        </>
      ) : (
        <div>No favourite Item found</div>
      )}
    </div>
  );
}

export default Favourite;
