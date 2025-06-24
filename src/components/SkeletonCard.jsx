import React from "react";

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl shadow-lg flex flex-col animate-pulse overflow-hidden border border-gray-200">
    <div className="w-full h-64 bg-gray-200" />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default SkeletonCard; 