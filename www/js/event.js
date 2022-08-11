function load_event_page(id) {
   // alert("hello " + id);
    
      menu.close();
      sessionStorage.setItem("event_selected_id" , id);
      sessionStorage.setItem("active_page" , "event_page");
    //  alert(sessionStorage.getItem("isMobile"));
      if(sessionStorage.getItem("isMobile") == 'N') {
         file_to_load = 'event_load_list.php';
      }
      else {
         file_to_load = 'mobile_event_load_list.php'; 
      }
      $.post(murl + "mj_new/event/" + file_to_load , {
        user : localStorage.getItem("mj_user_id")
      } , function(data) {
      //  alert(data);
       // mm = JSON_parse(data);
        document.getElementById("event_home").innerHTML = data;
        event_ctr_filter_display("all");
      })
      

      
     document.querySelector('#navigator').resetToPage('event.html'); 
}

function load_event_header(id) {
    $.post(murl + "mj_new/header_load.php", {
    option : '3',
    header_id : id
  } , function(data) {
  //  alert(data);
    document.getElementById("event_page_header").innerHTML = data;
   // document.getElementById("public_top_header").innerHTML = data;
  })
} 

function event_registration(){
  //  alert($("#event_no_person :selected").val());
   $.post(murl + "mj_new/event/event_registration.php", {
    event_id : sessionStorage.getItem("event_selected_id"), 
    user : localStorage.getItem("mj_user_id"),
    reg_no_person : $("#event_no_person :selected").val(),
    reg_name : $("#event_user_name").val(),
    reg_gender : $("#event_user_gender :selected").val(),
    reg_phone : $("#event_user_phone").val(),
    reg_email : $("#event_user_email").val(),
    reg_know : $("#event_user_know :selected").val(),
  } , function(data) {
  //  alert(data);
    mm = JSON.parse(data);
    if(mm[0].status == 'Y') {
       document.querySelector('#navigator').pushPage('paypal.html');
    }
    else {
       alert(mm[0].msg);
    }
  //   window.location.assign("https://dev2.thenextbigthinghk.com/mindlifeapp/mj/Paypal.html")
  
     
  })
}

function share_event_to_media(id , url , share_id) {
add_event_point(id , share_id);  
window.plugins.share.show( 
  {
   subject: 'Video Share',
   text: "https://dev2.thenextbigthinghk.com/mindlifeapp/app/event_landing_page.php?id=" + id 
  },
   function() {}, // Success function
   function() {alert('Share failed')} // Failure function
  ); 

 // window.plugins.socialsharing.share(
 //   null, // Message
  //  'Subject test', // Subject
  //  null, // Image
  //  url // Link
//);
}

function add_event_point(id , share_id) {
  $.post(murl + "mj_new/event/check_user_share_event_status.php" , {
    user : localStorage.getItem("mj_user_id"),
    event : id
  } , function(data) {
  //  alert(data);
    mm = data.split("*");
    if(mm[0] == 'Y'){
     alert("You Have collected " + mm[1] + " points");
     $("#" + share_id).attr("src" , "icons/share2.png");
    }
  });  

}

function event_bookmark(id , bookmark_id){
  $.post(murl + "mj_new/event/check_user_event_bookmark_status.php" , {
     user : localStorage.getItem("mj_user_id"),
     event : id
  } , function(data) {
    mm = data.split("*");
  //  alert(data);
     alert("You Have collected " + mm[1] + " points");
     $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function add_event_liked(event_id , id){
  //  alert(event_id);
    check_on_liked_event_status(event_id , id);
}

function check_on_liked_event_status(event_id , id){
 // alert("here");
    $.post(murl + "mj_new/event/check_user_liked_event_status.php" , {
      user : localStorage.getItem("mj_user_id"),
      event : event_id
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

function load_event_filter(filter_request){
  //  alert(sessionStorage.getItem("video_section"));
    event_ctr_filter_display(filter_request);
    if(sessionStorage.getItem("isMobile") == 'N') {
         file_to_load = 'load_event_filter.php';
      }
      else {
         file_to_load = 'mobile_load_event_filter.php'; 
      }
    $.post(murl + "mj_new/event/" + file_to_load , {
     filter : filter_request     
  } , function(data) {   
  //  alert(data);
  document.getElementById("event_home").innerHTML = data;
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function event_ctr_filter_display(filter) {
   $("#event_filter_all").css("color" , "lightgray");
   $("#event_filter_hot").css("color" , "lightgray");
   $("#event_filter_new").css("color" , "lightgray");
   $("#event_filter_select").css("color" , "lightgray");

   $("#event_filter_" + filter).css("color" , "black");

   
}

function load_event_filtering(filter_request) {
  //  alert("here");
   sessionStorage.setItem("is_filter_page" , "event");
   event_ctr_filter_display(filter_request);
   document.querySelector('#navigator').pushPage('filter.html');
     $.post(murl + "mj_new/filter/event_filter_load.php" , {
     user : localStorage.getItem("mj_user_id")     
  } , function(data) {
      mm = JSON.parse(data);   
  //  alert(data);
  document.getElementById("filtering_load").innerHTML = mm[0].article_filter; 
  })
}


function event_highligh_filter(id){
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

         set_event_filter(id);    
         
    }

function set_event_filter(id) {
   // alert("here2");
     $.post(murl + "mj_new/filter/set_user_event_filter.php" , {
     user : localStorage.getItem("mj_user_id"),
     type_id : id
  } , function(data) {
   
    document.querySelector('#navigator').popPage();
    load_filter_event(id);
  })
}   

function load_filter_event(category_id){
 // alert("here3");
    //  article_ctr_filter_display("all");
    //  sessionStorage.setItem("article_section" , section);
     $.post(murl + "mj_new/filter/load_all_event.php" , {
       category : category_id
     } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
      //  alert(data);
         document.getElementById("event_home").innerHTML = data;
     });
}