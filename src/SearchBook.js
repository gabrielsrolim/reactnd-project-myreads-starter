import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { debounce } from 'underscore'



class SearchBook extends Component {
  state = {
    query: '',
    bookSearch : []
  }

  constructor(props) {
    super(props);
    this.fetchBooks = debounce(this.fetchBooks,500);
  }

  fetchBooks = () => {
    if(this.state.query.length > 0){
      BooksAPI.search(this.state.query).then((bookSearch) => {
          this.setState({ bookSearch })
      }).catch(() => {
        this.setState({ bookSearch: [] })
      })
    } else {
      this.setState({ bookSearch: [] })
    }
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.fetchBooks()
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  componentDidMount() {
    this.setState({pesquisarLivros : debounce(this.fetchBooks(), 1000)})
  }

  bookChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      this.fetchBooks()
    })
  }


  render () {
    const { bookSearch, query } = this.state


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            bookSearch.map((b) =>
              <li key={b.id}>
                <Book book={b} bookChangeShelf={ this.bookChangeShelf }/>
              </li>
            )
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;
