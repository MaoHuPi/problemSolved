'''
2023 © MaoHuPi
v4.0.0

Python如何針對大量txt檔案，抓取指定資料，並匯出?
https://ithelp.ithome.com.tw/questions/10212370
'''

DATA_DIR_PATH = './data' # 文本資料存放之資料夾
DATA_FILE_EXTENSION = '.txt' # 文本資料檔案之副檔名
DATA_START_AT = 'Pred' # 文本資料的資料區段固定開頭
DATA_END_AT = 'Substance ventolin' # 文本資料的資料區段固定結尾
EXCLUDE_START = False # 是否去除 資料區段開頭 那行
EXCLUDE_END = True # 是否去除 資料區段結尾 那行
PUSH_BACK_OVERFLOW_DATA = True # 是否將多出來的欄位回擠 調整至上限欄位數
OUTPUT_FILE_MIMETYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' # 輸出檔案之格式

import os
import pandas as pd
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

def between(text:str, start:str, end:str):
    text = text.split(start)
    if len(text) < 2:
        return False
    text = start.join(text[1:])
    text = text.split(end)
    if len(text) < 1:
        return False
    text = text[0]
    return text

def removeMultipleChar(text, chars):
    for char in chars:
        text = text.replace(char, '')
    return(text)

def valueProcess(value):
    try:
        value = float(value)
    except:
        pass
    return(value)

def reverseStr(text):
    l = list(text)
    l.reverse()
    return(''.join(l))

def process(content):
    dataList = []
    titleList = []
    titleDone = False
    id = between(content, 'ID:', '\n')
    print('ID: ' + (id if id else 'Undefined'))
    content = between(content, DATA_START_AT, DATA_END_AT)
    content = DATA_START_AT + content + DATA_END_AT
    contentRows = content.split('\n')
    if EXCLUDE_START:
        contentRows.pop(0)
    if EXCLUDE_END:
        contentRows.pop()
    for row in contentRows:
        if removeMultipleChar(row, list(' \t\r\n')) == '':
            continue
        r = re.search(r'(([0-9]+\-*|[0-9]*\.[0-9]*\-*|[0-9]+\:[0-9]+\:[0-9]+|[0-9]+\/[0-9]+\/[0-9]+| )+) ', reverseStr(row))
        # r = re.search(r' (([0-9]|\:|\.|\-| )+)', reverseStr(row))
        if r:
            rowData = r.groups()[0]
            rowData = reverseStr(rowData)
            rowName = row.replace(rowData, '')
            rowData = rowData.split(' ')
            if PUSH_BACK_OVERFLOW_DATA and titleDone:
                lengthDelta = len(rowData)+1 - len(titleList)
                if lengthDelta > 0:
                    rowName += ' '.join(list(map(lambda x: str(x), [rowName, *rowData[:lengthDelta]])))
                    rowData = rowData[lengthDelta:]
            dataList.append([rowName[:-1], *[valueProcess(value) or value for value in rowData]])
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
    print('OUTPUT_PATH: ' + filePath)
    print('')

def processFile(filePath):
    content = readFile(filePath)
    dataList = process(content)
    saveOutputFile(dataList, filePath)

DATA_DIR_PATH = DATA_DIR_PATH.replace('\\', '/')
if DATA_DIR_PATH[-1] == '/':
    DATA_DIR_PATH = DATA_DIR_PATH[:-1]
for filePath in [path for path in os.listdir(DATA_DIR_PATH) if path.lower()[-4:] == DATA_FILE_EXTENSION.lower()]:
    filePath = f'{DATA_DIR_PATH}/{filePath}'
    processFile(filePath)
