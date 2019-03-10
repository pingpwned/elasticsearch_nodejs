import React from 'react'
import Autosuggest from 'react-autosuggest'
import client from '../client'
import { debounce } from 'throttle-debounce'

export default class AutoComplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{suggestion.SHOPITEM.PRODUCTNAME}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const queryString = {
        index: "default-1",
        size: 10000,
        body: {
            query: {
                match_phrase_prefix: {
                  "SHOPITEM.PRODUCTNAME": {
                    query: value,
                    max_expansions: 50
                  }
                }
                //query_string : {default_field : "DESCRIPTION", query : "*"+value+"*"}
            }
        }
        
    }
    client.search(
        queryString
    ).then(
        res => {
            const results = res.hits.hits.map(h => h._source)
            this.setState({ suggestions: results })
          },
      error => {
      }
    )
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'customer name or short code',
      value,
      onChange: this.onChange
    }

    return (
      <div className="App">
        <h1>AutoComplete Demo</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.SHOPITEM.PRODUCTNAME}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}