<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script src="jquery-1.7.1.min.js"></script>
		<script src="js/utils.js"></script>
		<script src="js/tutorialPlayer.js"></script>
		<script src="js/tutorialStep.js"></script>
		<script src="js/helpPanel.js"></script>
		<script src="js/walkthroughEditor.js"></script>
		<link rel="stylesheet" type="text/css" media="screen" href="css/help.css" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Tutorial Demo</title>
	</head>

	<body>
		<script>
			var tutorialPlayer = new Brihaspati.TutorialPlayer({
				duration: 3000,
				steps : [
				<?php
				$section = file_get_contents('tutorialSteps.json');
				print $section;
				?>
				],
				helpPanel: new Brihaspati.HelpPanel()
			});
		</script>

		<form>
			<input id="amount" type="Text">
			<input id="transfer" type="Button" value="Transfer">
		</form>

	</body>
</html>

