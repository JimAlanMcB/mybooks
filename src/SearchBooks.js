import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
    state = {
    query: '',
    }
  
  handleSearch = (query) => {
    this.setState({query: query})
    this.props.onSearchBooks(query)
    
  }
  handleSelect = (event) => {  
    let books = this.props.books
    return books && books.length > 0 ? books.map((element) => {
        return element.id === event.target.id ? 
        (element.shelf = event.target.value,
        this.props.onAddBooks(element, event.target.value)) : ''
        
    }) : 'All of your books are on a shelf!' 
       
  }
 
    render(){
      
      const { books } = this.props
      
      return (
        <div className="search-books">
            <div className="search-books-bar">
              
              <div>
              <Link className="close-search" to="/" ></Link></div>
            
              <div className="search-books-input-wrapper">
               
                <input type="text" placeholder="Search by Title or Author" 
                onChange = {(e) => this.handleSearch(e.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>Search for Books</h1>                    
                 </div>                 
                 <div className="list-books-content">
                 <div>
                     <div className="bookshelf">
                        <h2 className="bookshelf-title">Search Results</h2>
                        <div className="bookshelf-books">
                        
                        {books && books.length > 0 ?                         
                         books.map((book) => {
                         
                          return (
                                
                            <ol className="books-grid" key={book.id}>
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                            <div className="book-shelf-changer">
                                                <select onChange={this.handleSelect} id={book.id} defaultValue="none"> 
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-autohers">{book.authors}</div>
                                </div>
                            </li>
                            </ol>
                          )
                            }
                              ) 
                               : "No results..try searching for 'Science'" } 
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
            </div>
          </div>
          
            
        )
      }
    }

export default SearchBooks