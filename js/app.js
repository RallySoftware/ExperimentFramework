(function() {
  window.onload = function () {
    if (!util.isChrome()) {
      navigateTo.browser();
    }
    else if (!window.sessionStorage.securityToken) {
      navigateTo.login();
    }
  };
})();

