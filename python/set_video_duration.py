import pymongo
import bson

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
db = client['admin']

result = db.video_duration.find()
for activity in result:
    print(activity['_id'], activity['video_duration'])

    video = db.activity.find_one({
        'video_id': activity['_id']
    })

    if video is not None:
        # print(video['video_id'], video['video_duration'])
        db.video_info.update_one(
            {
                'id': activity['_id']
            },
            {
                '$set': {
                    'video_duration': video['video_duration']
                }
            }
        )
    else:
        print(activity['_id'], ' is null')
