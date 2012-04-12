<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <script src="third-party/jquery/jquery-1.7.1.min.js"></script>
        <script src="third-party/jquery-plugins/postmessage.min.js"></script>
        <script src="third-party/jquery-plugins/bbq.min.js"></script>

        <script src="js/utils.js"></script>
        <script src="js/tutorial.js"></script>
        <script src="js/helpPanel.js"></script>
        <script src="js/sneakPeekRecorder.js"></script>

        <link rel="stylesheet" type="text/css" media="screen" href="css/recorder.css" />

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Tutorial Recorder</title>
    </head>

    <body>
        <div id="statusLabel">Press Start</div>
        <form>
            <input id="start" type="Button" value="Start Recording">
            <input id="stop" type="Button" value="Stop Recording">
            <label>Enter Instruction:</label> 
            <input id="instr" type="text">
            <input id="enter" type="Button" value="Enter">
        </form>
        <div id="iframeContainer"></div>
    </body>
    <script>
        $(document).ready(function(){
            new Brihaspati.SneakPeekRecorder({
                clientUrl : 'http://localhost/brihaspati',

                statusLabel : $('#statusLabel'),
                instructionBox : $('#instr'),
                startButton : $('#start'),
                stopButton : $('#stop'),
                enterButton : $('#enter'),
                iframeContainer : $('#iframeContainer')
            });
        });
    </script>
</html>