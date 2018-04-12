import React, {Component} from 'react';
import axios from "axios";


class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.handleBookAuthor = this.handleBookAuthor.bind(this);
        this.handleBookTitle = this.handleBookTitle.bind(this);
        this.handleBookPages = this.handleBookPages.bind(this);
        this.state = {
            author: "",
            title: "",
            pages: ""
        };
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
            author: event.target.value,
            title: event.target.value,
            pages: event.target.value
        });
        axios.post('https://fast-earth-23205.herokuapp.com/books', {
            author: this.state.author,
            title: this.state.title,
            pages: this.state.pages
        })
            .then(response => {
                console.log(response, 'Signature added!');
            })
            .catch(err => {
                console.log(err, 'Signature not added, try again');
            });

        this.setState({
            author: "",
            title: "",
            pages: ""
        });
    }

    render() {
        return <div>
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
                Add new book<i className="NewBookButton" aria-hidden="true" />
            </button>
        </div>
    }
}

export default CreateBook