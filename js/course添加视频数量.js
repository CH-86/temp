var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);
/*

*/

var result =
    db.course.aggregate([
        {
            $lookup:{
                from:"course_videos_count",
                localField:"_id",
                foreignField:"course_id",
                as:"foreign"
            }
        },
        {
            $project:{
                count:1,
                zero_count:1,
                size:"$foreign.count"
            }
        },
        {
            $unwind:{
                path:"$size"
            }
        }
    ])
while(result.hasNext()){
    db.course.save(result.next())
}