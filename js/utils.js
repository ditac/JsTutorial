if (typeof (BrihaspatiUtils) == 'undefined') {
    // BrihaspatiUtils contains miscellaneous utility methods
    BrihaspatiUtils = {};

    // jQuery Improvements
    $(function(){
        // The case-insensitive variant of jQuery :contains selector
        jQuery.expr[':'].containsIgnoreCase = function(a,i,m){
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
        };
    });
};

/**
 * Helper method to create elements from HTML strings.
 */
BrihaspatiUtils.toElement = (
    function(){
        var div = document.createElement('div');
        return function(html){
            div.innerHTML = html;
            var element = div.firstChild;
            div.removeChild(element);
            return element;
        };
})();

BrihaspatiUtils.newForm = function() {
    var form = BrihaspatiUtils.toElement("<form style= 'display:none'"
        + " enctype= 'multipart/form-data'"
        + " encoding= 'multipart/form-data'"
        + " method= 'POST'"
        + " target= '" + self.targetFrameName + "'"
        + " action= '" + self.actionURL + "'"
        + "></form>");
    return form;
};

BrihaspatiUtils.newFrame = function() {
    // This has to be written this way for it to work in IE
    // "name" and "id" should be same (to overcome bug in IE)
    var id = BrihaspatiUtils.IdGenerator.generate();
    var frame = BrihaspatiUtils.toElement("<iframe src='javascript:false;'"
        + " id= '" + id + "'"
        + " name= '" + id + "'"
        + " style= 'display:none'"
        + "></iframe>");
    return frame;
};

BrihaspatiUtils.IdGenerator = new function() {
    var self = this;

    self.init = function() {
        self.counter = 0;
    };

    self.generate = function() {
        self.counter = self.counter + 1;
        return 'generated-element-' + self.counter.toString();
    };

    self.init();
};
