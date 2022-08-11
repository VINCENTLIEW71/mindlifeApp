// This is a JavaScript file

function main_menu_option(id){
    old_id = sessionStorage.getItem("main_page_last_menu");
    $("#mm" + old_id).removeClass("active");
    sessionStorage.setItem("main_page_last_menu" , id);
    $("#mm" + id).addClass("active");

    switch(id) {
      case 71 : load_single_articles2('15'); break;
      case 72 : load_single_video2('21'); break;
      case 73 : load_event_page(); break;
      case 74 : load_heartsearch_page(); break;
      case 75 : load_memberdetails_page(); break;
      case 76 : load_bookmark_page(); break;
      case 77 : load_history_page(); break;
      case 78 : load_couponlist_page(); break;
      case 79 : load_mindlife_page(); break;
      case 80 : load_setting_page(); break;
      case 81 : logout(); break;
    }

}

