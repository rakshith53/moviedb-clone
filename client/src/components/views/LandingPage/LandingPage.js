import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "./Section/mainImage";
import GridCard from "./Section/gridCard";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%" }}>
      {Movies[0] && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}
      <div className="m-auto" style={{ width: "85%" }}>
        <h2 className="display-5">Movies by Latest</h2>
      </div>
      <hr />
      <div className="row m-auto">
        {Movies &&
          Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard
                image={
                  movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`
                }
                movieId={movie.id}
                title={movie.original_title}
                lang={movie.original_language}
              />
            </React.Fragment>
          ))}
      </div>
      <br />

      <div className="d-flex border justify-content-center">
        <button onClick={handleClick}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;

