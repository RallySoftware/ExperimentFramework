(function() {
  var onLoginClick = function() {
    var id = document.getElementsByName('login')[0].value,
        pw = document.getElementsByName('password')[0].value;

    $.ajax({
      url: 'https://rally1.rallydev.com/slm/webservice/v2.0/security/authorize',
      type: 'GET',
      dataType: 'json',

      xhrFields: {
        withCredentials: true
      },

      beforeSend: function (xhr) {
        var auth = btoa(id + ':' + pw);

        xhr.setRequestHeader("Authorization", "Basic " +  auth);
        xhr.setRequestHeader("X-Requested-By", "Rally");
        xhr.setRequestHeader("X-RallyIntegrationName", 'Rally Experiment Framework');
      },

      success: function (data, status, xhr) {
        if (data.OperationResult.Errors.length > 0) {
          return false;
        }

        _setUsername(id);
        _setSecurityToken(data.OperationResult.SecurityToken);

        _goToApp();
      },

      error: function (xhr, errorType, error) {
        return false;
      }
    });
  };

  var _setUsername = function(username) {
    window.sessionStorage.setItem('username', username ? username : '');
  };
  var _setSecurityToken = function(token) {
    window.sessionStorage.setItem('token', token ? token : '');
  };
  var _goToApp = function() {
    window.location.href = 'index.html';
  };

  window.onload = function () {
    if (window.sessionStorage.token) {
      _goToApp();
    }
    else {
      document.getElementsByName('submit')[0].addEventListener('click', onLoginClick);
    }
  };
})();

