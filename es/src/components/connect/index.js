import React, { Component } from 'react';
import SearchBar from '../search'
import client from '../client'
import Book from '../book'
import Admin from '../admin'
export default class Connect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            data: [],
            queryString: {
                index: "books_primary",
                size: 10000 // max allowed
            },
            response: null,
            displayBook: false,
            displayAdmin: true,
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
            this.loadCategories()
          },
          error => {
            console.log(`error: ${error}`)
          }
        )
    }
    loadCategories() {
        let categoriesArray = []
        this.state.data.map(item => {
            if (item._source.SHOPITEM.CATEGORYTEXT) {
                console.log(item._source.SHOPITEM.CATEGORYTEXT.split("|"))
                categoriesArray.push(...item._source.SHOPITEM.CATEGORYTEXT.split("|"))
            }
        } )
        let s = new Set(categoriesArray)
        let it = s.values()
        let arr = Array.from(it)
        this.setState({categories: arr})
    }
    updateQuery = e => {
        const queryString = {
            index: "books_primary",
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
    updateQueryCat = e => {
        const queryString = {
            index: "books_primary",
            size: 10000,
            q: e.target.checked ? e.target.name : null
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
    renderCategories() {
        return this.state.categories.map((item, i) => (
            <li key={i}><input type="checkbox" onChange={this.updateQueryCat} name={item}></input>{item}</li>
        ))
    }
    handleBookOpen(val) {
        console.log(val, this.state.bookID, "val & state")
        document.body.classList.toggle("no-sroll")
        this.setState({
            displayBook: !this.state.displayBook,
            bookID: val
        })
    }
    render() {
        return(
            <div className="container">
                <SearchBar onChange={this.updateQuery}
                    searchTime={this.state.searchTime}
                    searchResult={this.state.searchResult} />

                <div>
                    <h2>Box</h2>
                    <ul className="cat__box">
                        {this.renderCategories()}                        
                    </ul>
                </div>
                {
                    this.state.displayBook ? 
                    <Book handler={this.handleBookOpen} id={this.state.bookID} /> 
                    : null
                }
                <div className="list__container">
                    { this.renderData() }
                </div>
            </div>
        )
    }
}