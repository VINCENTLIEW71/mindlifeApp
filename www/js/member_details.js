function load_memberdetails_page() {
  //  alert("here");
  menu.close();  
  document.querySelector('#navigator').pushPage('ac.html');
  load_all_pinfo();
}

function load_all_pinfo() {
  //load_job_info();
  //load_income_info();  
  $.post(murl + "mj_new/pinfo/pinfo_load.php" , {        
        user_id : localStorage.getItem("mj_user_id")
    } , function(data) { 
      //  alert(data); 
       mm = JSON.parse(data); 
       document.getElementById("personal_occupation").innerHTML = mm[0].jobs ;
       document.getElementById("personal_income").innerHTML = mm[0].salary ; 
       document.getElementById("personal_sex").innerHTML = mm[0].sex ;
       $("#personal_name").text(mm[0].name);
       $("#personal_name2").text(mm[0].name);
       $("#personal_email").text(mm[0].email);
       $("#personal_email2").text(mm[0].email);
    })
}

function update_personal_info(){
    alert("here");
    $.post(murl + "mj_new/pinfo/update_personal_info.php" , {
        name : $("#personal_name").text(),
        email : $("#personal_email").text(),
        occupation : $("#personal_occupation :selected").val(),
        income : $("#personal_income :selected").val(),
        sex : $("#personal_sex :selected").val(),
        user_id : localStorage.getItem("mj_user_id")
      //  user_id : localStorage.getItem("mj_user_id")
    } , function(data) {  
        alert(data);      
    })
}

function open_pinfo_sex(){
   document.getElementById('pinfo_modal').style.display='block';  
}

function load_job_info(){
   // document.getElementById('job_modal').style.display='block';

    $.post(murl + "mj_new/pinfo/pinfo_load.php" , {
        option : '1'
      //  user_id : localStorage.getItem("mj_user_id")
    } , function(data) {  
     //   alert(data); 
       document.getElementById("personal_occupation").innerHTML = data ;
      
    })

    
}

function load_income_info(){
   // document.getElementById('job_modal').style.display='block';

    $.post(murl + "mj_new/pinfo/pinfo_load.php" , {
        option : '2'
      //  user_id : localStorage.getItem("mj_user_id")
    } , function(data) {  
     //   alert(data); 
       document.getElementById("personal_income").innerHTML = data ;
      
    })

    
}