import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import ActorCard from "../components/ActorCard";
import ActorSearch from "../components/ActorSearch";


function Actors({ setMovies, storedMovies }) {
    function moreActorButton(){
        setActorPage(actorPage+1)
    }
  const [actorPage, setActorPage] = useState(1);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "d57381ec58bf6bd7bf0af593e71fc800";
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${actorPage}
`
      )
      .then((res) => {
        setActors((prev) => [...prev, ...res.data.results]);
        setLoading(false);
      });
  }, [actorPage]);
  console.log(actors);
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
      <h1 className="my-7 font-bold text-3xl ml-3">Famous Actors</h1>
      <div className="actors grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {actors.length > 0 &&
          actors.map((actor,index) => (
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
          ))}
      </div>
      <div 
      className="w-full flex place-content-center py-9 ">
        <button
          disabled={!actorPage > 20}
          onClick={moreActorButton}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer rounded-lg transition duration-200"
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default Actors;
