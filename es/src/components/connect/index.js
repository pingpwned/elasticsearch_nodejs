import React, { Component } from 'react';
import SearchBar from '../search'
import client from '../client'
import Book from '../book'
export default class Connect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            data: [],
            queryString: {
                index: "default-1",
                size: 10000 // max allowed
            },
            response: null,
            visible: 20,
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
            index: "default-1",
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
            index: "default-1",
            size: 10000,
            body: {
                query: {
                    match: {"CATEGORYTEXT": e.target.name}
                }
            }
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
        return this.state.data.slice(0, this.state.visible).map((item, i) => 
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
    loadMore = () => {
        this.setState((prev) => {
          return {visible: prev.visible + 20};
        });
      }
    render() {
        return(
            <div className="container">
                <SearchBar onChange={this.updateQuery}
                    searchTime={this.state.searchTime}
                    searchResult={this.state.searchResult} />
                {
                    this.state.displayBook ? 
                    <Book handler={this.handleBookOpen} id={this.state.bookID} /> 
                    : null
                }
                <div className="list__container">
                    { this.renderData() }
                </div>
                <div className="load-more__container">
                    {this.state.visible < this.state.data.length &&
                    <button className="button load-more" onClick={this.loadMore} type="button">
                        <div className="qube">
                        <div className="front">+20 books</div>
                        <div className="back">Load more</div>
                        </div>
                    </button>
                    }
                </div>
            </div>
        )
    }
}