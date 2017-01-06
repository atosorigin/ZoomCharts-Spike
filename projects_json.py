#!/usr/bin/python
import json
import openpyxl
from openpyxl import load_workbook

print("Script to generate SQL Insert statments for hierarchical selection")

# load spreadsheet
wb = load_workbook('Book1.xlsx')
ws = wb['Sheet1']

# initialise id count and JSON object
jsonObject = []

# iterate over rows in spreadsheet
for index, row in enumerate(ws.rows):

    # get the values of each cell in the row
    project = row[0].value
    person1 = row[1].value
    person2 = row[2].value
    person3 = row[3].value
    person4 = row[4].value
    person5 = row[5].value
    
    projectJson = {"name": project, "people": []}
    projectJson["people"].append({"name": person1})
    projectJson["people"].append({"name": person2})
    projectJson["people"].append({"name": person3})
    projectJson["people"].append({"name": person4})
    projectJson["people"].append({"name": person5})
    
    jsonObject.append(projectJson)

print(jsonObject)