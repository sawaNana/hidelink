var HideLinkListener = function() {
   this.linkIsHidden = false;
   this.targetKey    = 65; // 'a'
};
HideLinkListener.prototype = {
   handleEvent : function(event) {
      if (this.linkIsHidden && (event.type === 'keyup' || event.type === 'blur'))
         this.resetLink();
      else if (event.keyCode == this.targetKey && event.type === 'keydown' 
      	&& !(this.linkIsHidden || event.altKey  || event.shiftKey || event.ctrlKey ) )
         this.hideLink();
   },
   hideLink : function() {
      this.linkIsHidden = true;
      this.anchors = document.querySelectorAll('a[href]');
      var i, href;
      var length = this.anchors.length;
      for (i = 0; i < length; i++) {
         href = this.anchors[i].getAttribute('href');
         this.anchors[i].setAttribute('data-hidelink-href-cache', href);
         this.anchors[i].removeAttribute('href');
      }
   },
   resetLink : function() {
      var i, href;
      var length = this.anchors.length;
      for (i = 0; i < length; i++) {
         href = this.anchors[i].getAttribute('data-hidelink-href-cache'); 
         this.anchors[i].setAttribute('href', href);
         this.anchors[i].removeAttribute('data-hidelink-href-cache');
      }
      this.linkIsHidden = false;
   }
};
