// This is a JavaScript file

function load_main_page_top_ad() { 
   // alert("here");
      ctr = 1;    
      $.post("https://dev2.thenextbigthinghk.com/mindlifeapp/mj_new/ad/load_main_page_top_ad.php", {} , function(data) {
     //   alert(data);
       // document.getElementById("main_page_top_ad").innerHTML = data;
       mm = JSON.parse(data);
      // alert(mm.length);
       $("#initial_image1").attr("src", "https://dev2.thenextbigthinghk.com/mindlifeapp/v2/advertisement/" + mm[0].image_path_app);
       $("#initial_image2").attr("src", "https://dev2.thenextbigthinghk.com/mindlifeapp/v2/advertisement/" + mm[1].image_path_app);
       $("#initial_image3").attr("src", "https://dev2.thenextbigthinghk.com/mindlifeapp/v2/advertisement/" + mm[2].image_path_app);
       $("#initial_image4").attr("src", "https://dev2.thenextbigthinghk.com/mindlifeapp/v2/advertisement/" + mm[3].image_path_app);
       $("#initial_image5").attr("src", "https://dev2.thenextbigthinghk.com/mindlifeapp/v2/advertisement/" + mm[4].image_path_app);
       
       for(a=0; a < mm.length; a++){
         console.log(mm[a].position);
        //  const elementname = document.getElementById('initial_image' + ctr.toString()); 
          switch(mm[a].position){
              case '88001' : load_event_page_ctr(mm[a].item , ctr.toString()); break;
              case '88003' : load_article_page_ctr(mm[a].item , ctr.toString()); break;
              case '88004' : load_video_page_ctr(mm[a].item , ctr.toString()); break;
              case '88005' : load_link_ctr(mm[a].item , ctr.toString()); break;
             // console.log(mm[a].position);
          }
       //   elementname.setAttribute("onclick","add_function('1')"); 
          ctr++;
       }
       
      })
      
}


function add_function(id){
   // alert(id);
}

function load_event_page_ctr(item , ctr) {
  //  alert(item + "    " + ctr);
    const elementname = document.getElementById('initial_image' + ctr);
   if(item == '0') {
      // load_event_page('1');
       elementname.setAttribute("onclick","load_event_page('1')");
   }
   else {
       elementname.setAttribute("onclick","load_event('" + item + "')");
   }    
}

function load_article_page_ctr(item , ctr) {
  //  alert(item + "    " + ctr);
    const elementname = document.getElementById('initial_image' + ctr);
   if(item == '0') {
      // load_event_page('1');
       elementname.setAttribute("onclick","load_article_all()");
   }
   else {
       elementname.setAttribute("onclick","load_blog('" + item + "')");
   }    
}
// load_article(id)
function load_link_ctr(items , ctr) {
   const elementname = document.getElementById('initial_image' + ctr);
   elementname.setAttribute("onclick","load_ad_link_page('" + items + "')");

}


function load_ad_link_page(links){
    sessionStorage.setItem("out_link_active" , "Y");
    document.querySelector('#navigator').pushPage('ad_out_link.html');
    var ref = cordova.InAppBrowser.open('https:\/\/www.w3schools.com\/', '_blank', 'location=no');
}

function load_video_page_ctr(item , ctr) {
   // alert(item + "    " + ctr);
    const elementname = document.getElementById('initial_image' + ctr);
   if(item == '0') {
      // load_event_page('1');
       elementname.setAttribute("onclick","load_single_video2('21')");
   }
   else {
       elementname.setAttribute("onclick","goto_video_page('" + item + "')");
   }    
}

//goto_video_page(video_id)