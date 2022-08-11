// This is a JavaScript file

function load_credit_page() {
//  alert(localStorage.getItem("mj_user_id"));
      document.querySelector('#navigator').pushPage('credit.html');
     $.post(murl + "mj/point/points.php",{      
      user : localStorage.getItem("mj_user_id")
     }, function(data){
       mm = JSON.parse(data);
    //   console.log(data);
       $("#user_total_points").text(mm[0].total_points);
     //  console.log(video_id);
       document.getElementById("points_listing_1").innerHTML = mm[0].user_point_list ;
     })
}

/* function reload_main_page(){
      load_video_header('1');
      load_main_page_video();
      load_main_page_articles();
      document.querySelector('#navigator').resetToPage('main_page.html');
}  */



function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
 // alert("here");
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


function load_video_all(){
set_active_page("2"); // set active page to public 
document.querySelector('#navigator').pushPage('tv.html');
load_video_header2('1');
load_all_videos('1');
}

function load_main_page_articles(){  // new
      //alert("here");
       $.post(murl + "mj_new/articles/articles_load.php" , {
         user : localStorage.getItem("mj_user_id")
       } , function(data){
        // user : localStorage.getItem("#mj_user_id");
        // document.querySelector('#navigator').pushPage('main_page.html');
        //alert(data);
         document.getElementById("main_page_article_list").innerHTML = data;       
         
       });
}

function load_video_header(id){
  $.post(murl + "mj_new/header_load.php", {
    option : '3',
    header_id : id
  } , function(data) {
  //  alert(data);
    document.getElementById("main_page_header").innerHTML = data;
    
  })
}

function load_video_header2(id){
  //  alert(id);
  $.post(murl + "mj_new/header_load.php", {
    option : '2',
    header_id : id
  } , function(data) {
      //  alert(data);
    
    document.getElementById("public_top_header").innerHTML = data;
  })
}



function load_single_video(id){
 //  alert("hele la " + sessionStorage.getItem("active_page"));
  sessionStorage.setItem("active_section" , "video");  
  sessionStorage.setItem("video_section" , id);
 // alert(sessionStorage.getItem("active_page"));
  if(sessionStorage.getItem("active_page") == "main_page"){    
    document.querySelector('#navigator').resetToPage('tv.html');
    load_video_header2(id);
   // load_all_videos(id);
    load_video_filter('all');
    set_active_page("2");
    return;
  }
  if(sessionStorage.getItem("active_page") == "public_page"){
    load_video_header2(id);
    load_all_videos(id);
    return;
  }  
  
  if(sessionStorage.getItem("active_page") == "event_page"){    
    document.querySelector('#navigator').resetToPage('tv.html');
    load_video_header2(id);
    load_all_videos(id);
    set_active_page("2");
    return;
  }

  if(sessionStorage.getItem("active_page") == "heart_page"){    
    document.querySelector('#navigator').resetToPage('tv.html');
    load_video_header2(id);
    load_all_videos(id);
    set_active_page("2");
    return;
  }

  if(sessionStorage.getItem("active_page") == "article"){    
    document.querySelector('#navigator').resetToPage('tv.html');
    load_video_header2(id);
    load_all_videos(id);
    set_active_page("2");
    return;
  }
}

function load_single_video2(id){
  menu.close();
  sessionStorage.setItem("video_section" , id);
 // alert(sessionStorage.getItem("active_page"));
  if(sessionStorage.getItem("active_page") == "main_page"){    
    document.querySelector('#navigator').resetToPage('tv.html');
    load_video_header2(id);
    load_all_videos(id);
    set_active_page("2");
  }
  if(sessionStorage.getItem("active_page") == "public_page"){
    load_video_header2(id);
    load_all_videos(id);
  }   

  if(sessionStorage.getItem("active_page") == "article"){
    document.querySelector('#navigator').resetToPage('tv.html');  
    load_video_header2(id);
    load_all_videos(id);
  }   

  if(sessionStorage.getItem("active_page") == "event_page"){
    document.querySelector('#navigator').resetToPage('tv.html');  
    load_video_header2(id);
    load_all_videos(id);
  }   

  if(sessionStorage.getItem("active_page") == "heart_page"){
    document.querySelector('#navigator').resetToPage('tv.html');  
    load_video_header2(id);
    load_all_videos(id);
  }   
}



function load_all_videos(section){
 // alert("here");
     $.post(murl + "mj_new/video/load_section_video.php" , {
       section_id : section
     } , function(data){
        // document.querySelector('#navigator').pushPage('main_page.html');
   //     alert(data);
        document.getElementById("video_main_display").innerHTML = data;
        video_ctr_filter_display('all');
     });
}



function logout(){
  menu.close();
  localStorage.setItem("is_login" ,"0");
  document.querySelector('#navigator').resetToPage('page1.html');
  sessionStorage.setItem("active_page" , "");
}

function forgot_password(){
document.querySelector('#navigator').pushPage('forget_password.html');
}

document.addEventListener('show', function(event) {
  var page = event.target;
  if (page.id === 'main-page') {
   /* $('.mp-slideshow').slick({
        dots: true,
        centerMode: true,
        centerPadding: '88px',
        infinite: true,
        autoplay: true
    });  */

 $('.mp-slideshow').slick({
  lazyLoad: "ondemand",   
  dots: true,      
  centerMode: false,
  slidesToScroll: 1,
  slidesToShow: 3,
  centerPadding: '80px',  
  infinite: true,
  autoplay: true,
  speed: 3000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        centerMode: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,  
        arrows: false,
        centerMode: true,
        centerPadding: '27px',
        centerMode: true,
      }
    }
  ]
});
//mp_category_set

$('.mp_scrolls').slick({
  centerMode: true,
  centerPadding: '80px',
  slidesToShow: 5,
  arrows: true,
  infinite: true,
  autoplay: true,
  slidesToScroll: 5,
  speed: 900,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
        slidesToScroll: 1,        
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,               
      }
    }
  ]
});

  }
});

function msg(msgs){
    $("#msg_text").text(msgs);
     var dialog = document.getElementById('my-dialog');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
}
var hideDialog = function(id) {
  document.getElementById(id).hide();
};
