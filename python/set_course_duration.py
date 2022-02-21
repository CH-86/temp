import pymongo
import bson

#   set_course_duration

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
# db = client.admin
db = client['admin']
# coll = db.dataset
course_result = db.course.find()

for course in course_result:
    print(course['_id'])
    course_info = db.course_info.find_one({'course_id':course['_id']})
    course_duration = 0
    for video_id in course_info['item']:
        video = db.video_duration.find_one({'_id':video_id})
        if video:
            course_duration += video['video_duration']
    print(course_duration)
    db.course.update_one(
            {
                '_id': course['_id']
            },
            {
                '$set': {
                    'course_duration': course_duration
                }
            }
        )



