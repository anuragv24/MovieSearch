import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

const Home = () => {
  const [searchQ, setSearchQ] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovie = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("failed to load movies...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovie();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQ.trim()) return
    if(loading) return
    setLoading(true)

    try {
        const searchResults = await searchMovies(searchQ)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        setError("failed to load movies...")
        console.log(err)
    } finally{
        setLoading(false)
    }
    setSearchQ("");
  };
  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error &&  <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies &&
            movies.map(
              (movie) =>
                movie.title.toLowerCase().startsWith(searchQ) && (
                  <Card movie={movie} key={movie.id} />
                )
            )}
        </div>
      )}
    </div>
  );
};

export default Home;

//When the user presses a key, then through onChange() it is stored in state (here it is searchQ), then this state acts as value for the input, and then it is shown in the input box.
/*
In React, input elements controlled by state follow this flow:
    1.User types a character.
    2.onChange triggers immediately on that keypress and updates the state (searchQ).
    3.Because the input is a controlled component (its value is bound to state), React re-renders the component using the updated searchQ.
    4.The updated value appears in the input box.
This means the input box value is shown only after state is updated, not directly from DOM events like in vanilla JS.
*/

//Why we use useState or state?
/*
1.No Re-rendering: React components only re-render when state changes. Changing a plain variable does not cause re-render
2.Since React doesn't know the variable changed, it contiue to use the initial value, and act weird.
*/
