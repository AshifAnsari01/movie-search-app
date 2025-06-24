import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import SkeletonCard from "./components/SkeletonCard";

const OMDB_API_KEY = "68f968ed"; // Replace with your OMDB API key

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState({
    bollywoodAction: [],
    bollywoodRomance: [],
    dubbedMovies: [],
    hollywoodAction: [],
    hollywoodRomance: [],
    comedyMovies: [],
    thrillerMovies: [],
    sciFiMovies: [],
    animatedMovies: [],
    horrorMovies: [],
    dramaMovies: [],
    adventureMovies: [],
    fantasyMovies: [],
    crimeMovies: [],
    mysteryMovies: [],
    familyMovies: [],
    documentaryMovies: [],
    warMovies: [],
    musicalMovies: [],
    westernMovies: []
  });
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch detailed movie information including poster
  const fetchMovieDetails = async (imdbID) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`
      );
      const data = await res.json();
      return data.Response === "True" ? data : null;
    } catch (err) {
      return null;
    }
  };

  // Load default movie categories on page load
  useEffect(() => {
    const loadDefaultCategories = async () => {
      setCategoriesLoading(true);
      try {
        const categorySearches = [
          { key: 'bollywoodAction', query: 'action 2023' },
          { key: 'bollywoodRomance', query: 'romance 2023' },
          { key: 'dubbedMovies', query: 'hindi dubbed' },
          { key: 'hollywoodAction', query: 'marvel' },
          { key: 'hollywoodRomance', query: 'romantic comedy' },
          { key: 'comedyMovies', query: 'comedy 2023' },
          { key: 'thrillerMovies', query: 'thriller 2023' },
          { key: 'sciFiMovies', query: 'sci-fi' },
          { key: 'animatedMovies', query: 'animation' },
          { key: 'horrorMovies', query: 'horror 2023' },
          { key: 'dramaMovies', query: 'drama 2023' },
          { key: 'adventureMovies', query: 'adventure' },
          { key: 'fantasyMovies', query: 'fantasy' },
          { key: 'crimeMovies', query: 'crime' },
          { key: 'mysteryMovies', query: 'mystery' },
          { key: 'familyMovies', query: 'family' },
          { key: 'documentaryMovies', query: 'documentary' },
          { key: 'warMovies', query: 'war' },
          { key: 'musicalMovies', query: 'musical' },
          { key: 'westernMovies', query: 'western' }
        ];

        const categoryPromises = categorySearches.map(async ({ key, query }) => {
          try {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`
            );
            const data = await res.json();
            if (data.Response === "True" && data.Search) {
              // Fetch detailed info for first 10 movies to get posters
              const detailedMovies = await Promise.all(
                data.Search.slice(0, 10).map(async (movie) => {
                  const details = await fetchMovieDetails(movie.imdbID);
                  return details || movie;
                })
              );
              // Filter out movies without images for default categories
              const moviesWithImages = detailedMovies.filter(movie => 
                movie.Poster && movie.Poster !== "N/A"
              );
              return { key, movies: moviesWithImages };
            }
            return { key, movies: [] };
          } catch (err) {
            return { key, movies: [] };
          }
        });

        const results = await Promise.all(categoryPromises);
        const newCategories = {};
        results.forEach(({ key, movies }) => {
          newCategories[key] = movies;
        });
        setCategories(newCategories);
      } catch (err) {
        console.error("Failed to load default categories:", err);
      }
      setCategoriesLoading(false);
    };

    loadDefaultCategories();
  }, []);

  const isFavorite = (movie) => favorites.some((fav) => fav.imdbID === movie.imdbID);
  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      isFavorite(movie)
        ? prev.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  const searchMovies = async (searchTerm) => {
    setQuery(searchTerm);
    setLoading(true);
    setError("");
    setSelectedMovie(null);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
      );
      const data = await res.json();
      if (data.Response === "True" && data.Search) {
        // Fetch detailed info for search results to get posters
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return details || movie;
          })
        );
        // For search results, show all movies regardless of image availability
        setMovies(detailedMovies);
      } else {
        setMovies([]);
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setError("Failed to fetch movies.");
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchMovieDetail = async (imdbID) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError(data.Error || "Failed to fetch movie details.");
      }
    } catch (err) {
      setError("Failed to fetch movie details.");
    }
    setLoading(false);
  };

  const renderCategorySection = (title, movies, key) => (
    <div key={key} className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      {categoriesLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite(movie)}
              onToggleFavorite={toggleFavorite}
              onClick={() => fetchMovieDetail(movie.imdbID)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen font-poppins transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight drop-shadow-sm">Movie Search App</h1>
        </div>
        <SearchBar onSearch={searchMovies} />
        
        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => fetchMovieDetail(movie.imdbID)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Default Categories - Show when no search is active */}
        {!query && !loading && (
          <div className="space-y-8">
            {renderCategorySection("🤠 Western Movies", categories.westernMovies, "western")}
            {renderCategorySection("🔥 Marvel Movies", categories.hollywoodAction, "hollywood-action")}
            {renderCategorySection("💝 Romantic Comedy", categories.hollywoodRomance, "hollywood-romance")}
            {renderCategorySection("😂 Comedy Movies", categories.comedyMovies, "comedy")}
            {renderCategorySection("😱 Thriller Movies", categories.thrillerMovies, "thriller")}
            {renderCategorySection("🚀 Sci-Fi Movies", categories.sciFiMovies, "scifi")}
            {renderCategorySection("🎨 Animated Movies", categories.animatedMovies, "animated")}
            {renderCategorySection("🎭 Drama Movies", categories.dramaMovies, "drama")}
            {renderCategorySection("🗺️ Adventure Movies", categories.adventureMovies, "adventure")}
            {renderCategorySection("🧙 Fantasy Movies", categories.fantasyMovies, "fantasy")}
            {renderCategorySection("🕵️ Crime Movies", categories.crimeMovies, "crime")}
            {renderCategorySection("🔍 Mystery Movies", categories.mysteryMovies, "mystery")}
            {renderCategorySection("👨‍👩‍👧‍👦 Family Movies", categories.familyMovies, "family")}
            {renderCategorySection("📹 Documentary Movies", categories.documentaryMovies, "documentary")}
            {renderCategorySection("⚔️ War Movies", categories.warMovies, "war")}
            {renderCategorySection("🎵 Musical Movies", categories.musicalMovies, "musical")}
          </div>
        )}

        {/* Search Results */}
        {query && (
          <>
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6 mt-6">
                {[...Array(16)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
            {error && <div className="text-red-500 text-center my-4 font-semibold">{error}</div>}
            {!loading && !error && movies.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-16">
                <span className="text-6xl mb-4">😕</span>
                <p className="text-xl text-gray-500 font-semibold">No results found for "{query}"</p>
              </div>
            )}
            {!loading && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Search Results for "{query}"</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      isFavorite={isFavorite(movie)}
                      onToggleFavorite={toggleFavorite}
                      onClick={() => fetchMovieDetail(movie.imdbID)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    </div>
  );
}

export default App;
