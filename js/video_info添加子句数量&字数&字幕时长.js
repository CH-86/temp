var url = "mongodb://127.0.0.1:27017/admin";
var db = connect(url);

db.video_info.aggregate([
    {
      $match:{
          text:{$exists: true}
      }
    },
    {
        $project: {
             id:1,
             text_size: {
                 $size:"$text"
             },
             start:1,
             end:1,
             text:1
        }
     }
 ]).forEach(
        function(document) {
            //if(typeof(document.text)!="undefined") {
                var times = 0;
                var words = 0;
                for (var i = 0; i < document.text_size; i++) {
                    times += document.end[i] - document.start[i];
                    words += document.text[i].length;
                }
                db.video_info.update({
                        id:document.id
                    },
                    {
                        $set: {
                            text_size: document.text_size,
                            times: times,
                            words: words
                        }
                    }
                )
            //}
        }
    )

// db.video_test.aggregate([
//     {$project: {
//             _id:"$video_id",
//             text_size: {
//                 $size: "$text"
//             }
//         }
//     }
// ])
