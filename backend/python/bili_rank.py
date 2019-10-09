import requests
from bs4 import BeautifulSoup
import os
import time
import re
import pymysql

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}
r = requests.get("https://www.bilibili.com/ranking",headers = headers)
content = r.text
soup = BeautifulSoup(content,'lxml')

connection = pymysql.connect(host='localhost',
                             port=3306,
                             user='root',
                             password='password',
                             db='blog',
                             charset='utf8')
cursor = connection.cursor()

rank_items = soup.find_all('li', class_= 'rank-item')
folder_path = '/bilibliImg/'
print(rank_items,'\n\n\n\n\n\n')
i = 1
for item in rank_items:
    print("------------------------------",i)
    
    img = item.find('img').get('src')
    print("img : \n",img)
    title = item.img['alt']
    print("title : \n",title)
    url = item.find('a',class_='title')['href']
    print("url : \n",url)
    score = item.find('div',class_='pts')
    print("score : \n",score.find('div').text)
    score = score.find('div').text
    print(type(i))
    cursor.execute('INSERT INTO `biliRank` (`id`, `img`, `title`, `url` \
        , `score`) VALUES (%s, %s, %s, %s, %s)', (i,img,title,url,score))
    i += 1
    connection.commit()

