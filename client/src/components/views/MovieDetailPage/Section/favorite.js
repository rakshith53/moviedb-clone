import React, { useEffect, useState } from "react";
import Axios from "axios";

function Favorite(props) {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime
  };

  const onClickFavorite = () => {
    if (favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variable).then(
        response => {
          if (response.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            alert("Failed to remove");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variable).then(response => {
        if (response.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert("Failed to add Favorite");
        }
      });
    }
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variable).then(response => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Failed to get favoriteNumber");
      }
    });

    Axios.post("/api/favorite/favorited", variable).then(response => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Failed to get favorite Info");
      }
    });
  }, []);

  return (
    <div>
      <i
        className={favorited ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
        onClick={onClickFavorite}
      >
        <span className="badge">{favoriteNumber}Favorites</span>
      </i>
    </div>
  );
}

export default Favorite;
