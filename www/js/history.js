function load_history_page() {
  menu.close();  
  document.querySelector('#navigator').pushPage('history.html');
  load_history_list();
}

function load_history_list(){
    $.post(murl + "mj/history/load_history.php" , {
        user_id : localStorage.getItem("mj_user_id")
    } , function(data) {
        mm = JSON.parse(data);
   //   console.log(mm[0].videos)     
       document.getElementById("history_list_all").innerHTML = mm[0].articles ;
       sessionStorage.setItem("history_video" , mm[0].videos);
       sessionStorage.setItem("history_article" , mm[0].articles)
    })
}

function replace_history(type){
 //   alert(type);
    document.getElementById("history_list_all").innerHTML = '';
    if(type == '1'){
       document.getElementById("history_list_all").innerHTML = sessionStorage.getItem("history_video") ;
       $("#history_article").removeClass("active");
       $("#history_video").addClass("active");
    }

    if(type == '2'){
       document.getElementById("history_list_all").innerHTML = sessionStorage.getItem("history_article") ;
       $("#history_video").removeClass("active");
       $("#history_article").addClass("active");
    }
   
}