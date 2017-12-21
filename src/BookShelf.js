import React, { Component } from 'react'
import Book from './Book'


class BookShelf extends Component {

  getTitleShelf = (tipo) => {
      if(tipo === 'currentlyReading'){
        return 'Currently Reading'
      } else if(tipo === 'wantToRead') {
        return 'Want to Read'
      } else if(tipo === 'read') {
        return 'Read'
      }
  }

  render () {
    const { books, title } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {
            books.map((b) =>
              <li key={b.id}>
                <Book book={b} />
              </li>
            )
          }
          </ol>
        </div>
      </div>
    )
  }
}


export default BookShelf
