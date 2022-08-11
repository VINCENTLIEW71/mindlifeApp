function new_user_task_page() {
  document.querySelector('#navigator').pushPage('new-user-task.html');  
}

function load_new_user_task_list(){
    $.post(murl + "mj_new/point/new_user_task_list.php",{      
      user : localStorage.getItem("mj_user_id")
     }, function(data){
       //  alert(data);
       mm = JSON.parse(data);     
       document.getElementById("new_user_task").innerHTML = mm[0].new_user_task_list ;
     })
}

function daily_task_page() {
  document.querySelector('#navigator').pushPage('daily-task.html');
}

function load_credit_page() {
 // alert(localStorage.getItem("mj_user_id"));
      sessionStorage.setItem("active_page" , "points_page");
      document.querySelector('#navigator').pushPage('credit.html');
     
}

function load_credit_info(){
    $.post(murl + "mj_new/point/points.php",{      
      user : localStorage.getItem("mj_user_id")
     }, function(data){
       mm = JSON.parse(data);
   //   alert(data);
       $("#user_total_points").text(mm[0].total_points);
       sessionStorage.setItem("user_total_points" , mm[0].total_points);
      // alert(data);
     //  console.log(video_id); 
       document.getElementById("points_listing_1").innerHTML = mm[0].user_point_list ;
       document.getElementById("newie_task").innerHTML = mm[0].newie ;
       document.getElementById("daily_task").innerHTML = mm[0].daily_task ;
     })
}

function load_credit_product_info(){
    $.post(murl + "mj_new/point/load_products.php",{        
     }, function(data){
       mm = JSON.parse(data);   
       document.getElementById("point_product_list").innerHTML = mm[0].strs ;       
     })
}

function point_history_page() {
  document.querySelector('#navigator').pushPage('point-history.html');
  $.post(murl + "mj_new/point/points_list.php",{      
      user : localStorage.getItem("mj_user_id")
     }, function(data){
       mm = JSON.parse(data);
       console.log(data);
       $("#point_history_point").text(mm[0].total_points);
     //  console.log(video_id);
       document.getElementById("point_listing_2").innerHTML = mm[0].user_point_list ;
     })
}

function load_article_with_section(id){
    sessionStorage.setItem("active_page", "article");
    setTimeout(function(){ $("#btn" + id).text("完成") }, 3000);
    
    if($("#btn" + id).text() != "完成"){
       load_blog2(id);
    }
    
    
}

function load_article_with_section2(id){
    sessionStorage.setItem("active_page", "article");
    setTimeout(function(){ $("#daily_btn" + id).text("完成") }, 3000);
    
    if($("#daily_btn" + id).text() != "完成"){
       load_blog2(id);
    }
    
    
}

function load_blog2(id){
  $("body").css("transform" , "translate3d(0,-20px,0)");  // 22dec2021 added
  document.querySelector('#navigator').pushPage('blog.html');
  //showSlides(slideIndex);
  load_article(id);
  //showSlides(slideIndex);
}

function load_user_points(){
    //user_total_points

    $.post(murl + "mj/point/user_points.php",{      
      user : localStorage.getItem("mj_user_id")
     }, function(data){
       mm = JSON.parse(data);
       console.log(data);
       $("#user_total_points").text(mm[0].total_points);     
     })
}

function load_change_product(id){    
    document.querySelector('#navigator').pushPage('product_point_change.html');
    $.post(murl + "mj_new/point/product_point_change.php",{      
      user : localStorage.getItem("mj_user_id"),
      product_id : id
     }, function(data){
       mm = JSON.parse(data);
      // console.log(data);
       document.getElementById("product_change").innerHTML = mm[0].strs;     
     })
}

function redeem_product(id){
   // alert(id);
    $.post(murl + "mj_new/point/save_product_change.php",{      
      user : localStorage.getItem("mj_user_id"),
      product_id : id
     }, function(data){
      //   alert(data);
        if(data == 'Y'){
            msg("我們的工作人員會與您接觸");
        } 
     })
}

function product_change_back(){
    document.querySelector('#navigator').popPage();
}