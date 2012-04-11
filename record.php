<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script src="third-party/jQuery/jquery-1.7.1.min.js"></script>
		<script src="js/utils.js"></script>
		<script src="js/tutorial.js"></script>
		<script src="js/helpPanel.js"></script>
		<link rel="stylesheet" type="text/css" media="screen" href="css/help.css" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Tutorial Demo</title>
		<style>
			#webContainer{
				margin: 20px;
				width: 800px;
				height: 600px;	
			}
		</style>
		<script>
			$(document).ready(function(){
				$("#start").click(function(){
					$("#statusLabel").html("Recording, Select an element");
					$("#webContainer").get(0).contentWindow.postMessage("start", "http://127.0.0.1/brihaspati");
				});	
				$("#stop").click(function(){
					$("#statusLabel").html("Press start");

                    if(currentStep) {
                        steps.push(currentStep);
                    }
					$.post("writeSteps.php", { string: JSON.stringify(steps)  }, function(data){ alert(data); });
                    steps = [];
					$("#webContainer").get(0).contentWindow.postMessage("stop", "http://127.0.0.1/brihaspati");
				});	
				$("#Enter").click(function(){
					$("#statusLabel").html("Recording, Select an element or Press Stop");
                    if(currentStep) {
                        currentStep['instruction'] = $('#instr').val();
                        if(currentStep) {
                            steps.push(currentStep);
                        }
                    }
                    currentStep = null;
                });	
            });

            var steps = [];
            var currentStep = null;

            window.onmessage = function(e){
                currentStep = {};
                currentStep['selector'] = e.data;

                $("#statusLabel").html("Now Enter the instruction");
            }
        </script>
	</head>

	<body>
		<div id="statusLabel">Press Start</div>
		<form>
			<input id="start" type="Button" value="Start Recording">
			<input id="stop" type="Button" value="Stop Recording">
			<label>Enter Instruction:</label> 
			<input id="instr" type="text">
			<input id="Enter" type="Button" value="Enter">
		</form>
		<iframe src="index.html" id="webContainer"></iframe>
	</body>
</html>

