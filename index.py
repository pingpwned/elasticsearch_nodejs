import requests
import json

data =  {
    #  "actions" : [
    #     { "add" : { "index" : "books", "alias" : "books_primary" } }
    # ]

    # PUT NEW INDEX WITH MAPPING AND ANALYZER

    # "settings" : {
    #     "index" : {
    #         "number_of_shards" : 1, 
    #         "number_of_replicas" : 0 
    #     }
    # "analysis": {
    #     "filter": {
    #         "autocomplete_filter": { 
    #             "type":     "edge_ngram",
    #             "min_gram": 1,
    #             "max_gram": 20
    #         }
    #     },
    #     "analyzer": {
    #         "autocomplete": {
    #             "type":      "custom",
    #             "tokenizer": "standard",
    #             "filter": [
    #                 "lowercase",
    #                 "autocomplete_filter" 
    #             ]
    #         }
    #     }
    # },
    # "mappings": {
    #     "_doc": { 
    #         "properties": { 
    #             "SHOPITEM": {
    #                 "properties": {
    #                     "PRODUCTNAME": { "type": "text", "analyzer": "autocomplete"  }, 
    #                     "EAN": { "type": "long"  }, 
    #                     "PRICE_VAT": { "type": "float" },
    #                     "DESCRIPTION":      
    #                     { 
    #                         "type": "text",
    #                         "analyzer": "autocomplete"
    #                     },
    #                     "CATEGORYTEXT":      { "type": "keyword" }
    #                 }
    #             }
    #         }
    #     }
    # }
# POST REINDEX
  "source": {
    "index": "default-0"
  },
  "dest": {
    "index": "default-1"
  }

}
jsondata = json.dumps(data, ensure_ascii=False).encode('utf-8')

rput = requests.post('https://search-wazup-mr-deer-mk6lluli7el4xy2czteszbktum.eu-central-1.es.amazonaws.com/_reindex', data=jsondata, headers={'Content-type': 'application/json'})
# Print response
print(rput.json())