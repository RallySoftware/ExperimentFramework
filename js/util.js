(function() {
  util = {
    isChrome: function() {
      return window.chrome && window.navigator.vendor === 'Google Inc.';
    },
    addClickListener: function(name, listener) {
      var button = document.getElementsByName(name)[0];
      if (button) {button.addEventListener('click', listener);}
    }
  };
})();
