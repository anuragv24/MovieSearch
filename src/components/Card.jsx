import "../css/Card.css"
import { useMovieContext } from "../context/MovieContext"

const Card = ({ movie }) => {
  const {isFav, addToFav, removeFromFav} = useMovieContext()

  const favorite = isFav(movie.id)

  const onFavoriteClick = (e) => {
    console.log("onfavClicked")
    e.preventDefault()
    if(favorite) {
      removeFromFav(movie.id)
      console.log("if: ", movie.id)
    }
    else {
      addToFav(movie)
      console.log("else: ", movie)
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            {favorite ? "❤" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default Card;
