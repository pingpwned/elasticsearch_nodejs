import React, { Component } from 'react';
import client from '../client'

export default class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            data: [],
            queryString: { 
                index: "books"
            }
        }
        this.handleBookOpen = this.handleBookOpen.bind(this)
    }
    componentDidMount(){
        this.performQuery(this.state.queryString)
        this.updateQuery()
    }
    performQuery = queryString => {
        client.search(
            queryString
        ).then(
          response => {
            this.setState({data: response.hits.hits})
          },
          error => {
            console.log(`error: ${error}`)
          }
        )
    }
    updateQuery() {
        const queryString = {
            index: "books",
            body: {
                query: {
                    ids: {
                        values: this.props.id
                    }
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
    handleBookOpen = e => {
        if (typeof this.props.handler === 'function') {
            this.props.handler(e)
        }
    }
    render() {
        return this.state.data.map((item, i) =>
            (
                <div className="book__info" key={i}>
                    <div className="book__background"></div>
                    <div className="book__content">
                        <span onClick={this.handleBookOpen} className="close"></span>
                        <h1>{item._source.SHOPITEM.PRODUCTNAME}</h1>
                        {item._source.SHOPITEM.CONTRIBUTOR !== null && item._source.SHOPITEM.CONTRIBUTOR.length > -1 ? <h2>
                            {Object.keys(item._source.SHOPITEM.CONTRIBUTOR).map((key, i) => {
                                return (
                                    <span key={i}>
                                        <b>{item._source.SHOPITEM.CONTRIBUTOR[key].ROLE}: </b><span>{item._source.SHOPITEM.CONTRIBUTOR[key].SURNAME+", "+item._source.SHOPITEM.CONTRIBUTOR[key].NAME}</span><br/>
                                    </span>
                                )
                            })}
                        </h2> : ""}
                        {item._source.SHOPITEM.CONTRIBUTOR !== null ? <h2>
                            <span key={i}>
                                <b>{item._source.SHOPITEM.CONTRIBUTOR.ROLE}: </b><span>{item._source.SHOPITEM.CONTRIBUTOR.SURNAME+", "+item._source.SHOPITEM.CONTRIBUTOR.NAME}</span><br/>
                            </span>
                        </h2> : ""}
                        <img src={item._source.SHOPITEM.IMGURL ? item._source.SHOPITEM.IMGURL : "#"} />
                        <p><b>Popis: </b>{item._source.SHOPITEM.DESCRIPTION}</p>
                        <p><b>EAN: </b>{item._source.SHOPITEM.EAN}</p>
                        <p><b>ISBN: </b>{item._source.SHOPITEM.ISBN}</p>
                        <p><b>CENA: </b>{item._source.SHOPITEM.PRICE_VAT}</p>
                        <p><b>Popis: </b>{item._source.SHOPITEM.PRODUCT}</p>
                        <p><b>Žánr: </b>{item._source.SHOPITEM.THEMATIC_GROUP}</p>
                        <p><b>URL: </b>{item._source.SHOPITEM.URL}</p>
                        {item._source.SHOPITEM.PARAM.map((param, i) => {
                            return (
                                <p key={i}><b>{param.PARAM_NAME+": "}</b>{param.VAL}</p>
                            );
                        })}
                    </div>
                </div>
            )
        )
    }
}