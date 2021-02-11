import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Section/mainImage";
import GridCard from "../LandingPage/Section/gridCard";
import Favorite from "./Section/favorite";

function MovieDetailPage(porps) {
  const [Movie, setMovies] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const movieId = porps.match.params.movieId;

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response.cast);

            setCrews(response.cast);
          });
      });
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      <br />
      <br />
      <div
        className="container m-auto d-flex justify-content-end"
        style={{ width: "85%" }}
      >
        <Favorite
          userFrom={localStorage.getItem("userId")}
          movieId={movieId}
          movieInfo={Movie}
        />
      </div>
      <br />
      <br />
      <div className="conatainer px-5">
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <th style={{ width: "150px" }}>Title</th>
              <th>{Movie.original_title}</th>
            </tr>
            <tr>
              <th style={{ width: "150px" }}>Rating</th>
              <th>{Movie.vote_average}</th>
            </tr>
            <tr>
              <th style={{ width: "150px" }}>Release Date</th>
              <th>{Movie.release_date}</th>
            </tr>
            <tr>
              <th style={{ width: "150px" }}>Runtime</th>
              <th>{Movie.runtime}</th>
            </tr>
            <tr>
              <th style={{ width: "150px" }}>Status</th>
              <th>{Movie.status}</th>
            </tr>
            <tr>
              <th style={{ width: "100px" }}>Popularity</th>
              <th>{Movie.popularity}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div className="d-flex border justify-content-center ">
        <button className="btn btn-primary" onClick={handleClick}>
          Actor{" "}
        </button>
      </div>

      {ActorToggle && (
        <div className="row m-auto">
          {Crews &&
            Crews.map((crew, index) => (
              <React.Fragment key={index}>
                {crew.profile_path && (
                  <GridCard
                    actor_id={crew.id}
                    actor_name={crew.name}
                    charcter={crew.character}
                    image={`${IMAGE_URL}w500${crew.profile_path}`}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
