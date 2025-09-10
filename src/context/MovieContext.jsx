import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFav = localStorage.getItem("favorites");
    if (storedFav) setFavorites(JSON.parse(storedFav));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFav = (movie) => {
    // favorites.push()
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFav = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFav = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFav,
    removeFromFav,
    isFav,
  };

  return (
    <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
  );
};
