import React, { useState } from "react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../main";
import fetchUser from "../tankStack/userApi";
import { useQuery } from "@tanstack/react-query";
import Search from "./Search";
import Filter from "./Filter";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "../tankStack/useFavorites";

const Home = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: favorites, addFavorite, removeFavorite, isFavorite } = useFavorites({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { isLoading, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["query", { page, searchQuery, selectedYear }],
    queryFn: () =>
      fetchUser({
        page,
        query: searchQuery || "default",
        year: selectedYear,
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const items = data?.items || [];
  const hasMore = data?.hasMore || false;

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
          <div>
            {isLoading || isFetching ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              <div className="lg:grid lg:grid-cols-5 flex flex-col h-full w-full gap-4">
                {items.length > 0 ? (
                  items.map((item) => (
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
                        item={item}
                        isFavorite={isFavorite(item.id)}
                        addToFavorites={addFavorite}
                        removeFromFavorites={removeFavorite}
                      />
                    </div>
                  ))
                ) : (
                  <div>No results found</div>
                )}
              </div>
            )}
          </div>
        </ul>
      </div>

      <div className="flex justify-center items-center gap-4 my-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
          className={`px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors duration-300 ease-in-out
            ${page === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          Previous Page
        </button>
        <span className="text-lg font-medium">Current Page: {page + 1}</span>
        <button
          onClick={() => {
            if (!isPlaceholderData && hasMore) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !hasMore}
          className={`px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors duration-300 ease-in-out
            ${isPlaceholderData || !hasMore ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}
          `}
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
