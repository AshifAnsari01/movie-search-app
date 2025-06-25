import React from "react";

const genreColors = {
  Action: 'bg-blue-100 text-blue-700',
  Comedy: 'bg-yellow-100 text-yellow-700',
  Drama: 'bg-purple-100 text-purple-700',
  Romance: 'bg-pink-100 text-pink-700',
  Thriller: 'bg-red-100 text-red-700',
  Horror: 'bg-gray-800 text-white',
  'Sci-Fi': 'bg-green-100 text-green-700',
  Animation: 'bg-orange-100 text-orange-700',
  Fantasy: 'bg-indigo-100 text-indigo-700',
  Crime: 'bg-gray-200 text-gray-700',
  Mystery: 'bg-teal-100 text-teal-700',
  Family: 'bg-lime-100 text-lime-700',
  Documentary: 'bg-cyan-100 text-cyan-700',
  Adventure: 'bg-emerald-100 text-emerald-700',
  War: 'bg-red-200 text-red-800',
  Musical: 'bg-fuchsia-100 text-fuchsia-700',
  Western: 'bg-amber-100 text-amber-700',
  default: 'bg-gray-100 text-gray-700',
};

const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY";

const MovieCard = ({ movie, isFavorite, onToggleFavorite, onSeeDetails, onWatchTrailer, loadingTrailer }) => {
  return (
    <div
      className="bg-white rounded-3xl border border-gray-200 group overflow-hidden flex flex-col relative transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
    >
      <button
        className={`absolute top-3 right-3 z-10 text-2xl focus:outline-none transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'}`}
        onClick={e => { e.stopPropagation(); onToggleFavorite(movie); }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <div className="relative w-full h-64 select-none">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-t-3xl bg-gray-100 pointer-events-none"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-end font-poppins">
        <h2 className="text-lg font-semibold mb-1 truncate text-gray-800 dark:text-gray-200">{movie.Title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{movie.Year}</p>
        <div className="flex flex-col gap-3 w-full">
          <button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none text-base"
            onClick={() => onSeeDetails(movie)}
          >
            <span className="text-lg">🔍</span>
            <span>See Details</span>
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white px-4 py-2 rounded-full font-semibold shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none text-base"
            onClick={() => onWatchTrailer(movie)}
            disabled={loadingTrailer}
          >
            <span className="text-lg">▶️</span>
            <span>{loadingTrailer ? "Loading..." : "Watch Trailer"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 