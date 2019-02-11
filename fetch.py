# -*- coding: utf-8 -*-
import urllib3
import json
import xmltodict
import requests

# Disable urllib3 console warnings
urllib3.disable_warnings()

http = urllib3.PoolManager()
url = ""
req = http.request('GET', url)

if(req.status == 200):
    # XML to python dict
    data = xmltodict.parse(req.data)
    data = data["SHOP"]["SHOPITEM"]
    # Python to JSON string
    jsondata = json.dumps(data, ensure_ascii=False).encode('utf-8')
    python_obj = json.loads(jsondata)
    for i, obj in enumerate(python_obj):
        data = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        # Make POST request to elasticsearch with JSON data
        rput = requests.post('http://localhost:9200/books/doc', data=data, headers={'Content-type': 'application/json'})
        # Print response
        print(rput.json())