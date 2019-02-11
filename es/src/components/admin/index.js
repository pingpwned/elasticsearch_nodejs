import React, { Component } from 'react';
import client from '../client'

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            queryString: { 
                index: "books_primary"
            }
        }
    }

    componentDidMount(){
        this.performQuery(this.state.queryString);
    }

    performQuery = queryString => {
        client.indices.getMapping().
        then(
            res => {
                console.log(res, "mapping")
            }
        )
        client.search(
            queryString
        ).then(
          response => {
            console.log(response, "RESPONSE")
            this.setState({data: response})
          },
          error => {
            console.log(`error: ${error}`)
          }
        )
    }

    render() {
        return(
            <div>
                {}
                <h1>Hello from ADmin!</h1>
            </div>
        )
    }






}