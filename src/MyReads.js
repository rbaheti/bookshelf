import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class MyReads extends Component {

  state = {
    allBooks: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({allBooks: data}));
  }

  handleUpdateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(data => {
        const allBooks = this.state.allBooks;
        if (allBooks.length < data.currentlyReading.length + data.wantToRead.length + data.read.length) {
          allBooks.push(book);
        }
        
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
  }

  renderRedirectToSearch = () => {
    if (this.state.showSearchPage) {
      return <Redirect to={"/search"} />;
    }
    return null;
  }

  render() {
    const {allBooks} = this.state;

    return (
      <div className="list-books">
        {this.renderRedirectToSearch()}
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {allBooks.length !== 0 
          ? <div className="list-books-content">
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
          : null}
        <div className="open-search">
          <button onClick={this.handleSearch}>Add a book</button>
        </div>
      </div> 
    );
  }
}

export default MyReads;