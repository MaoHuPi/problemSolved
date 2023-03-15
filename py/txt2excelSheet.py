'''
2023 © MaoHuPi
v2.0.1

Python如何針對大量txt檔案，抓取指定資料，並匯出?
https://ithelp.ithome.com.tw/questions/10212370
'''

DATA_DIR_PATH = './data'
DATA_START_AT = 'Flow-Volume-Curve'
DATA_END_AT = 'Substance ventolin'
OUTPUT_FILE_MIMETYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

import os
import pandas as pd
# import numpy as np
import re

mimetypeSettingsData = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        'function': 'to_excel', 
        'fileExtension': '.xlsx'
    }, 
    'application/vnd.ms-excel': {
        'function': 'to_excel', 
        'fileExtension': '.xls'
    }, 
    'text/csv': {
        'function': 'to_csv', 
        'fileExtension': '.csv'
    }
}

def readFile(path):
    file = open(path, 'r+', encoding='utf-8')
    content = file.read()
    file.close()
    return(content)

def between(text, start, end):
    text = text.split(start)
    if len(text) < 2:
        return False
    text = text[1]
    text = text.split(end)
    if len(text) < 1:
        return False
    text = text[0]
    return text

def removeMultipleChar(text, chars):
    for char in chars:
        text = text.replace(char, '')
    return(text)

def process(content):
    dataList = []
    titleList = []
    titleDone = False
    content = between(content, DATA_START_AT, DATA_END_AT)
    contentRows = content.split('\n')
    contentRows.pop()
    contentRows.pop(0)
    for row in contentRows:
        if removeMultipleChar(row, list(' \t\r\n')) == '':
            continue
        r = re.search(r' (([0-9]|\.|\-| )+)', row)
        if r:
            rowData = r.groups()[0]
            rowName = row.replace(rowData, '')
            rowData = rowData.split(' ')
            dataList.append([rowName[:-1], *[float(value) for value in rowData]])
        else:
            if not titleDone:
                titleList = row.split(' ')
                titleList.insert(0, '')
                dataList.insert(0, titleList)
                titleDone = True
    return(dataList)

def saveOutputFile(dataList, filePath):
    if filePath[-4:] == '.txt':
        filePath = filePath[:-4]
    df = pd.DataFrame(data=dataList)
    outputSettings = mimetypeSettingsData[OUTPUT_FILE_MIMETYPE]
    filePath = filePath + outputSettings['fileExtension']
    getattr(df, outputSettings['function'])(filePath)
    print(filePath)

def processFile(filePath):
    content = readFile(filePath)
    dataList = process(content)
    saveOutputFile(dataList, filePath)

DATA_DIR_PATH = DATA_DIR_PATH.replace('\\', '/')
if DATA_DIR_PATH[-1] == '/':
    DATA_DIR_PATH = DATA_DIR_PATH[:-1]
for filePath in [path for path in os.listdir(DATA_DIR_PATH) if path.lower()[-4:] == '.txt']:
    filePath = f'{DATA_DIR_PATH}/{filePath}'
    processFile(filePath)
