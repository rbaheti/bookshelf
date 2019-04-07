import React, {Fragment} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./App.css";
import MyReads from "./MyReads";
import Search from "./Search";

// Set the home and search paths to their respective components.
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Fragment>
            <div>
              <Route path="/" exact component={MyReads} />
              <Route path="/search" exact component={Search} />
            </div>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
