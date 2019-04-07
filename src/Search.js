import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {

  state = {
    searchBooks: [],
    allBooks: [],
    showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({allBooks: data}));
  }

  handleInput = e => {
    BooksAPI.search(e.target.value)
      .then(resp => {
        if (resp !== undefined && resp.error === undefined) {
          this.setState({searchBooks: resp});
        }
        else {
          this.setState({searchBooks: []});
        }
      });
  }

  handleUpdateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(data => {
        const allBooks = this.state.allBooks;
        if (allBooks.length < data.currentlyReading.length + data.wantToRead.length + data.read.length) allBooks.push(book);

        allBooks.forEach(d => {
          let currBookId = "";
          currBookId = data.currentlyReading.find(a => a === d.id);
          if (currBookId !== undefined) {
            d.shelf = "currentlyReading";
            return;
          }
          currBookId = data.wantToRead.find(a => a === d.id);
          if (currBookId !== undefined) {
            d.shelf = "wantToRead";
            return;
          }
          currBookId = data.read.find(a => a === d.id);
          if (currBookId !== undefined) {
            d.shelf = "read";
            return;
          }
          d.shelf = "none";
        });
        this.setState({allBooks});
      });
  }

  populateShelf = book => {
    const findResult = this.state.allBooks.filter(d => d.id === book.id);
    if (findResult.length > 0) {
      book.shelf = findResult[0].shelf;
    }
    return book;
  };

  renderRedirectToHome = () => {
    if (!this.state.showSearchPage) {
      return <Redirect to={"/"} />;
    }
    return null;
  }

  render() {
    return (
      <div className="search-books">
        {this.renderRedirectToHome()}
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>
            {this.state.searchBooks !== undefined && this.state.searchBooks.length !== 0
              ? <div className="list-books-content">
                <div className="search-books-results">
                  <ol className="books-grid">
                    {this.state.searchBooks.map(book => <li key={book.id}><Book book={this.populateShelf(book)} updateShelf={(book, shelf) => this.handleUpdateShelf(book, shelf)}/> </li>)}
                  </ol>
                </div>
              </div> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
