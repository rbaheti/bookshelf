import React, {Component} from "react";

class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {book} = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
            <img src={book.imageLinks.thumbnail} style={{visibility: "hidden"}}/>
          </div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
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
