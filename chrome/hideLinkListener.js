var HideLinkListener = function() {
   this.linkIsHidden = false;
   this.targetKey   = 65; // 'a'
   this.anchors;
};
HideLinkListener.prototype = {
   handleEvent : function(event) {
      if (this.linkIsHidden && (event.type === 'keyup' || event.type === 'blur'))
         this.resetLink();
      else if (event.keyCode == this.targetKey && event.type === 'keydown' 
      	&& !(this.linkIsHidden || event.altKey  || event.shiftKey || event.ctrlKey )
         this.hideLink();
   },
   hideLink : function() {
      this.linkIsHidden = true;
      this.anchors = document.getElementsByTagName('a');
      var i;
      for (i = 0; i < this.anchors.length; i++) {
         var href = this.anchors[i].href;
	 if (typeof href === 'undefined')
	      continue;
         this.anchors[i].setAttribute('data-hidelink-href-cache', href);
         this.anchors[i].removeAttribute('href');
      }
   },
   resetLink : function() {
      var i;
      for (i = 0; i < this.anchors.length; i++) {
         var href = this.anchors[i].getAttribute('data-hidelink-href-cache'); 
	 if (typeof href === 'undefined')
	      continue;
         this.anchors[i].setAttribute('href', href);
      }
      this.linkIsHidden = false;
   }
};
