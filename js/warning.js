(function() {
  var onAcceptClick = function() {
    window.sessionStorage.acceptedWarning = true;
    _leavePage();
  };

  var _leavePage = function() {
    if (window.sessionStorage.securityToken) {navigateTo.app();}
    else {navigateTo.login();}
  }

  window.onload = function () {
    if (!util.isChrome()) {
      navigateTo.browser();
    }
    else if (window.sessionStorage.acceptedWarning) {
      _leavePage();
    }

    util.addClickListener('accept', onAcceptClick);
  };
})();

