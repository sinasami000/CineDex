import { Link } from "react-router-dom";

export default function ActorCard({
  id,
  name,
  original_name,
  profile_path,
  known_for = [],
  gender,
  popularity,
  known_for_department,
}) {
  const genderText = gender === 1 ? "Female" : gender === 2 ? "Male" : "Other";

  return (
    <Link
      to={`/actor/details/${id}`}
      className="group relative bg-zinc-900 rounded-2xl p-4 shadow-lg 
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                 flex flex-col gap-4 border border-zinc-800"
    >
      <div className="w-full h-64 overflow-hidden rounded-xl">
        <img
          src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : 'https://imgs.search.brave.com/VbIeSh89gULO6lUY_rdhrNXW4UFSb9dqGz5H0AnQu1A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvMTAvRGVm/YXVsdC1Qcm9maWxl/LVBpY3R1cmUtUE5H/LUltYWdlLUJhY2tn/cm91bmQucG5n'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col gap-1 text-white">
        <h2 className="text-lg font-semibold tracking-wide">{name}</h2>
        <p className="text-sm text-zinc-400">{known_for_department}</p>

        <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
          <span className="bg-zinc-800 px-2 py-1 rounded-full">
            {genderText}
          </span>
          <span className="bg-zinc-800 px-2 py-1 rounded-full">
            ⭐ {popularity.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Known For */}
      {/* {known_for.length > 0 && (
        <div className="mt-3 text-sm">
          <p className="text-zinc-400 mb-1">Known for:</p>

          <ul className="flex flex-col gap-1">
            {known_for.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="text-zinc-300 text-sm truncate hover:text-white transition"
              >
                • {item.title || item.original_name || item.name}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </Link>
  );
}
