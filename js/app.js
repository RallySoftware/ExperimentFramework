(function() {
  window.onload = function () {
    if (!util.isChrome()) {
      navigateTo.browser();
    }
    else if (!window.sessionStorage.acceptedWarning) {
      navigateTo.warning();
    }
    else if (!window.sessionStorage.securityToken) {
      navigateTo.login();
    }
  };
})();

