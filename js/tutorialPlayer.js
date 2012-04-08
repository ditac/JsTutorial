if (typeof(Brihaspati) === 'undefined') {
    Brihaspati = {};
};

Brihaspati.TutorialPlayer = function(input) {
    var self = this;

    self.init = function() {
        self.steps = input.steps;
        self.duration = input.duration;
        self.helpPanel = input.helpPanel;
        self.stepIndex = 0;

        $(document).keydown(function(event) {
            if(event.keyCode == 112) {
                self.play();
            } else if(event.keyCode == 27){
                self.stop();
            }
        });
    };

    self.nextStep = function() {
        if(self.stepIndex < self.steps.length) {
            $('.active-input').removeClass('active-input');

            var selector = self.steps[self.stepIndex].getSelector();
            var instructions = self.steps[self.stepIndex].getInstructions();
            $(selector).addClass('active-input');
            self.helpPanel.getInstructionsDiv().html(instructions);

            self.helpPanel.show();
            self.stepIndex++;
        } else {
            self.stop();
        }
    };

    self.play = function() {
        self.stop();
        self.nextStep();
        self.interval = setInterval(function() { self.nextStep(); }, self.duration);
    };

    self.stop = function() {
        self.stepIndex = 0;
        $('.active-input').removeClass('active-input');
        self.helpPanel.hide();
        clearInterval(self.interval);
    };
    
    self.init();
};