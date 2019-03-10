import React, { Component } from 'react';
import client from '../client'

export default class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: [],
            data: [],
            queryString: { 
                index: "default-1"
            }
        }
        this.handleBookOpen = this.handleBookOpen.bind(this)
        this.updateQuery = this.updateQuery.bind(this)
        this.performQuery = this.performQuery.bind(this)
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
            index: "default-1",
            body: {
                query: {
                    ids: {
                        values: [this.props.id]
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
    _renderObject(obj){
		return Object.entries(obj).map(([key, value], i) => {
            console.log(key, value, "from _renderObject")
			return (
				<span key={i}>
					<span>{value.toString()}</span><br></br>
				</span>
			)
		})
	}
    handleBookOpen = e => {
        if (typeof this.props.handler === 'function') {
            this.props.handler(e)
        }
    }
    renderBook(){
        this.state.data.map((item, i) => {
            return(
                <div key={i} className="book__info">
                    <div className="book__background"></div>
                    <div className="book__content">
                        <span onClick={this.handleBookOpen} className="close"></span>
                        <h1>{item._source.SHOPITEM.PRODUCTNAME}</h1>
                        <img src={item._source.SHOPITEM.IMGURL ? item._source.SHOPITEM.IMGURL : "#"} />
                        <p><b>Popis: </b>{item._source.SHOPITEM.DESCRIPTION}</p>
                        <p><b>EAN: </b>{item._source.SHOPITEM.EAN}</p>
                        <p><b>ISBN: </b>{item._source.SHOPITEM.ISBN}</p>
                        <p><b>CENA: </b>{item._source.SHOPITEM.PRICE_VAT}</p>
                        <p><b>Popis: </b>{item._source.SHOPITEM.PRODUCT}</p>
                        <p><b>Žánr: </b>{item._source.SHOPITEM.THEMATIC_GROUP}</p>
                        <p><b>URL: </b>{item._source.SHOPITEM.URL}</p>
                        
                    </div>
                </div>
            )
        })
    }
    renderContributor = contributor => {
        contributor.map((item, i) => {
            return (
                <p key={i}>{item}</p>
            )
        })
    }
    
    render() {
        return (
            this.state.data.map((item, i) => {
                return(
                    <div key={i} className="book__info">
                        <div className="book__background"></div>
                        <div className="book__content">
                            <span onClick={this.handleBookOpen} className="close"></span>
                            <h1>{item._source.SHOPITEM.PRODUCTNAME}</h1>
                            <h2>
                                <div>{/*Object.values(item._source.SHOPITEM.CONTRIBUTOR)*/}</div>
                            </h2>
                            <img src={item._source.SHOPITEM.IMGURL ? item._source.SHOPITEM.IMGURL : "#"} />
                            <p><b>Popis: </b>{item._source.SHOPITEM.DESCRIPTION}</p>
                            <p><b>EAN: </b>{item._source.SHOPITEM.EAN}</p>
                            <p><b>ISBN: </b>{item._source.SHOPITEM.ISBN}</p>
                            <p><b>CENA: </b>{item._source.SHOPITEM.PRICE_VAT}</p>
                            <p><b>Popis: </b>{item._source.SHOPITEM.PRODUCT}</p>
                            <p><b>Žánr: </b>{item._source.SHOPITEM.THEMATIC_GROUP}</p>
                            <p><b>URL: </b>{item._source.SHOPITEM.URL}</p>
                            
                        </div>
                    </div>
                )
            })
        )
    }
}