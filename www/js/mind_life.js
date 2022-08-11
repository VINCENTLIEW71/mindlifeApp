function load_mindlife_page() {
  menu.close();
  document.querySelector('#navigator').pushPage('MindandLife.html');
}

//function load_mindlife2_page() {
//  document.querySelector('#navigator').pushPage('MindLife02.html');
//}

function load_mindlife2_page() {
      $.post(murl + "mj_new/about/about.php", {} , function(data) {
      //  alert(data);
        document.getElementById("about_home").innerHTML = data;
      })
      document.querySelector('#navigator').pushPage('MindLife02.html');
}

//function load_mindlife3_page() {
//  document.querySelector('#navigator').pushPage('MindLife03.html');
//}

function load_mindlife3_page() {
      $.post(murl + "mj_new/about/contact.php", {} , function(data) {
      //  alert(data);
        document.getElementById("contact_home").innerHTML = data;
      })
      document.querySelector('#navigator').pushPage('MindLife03.html');
}

function load_mindlife4_page() {
  document.querySelector('#navigator').pushPage('MindLife04.html');
}

//function load_mindlife5_page() {
 // document.querySelector('#navigator').pushPage('MindLife05.html');
//}

function load_mindlife5_page() {
      $.post(murl + "mj_new/about/tnc.php", {} , function(data) {
      //  alert(data);
        document.getElementById("tnc_home").innerHTML = data;
      })
      document.querySelector('#navigator').pushPage('MindLife05.html');
}