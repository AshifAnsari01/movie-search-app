import React from "react";

const MovieCard = ({ movie, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden flex flex-col relative border border-gray-200 group"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <button
        className={`absolute top-3 right-3 z-10 text-2xl focus:outline-none transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'}`}
        onClick={e => { e.stopPropagation(); onToggleFavorite(movie); }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-t-3xl bg-gray-100"
      />
      <div className="p-4 flex-1 flex flex-col justify-between font-poppins">
        <h2 className="text-lg font-semibold mb-1 truncate text-gray-800 dark:text-gray-200">{movie.Title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard; 