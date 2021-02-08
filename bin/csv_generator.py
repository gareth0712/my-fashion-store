import csv
from random import randint
import time
import sys

start_time = time.time()
rows = int(sys.argv[1]) if len(sys.argv) > 1 else 10
gender = ['M','F']
first_name = ['John', 'David', 'Tom', 'May', 'Barry', 'Kenny', 'Tommy', 'Ben', 'Vanessa', 'Steven']
last_name = ['Parker', 'Law', 'Fisher', 'Tam', 'Chan', 'Wong', 'King', 'Ling', 'Bohi', 'Ginger']
# last_purchase_date = ['2020-11-05T13:15:30Z', '2020-10-01T10:15:30Z', '2020-09-01T13:15:30Z', '2019-01-15T13:15:30Z', '2020-08-23T01:01:30Z', '2020-05-29T21:15:30+08:00','2020-01-25T18:15:30+08:00','2014-02-15T11:14:30+01:00','2015-07-15T15:15:30+05:00','2017-06-08T12:15:30+08:00']
last_purchase_date = ['2019-11-05T13:15:30Z', '2020-10-01T10:15:30Z', '2020-09-01T13:15:30Z', '2019-01-15T13:15:30Z', '2019-08-23T01:01:30Z', '2020-05-29T21:15:30Z','2020-01-25T18:15:30Z','2014-02-15T11:14:30Z','2015-07-15T15:15:30Z','2017-06-08T12:15:30Z']

with open(f'../csv/sales-{rows}rows.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    i = 0
    writer.writerow(['USER_NAME', 'AGE', 'HEIGHT', 'GENDER', 'SALE_AMOUNT', 'LAST_PURCHASE_DATE'])
    while i < rows:
      writer.writerow([f'{first_name[randint(0,9)]} {last_name[randint(0,9)]}',randint(10,80), randint(140, 190), gender[randint(0,1)], randint(1,100000), last_purchase_date[randint(0,9)]])
      i += 1

print('Runtime is:', time.time() - start_time)
