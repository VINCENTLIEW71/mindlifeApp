function load_heartsearch_page() {
 // load_hreat3_info();  
  
  sessionStorage.setItem("active_page","heart_page") ; 
  document.querySelector('#navigator').resetToPage('hreat.html'); 
  //load_hreat3_info();
}

function load_searchserviceprovider_page() {
  document.querySelector('#navigator').resetToPage('hreat2.html');
}

function load_hreat3_info(){
    $.post(murl + "mj_new/product/load_hreat3_products.php" , {   
          user : localStorage.getItem("mj_user_id")  
     } , function(data){
        mm = JSON.parse(data);
      // alert(mm[0].strs);  
      // console.log(mm[0].strs);     
       document.getElementById("hreat3_product").innerHTML = mm[0].strs ;
       ps_ctr_filter_display("all");
     })
}

function load_hreat_product_list() {
   // alert("here");
    $.post(murl + "mj_new/product/load_hreat3_products.php",{      
      user : localStorage.getItem("mj_user_id")
     }, function(data){
       mm = JSON.parse(data);
     //  alert(mm);       
       document.getElementById("hreat3_product").innerHTML = mm[0].user_point_list ;
     })
}

