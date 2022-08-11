// This is a JavaScript file

function add_article_liked(article_id , id){
  //  alert(article_id);
    check_on_liked_article_status(article_id , id);
}

function check_on_liked_article_status(article_id , id){
 // alert("here");
    $.post(murl + "mj_new/articles/check_user_liked_article_status.php" , {
      user : localStorage.getItem("mj_user_id"),
      article : article_id
    } , function(data) {
    //   alert(data);
       if(data == 'Y'){ // Liked status
          $("#" + id).attr("src", "icons/like2.png");            
       }
       else { // dislike status
          $("#" + id).attr("src", "icons/like1.png");
       }
    })

}

function load_all_articles(section){
 // alert(section);
      
      sessionStorage.setItem("article_section" , section);
     $.post(murl + "mj_new/articles/load_all_articles.php" , {
       section_id : section
     } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
      //  alert(data);
         document.getElementById("public_main_display").innerHTML = data;
         article_ctr_filter_display("all");
     });
}

function load_article_all(){
sessionStorage.setItem("active_section" , "article"); 
sessionStorage.setItem("active_page" , "article");

document.querySelector('#navigator').resetToPage('public_page.html');
load_article_header('1');
//load_all_articles('15');
load_single_articles('15');
load_article_filter('all');
}

function load_single_articles(id){
  //  alert(id);
   load_article_header(id);
   load_all_articles(id);
   load_article_filter('all');
}

function load_single_articles2(id){
  //  alert('load_single_articles2');
   menu.close();
   document.querySelector('#navigator').resetToPage('public_page.html');
   load_article_header(id);
   load_all_articles(id);
   
}

function load_article_header(id){
  $.post(murl + "mj_new/header_load.php", {
    option : '1',
    header_id : id
  } , function(data) {
  //  alert(data);
    document.getElementById("public_top_header").innerHTML = data;
  })
}

function share_article_to_media(id , url , share_id) {
add_article_point(id , share_id);  
 window.plugins.share.show( 
  {
   subject: 'Article Share',
   text: "https://dev2.thenextbigthinghk.com/mindlifeapp/app/article_landing_page.php?id=" + id 
  },
   function() {}, // Success function
   function() {alert('Share failed')} // Failure function
  );

/* window.plugins.socialsharing.share(
    null, // Message
    'Subject test', // Subject
    null, // Image
    url // Link
);  */
}

function add_article_point(id , share_id) {
  $.post(murl + "mj_new/articles/check_user_share_article_status.php" , {
    user : localStorage.getItem("mj_user_id"),
    article : id
  } , function(data) {
   // alert(data);
    mm = data.split("*");
    if(mm[0] == 'Y'){
     alert("You Have collected " + mm[1] + " points");
     $("#" + share_id).attr("src" , "icons/share2.png");
    }
  });  

}

function article_bookmark(id , bookmark_id){
  $.post(murl + "mj_new/articles/check_user_article_bookmark_status.php" , {
     user : localStorage.getItem("mj_user_id"),
     article : id
  } , function(data) {
    mm = data.split("*");
  //  alert(data);
     alert("You Have collected " + mm[1] + " points");
     $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function article_page_back(){
   // alert(sessionStorage.getItem("active_page"));

    $("body").css("transform" , "translate3d(0,0,0)");
    if(sessionStorage.getItem("active_page") == "points_page"){
        document.querySelector('#navigator').popPage();
        return;
    }

    if(sessionStorage.getItem("active_page") == "article"){
        document.querySelector('#navigator').popPage();
        return;
    }

    load_main_page();
}

function points_page_Back(){
    sessionStorage.setItem("active_page" , "");
    goBack();
}


function load_article_filtering(filter_request) {
   
   document.querySelector('#navigator').pushPage('filter.html');
     $.post(murl + "mj_new/filter/article_filter_load.php" , {
     user : localStorage.getItem("mj_user_id")
  } , function(data) {
      mm = JSON.parse(data);   
  //  alert(data);
  document.getElementById("filtering_load").innerHTML = mm[0].article_filter; 
  article_ctr_filter_display(filter_request);
  })
}


function load_article_filter(filter_request){ 
    sessionStorage.setItem("active_page" , "article");    
    article_ctr_filter_display(filter_request);
    $.post(murl + "mj_new/articles/load_article_filter.php" , {
     filter : filter_request,
     article_section : sessionStorage.getItem("article_section")
  } , function(data) {   
  document.getElementById("public_main_display").innerHTML = data;
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function article_ctr_filter_display(filter) {
  //  alert(filter);
 //  $("#article_filter_all").removeClass("activess");
 //  $("#article_filter_hot").removeClass("activess");
 //  $("#article_filter_new").removeClass("activess");
 //  $("#article_filter_select").removeClass("activess");

 //  $("#article_filter_" + filter).addClass("activess");
 $("#article_filter_all").css("color" , "lightgray");
   $("#article_filter_hot").css("color" , "lightgray");
   $("#article_filter_new").css("color" , "lightgray");
   $("#article_filter_pick").css("color" , "lightgray");
 $("#article_filter_" + filter).css("color" , "black");
}

function article_highligh_filter(id){
    
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

         set_article_filter(id);    
         
    }

function set_article_filter(id) {
    
     $.post(murl + "mj_new/filter/set_user_article_filter.php" , {
     user : localStorage.getItem("mj_user_id"),
     type_id : id
  } , function(data) {   
    document.querySelector('#navigator').popPage();
    load_filter_articles(id);
  })
}   

function load_filter_articles(category_id){
  
    //  article_ctr_filter_display("all");
    //  sessionStorage.setItem("article_section" , section);
     $.post(murl + "mj_new/filter/load_all_articles.php" , {
       category : category_id
     } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
      //  alert(data);
         document.getElementById("public_main_display").innerHTML = data;
     });
}