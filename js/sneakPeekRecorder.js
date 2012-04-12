if (typeof(Brihaspati) === 'undefined') {
    Brihaspati = {};
};

Brihaspati.SneakPeekRecorder = function(input) {
    var self = this;

    self.init = function() {
        self.clientUrl = input.clientUrl;

        self.statusLabel = input.statusLabel;
        self.instructionBox = input.instructionBox;
        self.startButton = input.startButton;
        self.stopButton = input.stopButton;
        self.enterButton = input.enterButton;
        self.iframeContainer = input.iframeContainer;

        self.steps = [];
        self.currentStep = null;

        var encodedRecorderUrl = encodeURIComponent(window.location.href);
        var sneakPeakClientSource = jQuery.param.querystring(self.clientUrl, "recording=true&recorderUrl=" + encodedRecorderUrl);

        self.clientFrame = $('<iframe>')
            .addClass('sneakPeekClientFrame')
            .attr('src', sneakPeakClientSource)
            .appendTo(self.iframeContainer);

        self.startButton.click(self.onStart);
        self.stopButton.click(self.onStop);
        self.enterButton.click(self.onEnter);

        jQuery.receiveMessage(self.onReceiveMessage);
    };

    self.onStart = function() {
        self.statusLabel.html("Recording... Select an element");
        jQuery.postMessage('start', self.clientUrl, self.clientFrame.get(0).contentWindow);
    };

    self.onStop = function() {
        self.statusLabel.html("Press start");
        if (self.currentStep) {
            self.steps.push(self.currentStep);
        }

        jQuery.post("writeSteps.php", { string: JSON.stringify(self.steps)  }, function(data){});

        self.steps = [];
        self.currentStep = null;
        jQuery.postMessage('stop', self.clientUrl, self.clientFrame.get(0).contentWindow);
    };

    self.onEnter = function(){
        self.statusLabel.html("Recording... Select an element or Press Stop");
        if (self.currentStep) {
            self.currentStep['instruction'] = self.instructionBox.val();
            if(self.currentStep) {
                self.steps.push(self.currentStep);
            }
        }
        self.currentStep = null;
    };

    self.onReceiveMessage = function(e) {
        self.currentStep = {};
        self.currentStep['selector'] = e.data;
        self.statusLabel.html("Enter the instruction");
    };

    self.init();
};
