//课程维度:总人数 退课人数
var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);


var result =
    db.student_to_course.aggregate([
        {$group:{
                _id:"$course_id",
                count: {
                    $sum:1
                },
                zero_count: {
                    $sum:{
                        $cond: [
                            {$eq:["$label",1]}
                            ,0,1]
                    }
                }
            }
        }
    ])
while(result.hasNext()) {
    db.course.insert(result.next());
}

/*
验证：不存在 退课人数大于课程总人数 文档
db.course.find(
{$expr:{$gt:[
    "$zero_count","$count"
        ]

    }
}
)
*/

/*
统计_id字段的不同值个数
db.student_to_course.distinct('course_id').length 680
 */