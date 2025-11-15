import { useState } from "react";

function SearchBox() {
  const [inputValue,setInputValue] = useState('');
  return (
    <form
    action={(inputValue && inputValue.trim() ) && `/search/${inputValue.trim()}`}
      className="flex items-center gap-2 p-2 bg-white/5 my-10 rounded-md shadow-sm max-w-lg mx-auto"
    >
      <input
        type="text"
        name=""
        value={inputValue}
        onChange={(e)=> setInputValue(e.target.value)}
        id=""
        placeholder="Search movies..."
        className="flex-1 text-white px-3 py-2 bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="submit"
        value="Search"
        className="px-4 cursor-pointer py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
      />
    </form>
  );
}

export default SearchBox;
