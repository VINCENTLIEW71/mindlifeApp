const quiz_result = [];
function load_quiz_page(id) {
    alert("hello here");
      menu.close();
    //  share_video_to_media(1);
    if(sessionStorage.getItem("isMobile") == 'N') {
         file_to_load = 'load_all_quiz.php';
      }
      else {
         file_to_load = 'mobile_load_all_quiz.php'; 
      }
      document.getElementById('ads_modal').style.display='block';
      sessionStorage.setItem("quiz_selected_id" , id);
      $.post(murl + "mj_new/quiz/" + file_to_load , {
         user : localStorage.getItem("mj_user_id") 
      } , function(data) {
      //  alert(data);
        document.getElementById("quiz_home").innerHTML = data;
      })
      document.querySelector('#navigator').pushPage('event_test.html');
     // share_quizz_to_media();
}

function goto_quiz_page(id) {
  $.post(murl + "mj_new/quiz/quiz_view.php" , {
    quiz_id : id 
  } , function(data) {
    document.getElementById("quiz_viewer").innerHTML = data;
  })
}

function load_quiz(id){
   document.querySelector('#navigator').pushPage('event_test2.html');
  //showSlides(slideIndex);
  goto_quiz_page(id);
}

function goto_quizdetail_page(id) {
 //   alert(id);
  $.post(murl + "mj_new/quiz/quiz_detail.php" , {
    quiz_id : id ,
    user : localStorage.getItem("mj_user_id")
  } , function(data) {
    document.getElementById("quiz_detail").innerHTML = data;
  })
}

function load_quizdetail(id){
    sessionStorage.setItem("quiz_id" , id);
 //   alert("here : " + id);
   document.querySelector('#navigator').pushPage('event_test3.html');
  //showSlides(slideIndex);
  goto_quizdetail_page(id);
}

function goto_quizresult_page() {
  $.post(murl + "mj_new/quiz/quiz_result.php" , {
    quiz_id : sessionStorage.getItem("quiz_id") ,
    user : localStorage.getItem("mj_user_id")
  } , function(data) {
    document.getElementById("quiz_result").innerHTML = data;
  })
}

function load_quizresult(id){
 //   alert("quiz id : " + sessionStorage.getItem("quiz_id"));
   document.querySelector('#navigator').pushPage('event_test4.html');
  //showSlides(slideIndex);
  goto_quizresult_page();
}

function load_quiz_filter(filter_request){
  //  alert(sessionStorage.getItem("video_section"));
    quiz_ctr_filter_display(filter_request);
    if(sessionStorage.getItem("isMobile") == 'N') {
         file_to_load = 'load_quiz_filter.php';
      }
      else {
         file_to_load = 'mobile_load_quiz_filter.php'; 
      }
    $.post(murl + "mj_new/filter/" + file_to_load , {
     filter : filter_request     
  } , function(data) {   
  //  alert(data);
  document.getElementById("quiz_home").innerHTML = data;
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function quiz_ctr_filter_display(filter) {
   $("#quiz_filter_all").css("background-color" , "white");
   $("#quiz_filter_hot").css("background-color" , "white");
   $("#quiz_filter_new").css("background-color" , "white");
   $("#quiz_filter_select").css("background-color" , "white");

   $("#quiz_filter_" + filter).css("background-color" , "lightgray");


}



function quiz_selected_answer(quiz , question , id){
   // quiz_result.push(id);
   // alert(quiz_result.length + "  " + quiz_result.join());
    $.post(murl + "mj_new/quiz/quiz_user_answer.php" , {
    quiz_id : quiz ,
    question_id : question,
    answer_id : id,
    user : localStorage.getItem("mj_user_id")
  } , function(data) {
   // alert(data);
  })
}

function share_quizz_to_media(id , url) {
 //   alert("here");
 /*   window.plugins.socialsharing.share(
    null, // Message
    'Subject test', // Subject
    null, // Image
    url // Link
);  */
  add_quizz_share_point(id);   
  window.plugins.share.show( 
  {
   subject: 'Quizz Share',
   text: url 
  },
   function() {}, // Success function
   function() {alert('Share failed')} // Failure function
  ); 
}

function add_quizz_share_point(share_id) {
  //  alert(share_id);
  $.post(murl + "mj_new/quiz/quiz_share.php" , {
    user : localStorage.getItem("mj_user_id"),
    quiz_id : share_id
  } , function(data) {
  //  alert(data);
    mm = data.split("*");
    if(mm[0] == 'Y'){
     alert("You Have collected " + mm[1] + " points");
     $("#VSH" + share_id).attr("src" , "icons/share2.png");
    }
    
  });  

}

function add_quizz_liked(quiz , id){
 // alert("here");
    $.post(murl + "mj_new/quiz/quiz_liked.php" , {
      user : localStorage.getItem("mj_user_id"),
      quiz_id : quiz
    } , function(data) {
     //  alert(data);
       if(data == 'Y'){ // Liked status
          $("#" + id).attr("src", "icons/like2.png");   
          load_video_liked_count();        
       }
       else { // dislike status
          $("#" + id).attr("src", "icons/like1.png");
       }
       //goto_video_page2(video_id); 
       //load_main_page();
    })
   // load_article(sessionStorage.getItem("mj_article_id"));
}