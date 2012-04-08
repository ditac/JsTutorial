if (typeof(Brihaspati) === 'undefined') {
    Brihaspati = {};
};

Brihaspati.TutorialStep = function(input) {
    var self = this;

    self.init = function() {
        self.selector = input.selector;
        self.instructions = input.instructions;
    };

    self.getSelector = function() {
        return self.selector;
    };

    self.getInstructions = function() {
        return self.instructions;
    };

    self.init();
};