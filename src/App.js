import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'


class BooksApp extends React.Component {
    state = {
      books: [],
      search: []
    }

    componentDidMount() {
      this.getAllBooks();
      
    }
   

    updateBooks = (book, shelf) => {
      return this.state.books.map(bookname => {
          return bookname
        })
        .filter((bookname) => {
          return bookname.id === book ?
            BooksAPI.update(bookname, shelf)
            .then((res) => {
              this.getAllBooks()
            }) : 'Error'
        })
    }

    addBook = (book, shelf) => {
      BooksAPI.update(book, shelf).then((res) => {
        this.getAllBooks()
      })
    }

    checkShelf = (item) => {
      item.shelf = "none"
      this.state.books.map(b => {
        if(b.id === item.id){
           if(item.hasOwnProperty('shelf')){
             item.shelf = b.shelf
            }
          }          
       return b
      })
    }
    
    searchBooks = (query) => {
      let newBooks = []

      BooksAPI.search(query).then((books) => {
        if(books && books.length > 0) {
         newBooks = books.map(b => {
            if(!b.hasOwnProperty('imageLinks')){
              b.imageLinks = {
                thumbnail: 'https://images.pexels.com/photos/1166657/pexels-photo-1166657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              }
            }             
            return b
          }).map(item => {
            this.checkShelf(item)
            return item
          })                  
          this.setState({ search: newBooks })
        }
        })
       }
       

    getAllBooks = () => {
      BooksAPI.getAll().then((books) => {
        books.map(b => {
          let propertyCheck = b.hasOwnProperty('imageLinks') ?
            true : b.imageLinks = {
              thumbnail: 'https://images.pexels.com/photos/1166657/pexels-photo-1166657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            }
          return {
            books: books,
            propertyCheck: propertyCheck
          }
        })
        this.setState({
          books
        });
      });
    }
    onClick = () => {
      this.setState({
        search: []
      })
    }

    render() {
   
    return (
      <div className="app">
       
    <Route exact path = "/" render={()=>(
      
      <ListBooks books={this.state.books}
        onUpdateBooks = {
        (book, shelf) => {
          this.updateBooks(book, shelf)                    
        }
      }
      onClick = {
        () => {
          this.onClick()
        }
      }
      
      />
      
    )}/>
    <Route path="/search" render={({ history }) => (
      <SearchBooks 
      onSearchBooks = {
        (query) => {
          this.searchBooks(query)
        }
      }
      books = {
        this.state.search
      }
      onAddBooks = {
        (book, shelf) => {
          this.addBook(book, shelf)
          history.push('/')
          this.setState({
            search: []
          })
        }
      }      
      />    )}/>
    
    </div>
    )
  }
}

export default BooksApp
 