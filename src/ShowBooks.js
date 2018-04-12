import React, {Component} from 'react';

// import got from "got";


class ShowBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: ""
        };
    }

    componentDidMount() {
        var fetchUrl = require("fetch").fetchUrl;

        var options = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }

        var response = fetchUrl('https://fast-earth-23205.herokuapp.com/books', options, function(error, meta, body){
            return body.json;
        })

        const books = response.map((book) => {
            return (
                <div key={book.results}>
                    <h3 className="h3author">{book.author}</h3>
                    <h3 className="h3title">{book.title}</h3>
                    <h3 className="h3pages">{book.pages}</h3>
                </div>)
        })

        this.setState({books});
    }


    render() {
        return <div>
            <div className="bookDataContainer">
                <h6>Books in library</h6>
                {this.state.books}
            </div>
        </div>
    }
}

export default ShowBooks