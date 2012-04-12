if (typeof(Brihaspati) === 'undefined') {
    Brihaspati = {};
};

Brihaspati.Tutorial = function(input) {
    var self = this;

    self.init = function() {
        self.isRecording = input.isRecording;

        self.duration = 1000;
        self.currentStep = 0;
        self.contents = null;
        self.interval = null;
        self.helpPanel = new Brihaspati.HelpPanel();

        $(document).keydown(function(event) {
            if(event.keyCode == 112) {
                self.showHelp();
                event.preventDefault();
            } else if(event.keyCode == 27){
                self.hideHelp();
                event.preventDefault();
            }
        });
    };

    self.showHelp = function() {
        self.helpPanel.show();

        self.loadContentsAndCallback(function() {
            self.nextStep();
            clearInterval(self.interval);
            self.interval = setInterval(function() { self.nextStep(); }, self.duration);
        });
    };

    self.hideHelp = function() {
        self.currentStep = 0;
        $('.active-input').removeClass('active-input');
        self.helpPanel.hide();
        clearInterval(self.interval);
    };

    self.loadContentsAndCallback = function(callback) {
        if(self.contents) {
            // Contents are already available. No need for another AJAX call
            // unless, we are recording, in which case the contents may be invalid
            if(!self.isRecording) {
                self.currentStep = 0;
                callback();
            }
        }

        jQuery.ajax({
            url: "help.php",
            type: 'GET',
            data: {
                id : self.id,
            },
            dataType: 'json',
            beforeSend: function() {
                self.helpPanel.showSpinner();
            },
            success: function(response) {
                self.helpPanel.hideSpinner();
                self.currentStep = 0;
                self.contents = response;
                callback();
            },
            failure: function(data) {
                // TODO: Show error
                self.hideSpinner();
            }
        });
    };

    self.nextStep = function() {
        if(self.currentStep < self.contents.length) {
            $('.active-input').removeClass('active-input');

            var selector = self.contents[self.currentStep].selector;
            var instruction = self.contents[self.currentStep].instruction;
            $(selector).addClass('active-input');
            self.helpPanel.getInstructionsDiv().html(instruction);

            self.currentStep++;
        } else {
            self.hideHelp();
        }
    };

    self.init();
};