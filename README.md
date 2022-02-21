# temp


Node.js
mongodb+srv://root:<password>@ch.y5dex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

  
Python
mongodb+srv://root:<password>@ch.y5dex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongodb+srv://root:<password>@ch.y5dex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
spring.data.mongodb.uri=mongodb://127.0.0.1:27017/JavaEE

MongoDB Compass.
mongodb+srv://root:<password>@ch.y5dex.mongodb.net/test

  
  import pymongo
client = pymongo.MongoClient("mongodb+srv://root:jinkui13@ch.y5dex.mongodb.net/?retryWrites=true&w=majority")

db = client.old

result = db.student.find()

print(result)

for value in result:
    print(value)
