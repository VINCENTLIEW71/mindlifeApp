// This is a JavaScript file

// This is a JavaScript file

function save_article_comments(){
  //  alert($("#article_comments").val());
  //  sessionStorage.setItem("mindlife_article_id" , id);
    $.post(murl + "mj_new/articles/save_article_comment.php" , {
        user_id : localStorage.getItem("mj_user_id"),
        article_id : sessionStorage.getItem("mindlife_article_id"),
        comment : $("#article_comments").val()
    } , function(data) {
    //    alert(data);
        if(data == 'Y'){
            $("#article_comments").val('');
            load_article_focus_com();
        }
    })
}

function save_video_comments(){
   // alert(sessionStorage.getItem("mindlife_video_id"));
  //  sessionStorage.setItem("mindlife_article_id" , id);
    $.post(murl + "mj_new/video/save_video_comment.php" , {
        user_id : localStorage.getItem("mj_user_id"),
        video_id : sessionStorage.getItem("mindlife_video_id"),
        comment : $("#video_comments").val()
    } , function(data) {
    //    alert(data);
        if(data == 'Y'){
            $("#video_comments").val('');
            load_video_focus_com();
        }
    })
}

function load_article_focus_com(id){  // new
  $.post(murl + "mj_new/articles/article_focus_comment.php" , {
    article : sessionStorage.getItem("mindlife_article_id")
  } , function(data) {
    document.getElementById("article_comment").innerHTML = data;
  })

}

function load_video_comments_count(){
  cid = "c" + sessionStorage.getItem("mindlife_video_id");
//  alert(cid);
  $.post(murl + "mj_new/video/video_comment_count.php" , {
    video  : sessionStorage.getItem("mindlife_video_id")
  } , function(data) {
//      alert(data);
    $("#" + cid).text(data);
  })
}