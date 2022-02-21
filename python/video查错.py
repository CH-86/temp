import pymongo
import bson

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
# db = client.admin
db = client['admin']
# coll = db.dataset
result = db.video_info.find(
    {'text': {'$exists': True}}
    # {'id': 'V_ed2d3a7372f04b3287502e341f4615e2'}
    # {'times':{'$lt':0}}
)

for video_document in result:
    times_sum = 0
    n = len(video_document['start'])
    flag = False
    for i in range(0, n):
        start = video_document['start'][i]
        end = video_document['end'][i]
        sub = end - start
        if end == 0 or start == 0 or start > end or end - start > 10000*len(video_document['text'][i]):
            flag = True
            sub = 200 * len(video_document['text'][i])  # 假定1个字200ms
        times_sum += sub
        # print(times_sum, end - start, end, start)
    if flag:
        print(video_document['id'])
    db.video_info.update_one(
        {
            'id': video_document['id']
        },
        {
            '$set': {
                'times': times_sum
            }
        }
    )
    # for video_id in course_document['item']:
    #     # print(video_id)
    #     video = db.video_info.find_one({'text': {'$exists': 'true'}, 'id': video_id})
    #     # print(video['times'] / 1000)
    #     times_sum += video['times'] / 1000
    #     print(video_id)
    #     print(times_sum, video['times'] / 1000)
