<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script src="jquery-1.7.1.min.js"></script>
		<script src="js/utils.js"></script>
		<script src="js/tutorialPlayer.js"></script>
		<script src="js/tutorialStep.js"></script>
		<script src="js/helpPanel.js"></script>
		<link rel="stylesheet" type="text/css" media="screen" href="css/help.css" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Tutorial Demo</title>
		<style>
			#webContainer{
				margin: 20px;
				width: 800px;
				height: 800px;	
			}
		</style>
		<script>
			$(document).ready(function(){
				$("#start").click(function(){
					$("#statusLabel").html("Recording, Select an element");
					$("#webContainer").get(0).contentWindow.postMessage("start","http://127.0.0.1");
				});	
				$("#stop").click(function(){
					$("#statusLabel").html("Press start");
					$.post("writeSteps.php", { string: test  },
					function(data){
						alert(data);
					});


					$("#webContainer").get(0).contentWindow.postMessage("stop","http://127.0.0.1");
				});	
				$("#Enter").click(function(){
					$("#statusLabel").html("Recording, Select an element or Press Stop");
					test = test +"instructions: '" + $("#instr").val() + "'})"
			});	
		});
		var test ="";

		window.onmessage = function(e){				
			if(test.length > 0)
			{
				test = test + ",";
			}
			test = test + "new Brihaspati.TutorialStep({ selector:'"; 
				test = test + e.data + "' ,";

				$("#statusLabel").html("Now Enter the instruction");
			}
		</script>
	</head>

	<body>
		<div id="statusLabel"> Press Start </div>
		<form>
			<input id="start" type="Button" value="Start Recording">
			<input id="stop" type="Button" value = "Stop Recording">
			<label> Enter Instruction: </label> 
			<input id="instr" type="text">
			<input id="Enter" type="Button" value = "Enter">
		</form>
		<iframe src="test.php" id="webContainer"></iframe>
	</body>
</html>

