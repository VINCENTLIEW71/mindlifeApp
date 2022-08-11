// This is a JavaScript file

// This is a JavaScript file

function free_login(){
    document.getElementById('login_modal').style.display='none';
   // alert($("#user_name").val() + "   " + $("#user_password").val());
    $.post(murl + "mj_new/login.php",{
      option : '1',
      username : $("#free_user_name").val(),
      password : $("#free_user_password").val()
    } , function(data){
      //  alert(data);
        mm = data.split("*");
        if(mm[0] == 1){

          load_main_page();
          localStorage.setItem("mj_user_id" , mm[1]); 
          if ($("#check-1").is(":checked"))
           {
             //  alert("Check box in Checked");
               localStorage.setItem("is_login" , "1");
          } 
          else 
          {
             //  alert("Check box is Unchecked");
               localStorage.setItem("is_login" , "0");
          }
        }
        else {
            alert("Wrong Password");
        }
    })

  }

 function load_free_main_page(){
    // alert("here");
      localStorage.setItem("mj_user_id" , "00000");
      load_free_header('1');
      load_free_page_video();
      load_free_main_page_articles();
      document.querySelector('#navigator').resetToPage('free_main_page.html');
}  

function registered_member_only(){
    
   document.getElementById('login_modal').style.display='block'
}


function load_free_header(id){
  $.post(murl + "mj_new/free/header_load.php", {
    option : '1',
    header_id : id
  } , function(data) {
    //alert(data);
    document.getElementById("free_main_page_header").innerHTML = data;
    
  })
}



function load_free_page_video(){
      //alert("here");
       $.post(murl + "mj_new/free/main_page_video_load.php" , {
         user : localStorage.getItem("mj_user_id")
       } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
       // alert(data);
         document.getElementById("free_video_list").innerHTML = data;
         
       });
    }

function load_free_main_page_articles(){  // new
    //  alert(localStorage.getItem("mj_user_id"));
       $.post(murl + "mj_new/free/articles_load.php" , {
       //  user : localStorage.getItem("mj_user_id")
       } , function(data){
        // user : localStorage.getItem("#mj_user_id");
        // document.querySelector('#navigator').pushPage('main_page.html');
       // alert(data);
         document.getElementById("free_main_page_article_list").innerHTML = data;       
         
       });
} 

function load_free_single_articles(id){
   load_free_article_header(id);
   load_free_all_articles(id);
}

function load_free_all_articles(section){
 // alert("here");
     document.querySelector('#navigator').resetToPage('free_public_page.html');
     $.post(murl + "mj_new/free/load_all_articles.php" , {
       section_id : section
     } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
   //     alert(data);
         document.getElementById("free_public_main_display").innerHTML = data;
     });
}

function free_load_blog(id){
  $("body").css("transform" , "translate3d(0,-20px,0)");  // 22dec2021 added
  document.querySelector('#navigator').pushPage('blog.html');
  //showSlides(slideIndex);
  load_free_article(id);
 // showSlides(slideIndex);
}

function load_free_article(id){
  sessionStorage.setItem("mj_article_id" , id);  
  $.post(murl + "mj_new/free/articles_view.php" , {
    article : id,
    user : localStorage.getItem("mj_user_id")
  } , function(data) {
    document.getElementById("article_view").innerHTML = data;
  })

}

function load_free_article_header(id){
  $.post(murl + "mj_new/free/header_load.php", {
    option : '1',
    header_id : id
  } , function(data) {
  //  alert(data);
    document.getElementById("free_public_top_header").innerHTML = data;
  })
}

function goto_free_video_page(video_id){
 //   alert(localStorage.getItem("mj_user_id"));
  $("body").css("transform" , "translate3d(0,-20px,0)");  // new
  document.querySelector('#navigator').pushPage('video.html');
   
  $.post(murl + "mj_new/free/view_video.php",{
      video : video_id,
      user : localStorage.getItem("mj_user_id")
  }, function(data){
 // alert(data);
  //  console.log(video_id);
    document.getElementById("video_page").innerHTML = data;
  })

}


function load_free_back(){
    document.querySelector("#navigator").popPage();
}