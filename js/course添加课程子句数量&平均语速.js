var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

db.course_info.find(
).forEach(
    function(document) {
        var times_sum = 0;
        var words_sum = 0;
        var text_size_sum = 0;
        //print(document.item.length)
        for(var i =0 ; i< document.item.length;i++){
            //print(document.item[i]);
            db.video_info.find({text:{$exists: true},id:document.item[i]}).forEach(
                function (video_document){
                    times_sum += video_document.times;
                    words_sum += video_document.words;
                    text_size_sum += video_document.text_size;
                }
            )
        }
        //print(times_sum, words_sum);
        db.course.update({
                _id:document.course_id
            },
            {
                $set:{
                    times_sum:times_sum,
                    words_sum:words_sum,
                    text_size_sum:text_size_sum
                }
            }
        )
    }
)
