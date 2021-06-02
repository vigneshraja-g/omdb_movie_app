import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import Movie from "./MovieList";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=b9bd48a6"; // you should replace this with yours

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalResults, setTotalResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue, page) => {
    setLoading(true);
    setErrorMessage(null);
    if (page === 1) {
      setSearchParam(searchValue);
      setActivePage(1);
    }

    fetch(
      `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=b9bd48a6`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setTotalResult(jsonResponse.totalResults);
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    search(searchParam, pageNumber);
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Search search={search} className="text-center" />
      </Row>
      <Row>
        {loading && !errorMessage ? (
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
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <Row className="justify-content-center">
            <Row className="text-center">
              {movies.map((movie, index) => (
                <Col
                  xs={12}
                  sm={4}
                  md={3}
                  lg={3}
                  key={`${index}-${movie.Title}`}
                >
                  <Link
                    to={{
                      pathname: `/movie/${movie.imdbID}`,
                      state: { id: movie.imdbID },
                    }}
                  >
                    <Movie key={`${index}-${movie.Title}`} movie={movie} />
                  </Link>
                </Col>
              ))}
            </Row>
            {totalResults > 10 && (
              <Row className="text-center">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={totalResults / 10}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange.bind(this)}
                />
              </Row>
            )}
          </Row>
        )}
      </Row>
    </div>
  );
};

export default Main;
