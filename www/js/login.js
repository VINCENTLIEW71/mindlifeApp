  function login(){
    //alert("here");
    $.post(murl + "mj_new/login.php",{
      option : '1',
      username : $("#user_name").val(),
      password : $("#user_password").val()
    } , function(data){
    //    alert(data);
        mm = data.split("*");
        if(mm[0] == 1){
          load_main_page();
          localStorage.setItem("mj_user_id" , mm[1]); 
          if ($("#check-1").is(":checked"))
           {
             //  alert("Check box in Checked");
               localStorage.setItem("is_login" , "1");
          } 
          else 
          {
             //  alert("Check box is Unchecked");
               localStorage.setItem("is_login" , "0");
          }
        }
        else {
            alert("Wrong Password");
        }
    })

  }
  
  function highligh_occupation(id){
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
         
    }

    function load_occupation_list(){
      $.post(murl + "mj_new/occupation_load.php" , {} , function(data){
      //  alert(data);
        document.getElementById("occupation_load").innerHTML = data;
      })
    }

    function save_occupation(){
       $.post(murl + "mj/occupation_save.php",{
         user : localStorage.getItem("mj_user_id"),
         occupation : old_id
       }, function(data) {
        //  load_intro_page();
        load_page3();
       })
    }

    function load_intro_page(){
      document.querySelector('#navigator').pushPage('introduction.html');
    }

    function load_main_page(){ 
     set_active_page("1");  
     sessionStorage.setItem("is_filter_page" , "");
     load_main_page_top_ad();
     load_video_header('0');    
     load_main_page_video();
     load_main_page_articles();
     
      document.querySelector('#navigator').resetToPage('main_page.html');
    }

    function load_main_page_video(){
      //alert("here");
       $.post(murl + "mj_new/video/main_page_video_load.php" , {
         user : localStorage.getItem("mj_user_id")
       } , function(data){
           mm = JSON.parse(data);
        // document.querySelector('#navigator').pushPage('main_page.html');
       // alert(data);
         document.getElementById("new_video_list").innerHTML = mm.new_video; 
         document.getElementById("video_list").innerHTML = mm.hot_video;
         
       });
    }

    

function sex_switch(){
    if(localStorage.getItem("user_sex") == 'M'){
      localStorage.setItem("user_sex" , "F");
    }
    else {
      localStorage.setItem("user_sex" , "M");
  };
  display_user_sex();
}

function interest_save(){
    // alert(list.length);
     $.post(murl + "mj_new/interest_save.php",{
       elements : list,
       user_id : localStorage.getItem("mj_user_id")
     },function(data) {
       //document.querySelector('#navigator').pushPage('occupation_page.html');
       load_occupation_page();
     })

  }

function load_occupation_page(){

  load_occupation_list();
  document.querySelector('#navigator').pushPage('occupation_page.html');
}  

function page9_selected(id){
    var is_remove = false;
    if(document.getElementById(id).style.display == 'none')
      {      
        list.push(id);
        document.getElementById(id).style.display = "block";
      } 
      else {      
        document.getElementById(id).style.display = "none";
        const tmplist = [];
        for(a=0; a < list.length; a++){
          if(list[a] == id)
          {          
            list.splice(a,1);           
          }
        }       
      }       
   }  

function load_page2(){
  document.querySelector('#navigator').pushPage('login_page2.html');
}

function load_page3(){
  document.querySelector('#navigator').pushPage('login_page3.html');
}

function load_blog(id){
  $("body").css("transform" , "translate3d(0,-20px,0)");  // 22dec2021 added
  document.querySelector('#navigator').pushPage('blog.html');
  //showSlides(slideIndex);
  load_article(id);
//  showSlides(slideIndex);
}

function load_article(id){
  document.getElementById('ads_modal').style.display='block';  
  sessionStorage.setItem("mj_article_id" , id);  
  sessionStorage.setItem("mindlife_article_id" , id);
  sessionStorage.setItem("active_page" , "article");
  $.post(murl + "mj_new/articles/articles_view.php" , {
    article : id,
    user : localStorage.getItem("mj_user_id")
  } , function(data) {
    //  alert(data);
    document.getElementById("article_view").innerHTML = data;
  })

}

function load_blogcom(id){
  document.querySelector('#navigator').pushPage('blog2.html');
  //showSlides(slideIndex);
  load_article_com(id);
  showSlides(slideIndex);
}

function load_article_com(id){
  $.post(murl + "mj_new/articles/comment.php" , {
    article : id
  } , function(data) {
    document.getElementById("article_comment").innerHTML = data;
  })

}

function load_videocom(id){
  document.querySelector('#navigator').pushPage('video2.html');
  //showSlides(slideIndex);
  load_video_com(id);
 // showSlides(slideIndex);
}

function load_video_com(id){
  $.post(murl + "mj_new/video/comment.php" , {
    video : id
  } , function(data) {
    document.getElementById("video_comment").innerHTML = data;
  })

}

function load_registration_page(){
 // load_occupation_list();
 // load_interest_list();
 // load_main_page_video();
  document.querySelector('#navigator').pushPage('reg_page.html');
}





function display_user_sex(){
   if(localStorage.getItem("user_sex") == 'M'){
      $("#user_sex").val('男性');
   }
   else {
      $("#user_sex").val('女性');
   }

  }  

  function load_salary_list(){
      document.querySelector('#navigator').pushPage('salary_list.html');
      $.post(murl + "mj_new/registration_load.php" , {
        option : '1'
      } , function(data) {
      //  alert(data);
        document.getElementById("salary_list_display").innerHTML = data;
      })
  }  

  function load_industries_list(){
      document.querySelector('#navigator').pushPage('industries_list.html');
      $.post(murl + "mj_new/registration_load.php" , {
        option : '2'
      } , function(data) {
      //  alert(data);
        document.getElementById("industries_list_display").innerHTML = data;
      })
  }  

  

  function selected_salary_range(id , range){
      document.querySelector('#navigator').popPage();
     // $("#user_income").val(id);
      localStorage.setItem("user_salary_ranger" , id);
      $("#user_income").val(range);
  }

  function selected_industries_range(id){
   
   // alert(id);
      names = get_industries_name(id);
      document.querySelector('#navigator').popPage();
     // $("#user_income").val(id);
      localStorage.setItem("user_industries_ranger" , id);
     // $("#user_industries").val(names);
  }

  function get_industries_name(ids) {
    $.post(murl + "mj_new/registration_load.php", {
      option : '3',
      id : ids
    } , function(data) {
      $("#user_industries").val(data);
    })
  }

  function register_user(){
 //   alert("here");
 if($("#user_name").val() == ''){
      alert("请提交正确讯息");
      ons.notification.toast('请提交正确讯息', { timeout: 3000, animation: 'fall' })
    //  display_error_message("请提交正确讯息"); 
      $("#user_name").css("background-color","red");
      $("#user_name").focus();
      setTimeout(function(){ $("#user_name").css("background-color","white"); }, 5000);
      return;
 }

 if($("#user_password").val() != $("#user_retype_password").val()){
    //  alert("请提交正确讯息");
      ons.notification.toast('重复密码不正确', { timeout: 3000, animation: 'fall' })
    //  display_error_message("请提交正确讯息"); 
      $("#user_retype_password").css("background-color","red");
      $("#user_retype_password").focus();
      setTimeout(function(){ $("#user_retype_password").css("background-color","white"); }, 5000);
      return;
 }

 $.post(murl + "mj_new/rSave.php", {
   name : $("#user_name").val(),
   email : $("#user_email").val(),
   password : $("#user_password").val(),
   password2 : $("#user_retype_password").val(),
   sex : localStorage.getItem("user_sex"),
   income : localStorage.getItem("user_salary_ranger"),
   industries : localStorage.getItem("user_industries_ranger"),
   recommend : $("#user_recommend").val()
 } , function(data) {
  // alert(data);
  // console.log(data);
   mm = data.split("*");
   if(mm[0] == 'Y'){
      localStorage.setItem("mj_user_id" , mm[1]);
      load_occupation_list();
      load_interest_list();
      document.querySelector('#navigator').pushPage('interest_page.html');
   }
   else {
      alert("Registration Failed");
   }
  })


  }


  function display_error_message(msg) {
     $("#err_msg").text(msg);
     document.getElementById("err_window").style.display = "block";
  }

  function load_interest_list(){
    $.post(murl + "mj_new/interest_load.php" , {} , function(data) {
    //  alert(data);
        document.getElementById("interest_load_list").innerHTML = data;
    })
  }

  var app = {};
  function picture_selection() {
  ons.openActionSheet({
    title: '選擇照片來源',
    cancelable: true,
    buttons: ['相機', '畫廊']
   }).then(index => { 
    if (index === 0 ) {
        capturePhoto();
      } else if (index === 1 ) {
        getPhoto();
      }
 });
}

  function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(uploadPhoto, onFail, { 
        quality: 50, destinationType: Camera.DestinationType.FILE_URI, correctOrientation: true
    });
  }

  // A button will call this function
  // To select image from gallery
  function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      });
  }

  function uploadPhoto(imageURI) {
    //If you wish to display image on your page in app
    // Get image handle
    var Image = document.getElementById('profile-image');

    // Unhide image elements
    //Image.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    Image.src = imageURI;

    var options = new FileUploadOptions();
    options.fileKey = "file";
    var userid = '123456';
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/jpg";

    var params = new Object();
    params.imageURI = imageURI;
    params.userid = userid;
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    var url = "https://dev2.thenextbigthinghk.com/mindlifeapp/mj/upload.php";
    ft.upload(imageURI, url, win, fail, options, true);
  }
  //Success callback
  function win(r) {
      alert("Image uploaded successfully!!");
  }
  //Failure callback
  function fail(error) {
      alert("There was an error uploading image");
  }
  // Called if something bad happens.
  // 
  function onFail(message) {
      alert('Failed because: ' + message);
  }

  function user_request_reset_password(){ 
      alert("here");  
     $.post(murl + "mj_new/forgot_password.php" , {
         email : $("#forgetpass_email").val()
     } , function(data) {
      alert(data);
        if(data == "Success"){
            alert("Reset Password Email Sent");
        }
        else {
            alert("WE could not found the email in our system.");
        }
    })
  }
