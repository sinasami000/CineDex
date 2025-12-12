import { FaHeart } from "react-icons/fa";
import GenerateGenre from "../utils/GenerateGenre";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({
  setMovies,
  storedMovies = [],
  poster_url,
  fvt = false,
  id,
  movie_name,
  release_date,
  type = "movie", 
  vote_average,
  genre_ids = [],
}) {
  const navigate = useNavigate();

  const [favourite, setFavourite] = useState(
    () => fvt || storedMovies.some((m) => m.id === id)
  );

  useEffect(() => {
    const isInStorage = storedMovies.some((m) => m.id === id);
    setFavourite(isInStorage);
  }, [storedMovies, id]);

  const handleFvtButtonClick = (e) => {
    // stop the card click from firing
    e.stopPropagation();

    setFavourite((prev) => {
      const next = !prev;

      const obj = {
        id,
        movie_name,
        type,
        release_date,
        fvt: true,
        vote_average,
        genre_ids,
        poster_url,
      };

      if (next) {
        // add
        const movieExists = storedMovies.some((m) => m.id === id);
        if (!movieExists) {
          setMovies([...storedMovies, obj]);
        }
      } else {
        // remove
        const updated = storedMovies.filter((m) => m.id !== id);
        setMovies(updated);
      }

      return next;
    });
  };

  const formatted = release_date
    ? new Date(release_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/${type}/${id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/${type}/${id}`);
      }}
      className="max-w-sm bg-white m-2 rounded-xl cursor-pointer shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
      aria-label={movie_name}
    >
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={poster_url}
          alt={movie_name || "Poster"}
        />

        <button
          aria-label="favorite"
          onClick={handleFvtButtonClick}
          className={`absolute top-3 right-3 z-20 cursor-pointer backdrop-blur-sm text-white p-2 rounded-full hover:scale-110 focus:outline-none transition-all duration-200 ${
            fvt || favourite ? "bg-red-600" : "bg-black/40"
          }`}
        >
          <FaHeart className="text-lg" />
        </button>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{movie_name}</h2>
        <p className="mt-1 font-semibold text-sm text-gray-500">
          {type} • {vote_average !== undefined ? vote_average.toFixed(1) : "—"}
        </p>
        <p className="mt-1 text-sm mb-1 text-gray-500">
          {genre_ids.length > 0 ? GenerateGenre(genre_ids) : "Type"}
        </p>
        <p className="mt-1 text-sm text-gray-500">{formatted}</p>
      </div>
    </div>
  );
}

export default MovieCard;
