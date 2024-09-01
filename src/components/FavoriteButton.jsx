import React from "react";

const FavoriteButton = ({ onRemove, onAdd, isFavorite }) => {
  return (
    <button
      className={`mt-4 px-4 py-2 rounded-md ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white`}
      onClick={() => {
        if (isFavorite) {
          onRemove();
        } else {
          onAdd();
        }
      }}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
