var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

var result =
    db.course_info.aggregate([
        {$project: {
                _id:"$course_id",
                course_size: {$size: "$item"}
            }
        }
    ])

while(result.hasNext()){
    print(result.next().toString())
}