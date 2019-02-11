# -*- coding: utf-8 -*-
import urllib3
import json
import xmltodict
import requests


"""
WRITE FROM ONE XML TO SEPARATE DATA-%i.XML FILES
"""

# import os
# import xml.etree.ElementTree as et

# base_path = os.path.dirname(os.path.realpath(__file__))

# xml_file = os.path.join(base_path, "output\\new_d.xml")
# tree = et.parse(xml_file)
# root = tree.getroot()
# shopitems = root.getchildren()
# print(root)

# for i, item in enumerate(shopitems):
#     item_tree = et.ElementTree(item)
#     item_tree.write(os.path.join(base_path, 'output\\data-%i.xml' %i), encoding='utf8')
#     print(item_tree)
# """
# UPLOAD TO ELASTICSEARCH
# """
for i in range(1, 993, 1): # 0-99, range(100, 200, 1) -> 100-199 // TODO: I RAN OUT OF RAM :O
    of = open('D:/Dev/elasticsearch_nodejs/output/data-%i.xml' %i, encoding="utf-8").read()
    #of = open('data/data-1.xml', encoding="utf-8").read()
    data = xmltodict.parse(of)
    jsondata = json.dumps(data, ensure_ascii=False).encode('utf-8')
    # python_obj = json.loads(jsondata)
    # dataj = json.dumps(python_obj, ensure_ascii=False).encode('utf-8')
    # Make POST request to elasticsearch with JSON data
    rput = requests.post('http://18.184.159.62:9200/books/_doc', data=jsondata, headers={'Content-type': 'application/json'})
    # Print response
    print(rput.json())
    print("\n ******* SENDING NEW POST REQUEST!! ******* \n")