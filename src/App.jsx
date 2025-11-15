import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import TopIMDB from "./pages/TopIMDB";
import PageNotFound from "./pages/PageNotFound";
import SearchPage from "./pages/SearchPage";
import useLocalStorage from "./utils/useLocalStorage";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const [storedMovies, setMovies] = useLocalStorage('favourite_movies',[]);
  return (
    <Routes>
      <Route path="/" element={<Home storedMovies={storedMovies} setMovies={setMovies} />} />
      <Route path="/favourite" element={<Favourite storedMovies={storedMovies} setMovies={setMovies} />} />
      <Route path="/top-imdb" element={<TopIMDB storedMovies={storedMovies} setMovies={setMovies} />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/search/:movie_name" element={<SearchPage storedMovies={storedMovies} setMovies={setMovies} />} />
      <Route path="/:media_type/:movie_id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
