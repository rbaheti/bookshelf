import React, {Component} from "react";

class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {book} = this.props;
    const optionsState = book.shelf;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundSize: "contain", backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
            <img src={book.imageLinks.thumbnail} style={{maxWidth: "150px", maxHeight: "200px", visibility: "hidden"}}/>
          </div>
          <div className="book-shelf-changer">
            <select defaultValue={optionsState}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead" defaultValue="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map(d => <div className="book-authors" key={d}>{d}</div>)}
      </div>
    );
  }
}

export default Book;
