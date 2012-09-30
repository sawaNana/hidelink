module('HideLinkListener');

test('hideLink() -> hide all href', function() {
    var listener    = new HideLinkListener();
    var linkAnchors = $('a[href]');
    ok(linkAnchors.length > 0, 'document has some links!');

    var hrefs = [];

    listener.hideLink();
    linkAnchors.each(function(index, value) {
        hrefs[index] = value;
    });

    linkAnchors.each(function(index, value) {
        ok(!value.getAttribute('href'), 'link is hidden.');
    });

    listener.resetLink();
    linkAnchors.each(function(index, value) {
        ok(value.href == hrefs[index], 'link was turned back.');
    });

});
test('on \'a\' key down -> call hideLink() and on release -> call resetLink',
    function() {
        var listener   = new HideLinkListener();
        var hiddenFlag = false;

        listener.hideLink = function() {
            hiddenFlag = true;
        };
        listener.resetLink = function() {
            hiddenFlag = false;
        };

        var mockPressedEvent = { 'keyCode' : listener.targetKey, 'type' : 'keydown' };
        listener.handleEvent(mockPressedEvent);
        ok(hiddenFlag === true, 'if \'a\' key is pressed, call \'hideLink\'');

        var mockUpEvent = {'type' : 'keyup' };
        listener.handleEvent(mockUpEvent);
        ok(hiddenFlag === false, 'if \'a\' key is up, call \'resetLink\'');

        listener.handleEvent(mockPressedEvent);
        ok(hiddenFlag === true, 'if \'a\' key is pressed, call \'hideLink\'');

        var mockBlurEvent = {'type' : 'blur' };
        listener.handleEvent(mockBlurEvent);
        ok(hiddenFlag === false, 'if lost window focus, call \'resetLink\'');
});

