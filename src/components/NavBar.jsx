import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex container xl:rounded-xl bg-zinc-600 text-indigo-400 gap-4 pr-5 py-4 justify-around">
      <NavLink className={"hover:text-indigo-600"} to={"/"}>
        Home
      </NavLink>
      <NavLink className={"hover:text-indigo-600"} to={"/favourite"}>
        Favourite
      </NavLink>
      <NavLink className={"hover:text-indigo-600"} to={"/actors"}>
        Actors
      </NavLink>
      <NavLink className={"hover:text-indigo-600"} to={"/top-imdb"}>
        Top IMDB
      </NavLink>
    </nav>
  );
}

export default NavBar;
