import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";

function MovieDetails() {
    const [loading,setLoading] = useState(true)
    const [movieDetails, setMovieDetails] = useState([]);
    const { media_type, movie_id } = useParams();
    const API_KEY = "d57381ec58bf6bd7bf0af593e71fc800";

    useEffect(() => {
        if (!media_type || !movie_id) return;
        axios
            .get(`https://api.themoviedb.org/3/${media_type}/${movie_id}?api_key=${API_KEY}`)
            .then((res) => setMovieDetails(res.data))
            .catch(() => setMovieDetails(null));
            setLoading(false)
    }, [media_type, movie_id]);

    const imgBase = (path, size = "w500") =>
        path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

    const formatCurrency = (num) =>
        typeof num === "number" ? num.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "—";

    if (loading) {
        return (
            <LoadingAnimation />
        );
    }

    const year = movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : "";
    const title = movieDetails.title || movieDetails.name || "Untitled";

    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            <title>{title}</title>
            <div className="relative">
                <img
                    src={imgBase(movieDetails.backdrop_path, "w1280") || imgBase(movieDetails.poster_path, "w1280")}
                    alt={title}
                    className="w-full h-64 md:h-96 object-cover filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-8 -mt-24 md:-mt-32 relative">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Poster */}
                    <div className="flex-none">
                        <img
                            src={imgBase(movieDetails.poster_path) || imgBase(movieDetails.backdrop_path)}
                            alt={title}
                            className="w-40 md:w-56 lg:w-64 rounded-xl shadow-2xl ring-1 ring-black/60"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                            {title} <span className="text-zinc-400 font-medium text-lg">({year})</span>
                        </h1>
                        {movieDetails.tagline && <p className="text-zinc-300 italic mt-1">{movieDetails.tagline}</p>}

                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <div className="flex items-center space-x-2">
                                <span className="inline-block bg-amber-400 text-zinc-900 font-semibold px-3 py-1 rounded">{movieDetails.vote_average?.toFixed(1) ?? "—"}</span>
                                <span className="text-zinc-400 text-sm">{movieDetails.vote_count ?? 0} votes</span>
                            </div>

                            <span className="text-zinc-400 text-sm">•</span>
                            <span className="text-zinc-400 text-sm">{movieDetails.runtime ? `${movieDetails.runtime} min` : "—"}</span>

                            <span className="text-zinc-400 text-sm">•</span>
                            <span className="text-zinc-400 text-sm">{movieDetails.status ?? "—"}</span>

                            <span className="text-zinc-400 text-sm">•</span>
                            <span className="text-zinc-400 text-sm">{movieDetails.release_date ?? "—"}</span>
                        </div>

                        {/* Genres */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {movieDetails.genres?.map((g) => (
                                <span key={g.id} className="text-sm px-2 py-1 bg-zinc-700/60 rounded">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        {/* Overview */}
                        <section className="mt-6">
                            <h2 className="text-lg font-semibold">Overview</h2>
                            <p className="text-zinc-300 mt-2">{movieDetails.overview}</p>
                        </section>

                        {/* Meta grid */}
                        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
                            <div className="space-y-2">
                                <div><strong className="text-zinc-200">Budget:</strong> <span className="text-zinc-300">{formatCurrency(movieDetails.budget)}</span></div>
                                <div><strong className="text-zinc-200">Revenue:</strong> <span className="text-zinc-300">{formatCurrency(movieDetails.revenue)}</span></div>
                                <div><strong className="text-zinc-200">Original language:</strong> <span className="text-zinc-300">{(movieDetails.original_language || "").toUpperCase()}</span></div>
                                <div><strong className="text-zinc-200">Popularity:</strong> <span className="text-zinc-300">{movieDetails.popularity ?? "—"}</span></div>
                            </div>

                            <div className="space-y-2">
                                <div><strong className="text-zinc-200">Spoken languages:</strong> <span className="text-zinc-300">{movieDetails.spoken_languages?.map(l=>l.english_name).join(", ") || "—"}</span></div>
                                <div><strong className="text-zinc-200">Country:</strong> <span className="text-zinc-300">{movieDetails.production_countries?.map(c=>c.name).join(", ") || "—"}</span></div>
                                <div className="flex gap-3 mt-2">
                                    {movieDetails.homepage && <a href={movieDetails.homepage} target="_blank" rel="noreferrer" className="px-3 py-2 bg-emerald-500 text-black rounded text-sm">Official Site</a>}
                                    {movieDetails.imdb_id && <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`} target="_blank" rel="noreferrer" className="px-3 py-2 bg-yellow-400 text-black rounded text-sm">IMDb</a>}
                                </div>
                            </div>
                        </section>

                        {/* Production companies */}
                        <section className="mt-6">
                            <h3 className="text-sm text-zinc-400">Production companies</h3>
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                                {movieDetails.production_companies?.map(pc => (
                                    <div key={pc.id} className="flex items-center gap-3">
                                        {pc.logo_path ? (
                                            <img src={imgBase(pc.logo_path, "w92")} alt={pc.name} className="h-8 object-contain" />
                                        ) : (
                                            <span className="text-sm text-zinc-300">{pc.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
