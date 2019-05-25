import React from "react";
import PropTypes from "prop-types";
import defaultImage from "./icons/defaultImage.jpg";

// Reander a book being passed to this component.
const Book = ({book, updateShelf}) => {

  const handleChange = e => {
    e.preventDefault();
    updateShelf(book, e.target.value);
  };


  const optionsState = book.shelf === undefined ? "none" : book.shelf;
  const image = book.imageLinks === undefined ? defaultImage : book.imageLinks.smallThumbnail;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{backgroundSize: "contain", backgroundImage: `url(${image})`}}>
          <img alt="book-cover" src={image} style={{maxWidth: "150px", maxHeight: "200px", visibility: "hidden"}}/>
        </div>
        <div className="book-shelf-changer">
          <select defaultValue={optionsState} onChange={handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead" defaultValue="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors !== undefined ? book.authors.map(d => <div className="book-authors" key={d}>{d}</div>) : null}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default Book;
