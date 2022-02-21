var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

//{"local_watching_time_sum":{$exists:true}}
// db.course_info.find(
// ).forEach(
//     function(document) {
//         var local_watching_time_sum = 0;
//         //print(document.item.length)
//         for(var i =0 ; i< document.item.length;i++){
//             //print(document.item[i]);
//             db.activity.find({video_id:document.item[i]}).forEach(
//                 function (video_document){
//                     local_watching_time_sum += video_document.local_watching_time
//                 }
//             )
//         }
//         //print(times_sum, words_sum);
//         db.course.update({
//                 _id:document.course_id
//             },
//             {
//                 $set:{
//                     local_watching_time_sum: local_watching_time_sum
//                 }
//             }
//         )
//     }
// )

db.activity.aggregate([
    {"$group" : {_id:"C_course-v1:WellesleyX+HIST229x+sp", times_sum:{$sum:"$times"}}}
]).forEach(function (document){
    db.course.update({
            _id:document._id
        },
        {
            $set:{
                times_sum:document.times_sum
            }
        }
    )
})

// var map = function ()
// {
//     emit(this.course_id,this.local_watching_time)
// }
//
// var reduce = function (key,values)
// {
//     var local_watching_time_sum = 0;
//     for(var i=0;i<values.length;i++)
//     {
//         local_watching_time_sum += values[i];
//     }
// }
//
// db.activity.mapReduce(
//     map,
//     reduce
// ).find().forEach(
//     function(document) {
//         db.course_time.insert(document);
//     }
// )

// db.activity.find({id:"C_course-v1:TsinghuaX+30240184+sp"}).forEach(
//     function (video_document){
//         print(video_document.local_watching_time)
//     }
// )