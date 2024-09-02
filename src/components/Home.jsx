import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "../main";
import fetchUser from "../tankStack/userApi";
import { useQuery } from "@tanstack/react-query";
import Search from "./Search";
import Filter from "./Filter";
import FavoriteButton from "./FavoriteButton";
import { useState, useMemo } from "react";

// Utility function to fetch favorites from local storage
const fetchFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// Utility function to save favorites to local storage
const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const Home = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [favorites, setFavorites] = useState(fetchFavoritesFromLocalStorage());

  // Function to add a book to favorites
  const addFavorite = (book) => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  // Function to remove a book from favorites
  const removeFavorite = (bookId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== bookId);
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  // Function to check if a book is in favorites
  const isFavorite = (bookId) => {
    return favorites.some((item) => item.id === bookId);
  };

  const queryKey = useMemo(
    () => ["query", { page, searchQuery, selectedYear }],
    [page, searchQuery, selectedYear]
  );

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey,
    queryFn: () =>
      fetchUser({ page, query: searchQuery || "default", year: selectedYear }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const items = data?.items || [];
  console.log(items);
  const hasMore = data?.hasMore || false;

  const handleNextPage = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col p-4 gap-8 z-10">
      <div className="flex flex-row lg:justify-between justify-center items-center gap-4 scrollbar-hidden">
        <div className="flex flex-col justify-center items-center lg:flex-row lg:w-1/3 w-full">
          <Search className="w-full" query={setSearchQuery} />
          <Filter className="w-full" year={setSelectedYear} />
        </div>
      </div>
      <div className="flex justify-center items-center z-20">
        <ul>
          {isLoading || isFetching ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : items.length > 0 ? (
            <div className="lg:grid lg:grid-cols-5 flex flex-col h-full w-full gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="h-full w-full border flex flex-col justify-between p-4 bg-slate-200 rounded-md cursor-pointer shadow-lg transition-transform duration-300 ease-in-out transform hover:shadow-cyan-900"
                >
                  <div className="text-xl font-semibold text-gray-800">
                    {item.volumeInfo.title}
                  </div>

                  <div className="text-gray-600">
                    {item.volumeInfo.authors
                      ? item.volumeInfo.authors.join(", ")
                      : "Unknown Author"}
                  </div>

                  <div className="text-gray-500">
                    {item.volumeInfo.publishedDate
                      ? item.volumeInfo.publishedDate
                      : "Unknown Date"}
                  </div>

                  <div className="text-gray-500">
                    {item.volumeInfo.categories
                      ? item.volumeInfo.categories.join(", ")
                      : "Unknown Category"}
                  </div>

                  <div className="text-gray-500">
                    {item.volumeInfo.pageCount
                      ? `${item.volumeInfo.pageCount} pages`
                      : "Unknown Page Count"}
                  </div>

                  <div className="text-gray-500">
                    {item.volumeInfo.averageRating
                      ? `Rating: ${item.volumeInfo.averageRating}`
                      : "No Rating"}
                  </div>

                  <FavoriteButton
                    isFavorite={isFavorite(item.id)}
                    onAdd={() => addFavorite(item)}
                    onRemove={() => removeFavorite(item.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No results found</div>
          )}
        </ul>
      </div>
      <div className="flex justify-center items-center gap-4 my-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className={`px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors duration-300 ease-in-out ${page === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Previous Page
        </button>
        <span className="text-lg font-medium">Current Page: {page + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={isFetching || !hasMore}
          className={`px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors duration-300 ease-in-out ${isFetching || !hasMore ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

export default Home;
