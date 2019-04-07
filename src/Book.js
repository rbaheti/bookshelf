import React, {Component} from "react";

// Reander a book being passed to this component.
class Book extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = e => {
    e.preventDefault();
    this.props.updateShelf(this.props.book, e.target.value);
  }

  render() {
    const {book} = this.props;
    const optionsState = book.shelf === undefined ? "none" : book.shelf;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundSize: "contain", backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
            <img src={book.imageLinks.thumbnail} style={{maxWidth: "150px", maxHeight: "200px", visibility: "hidden"}}/>
          </div>
          <div className="book-shelf-changer">
            <select defaultValue={optionsState} onChange={this.handleChange}>
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
  }
}

export default Book;
