(function() {
  var onAcceptClick = function() {
    if (window.sessionStorage.securityToken) {navigateTo.app();}
    else {navigateTo.login();}
  };

  window.onload = function () {
    if (!util.isChrome()) {
      navigateTo.browser();
    }

    util.addClickListener('accept', onAcceptClick);
  };
})();

