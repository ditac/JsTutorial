<?php
$myFile = "help/index.json";
$fh = fopen($myFile, 'w') or die("Can't open file");
fwrite($fh, $_POST["string"]);
fclose($fh);
?>