import React from 'react'



const Book = ({book,bookChangeShelf}) => {

  const changeOptionShelf = (event) => {
    bookChangeShelf(book,event.target.value)
  };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf ? book.shelf : 'none'} onChange={ changeOptionShelf } >
            <option value="disable" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors != null && book.authors.length === 1? book.authors[0]: book.authors != null && book.authors.map((b,index,book) => { return b + (index < book.length-1 ? ', ': '')})}</div>
    </div>
  )

}

export default Book
