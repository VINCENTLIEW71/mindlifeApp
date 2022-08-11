function load_coupon_page_1() {
   
  document.querySelector('#navigator').pushPage('event_心活Jetso_2.html');
}

function load_coupon_tnc() {
  document.querySelector('#navigator').pushPage('event_心活Jetso_3.html');
}

function load_coupon_page(id) {
  //  alert("here");
      menu.close();
      document.getElementById('ads_modal').style.display='block'; 
     // sessionStorage.setItem("coupon_selected_id" , id);
      if(sessionStorage.getItem("isMobile") == 'N') {
         file_to_load = 'load_all_coupon.php';
      }
      else {
         file_to_load = 'mobile_load_all_coupon.php'; 
      }
      $.post("https://dev2.thenextbigthinghk.com/mindlifeapp/mj_new/coupon/" + file_to_load , {
          user : localStorage.getItem("mj_user_id")
      } , function(data) {
     //   alert(data);
        document.getElementById("coupon_home").innerHTML = data;
      })
      document.querySelector('#navigator').pushPage('coupon.html');
}

function load_coupon(id){
   document.querySelector('#navigator').pushPage('event_心活Jetso_2.html');
  //showSlides(slideIndex);
  goto_coupon_page(id);
}

function goto_coupon_page(id) {
  $.post(murl + "mj_new/coupon/coupon_view.php" , {
    coupon_id : id , 
    user : localStorage.getItem("mj_user_id") 
  } , function(data) {
    document.getElementById("coupon_viewer").innerHTML = data;
  })
}

function load_coupontnb(id){
   document.querySelector('#navigator').pushPage('event_心活Jetso_3.html');
  //showSlides(slideIndex);
  goto_coupontnb_page(id);
}

function goto_coupontnb_page(id) {
  $.post(murl + "mj_new/coupon/coupontnb_view.php" , {
    coupon_id : id 
  } , function(data) {
    document.getElementById("coupon_tnb").innerHTML = data;
  })
}

function load_couponlist_page() {
  menu.close();
  document.querySelector('#navigator').pushPage('coupons.html');
  $.post(murl + "mj_new/coupon/load_downloaded_coupon.php" , {
    user : localStorage.getItem("mj_user_id") 
  } , function(data) {
     mm = JSON.parse(data);
    document.getElementById("coupons_downloaded_list").innerHTML = mm[0].strs;
  })
}

function load_coupon_filter(filter_request){
  //  alert(sessionStorage.getItem("video_section"));
    coupon_ctr_filter_display(filter_request);
    if(sessionStorage.getItem("isMobile") == 'N') {
         file_to_load = 'load_coupon_filter.php';
      }
      else {
         file_to_load = 'mobile_load_coupon_filter.php'; 
      }
    $.post(murl + "mj_new/coupon/" + file_to_load , {
     filter : filter_request     
  } , function(data) {   
  //  alert(data);
  document.getElementById("coupon_home").innerHTML = data;
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function coupon_ctr_filter_display(filter) {
   $("#coupon_filter_all").css("background-color" , "white");
   $("#coupon_filter_hot").css("background-color" , "white");
   $("#coupon_filter_new").css("background-color" , "white");
   $("#coupon_filter_select").css("background-color" , "white");

   $("#coupon_filter_" + filter).css("background-color" , "lightgray");
}

function download_coupon(id) {
//  alert(id);
   $.post(murl + "mj_new/coupon/save_download_coupon.php" , {
     coupon_id : id,
     user : localStorage.getItem("mj_user_id")    
  } , function(data) {   
   // alert(data);
    if(data == 'Y'){
       msg();
       $("#download_coupon_btn").prop("disabled" , true);
    }

  })
}

function coupon_redeem(barcode , id){
   // alert("here");
   $.post(murl + "mj_new/coupon/load_coupon_redeem1.php" , {
     coupon_id : id,
     user : localStorage.getItem("mj_user_id")    
  } , function(data) {   
   //   alert(data);
    document.getElementById("coupon_redeem_content").innerHTML = data;

  })
    document.querySelector('#navigator').pushPage('coupon_redeem.html');
}

function display_barcode(id){
    $.post(murl + "mj_new/coupon/load_coupom_redeem2.php" , {
     coupon_id : id,
     user : localStorage.getItem("mj_user_id")    
  } , function(data) {   
    document.getElementById("coupon_redeem_content").innerHTML = data;

  })
}

function update_redeem_coupon(id){
    $.post(murl + "mj_new/coupon/update_coupon_redeem_info.php" , {
     coupon_id : id,
     user : localStorage.getItem("mj_user_id")    
  } , function(data) {  
      alert(data);
      if(data == 'Y'){
         document.querySelector('#navigator').popPage(); 
      } 
   // document.getElementById("coupon_redeem_content").innerHTML = data;

  })
}

function add_coupon_liked(coupon_id , id){
 // alert("here");
    $.post(murl + "mj_new/coupon/check_user_liked_coupon_status.php" , {
      user : localStorage.getItem("mj_user_id"),
      coupon : coupon_id
    } , function(data) {
     //  alert(data);
       if(data == 'Y'){ // Liked status
          $("#" + id).attr("src", "icons/like2.png");   
        //  load_video_liked_count();        
       }
       else { // dislike status
          $("#" + id).attr("src", "icons/like1.png");
       }
       //goto_video_page2(video_id); 
       //load_main_page();
    })
   // load_article(sessionStorage.getItem("mj_article_id"));
}

function share_coupon_to_media(coupon_id) {
//  alert(url);   
   add_coupon_point(coupon_id);   
  window.plugins.share.show( 
  {
   subject: 'Coupon Share',
   text: "https://dev2.thenextbigthinghk.com/mindlifeapp/app/video_landing_page.php?id=" + video_id 
  },
   function() {}, // Success function
   function() {alert('Share failed')} // Failure function
  ); 
}

function add_coupon_point(share_id) {
  //  alert(share_id);
  $.post(murl + "mj_new/coupon/check_user_share_coupon_status.php" , {
    user : localStorage.getItem("mj_user_id"),
    coupon : share_id
  } , function(data) {
  //  alert(data);
    mm = data.split("*");
    if(mm[0] == 'Y'){
     alert("You Have collected " + mm[1] + " points");
     $("#COU" + share_id).attr("src" , "icons/share2.png");
    }
    
  });  

}

