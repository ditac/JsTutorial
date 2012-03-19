Tutorial = function(input) {
    var self = this;

    self.init = function() {
        self.steps = input.tutorialSteps;
        self.timeouts = new Array();
        
        self.overlay = $('<div>').attr('id', 'overlay').css({
            height: "1000px",
            left: "0",
            opacity: "0.5",
            position: "fixed",
            top: "0",
            width: "2000px",
            'z-index': "1000",
            'background-color': "#666"
        });

        self.label = $('<div>').css({
            left: "100px",
            position: "fixed",
            top: "200px",
            "font-size": "2em",
            "color": "#FF0000",
            'z-index': "2000"
        });

        $(document).keydown(function(event) {
            // Gray out the page.
            if(event.keyCode == 112) {
                self.showTutorial();
                event.preventDefault();
            } else if(event.keyCode == 27){
                self.hideTutorial();
                event.preventDefault();
            }
        });
    };

    self.showTutorial = function() {
        self.hideTutorial();
        $('body').append(self.overlay);
        $('body').append(self.label);
        self.play(0)();
    };

    self.play = function(index) {
        return function() {
            if(index < self.steps.length) {
                self.steps[index].play(self.label, self.overlay);
                var timeout = setTimeout(function() {
                    self.steps[index].stop(self.label, self.overlay);
                    self.play(index + 1)();
                }, 3000);
                self.timeouts.push(timeout);
            } else {
                self.hideTutorial();
            }
        };
    }

    self.hideTutorial = function() {
        for(var i in self.timeouts) {
            clearTimeout(self.timeouts[i]);
        }
        self.timeouts = [];
        self.label.detach();
        self.overlay.detach();
    };

    self.init();
};

TutorialStep = function(input) {
    var self = this;

    self.init = function() {
        self.selector = input.selector;
        self.text = input.text;
    };

    self.play = function(label, overlay) {
        overlay.detach();
        $(self.selector).css({'z-index': '3000', 'position' : 'relative'});
        label.html(self.text);
        overlay.appendTo('body');
    };

    self.stop = function(label, overlay) {
        overlay.detach();
        $(self.selector).css({'z-index': '0'});
        label.html('');
        overlay.appendTo('body');
    }

    self.init();
};