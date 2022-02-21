var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

var result =
    db.activity.aggregate([
        {$project: {
                _id:"$video_id",
                video_duration: "$video_duration"
            }
        }
    ])

while(result.hasNext()){
    db.video_duration.insert(result.next())
}


    // db.video_info.aggregate([
    //     {
    //         $lookup:{
    //             from:"activity_test",
    //             localField:"id",
    //             foreignField:"video_id",
    //             as:"foreign"
    //         }
    //     },
    //     {
    //         $project:{
    //             _id:"$id",
    //             video_duration:"$foreign.video_duration"
    //         }
    //     },
    //     {
    //         $unwind:{
    //             path:"$video_duration"
    //         }
    //     }
    // ])
