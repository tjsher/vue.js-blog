import requests
from bs4 import BeautifulSoup
import pymysql

connection = pymysql.connect(host='localhost',
                             port=3306,
                             user='root',
                             password='password',
                             db='blog',
                             charset='utf8')
cursor = connection.cursor()

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}
r = requests.get("https://www.bilibili.com/read/cv1718678/",headers = headers)
content = r.text
soup = BeautifulSoup(content,'lxml')
imgs = soup.find_all("figure",class_ = 'img-box')
i = 0
for img in imgs:
    src = img.find('img')['data-src']
    src = "http:" + src
    ir = requests.get(src,stream = True)
    if ir.status_code ==  200:
        open("wlop%d.jpg"%(i), 'wb').write(ir.content)
    i += 1