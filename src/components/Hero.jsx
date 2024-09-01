import React from 'react';
import { useFavorites } from '../tankStack/useFavorites';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../main';
import FavoriteButton from './FavoriteButton';

const Hero = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Books</h1>
      <div className="lg:grid lg:grid-cols-3 flex flex-col gap-4">
        {favorites.length > 0 ? (
          favorites.map((book) => (
            <div
              key={book.id}
              className="border p-4 bg-slate-100 rounded-md shadow-md"
            >
              <div className="text-lg font-semibold">{book.volumeInfo.title}</div>
              <div className="text-gray-700">
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(', ')
                  : 'Unknown Author'}
              </div>
              <FavoriteButton
                item={book}
                isFavorite={isFavorite(book.id)}
                addToFavorites={addFavorite}
                removeFromFavorites={removeFavorite}
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
  path: '/hero',
  component: Hero,
});

export default Hero;
