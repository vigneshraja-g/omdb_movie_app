import React, { useState, useEffect } from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const MovieDetail = (props) => {
  console.log(props.location.state);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const MOVIE_API_URL = `http://www.omdbapi.com/?apikey=b9bd48a6&i=${props.location.state.id}`;
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovie(jsonResponse);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>loading...</div>
        </div>
      ) : (
        <div>
          <p>
            <b>{movie.Title}</b>
          </p>
          <div>
            <img
              width="200"
              alt={`The movie titled: ${movie.Title}`}
              src={poster}
            />
          </div>
          <div>Type: {movie.Type}</div>
          <div>Year: ({movie.Year})</div>
          <div>Actors: {movie.Actors}</div>
          <div>Awards: {movie.Awards}</div>
          <div>BoxOffice: {movie.BoxOffice}</div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
