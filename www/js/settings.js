function load_setting_page() {
  //load_setting_page();
  document.querySelector('#navigator').pushPage('setting.html');
}

function load_changepassword_page() {
  document.querySelector('#navigator').pushPage('changepassword.html');
}

var app = {};

app.selectFontsize = function () {
  ons.openActionSheet({
    title: '選擇字體大小',
    cancelable: true,
    buttons: [
      '大',
      '一般',
      '小',
      {
        label: '取消',
        icon: 'md-close'
      }
    ]
  }).then(function (index) { console.log('index: ', index) });
};

app.selectLanguage = function () {
  ons.openActionSheet({
    title: '選擇語言',
    cancelable: true,
    buttons: [
      '繁體中文',
      '简体中文',
      'English',
      {
        label: '取消',
        icon: 'md-close'
      }
    ]
  }).then(function (index) { console.log('index: ', index) });
};