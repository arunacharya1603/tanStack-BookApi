// favoritesApi.js

// Utility function to fetch favorites from local storage
const fetchFavoritesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  };
  
  // Utility function to save favorites to local storage
  const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  
  // Function to add a favorite book
  export const addFavorite = async (book) => {
    const favorites = fetchFavoritesFromLocalStorage();
    const updatedFavorites = [...favorites, book];
    saveFavoritesToLocalStorage(updatedFavorites);
    return updatedFavorites;
  };
  
  // Function to remove a favorite book
  export const removeFavorite = async (bookId) => {
    const favorites = fetchFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter((item) => item.id !== bookId);
    saveFavoritesToLocalStorage(updatedFavorites);
    return updatedFavorites;
  };
  
  // Function to fetch favorites
  export const fetchFavorites = async () => {
    return fetchFavoritesFromLocalStorage();
  };
  