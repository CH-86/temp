var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

// student_to_course
// 学生退课信息
var result =
    db.user_video_act_train_1.aggregate([
        {
            $unwind: {
                path:"$course_list",
                includeArrayIndex: "index"
            }
        }
        ,
        {
            $project: {
                "_id": 0,
                student_id:{
                    $toString:"$_id"
                },
                course_id:"$course_list",
                label:{
                    $arrayElemAt : ["$label_list", "$index"]
                }
            }
        }
    ])

while(result.hasNext()) {
    db.student_to_course.insert(result.next());
}


    //includeArrayIndex: "index"
// for(var i = 0; i< db.test.course_list;i++){
//     print(db.test.course_list[i]);
// }


//db.test.course_list[i]
// var result =
//     db.test.aggregate([
//         {
//             $project: {
//                 "_id":0,
//                 "activity":0,
//                 BothValues:{
//                     $setIntersection: ["course_list", "label_list"]
//                 }
//             }
//         }
//     ])
//
// {
//     $unwind: {
//         "$course_list","$label_list"
//     }
// }
// {$unwind: "$label_list"}



// emit({course:this.course_list[i], label:this.label_list.index[i]});
// db.test.mapReduce(
//     function(){
//         emit(this.course_list.values,1);
//     },
//     function(key, values){
//         var zero_count = 0;
//         var one_count = 0;
//         return zero_count,one_count;
//     },
//     {out:"statics1"}
// );
//
//
//
// value.forEach(function(val){
//         if(val==0)
//             zero_count += val;
//         if(val==1)
//             one_count += val;
//     }
// );