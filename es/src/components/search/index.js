import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.updateQuery = this.updateQuery.bind(this)
    }
    updateQuery = e => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value.trim())
        }
    }
    render() {
        let stime = this.props.searchTime/1000 + " s"
        return(
            
            <div className="searchbar__container">
                <input type="text" name="searchbar" className="searchbar" id="searchbar" placeholder="&#128270; Type for search.." onChange={this.updateQuery}/>
                <p className="search__info">{this.props.searchResult} results in {stime}</p>
            </div>
        )
    }
}