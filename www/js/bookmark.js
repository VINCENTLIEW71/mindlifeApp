function load_bookmark_page() {
  menu.close();
  
  document.querySelector('#navigator').pushPage('bookmark.html');
  load_bookmark_list();
} 

function load_bookmark_list(){
   // alert("here");
    $.post(murl + "mj_new/bookmark/load_bookmark.php" , {
        user_id : localStorage.getItem("mj_user_id")
    } , function(data) {
        mm = JSON.parse(data);
      console.log(mm[0].videos)     
       document.getElementById("bookmark_list_all").innerHTML = mm[0].articles ;
       sessionStorage.setItem("video_bookmark" , mm[0].videos);
       sessionStorage.setItem("article_bookmark" , mm[0].articles)
    })
}

function replace_bookmark(type){
 //   alert(type);
    document.getElementById("bookmark_list_all").innerHTML = '';
    if(type == '1'){
       document.getElementById("bookmark_list_all").innerHTML = sessionStorage.getItem("video_bookmark") ;
       $("#article_bookmark").removeClass("active");
       $("#video_bookmark").addClass("active");
    }

    if(type == '2'){
       document.getElementById("bookmark_list_all").innerHTML = sessionStorage.getItem("article_bookmark") ;
       $("#video_bookmark").removeClass("active");
       $("#article_bookmark").addClass("active");
    }
   
}

