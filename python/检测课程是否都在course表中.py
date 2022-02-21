import pymongo

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
# db = client.admin
db = client['admin']
# coll = db.dataset
test_result = db.user_video_act_val_triple_withId_noLabel_1.find()

for test in test_result:
    for course_id in test['course_list']:
        result = db.course.find_one({'_id':course_id})
        if result is None:
            print(test['item_id'], course_id)
