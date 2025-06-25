# 🎬 Movie Search App

A modern, responsive React web application for discovering movies, viewing detailed information, and watching trailers. Built with React, Tailwind CSS, OMDB API, and YouTube Data API.

---

## 🚀 Features

- **Movie Search:** Search for movies in real-time using the OMDB API.
- **Dynamic Filtering:** Filter results by genre and year.
- **Interactive Movie Cards:** Each card displays a poster, title, year, and action buttons.
- **See Details:** View full movie information in a beautiful modal.
- **Watch Trailer:** Fetch and play the official trailer from YouTube in a modal.
- **Favorites:** Mark movies as favorites and persist them with localStorage.
- **Category Browsing:** Explore movies by popular categories.
- **Skeleton Loaders:** Smooth loading experience with animated placeholders.
- **Responsive Design:** Fully mobile-friendly and visually appealing.
- **Modern UI/UX:** Gradient overlays, animated buttons, icons, and more.

---

## 🛠️ Tech Stack

- **Frontend:** React (functional components, hooks)
- **Styling:** Tailwind CSS
- **APIs:** [OMDB API](https://www.omdbapi.com/), [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **State Management:** React hooks, localStorage
- **Tooling:** Create React App, ESLint

## ⚡ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/AshifAnsari01/movie-search-app.git
cd movie-search-app
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up API keys**

- **OMDB API:** Get a free API key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx)
- **YouTube Data API:** Get a key from [Google Cloud Console](https://console.developers.google.com/)

Create a `.env` file in the root of your project and add:
```
REACT_APP_OMDB_API_KEY=your_omdb_api_key
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
```

> _The app will use these keys for fetching movie data and trailers._

### 4. **Start the development server**
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## ✨ Usage

- Search for any movie by title.
- Filter by genre or year.
- Click **See Details** for full info.
- Click **Watch Trailer** to view the trailer in a modal.
- Mark movies as favorites for quick access.

---

## 📂 Project Structure

```
src/
  components/
    MovieCard.jsx
    MovieDetail.jsx
    TrailerModal.jsx
    SearchBar.jsx
    SkeletonCard.jsx
  App.js
  index.js
  ...
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [OMDB API](https://www.omdbapi.com/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Tailwind CSS](https://tailwindcss.com/)
- [Create React App](https://create-react-app.dev/)

---

**Feel free to fork, star, and contribute!**
