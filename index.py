import requests
import json

data =  {
     "actions" : [
        { "add" : { "index" : "books", "alias" : "books_primary" } }
    ]
    # "settings" : {
    #     "index" : {
    #         "number_of_shards" : 1, 
    #         "number_of_replicas" : 0 
    #     }
    # },
    # "mappings": {
    #     "_doc": { 
    #         "properties": { 
    #             "PRODUCTNAME": { "type": "keyword"  }, 
    #             "EAN": { "type": "long"  }, 
    #             "PRICE_VAT": { "type": "float" },
    #             "DESCRIPTION":      
    #             { 
    #                 "type": "text",
    #                 "analyzer": "standard"
    #             },
    #             "CATEGORYTEXT":      { "type": "keyword" }
    #         }
    #     }
    # }
    
}
jsondata = json.dumps(data, ensure_ascii=False).encode('utf-8')

rput = requests.post('http://18.184.159.62:9200/_aliases', data=jsondata, headers={'Content-type': 'application/json'})
# Print response
print(rput.json())
# curl -X PUT "localhost:9200/my_index" -H 'Content-Type: application/json' -d'
# {
#   "mappings": {
#     "_doc": { 
#       "properties": { 
#         "title":    { "type": "text"  }, 
#         "name":     { "type": "text"  }, 
#         "age":      { "type": "integer" },  
#         "created":  {
#           "type":   "date", 
#           "format": "strict_date_optional_time||epoch_millis"
#         }
#       }
#     }
#   }
# }
# '
