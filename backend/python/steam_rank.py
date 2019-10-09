import requests
from bs4 import BeautifulSoup
import os
import time
import pymysql

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}
r = requests.get("https://store.steampowered.com/specials#p=1&tab=TopSellers",headers = headers)
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
rank_items = soup.find_all('a', class_= 'tab_item')
folder_path = '/img/'
print(len(rank_items))
i = 1
for item in rank_items:
    print('----------------------------')

    rank = i
    i += 1
    name = item.find('div',class_ = 'tab_item_name').text
    discount_pct = item.find('div',class_ = 'discount_pct').text
    discount_original_price = item.find('div',class_ = 'discount_original_price').text
    discount_final_price = item.find('div',class_ = 'discount_final_price').text
    print('rank %d\t,name %s\t,pct%s\t,original%s\t,final%s\t'%(rank,name,discount_pct,\
        discount_original_price,discount_final_price))
    print('----------------------------')
    cursor.execute('INSERT INTO `steamDiscount` (`id`, `name`, `discount_pct` \
        , `discount_original_price`, `discount_final_price`) VALUES (%s, %s, %s, %s, %s)', 
                (rank,name,discount_pct,discount_original_price,discount_final_price))
    i += 1
    connection.commit()

