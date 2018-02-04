import React from 'react'
import Book from './Book'


const BookShelf= ({ books, title, bookChangeShelf }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
          books.map((b) =>
            <li key={b.id}>
              <Book book={b} bookChangeShelf={ bookChangeShelf }/>
            </li>
          )
        }
        </ol>
      </div>
    </div>
  )
}


export default BookShelf
