if (typeof(Brihaspati) === 'undefined') {
    Brihaspati = {};
};

Brihaspati.SneakPeekClient = function(input) {
    var self = this;

    self.init = function() {
        self.recorderUrl = input.recorderUrl;

        jQuery.receiveMessage(function(e) {
            if (e.data == 'start') {
                $('body').bind('mousedown.brihaspati', function(event) {
                    var selector = BrihaspatiUtils.getSelectorByPosition(event.pageX, event.pageY);
                    if(selector != null) {
                        jQuery.postMessage(selector, self.recorderUrl);
                    }
                });
            } else {
                $('body').unbind('mousedown.brihaspati');
            }
        });
    };

    self.init();
};