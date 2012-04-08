/*
This script which teaches you how to use websites is named after
Brihaspati, the teacher of GODs in Indian mythology.
*/
if (typeof(Brihaspati) === 'undefined') {
    Brihaspati = {};
};

Brihaspati.HelpPanel = function(input) {
    var self = this;

    self.init = function() {
        // TODO: Make this resizable (with jQuery 1.8)
        self.helpSlider = $('<div>').addClass('help-slider');
        self.helpOverlay = $('<div>').addClass('help-overlay');

        self.helpInstructions = $('<div>').html('Instructions');
        self.helpDemo = $('<div>').html('Demo');
        
        self.helpTable = $('<table>').addClass('help-table').append(
            $('<thead>').append($('<tr>')
                .append($('<th width="50%">Instructions</th>'))
                .append($('<th width="50%">Demo</th>'))
            )
        ).append(
            $('<tbody>').append($('<tr>')
                .append($('<td>').append(self.helpInstructions))
                .append($('<td>').append(self.helpDemo))
            )
        );

        self.helpSlider.append(self.helpTable);
        $('body').append(self.helpSlider);
    };

    self.hide = function() {
        self.helpOverlay.detach();
        self.helpSlider.slideUp('fast');
    };

    self.show = function() {
        $('body').append(self.helpOverlay);
        self.helpSlider.slideDown('fast');
    };

    self.getInstructionsDiv = function() {
        return self.helpInstructions;
    };

    self.getDemoDiv = function() {
        return self.helpDemo;
    };

    self.init();
};
