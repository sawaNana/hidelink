var HideLinkListener = function() {
   this.linkIsHidden = false;
   this.targetKey   = 65; // 'a'
   this.anchors;
};
HideLinkListener.prototype = {
   handleEvent : function(event) {
      if (event.type === 'keyup' || event.type === 'blur')
         this.keyReleased(event);
      else if (event.keyCode == this.targetKey && event.type === 'keydown') 
         this.keyPressed(event);
   },
   keyPressed : function(event) {
      if (this.linkIsHidden || event.altKey  || event.shiftKey || event.ctrlKey )
         return;
      this.linkIsHidden = true;
      this.anchors = document.getElementsByTagName('a');
      var i;
      for (i = 0; i < this.anchors.length; i++) {
         var href = this.anchors[i].href;
         this.anchors[i].setAttribute('data-href-cache', href);
         this.anchors[i].removeAttribute('href');
      }
   },
   keyReleased : function(event) {
      if (!this.linkIsHidden)
         return;
      var i;
      for (i = 0; i < this.anchors.length; i++) {
         var href = this.anchors[i].getAttribute('data-href-cache'); 
         this.anchors[i].setAttribute('href', href);
      }
      this.linkIsHidden = false;
   }
};
