import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

// Render all categories and their respective books under MyReads
class MyReads extends Component {

  state = {
    allBooks: [],
    showSearchPage: false
  }

  // Get all books using the function in BookAPI and set it in the local state
  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({allBooks: data}));
  }

  // Once the user changes a book shelf, update it with the help of BookAPI's update function and also update the local state.
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

  handleSearchButton = e => {
    e.preventDefault();
    this.setState({showSearchPage: true});
  }

  // Redirect page url to "/search" when the add button is clicked
  renderRedirectToSearch = () => {
    if (this.state.showSearchPage) {
      return <Redirect to={"/search"} />;
    }
    return null;
  }

  render() {
    const {allBooks} = this.state;

    const shelves = [
      {title: "Currently Reading", slug: "currentlyReading"},
      {title: "Want To Read", slug: "wantToRead"},
      {title: "Read", slug: "read"}
    ];

    return (
      <div className="list-books">
        {this.renderRedirectToSearch()}
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map(currShelf =>
            allBooks.length !== 0
              ? <div key={currShelf.slug}>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{currShelf.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {allBooks.map(book => book.shelf === currShelf.slug ? <li key={book.id}><Book book={book} updateShelf={(book, shelf) => this.handleUpdateShelf(book, shelf)}/> </li>  : null)}
                    </ol>
                  </div>
                </div> 
              </div> : null
          )}
        </div>
        <div className="open-search">
          <button onClick={this.handleSearchButton}>Add a book</button>
        </div>
      </div> 
    );
  }
}

export default MyReads;
