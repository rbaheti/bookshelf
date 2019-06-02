import React, {Component} from "react";
import {Link} from "react-router-dom";

import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

// Render all categories and their respective books under Bookshelf
class Bookshelf extends Component {

  state = {
    allBooks: []
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

        this.setState(prevState => {
          prevState.allBooks.forEach(d => {
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
          return {allBooks: prevState.allBooks};
        });
      });
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
        <div className="list-books-title">
          <h1>Bookshelf</h1>
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
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div> 
    );
  }
}

export default Bookshelf;
