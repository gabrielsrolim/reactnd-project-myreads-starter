import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class ListBook extends Component {

  state = {
    booksCurrentRead: [],
    booksWantRead: [],
    booksRead: [],
  }

  componentDidMount() {
    this.fechAllBooks()
  }

  fechAllBooks = () => {
    BooksAPI.getAll().then((books) => {

      let booksCurrentRead = books.filter((b) =>b.shelf === 'currentlyReading')
      let booksWantRead = books.filter((b) =>b.shelf === 'wantToRead')
      let booksRead = books.filter((b) =>b.shelf === 'read')

      this.setState( { booksCurrentRead, booksWantRead, booksRead } )
    })
  }

  bookChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      console.log(result);
      this.fechAllBooks()
    })
  }


  render () {
    const { title } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={ this.state.booksCurrentRead } title="Currently Reading" bookChangeShelf={ this.bookChangeShelf }/>
            <BookShelf books={ this.state.booksWantRead } title="Want to Read" bookChangeShelf={ this.bookChangeShelf }/>
            <BookShelf books={ this.state.booksRead } title="Read" bookChangeShelf={ this.bookChangeShelf }/>
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBook;
