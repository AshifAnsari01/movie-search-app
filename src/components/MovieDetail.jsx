import React from "react";

const MovieDetail = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 transition-opacity animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-10 relative font-poppins border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-bold focus:outline-none transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
            alt={movie.Title}
            className="w-40 h-60 object-cover rounded-2xl shadow-md bg-gray-100"
          />
          <div className="flex-1 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">{movie.Title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm">{movie.Year} | {movie.Rated} | {movie.Runtime}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">Genre: {movie.Genre}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">Director: {movie.Director}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">Actors: {movie.Actors}</p>
            <p className="text-indigo-600 dark:text-indigo-400 mb-1 text-sm font-semibold">IMDB Rating: {movie.imdbRating}</p>
            <p className="mt-4 text-gray-800 dark:text-gray-100 text-base leading-relaxed">{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 