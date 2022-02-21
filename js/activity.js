var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

// 行为表
var result =
    db.user_video_act_train_1.aggregate([
        {$unwind:{
                path:"$activity"
            }
        },
        {$project: {
                "_id":0,
                student_id:"$_id",
                course_id:"$activity.course_id",
                video_id:"$activity.video_id",
                watching_count:"$activity.watching_count",
                video_duration:"$activity.video_duration",
                local_watching_time:"$activity.local_watching_time",
                video_progress_time:"$activity.video_progress_time",
                video_start_time:"$activity.video_start_time",
                video_end_time:"$activity.video_end_time",
                local_start_time:"$activity.local_start_time",
                local_end_time:"$activity.local_end_time"
            }
        }
    ])

while(result.hasNext()) {
        db.activity.insert(result.next());
}
//,
//         {$replaceRoot: {
//         newRoot: "$activity"
//     }
// }
// {$push:{
//     activity: {student_id:"$_id"}
// }
// }
//     ,{ $group:{
//     "student_id":{
//         $push:'_id'
//     }
// }
// }

// {
//     $project:{
//         student_id: {push:'_id'}
//     }
// }
//     ,
//     {$push:{
//         activity:"$_id"
//     }
//
//     }


    // ,
    //
    // }
// db.test.aggregate([
//
// ])
//     // ,
//     // "course_list":0,
//     // "label_list":0
//

