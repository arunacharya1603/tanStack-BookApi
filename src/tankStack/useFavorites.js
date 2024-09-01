import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, removeFavorite, fetchFavorites } from "./favoritesApi";

export const useFavorites = () => {
  const queryClient = useQueryClient();
  
  const { data: favorites = [], isLoading, isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    staleTime: Infinity, // Keep data fresh
    cacheTime: Infinity, // Keep data cached
  });

  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onMutate: async (newBook) => {
      await queryClient.cancelQueries(['favorites']);
      
      const previousFavorites = queryClient.getQueryData(['favorites']);
      
      queryClient.setQueryData(['favorites'], (oldFavorites) => [
        ...oldFavorites,
        newBook,
      ]);
      
      return { previousFavorites };
    },
    onError: (err, newBook, context) => {
      queryClient.setQueryData(['favorites'], context.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['favorites']);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onMutate: async (bookId) => {
      await queryClient.cancelQueries(['favorites']);
      
      const previousFavorites = queryClient.getQueryData(['favorites']);
      
      queryClient.setQueryData(['favorites'], (oldFavorites) =>
        oldFavorites.filter((item) => item.id !== bookId)
      );
      
      return { previousFavorites };
    },
    onError: (err, bookId, context) => {
      queryClient.setQueryData(['favorites'], context.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['favorites']);
    },
  });

  const isFavorite = (bookId) => favorites.some((item) => item.id === bookId);

  return {
    favorites,
    isLoading,
    isError,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isFavorite,
  };
};
