import React, { useState, useEffect } from "react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../main";
import FavoriteButton from "./FavoriteButton";

// Utility function to fetch favorites from local storage
const fetchFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// Utility function to save favorites to local storage
const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const Hero = () => {
    const [favorites, setFavorites] = useState(fetchFavoritesFromLocalStorage());

    // Function to remove a book from favorites
    const removeFavorite = (bookId) => {
      const updatedFavorites = favorites.filter((item) => item.id !== bookId);
      setFavorites(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    };
  
    return (
      <div className="flex flex-col p-4 gap-8">
        <h2 className="text-2xl font-semibold mb-4">My Favorite Books</h2>
        <div className="lg:grid lg:grid-cols-5 flex flex-col h-full w-full gap-4">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="h-full w-full border flex flex-col justify-between p-4 bg-slate-200 rounded-md cursor-pointer shadow-lg transition-transform duration-300 ease-in-out transform hover:shadow-cyan-900"
              >
                <div className="border rounded-md text-blue-950">
                  {item.volumeInfo.title}
                </div>
                <div>
                  {item.volumeInfo.authors
                    ? item.volumeInfo.authors.join(", ")
                    : "Unknown Author"}
                </div>
                <FavoriteButton
                  isFavorite={true}
                  onRemove={() => removeFavorite(item.id)}
                />
              </div>
            ))
          ) : (
            <div>No favorite books found</div>
          )}
        </div>
      </div>
    );
  };


export const heroRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hero",
  component: Hero,
});

export default Hero;
