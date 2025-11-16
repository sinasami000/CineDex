import { useEffect, useState } from "react";
import ActorSearch from "../components/ActorSearch";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import ActorCard from "../components/ActorCard";

function ActorsSeachResults() {
  const API_KEY = "d57381ec58bf6bd7bf0af593e71fc800";
  const { actorName } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName}
`
      )
      .then((res) => {
        setResults(res.data.results);
        setLoading(false);
      });
  }, []);
  console.log(results);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-300">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full text-white min-h-screen bg-zinc-800">
      <NavBar />
      <ActorSearch />
      <h1 className="text-indigo-400">Seach Results for "{actorName}"</h1>
      {results && results.length > 0 ? (
        <>
          <h1 className="text-indigo-400">Results: {results.length}</h1>
          <div className="search-movies grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {results.length > 0 ? (
              results.map((actor, index) => (
                <ActorCard
                  key={index}
                  name={actor.name}
                  id={actor.id}
                  profile_path={actor.profile_path}
                  known_for={actor.known_for}
                  original_name={actor.original_name}
                  gender={actor.gender}
                  popularity={actor.popularity}
                  known_for_department={actor.known_for_department}
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
  );
}

export default ActorsSeachResults;
