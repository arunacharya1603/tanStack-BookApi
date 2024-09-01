import React from "react";

const FavoriteButton = ({ item, isFavorite, addToFavorites, removeFromFavorites }) => {
  return (
    <button
      className={`mt-4 px-4 py-2 rounded-md ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white`}
      onClick={() => {
        if (isFavorite) {
          removeFromFavorites(item.id);
        } else {
          addToFavorites(item);
        }
      }}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
