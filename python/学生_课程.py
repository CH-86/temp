import pymongo
import csv
import pandas
import numpy
import bson

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
# db = client.admin
db = client['admin']
# coll = db.dataset
students = db.user_video_act_train_1.find() #.limit(1)



for student in students:
    print(str(student['_id']))

    course_list = student['course_list']

    dict = {}
    for course in course_list:
        # watching_count video_duration local_watching_time video_progress_time
        list = [0, 0.0, 0.0, 0.0]
        dict[course] = list

    activity_list = student['activity']
    for activity in activity_list:
        key = activity['course_id']
        dict[key][0] += activity['watching_count']
        dict[key][1] += activity['video_duration']
        dict[key][2] += activity['local_watching_time']
        dict[key][3] += activity['video_progress_time']

    for key in dict.keys():
        # print(student['_id'], key, dict[key])

        # re = db.student_to_course.find_one(
        #     {
        #         # 'student_id': "60ac52b9562c1103bcf91601",
        #         # 'course_id': "C_course-v1:TsinghuaX+30240184+sp"
        #         'student_id': str(student['_id']),
        #         'course_id': str(key)
        #     }
        # )
        # print(re['_id'])
        db.student_to_course.update_many(
                {
                'student_id': str(student['_id']),
                'course_id': str(key)
                },
                {
                    '$set': {
                        'watching_count': dict[key][0],
                        'video_duration': dict[key][1],
                        'local_watching_time': dict[key][2],
                        'video_progress_time': dict[key][3]
                    }
                }
        )
        """
        db.student_to_course.update_one(
            {
                'student_id': "60ac52b9562c1103bcf91601",
                'course_id': "C_course-v1:TsinghuaX+30240184+sp"
            },
            {
                '$set': {
                    'watching_count': 5,
                    'video_duration': 730.0,
                    'local_watching_time': 1035.0,
                    'video_progress_time': 729.2799999713898
                }
            }
        )
        """
"""
for course in courses:
    #print(str(course['_id']))
    #.replace("C_course-v1:", "")

    # print(course['item'])
    activity_list = db.activity.find({'course_id': course['_id']})
    dict = {}
    for activity in activity_list:
        if activity['student_id'] in dict.keys():
            list = dict[activity['student_id']]
        else:
            list = []
            #list = [activity['student_id']]
        #     dict[activity['student_id']] = list
        # list.append(course['item'].index(activity['video_id']))
        # list.append(activity['watching_count'])
        # list.append(activity["local_watching_time"])
        # list.append(activity['video_progress_time'])

        for key in dict.keys():
            # print(course['size']*3+1)
            np = numpy.zeros(int(course['size']*3))
            for i in range(0, len(dict[key]), 4):
                # index:下标 n*3 n为课程下标
                index = dict[key][i] * 3    # dict[key][i] 课程下标
                np[index] = dict[key][i+1]      # dict[key][i+1] 次数
                np[index+1] = dict[key][i+2]    # dict[key][i+2] 时长
                np[index+2] = dict[key][i+3]    # dict[key][i+3] 倍速时长
            # print(np)
            new_list = np.tolist()
            new_list.insert(0, key)
            # print([value for value in dict[key]])
            # csv_write.writerow([value for value in dict[key]])

"""
# print([value for value in dict[key]])
# list = dict[key]
# new_list = [key]
# for i in range(1, len(list), 3):