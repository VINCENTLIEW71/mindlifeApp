//function load_productservices_page() {
//  document.querySelector('#navigator').resetToPage('hreat3.html');
//}

function load_productservices_detail_page(id) {
  document.querySelector('#navigator').pushPage('hreat4.html');
  $.post(murl + "mj_new/product/load_hreat_product_details.php" , {
     product_id : id,
     user : localStorage.getItem("mj_user_id")     
  } , function(data) {   
   mm = JSON.parse(data);  
  // alert(mm[0].strs);   
  document.getElementById("product_details").innerHTML = mm[0].strs ;  
  })
}

function load_productservices_tnc_page() {
  document.querySelector('#navigator').pushPage('hreat4_tnc.html');
}

function load_productservices_page() {
    document.querySelector('#navigator').resetToPage('hreat3.html');
    load_hreat3_info();
    
    document.getElementById('ads_modal').style.display='block';
}

function load_ps_filter(filter_request){
  //  alert(filter_request);
    ps_ctr_filter_display(filter_request);
    $.post(murl + "mj_new/product/load_product_filter.php" , {
     filter : filter_request     
  } , function(data) {   

   mm = JSON.parse(data);
    //   console.log(data);
 //  alert(mm[0].strs);  
  document.getElementById("hreat3_product").innerHTML = mm[0].strs ;
  //    alert("You Have collected " + mm[1] + " points");
  //   $("#" + bookmark_id).attr("src" , "icons/bookmark2.png");
  })
}

function ps_ctr_filter_display(filter) {
   $("#ps_filter_all").css("color" , "lightgray");
   $("#ps_filter_hot").css("color" , "lightgray");
   $("#ps_filter_new").css("color" , "lightgray");
   $("#ps_filter_select").css("color" , "lightgray");

   $("#ps_filter_" + filter).css("color" , "black");

   
}

function add_PD_liked(pd_id , id){
 // alert("here");
    $.post(murl + "mj_new/product/check_pd_liked.php" , {
      user : localStorage.getItem("mj_user_id"),
      pd : pd_id
    } , function(data) {
       alert(data);
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

function share_PD_to_media(pd_id) {
//  alert(url);   
   add_pd_share_point(pd_id);   
  window.plugins.share.show( 
  {
   subject: 'Video Share',
   text: "https://dev2.thenextbigthinghk.com/mindlifeapp/app/product_landing_page.php?id=" + pd_id 
  },
   function() {}, // Success function
   function() {alert('Share failed')} // Failure function
  ); 
}

function add_pd_share_point(share_id) {
  //  alert(share_id);
  $.post(murl + "mj_new/video/check_pd_share.php" , {
    user : localStorage.getItem("mj_user_id"),
    video : share_id
  } , function(data) {
  //  alert(data);
    mm = data.split("*");
    if(mm[0] == 'Y'){
     alert("You Have collected " + mm[1] + " points");
     $("#PDSH" + share_id).attr("src" , "icons/share2.png");
    }
    
  });  

}