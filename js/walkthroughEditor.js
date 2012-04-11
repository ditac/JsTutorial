detectSelector = function(passedElement){
	var element = $(passedElement);
	var tagName = $(element)[0].tagName.toLowerCase();
	if($(element).attr('name')){
		return '[name='+$(element).attr('name')+']';
	} else if($(element).attr('id')){
		return '#'+$(element).attr('id');
	} else if($(element).parent().children(tagName).length == 1){
		var parentSelector = detectSelector($(element).parent());
		return parentSelector + '>' + tagName;
	} else if($(element).attr('class')){
		var elementClass = $(element).attr('class');
		if($('.'+elementClass).length == 1){
			return '.'+elementClass;
		} else {
			var counter = 0; var tmpReturn = '';
			$('.'+elementClass).each(function(){
				var data = $(this);
				if($(element)[0] == $(data)[0]){
					tmpReturn = '.' + $(element).attr('class') + ':eq(' + counter + ')';
					return false;
				} counter++;
			});
			if(tmpReturn){
				return tmpReturn;
			}
		}
	} else {
		var parentSelector = detectSelector($(element).parent());
		var counter = 0;
		var tmpReturn = '';
		$(parentSelector + '>' + tagName).each(function(){
			var data = $(this);
			if($(element)[0] == $(data)[0]){
				tmpReturn = parentSelector + '>' + tagName + ':eq(' + counter + ')';
				return false;
			} counter++;
		});
		if(tmpReturn){
			return tmpReturn;
		}
	}
};

function createSteps()
{
	$("body").bind("mousedown",onMouseDown);
}

var test = "";
function onMouseDown(event)
{
	var element = document.elementFromPoint(event.pageX,event.pageY); 	
	source.postMessage(detectSelector(element),"http://127.0.0.1/brihaspati");
}

var source;
window.onmessage = function (event)  
{  
	//Need to enable this piece.
	/*
	if (event.origin !== "http://example.org:8080")  
	return;  
	*/
	if(event.data == "start")
	{
		createSteps();	
		source = event.source;
	}
	else if(event.data == "stop")
	{
		$("body").unbind("mousedown",onMouseDown);
	}
}  



