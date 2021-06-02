import React from "react";
import { Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import Header from "./Header";
import MovieDetail from "./MovieDetail";

const App = () => {
  return (
    <div>
      <Row>
        <Header text="Movie Search App" />
      </Row>
      <Router>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/movie/:id" component={MovieDetail} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
