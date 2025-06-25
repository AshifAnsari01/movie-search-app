import React, { useState } from "react";

const GENRES = [
  "Any",
  "Action",
  "Comedy",
  "Drama",
  "Romance",
  "Thriller",
  "Horror",
  "Sci-Fi",
  "Animation",
  "Fantasy",
  "Crime",
  "Mystery",
  "Family",
  "Documentary",
  "Adventure",
  "War",
  "Musical",
  "Western"
];

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [genre, setGenre] = useState("Any");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim(), { genre, year });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center mb-8 w-full gap-2 sm:gap-4 items-center"
    >
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-full shadow-md bg-slate-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition font-poppins text-lg placeholder:text-gray-500"
          placeholder="Search for movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full shadow font-semibold transition font-poppins"
        >
          Search
        </button>
      </div>
      <select
        className="rounded-full px-4 py-2 border border-gray-200 bg-slate-100 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 font-poppins"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      >
        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <input
        type="number"
        min="1900"
        max={new Date().getFullYear()}
        placeholder="Year"
        className="rounded-full px-4 py-2 border border-gray-200 bg-slate-100 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 font-poppins w-24"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
    </form>
  );
};

export default SearchBar; 