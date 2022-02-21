import pymongo
import bson

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
# db = client.admin
db = client['admin']
# coll = db.dataset
result = db.course_info.find({'course_id': "C_course-v1:TsinghuaX+20440333X+sp"})

for course_document in result:
    # print(course_document['item'])
    times_sum = 0
    for video_id in course_document['item']:
        # print(video_id)
        video = db.video_info.find_one({'text': {'$exists': 'true'}, 'id': video_id})
        # print(video['times'] / 1000)
        times_sum += video['times'] / 1000
        print(video_id)
        print(times_sum, video['times'] / 1000)

