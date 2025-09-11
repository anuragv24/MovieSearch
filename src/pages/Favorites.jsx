import React from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import Card from "../components/Card";

const Favorites = () => {
  const { favorites } = useMovieContext();
  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your favorites</h2>
        <div className="movies-grid">
        {favorites   &&
          favorites.map(
            (movie) =>
                <Card movie={movie} key={movie.id} />
          )}
      </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here</p>
    </div>
  );
};

export default Favorites;
