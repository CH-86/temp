import pymongo
import csv
import pandas
import numpy

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
# db = client.admin
db = client['admin']
# coll = db.dataset
courses = db.course.find(
    {"_id":"C_course-v1:SEU+00690803+sp"}
)
for course in courses:
    print(str(course['_id']).replace("C_course-v1:", ""))

    # print(course['item'])
    activity_list = db.activity.find({'course_id': course['_id']})
    file_name = str(course['_id']).replace("C_course-v1:", "") + ".csv"
    print(file_name)
    dict = {}
    for activity in activity_list:
        if activity['student_id'] in dict.keys():
            list = dict[activity['student_id']]
        else:
            list = []
            #list = [activity['student_id']]
            dict[activity['student_id']] = list
        list.append(course['item'].index(activity['video_id']))
        list.append(activity['watching_count'])
        list.append(activity["local_watching_time"])
        list.append(activity['video_progress_time'])

    with open(file_name, 'w', newline='') as f:
        csv_write = csv.writer(f)
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
            csv_write.writerow([value for value in new_list])
            # print([value for value in dict[key]])
            # csv_write.writerow([value for value in dict[key]])
    f.close()
# print([value for value in dict[key]])
# list = dict[key]
# new_list = [key]
# for i in range(1, len(list), 3):