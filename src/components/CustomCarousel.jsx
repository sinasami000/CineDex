import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CustomCarousel({ trending }) {
  console.log(trending);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!trending || trending.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trending.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [trending]);

  if (!trending || trending.length === 0)
    return <div className="text-white">Loading...</div>;

  // Optional: keep only items that have at least one image to avoid empty slides
  const slides = trending.filter((it) => it.backdrop_path || it.poster_path);

  return (
    <div className="w-full mb-4 overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((item) => {
          const imgSrc = item.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

          return (
            <Link
              key={item.id}
              to={`/${item.media_type}/${item.id}`}
              className="min-w-full flex-shrink-0 block relative"
            >
              <img
                src={imgSrc}
                alt={item.title || item.name || "movie"}
                // img should fill the slide
                className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover"
                onError={(e) => {
                  // fallback in case image fails to load
                  e.currentTarget.src =
                    "https://via.placeholder.com/1280x720?text=No+image";
                }}
              />

              {/* optional overlay text */}
              <div className="absolute left-4 bottom-4 text-white drop-shadow-lg">
                <h3 className="text-lg font-bold">{item.title || item.name}</h3>
                <p className="text-sm opacity-80">
                  {item.vote_average ? `⭐ ${item.vote_average}` : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
