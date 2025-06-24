import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center mb-8 w-full"
    >
      <div className="relative w-full max-w-xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </span>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3 rounded-full shadow-md bg-slate-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition font-poppins text-lg placeholder:text-gray-500"
          placeholder="Search for movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full shadow font-semibold transition font-poppins"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 