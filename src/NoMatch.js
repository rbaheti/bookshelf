import React, {Component} from "react";

// Reander a 404 Error page when the url path doesn't match.
class NoMatch extends Component {

  render() {
    return (
      <div className="list-books-title list-books">404 Error - Page not found!</div>
    );
  }
}

export default NoMatch;
