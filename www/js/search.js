function load_search_page() {
  load_search_results();  
  document.querySelector('#navigator').pushPage('search.html');
}

function load_search_results(){
    $.post(murl + "mj/search/search.php" , {
        search_query : $("#main_page_search").val()
    } , function(data) {
        mm = JSON.parse(data);
    //  alert(data);       
       document.getElementById("search_results").innerHTML = mm[0].strs ;
    })
}

function search_option(search_id){
  //  alert(sessionStorage.getItem("active_section") + search_id);
   if(sessionStorage.getItem("active_section") == "video"){
       sessionStorage.setItem("active_page","video");
       search_video_option(search_id);
       
     //  document.querySelector('#navigator').pushPage('search.html');
   } 

   if(sessionStorage.getItem("active_section") == "article"){
       search_article_option(search_id);
      // document.querySelector('#navigator').pushPage('public_page.html');
   } 

   if(sessionStorage.getItem("active_section") == "event"){
       search_event_option(search_id);
      // document.querySelector('#navigator').pushPage('public_page.html');
   } 

   document.querySelector('#navigator').pushPage('search.html');
}

function search_video_option(search_id) {
    $.post(murl + "mj_new/search/search_video.php" , {
        search_query : $("#video_search_id").val()
    } , function(data) {
        alert(data); 
        mm = JSON.parse(data);
            
       document.getElementById("search_results").innerHTML = mm[0].strs ;
    })
}

function tv_page_search_option() {
   search_video_option($("#video_search_id").val()); 
}

function search_article_option(search_id) {
    $.post(murl + "mj/search/search_article.php" , {
        search_query : $("#" + search_id).val()
    } , function(data) {
        mm = JSON.parse(data);
    //  alert(data);       
       document.getElementById("search_results").innerHTML = mm[0].strs ;
    })
}

function search_event_option(search_id) {
    $.post(murl + "mj/search/search_event.php" , {
        search_query : $("#" + search_id).val()
    } , function(data) {
        mm = JSON.parse(data);
      alert(data);       
       document.getElementById("search_results").innerHTML = mm[0].strs ;
    })
}