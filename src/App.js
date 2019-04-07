import React, {Fragment} from "react";
import {Redirect} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({allBooks: data}));
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

  handleSearch = e => {
    e.preventDefault();
    this.setState({showSearchPage: true});
    // return <Redirect to={"/search"} />;
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

  render() {
    const {allBooks} = this.state;
    console.log("all books: ", allBooks);
    
    return (
      <div className="app">
        {this.state.showSearchPage 
          ? <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>
                {this.state.searchBooks !== undefined && this.state.searchBooks.length !== 0
                  ? <div className="list-books-content">
                    <div>
                      <div className="bookshelf">
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            {this.state.searchBooks.map(book => <li key={book.id}><Book book={book} updateShelf={(book, shelf) => this.handleUpdateShelf(book, shelf)}/> </li>)}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div> : null}
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          : allBooks.length !== 0
            ? <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {allBooks.map(book => book.shelf === "currentlyReading" ? <li key={book.id}><Book book={book} updateShelf={(book, shelf) => this.handleUpdateShelf(book, shelf)}/> </li>  : null)}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {allBooks.map(book => book.shelf === "wantToRead" ? <li key={book.id}><Book book={book} updateShelf={(book, shelf) => this.handleUpdateShelf(book, shelf)}/> </li>  : null)}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {allBooks.map(book => book.shelf === "read" ? <li key={book.id}><Book book={book} updateShelf={(book, shelf) => this.handleUpdateShelf(book, shelf)}/> </li>  : null)}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <button onClick={this.handleSearch}>Add a book</button>
                </div>
              </div> 
            </div> : null}
      </div>
    );
  }
}

export default BooksApp;
