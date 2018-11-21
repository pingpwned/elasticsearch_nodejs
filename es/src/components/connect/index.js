import React, { Component } from 'react';
import SearchBar from '../search'
import client from '../client'
import Book from '../book'
export default class Connect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            queryString: {
                index: "books",
                size: 10000 // max allowed
            },
            response: null,
            displayBook: false,
            bookID: "",
            searchResult: "",
            searchTime: 0
        }
        this.handleBookOpen = this.handleBookOpen.bind(this)
    }
    componentDidMount(){
        this.performQuery(this.state.queryString);
    }
    performQuery = queryString => {
        let reqStart = new Date().getTime()
        client.search(
            queryString
        ).then(
          response => {
            let reqTime = new Date().getTime() - reqStart
            console.log(response, "RESPONSE")
            this.setState({data: response.hits.hits, searchTime: reqTime, searchResult: response.hits.total})
          },
          error => {
            console.log(`error: ${error}`)
          }
        )
    }
    updateQuery = e => {
        const queryString = {
            index: "books",
            size: 10000,
            q: e ? e : null
        }
        this.setState(
            {
                queryString: queryString // Save the user entered query string
            },
            () => {
                this.performQuery(queryString); // Trigger a new search
            }
        )
    }
    renderData() {
        // this.state.data.map((item, i) => {
        //     item._source.SHOPITEM.PARAM.map((param, i) => {
        //         if (param.PARAM_NAME === "Datum vydání") {
        //             console.log(param.VAL)
        //         }
        //     })
        //     }
        // )
        return this.state.data.map((item, i) => 
            (
                <div className="list__item" key={i} data-id={item._id} onClick={() => this.handleBookOpen(item._id)}>
                    <h3>{item._source.SHOPITEM.PRODUCTNAME.length > 50 ? item._source.SHOPITEM.PRODUCTNAME.substring(0, 49)+"..." : item._source.SHOPITEM.PRODUCTNAME}</h3>
                    <img src={item._source.SHOPITEM.IMGURL ? item._source.SHOPITEM.IMGURL : "#"} />
                    <div className="item__desc"> 
                        <p className="item__text">{item._source.SHOPITEM.DESCRIPTION !== null ? item._source.SHOPITEM.DESCRIPTION.length > 250 ? item._source.SHOPITEM.DESCRIPTION.substring(0, 249)+"..." : item._source.SHOPITEM.DESCRIPTION : "no description"}</p>
                        <div className="background"></div>
                    </div>
                </div>
            )
        )
    }
    handleBookOpen(val) {
        document.body.classList.toggle("no-sroll")
        this.setState({
            displayBook: !this.state.displayBook,
            bookID: val
        })
    }
    render() {
        return(
            <div className="container">
                <SearchBar onChange={this.updateQuery} searchTime={this.state.searchTime} searchResult={this.state.searchResult} />
                {this.state.displayBook ? <Book handler={this.handleBookOpen} id={this.state.bookID} /> : null}
                <div className="list__container">
                    { this.renderData() }
                </div>
            </div>
        )
    }
}