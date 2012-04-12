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

BrihaspatiUtils.newSpinner = function() {
    return $('<div>').css({
        'background'    : 'none repeat scroll 0 0 #FFFFFF',
        'padding'       : '6px',
        'margin'        : '5px',
        'line-height'   : '14px',
        'font-size'     : '14px'
    }).append($('<img>').attr('src', 'images/spinner.gif').css({'margin-right': '8px', 'float' : 'left'}));
};

BrihaspatiUtils.getSelectorByElement = function(input) {
    if(!input) {
        return null;
    }

    var element = $(input);
    if(!element) {
        return null;
    }

    var tagName = $(element)[0].tagName;
    if(!tagName) {
        return null;
    }

    tagName = tagName.toLowerCase()

    if($(element).attr('name')) {
        return '[name=' + $(element).attr('name') + ']';
    } else if($(element).attr('id')) {
        return '#' + $(element).attr('id');
    } else if($(element).parent().children(tagName).length == 1) {
        var parentSelector = BrihaspatiUtils.getSelectorByElement($(element).parent());
        return parentSelector + '>' + tagName;
    } else if($(element).attr('class')) {
        var elementClass = $(element).attr('class');
        if($('.' + elementClass).length == 1) {
            return '.' + elementClass;
        } else {
            var counter = 0;
            var tmpReturn = '';
            $('.' + elementClass).each(function() {
                var data = $(this);
                if($(element)[0] == $(data)[0]) {
                    tmpReturn = '.' + $(element).attr('class') + ':eq(' + counter + ')';
                    return false;
                }
                counter++;
            });
            if(tmpReturn) {
                return tmpReturn;
            }
        }
    } else {
        var parentSelector = BrihaspatiUtils.getSelectorByElement($(element).parent());
        var counter = 0;
        var tmpReturn = '';
        $(parentSelector + '>' + tagName).each(function() {
            var data = $(this);
            if($(element)[0] == $(data)[0]) {
                tmpReturn = parentSelector + '>' + tagName + ':eq(' + counter + ')';
                return false;
            }
            counter++;
        });
        if(tmpReturn) {
            return tmpReturn;
        }
    }
    return null;
};

BrihaspatiUtils.getSelectorByPosition = function(x, y) {
    return BrihaspatiUtils.getSelectorByElement(document.elementFromPoint(x, y));
}

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
