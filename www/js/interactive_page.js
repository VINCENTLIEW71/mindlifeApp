function load_registerevent_page() {
  //  alert(sessionStorage.getItem("event_selected_id"));
  document.querySelector('#navigator').pushPage('event3.html');
  $.post(murl + "mj_new/event/event_registration_info.php" , {
    event_id : sessionStorage.getItem("event_selected_id")
  } , function(data) {
  //  alert(data);
  //  mm = JSON_parse(data);
  //  alert(mm[0].event_amout);
    $("#reg_event_amt").text("總額：$ " + data);
  })
  //goto_eventreg_page();
}

function load_paypal_page(){
  document.querySelector('#navigator').pushPage('paypal.html');
}

function goBack() {
  document.querySelector('#navigator').popPage();
}

function goto_event_page(id) {
    sessionStorage.setItem("event_selected_id" , id);
  $.post(murl + "mj_new/event/event_view.php" , {
    event_id : id 
  } , function(data) {
    document.getElementById("event_viewer").innerHTML = data;
  })
}

function load_event(id){
   document.querySelector('#navigator').pushPage('event2.html');
  //showSlides(slideIndex);
  goto_event_page(id);
}

function goto_eventreg_page(id) {
  $.post(murl + "admin/sn/paypal/index.php" , {
    event_id : id 
  } , function(data) {
   // console.log(data);
    document.getElementById("event_reg").innerHTML = data;
  })
}

function load_eventreg(id){
   document.querySelector('#navigator').pushPage('eventreg.html');
  //showSlides(slideIndex);
  //goto_eventreg_page(id);
}





//function load_quiz_page() {
//  document.querySelector('#navigator').pushPage('event_test.html');
//}

//function load_coupon_page() {
//  document.querySelector('#navigator').pushPage('coupon.html');
//}

function load_gift_page() {
  document.querySelector('#navigator').pushPage('credit.html');
}

