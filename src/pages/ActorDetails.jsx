import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";

export default function ActorDetails() {
  const { actor_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  const API_KEY = "d57381ec58bf6bd7bf0af593e71fc800";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actor_id}?api_key=${API_KEY}`
      )
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      });
  }, [actor_id]);

  if (loading) {
    return (
      <LoadingAnimation />
    );
  }

  if (!details) return null;

  const genderText =
    details.gender === 1
      ? "Female"
      : details.gender === 2
      ? "Male"
      : "Other";

  const age = details.birthday
    ? new Date().getFullYear() - parseInt(details.birthday.slice(0, 4))
    : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
            alt={details.name}
            className="w-full rounded-2xl shadow-xl object-cover"
          />

          <div className="mt-5 flex flex-col gap-2 text-sm">
            <p className="text-zinc-400"><span className="text-white font-semibold">Gender:</span> {genderText}</p>
            <p className="text-zinc-400">
              <span className="text-white font-semibold">Birthday:</span>{" "}
              {details.birthday || "Unknown"}{" "}
              {age && <span className="text-zinc-500">({age} yrs)</span>}
            </p>
            <p className="text-zinc-400">
              <span className="text-white font-semibold">Place of Birth:</span>{" "}
              {details.place_of_birth || "Unknown"}
            </p>
            <p className="text-zinc-400">
              <span className="text-white font-semibold">Popularity:</span>{" "}
              ⭐ {details.popularity.toFixed(1)}
            </p>

            {details.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${details.imdb_id}`}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline mt-2"
              >
                View on IMDb →
              </a>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-wide">
              {details.name}
            </h1>
            <p className="text-zinc-400 mt-1 text-lg">
              {details.known_for_department}
            </p>
          </div>

          {details.also_known_as.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Also Known As</h2>
              <div className="flex flex-wrap gap-2">
                {details.also_known_as.map((aka, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-800 px-3 py-1 text-sm rounded-full"
                  >
                    {aka}
                  </span>
                ))}
              </div>
            </div>
          )}

          {details.biography && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Biography</h2>
              <p className="text-zinc-300 leading-relaxed">
                {details.biography}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
