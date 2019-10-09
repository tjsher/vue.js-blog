import pymysql 
connection = pymysql.connect(host='localhost',
                             port=3306,
                             user='root',
                             password='password',
                             db='blog',
                             charset='utf8')
cursor = connection.cursor()



f = open("markdown.txt")
lines = ""
line = f.readline()
lines += line
while line:
    line = f.readline()
    lines += line
f.close()
print()
cursor.execute('UPDATE `articles` SET `content` = %s where `id` = %s;' ,
                (lines,'1'))
connection.commit()