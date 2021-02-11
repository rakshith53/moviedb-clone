import React, { useEffect, useState } from "react";
import axios from "axios";

function FavoritePage() {
  const [favoriteMovie, setFavoriteMovie] = useState([]);

  const variables = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios
      .post("/api/favorite/getFavoritedMovie", variables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.favoriteMovie);
          setFavoriteMovie(response.data.favoriteMovie);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  };

  const renderTableBody = favoriteMovie.map((movie, index) => {
    return (
      <tr key={index}>
        <td>{movie.movieTitle}</td>
        <td>{movie.movieRunTime}</td>
        <td>
          <button className="btn btn-danger">Remove from favorites</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="m-auto" style={{ width: "85%" }}>
      <h1>My Favorite Movies</h1>
      <hr />
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Run Time</th>
            <th>Remove from favorite</th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}
export default FavoritePage;
