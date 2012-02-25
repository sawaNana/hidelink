(function() {
   var keyListener = new HideLinkListener();
   window.addEventListener('keydown', keyListener, false);
   window.addEventListener('keyup',   keyListener, false);
   window.addEventListener('blur',    keyListener, false);
})();
