import React, {Component} from 'react';
import ReactGA from 'react-ga';


class ShowBooks extends Component {
    constructor(props) {
        super(props);
        this.handleBookAuthor = this.handleBookAuthor.bind(this);
        this.handleBookTitle = this.handleBookTitle.bind(this);
        this.handleBookPages = this.handleBookPages.bind(this);
        this.state = {
            books: "",
            author: "",
            title: "",
            pages: ""
        };
    }

    componentDidMount() {
        this.getBooks();
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    getBooks() {
        var options = {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        console.time('getBooks');
        fetch('http://localhost:3001/books', options)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const books = data.map((book) => {
                    return (
                        <div key={book._id}>
                            <h3 key={book._id + "author"} className="h3author">{book.author}</h3>
                            <h3 key={book._id + "title"} className="h3title">{book.title}</h3>
                            <h3 key={book._id + "pages"} className="h3pages">{book.pages}</h3>
                            <hr/>
                        </div>
                    )

                });
                ReactGA.timing({
                    category: 'Books',
                    variable: 'fetch all',
                    value: console.timeEnd("getBooks")
                });
                ReactGA.event({
                    category: 'Books',
                    action: 'Fetched all'
                });
                ReactGA.ga()
                this.setState({
                    books,
                    author: "",
                    title: "",
                    pages: ""
                });
            })
            .catch(error => {
                    console.log("Error: " + error);
                    ReactGA.exception({
                        description: 'An error ocurred',
                        fatal: false
                    });
                }
            );
    }


    handleBookAuthor(event) {
        this.setState({author: event.target.value});
    }

    handleBookTitle(event) {
        this.setState({title: event.target.value});
    }

    handleBookPages(event) {
        this.setState({pages: event.target.value});
    }

    addBook = event => {
        event.preventDefault();
        this.setState({
            books: event.target.value,
            author: event.target.value,
            title: event.target.value,
            pages: event.target.value
        });

        var body = JSON.stringify({
            author: this.state.author,
            title: this.state.title,
            pages: this.state.pages
        })

        var options = {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        }
        console.time("postBook");
        fetch('https://books-rest-example.herokuapp.com/books', options)
            .then(response => {
                console.log(response, 'Book added!');
                ReactGA.set({userId: 123});
                ReactGA.event({
                    category: 'Books',
                    action: 'Added one',
                });
                this.getBooks();
            });

        ReactGA.timing({
            category: 'Books',
            variable: 'fetch all',
            value: console.timeEnd("postBook")

        });
    }

    clearBooks = event => {
        event.preventDefault();


        var options = {
            mode: 'cors',
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        console.time('deleteBooks');
        fetch('https://books-rest-example.herokuapp.com/books', options)
            .then(response => {
                ReactGA.timing({
                    category: 'Books',
                    variable: 'fetch all',
                    value: console.timeEnd("deleteBooks")
                })
                ReactGA.event({
                    category: 'Books',
                    action: 'Cleared all',
                });
                console.log(response, 'Books cleared!');
            })
            .catch(err => {
                console.log(err, 'Books not cleared, try again');
                ReactGA.exception({
                    description: 'An error ocurred',
                    fatal: false
                });
            });

        this.setState({
            books: "",
            author: "",
            title: "",
            pages: ""
        });
    }

    render() {
        return <div>

            <div>
                <button
                    className="submitbuttonbook"
                    type="submit"
                    onClick={this.clearBooks}
                >
                    Clear All Books<i className="ClearBooksButton" aria-hidden="true"/>
                </button>
            </div>


            <div>
                <input
                    onChange={this.handleBookAuthor}
                    name="Author Name"
                    className="NameinputForm"
                    value={this.state.author}
                    placeholder="Enter author's name"
                /><br/>
                <input
                    onChange={this.handleBookTitle}
                    name="Title"
                    className="NameinputForm"
                    value={this.state.title}
                    placeholder="Enter book's title"
                /><br/>
                <input
                    onChange={this.handleBookPages}
                    name="Number of pages"
                    className="NameinputForm"
                    value={this.state.pages}
                    placeholder="Enter the number of pages"
                />

                <button
                    className="submitbuttonbook"
                    type="submit"
                    onClick={this.addBook}
                >
                    Add new book<i className="NewBookButton" aria-hidden="true"/>
                </button>
            </div>

            <div className="bookDataContainer">
                <h6>Books in library</h6>
                {this.state.books}
            </div>

        </div>
    }
}

export default ShowBooks