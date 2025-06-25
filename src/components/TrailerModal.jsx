import React from "react";

const TrailerModal = ({ videoId, onClose, error, loading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-4 sm:p-6 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold focus:outline-none transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
          {loading ? (
            <span className="text-gray-500 text-lg">Loading...</span>
          ) : error ? (
            <span className="text-red-500 text-lg">{error}</span>
          ) : videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal; 