import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class ListBook extends Component {

  state = {
    books : [],
  }

  componentDidMount() {
    this.fechAllBooks()
  }

  fechAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState( { books } )
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
    const { books } = this.state

    console.log(books);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={ books.filter((b) =>b.shelf === 'currentlyReading') } title="Currently Reading" bookChangeShelf={ this.bookChangeShelf }/>
            <BookShelf books={ books.filter((b) =>b.shelf === 'wantToRead') } title="Want to Read" bookChangeShelf={ this.bookChangeShelf }/>
            <BookShelf books={ books.filter((b) =>b.shelf === 'read') } title="Read" bookChangeShelf={ this.bookChangeShelf }/>
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
