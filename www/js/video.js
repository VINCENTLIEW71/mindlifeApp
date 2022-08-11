// This is a JavaScript file

function goto_video_page(video_id){
  document.getElementById('ads_modal').style.display='block';  
  document.querySelector('#navigator').pushPage('video.html');
  sessionStorage.setItem("active_page" , "video");
  $.post(murl + "mj_new/video/view_video.php",{
      video : video_id,
      user : localStorage.getItem("mj_user_id")
  }, function(data){
  //  alert(data);
  //  console.log(video_id);
    document.getElementById("video_page").innerHTML = data;
  })

}

function share_video_to_media(video_id) {
//  alert(url);   
   add_video_point(video_id);   
  window.plugins.share.show( 
  {
   subject: 'Video Share',
   text: "https://dev2.thenextbigthinghk.com/mindlifeapp/app/video_landing_page.php?id=" + video_id 
  },
   function() {}, // Success function
   function() {alert('Share failed')} // Failure function
  ); 
}

function add_video_point(share_id) {
  //  alert(share_id);
  $.post(murl + "mj_new/video/check_user_share_video_status.php" , {
    user : localStorage.getItem("mj_user_id"),
    video : share_id
  } , function(data) {
  //  alert(data);
    mm = data.split("*");
    if(mm[0] == 'Y'){
     alert("You Have collected " + mm[1] + " points");
     $("#VSH" + share_id).attr("src" , "icons/share2.png");
    }
    
  });  

}

function add_video_liked(video_id , id){
   // alert(video_id);
    check_on_liked_video_status(video_id , id);
}

function check_on_liked_video_status(video_id , id){
 // alert("here");
    $.post(murl + "mj_new/video/check_user_liked_video_status.php" , {
      user : localStorage.getItem("mj_user_id"),
      video : video_id
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

function video_bookmark(id , bookmark_id){
  $.post(murl + "mj_new/video/check_user_bookmark_video_status.php" , {
     user : localStorage.getItem("mj_user_id"),
     video : id
  } , function(data) {
    mm = data.split("*");
  //  alert(data);
     alert("You Have collected " + mm[1] + " points");
     $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function video_page_back(){
     $("body").css("transform" , "translate3d(0,0,0)");
    if(sessionStorage.getItem("active_page") == "video"){
        document.querySelector('#navigator').popPage();
        return;
    }

    if(sessionStorage.getItem("is_filter_page") == "video"){
        document.querySelector('#navigator').popPage();
        return;
    }
   // alert("here");
    load_main_page();
}

function load_video_with_section(id){
    sessionStorage.setItem("active_page", "video");
    sessionStorage.setItem("video_section" , id);
   // alert("here");
    setTimeout(function(){ $("#daily_btn" + id).text("完成") }, 2000);
    
    if($("#daily_btn" + id).text() != "完成"){
       goto_video_page(id);
    }    
}

function load_videocom(id){
  //  alert(id);
  sessionStorage.setItem("mindlife_video_id" , id); // new  
  document.querySelector('#navigator').pushPage('video2.html');
  //showSlides(slideIndex);
  load_video_com(id);
 // showSlides(slideIndex);
}

function load_video_com(id){
  $.post(murl + "mj_new/video/comment.php" , {
    video : id
  } , function(data) {
    //  alert(data);
    document.getElementById("video_comment").innerHTML = data;
  })

}

function load_video_focus_com(){  // new
//alert(sessionStorage.getItem("mindlife_video_id"));
  $.post(murl + "mj_new/video/video_focus_comment.php" , {
    video : sessionStorage.getItem("mindlife_video_id")
  } , function(data) {
    //  alert(data);
    document.getElementById("video_comment").innerHTML = data;
  })

}

function load_filter_video2(options) {
    document.querySelector('#navigator').pushPage('hot_video.html');
    $.post(murl + "mj_new/video/load_section_video_filter2.php" , {
     filter : options     
  } , function(data) {
   
 //   alert(data);
  document.getElementById("hotvideo-content").innerHTML = data;
  video_ctr_filter_display(options);
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function load_video_filter(filter_request){
  //  alert(filter_request + "   " + sessionStorage.getItem("video_section"));
    
    $.post(murl + "mj_new/video/load_section_video_filter.php" , {
     filter : filter_request,
     section_id : sessionStorage.getItem("video_section")
  } , function(data) {
   
  //  alert(data);
  document.getElementById("video_main_display").innerHTML = data;
  video_ctr_filter_display(filter_request);
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function video_ctr_filter_display(filter) {
 //   alert(filter);
 /*
   $("#video_filter_all").removeClass("activess");
   $("#video_filter_hot").removeClass("activess");
   $("#video_filter_new").removeClass("activess");
   $("#video_filter_select").removeClass("activess");

   $("#video_filter_" + filter).addClass("activess");
 */
   $("#video_filter_all").css("color" , "lightgray");
   $("#video_filter_hot").css("color" , "lightgray");
   $("#video_filter_new").css("color" , "lightgray");
   $("#video_filter_select").css("color" , "lightgray");
   $("#video_filter_" + filter).css("color" , "black");  
}



function load_video_liked_count(){
  lid = "l" + sessionStorage.getItem("mindlife_video_id");
//  alert(cid);
  $.post(murl + "mj_new/video/video_liked_count.php" , {
    video  : sessionStorage.getItem("mindlife_video_id")
  } , function(data) {
//      alert(data);
    $("#" + lid).text(data);
  })
}

function load_video_filtering(filter_request) {
  //  alert("here");
   sessionStorage.setItem("is_filter_page" , "video");
   
   document.querySelector('#navigator').pushPage('filter.html');
     $.post(murl + "mj_new/filter/video_filter_load.php" , {
     user : localStorage.getItem("mj_user_id")     
  } , function(data) {
      mm = JSON.parse(data);   
  //  alert(data);
  document.getElementById("filtering_load").innerHTML = mm[0].article_filter; 
  video_ctr_filter_display(filter_request);
  })
}


function video_highligh_filter(id){
  //  alert("here1");
         if(old_id == '00000'){  // first time
           old_id = id;
           $("#" + id).css({"background-color":"purple" , "color" : "white"});
         }
         else if(old_id == id){  // press on the same tag
           $("#" + old_id).css({"background-color":"lightgray" , "color" : "black"});
           old_id = '00000';
         }
         else {
           $("#" + old_id).css({"background-color":"lightgray" , "color" : "black"});
           old_id = id;
           $("#" + old_id).css({"background-color":"purple" , "color" : "white"});
         }  

         set_video_filter(id);    
         
    }

function set_video_filter(id) {
   // alert("here2");
     $.post(murl + "mj_new/filter/set_user_video_filter.php" , {
     user : localStorage.getItem("mj_user_id"),
     type_id : id
  } , function(data) {
   
    document.querySelector('#navigator').popPage();
    load_filter_video(id);
  })
}   

function load_filter_video(category_id){
 // alert("here3");
    //  article_ctr_filter_display("all");
    //  sessionStorage.setItem("article_section" , section);
     $.post(murl + "mj_new/filter/load_all_video_article.php" , {
       category : category_id
     } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
      //  alert(data);
         document.getElementById("video_main_display").innerHTML = data;
     });
}