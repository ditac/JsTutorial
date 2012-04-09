<?php

$myFile = "tutorialSteps.json";
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh, $_POST["string"]);
fclose($fh);

?>

