import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.css";
import MyReads from "./MyReads";
import Search from "./Search";
import NoMatch from "./NoMatch";

// Set the home and search paths to their respective components.
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact component={MyReads} />
            <Route path="/search" exact component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
