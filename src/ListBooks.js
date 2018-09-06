import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class ListBooks extends Component {
    
   
    handleSelect = (event) => {
        this.setState({
            value: event.target.value
        })
        this.props.onUpdateBooks(event.target.id, event.target.value)
    }
    handleClick = (event) => {
        event.preventDefault()
        this.props.onClick()
    }
    render() {
        const { books } = this.props
        let currentlyReading
        let wantToRead
        let read
        
        return(
           
            <div className="list-books">
                <div className="list-books-title">
                    <h1>Reading Collection</h1>                    
                 </div>                 
                 <div className="list-books-content">
                 <div>
                     <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                        
                        {currentlyReading = books.map((book) => {
                        if(book.shelf === "currentlyReading"){                                                     
                            return (
                                
                            <ol className="books-grid" key={book.id}>
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                            <div className="book-shelf-changer">
                                                <select onChange={this.handleSelect} id={book.id} defaultValue={book.shelf}> 
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
                            return currentlyReading
                        })}
                    </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                        {wantToRead = books.map((book) => {
                        if(book.shelf === "wantToRead"){
                            return (
                        <ol className="books-grid" key={book.id}>
                        <li>
                            <div className="book">
                                <div className="book-top">
                                
                                <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                <div className="book-shelf-changer">
                                <select onChange={this.handleSelect} id={book.id} defaultValue={book.shelf}> 
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
                    
                        )}
                        return wantToRead 
                        })}
                    </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        {read = books.map((book) => {
                        if(book.shelf === "read"){
                            return (
                        <ol className="books-grid" key={book.id}>
                        <li>
                            <div className="book">
                                <div className="book-top">
                                
                                <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                <div className="book-shelf-changer">
                                <select onChange={this.handleSelect} id={book.id} defaultValue={book.shelf}> 
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
                    
                        )}
                        return read
                        })}
                    </div>
                    </div>




                 </div>          
           </div>
                 
                  <div className="open-search" onClick={this.handleClick}>
                    <Link to='/search'>Add a book</Link>
                  </div>
             
              
            </div>
          )
        
    }
}

export default ListBooks
