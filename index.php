<!DOCTYPE HTML>
<html lang="en">
    <head>
        <meta charset=utf-8>
        <title>Demo</title>
        <script src="third-party/jQuery/jquery-1.7.1.min.js"></script>
        <script src="third-party/jquery-plugins/postmessage.min.js"></script>
        <script src="third-party/jquery-plugins/bbq.min.js"></script>

        <script src="js/utils.js"></script>
        <script src="js/tutorial.js"></script>
        <script src="js/helpPanel.js"></script>

        <? if(isset($_GET) && isset($_GET["recording"]) && $_GET["recording"] === "true") { ?>
            <script src="js/sneakPeekClient.js"></script>
        <? } ?>

        <link rel="stylesheet" type="text/css" media="screen" href="css/help.css" />
    </head>
    <body>
        <form>
            <input id="username" type="Text">
            <input id="login" type="Button" value="Login">
        </form>
        <script>
            <? if(isset($_GET) && isset($_GET["recording"]) && isset($_GET["recorderUrl"]) && $_GET["recording"] === "true") { ?>
                new Brihaspati.Tutorial({
                    isRecording : true
                });
                new Brihaspati.SneakPeekClient({
                    recorderUrl : decodeURIComponent('<? echo $_GET["recorderUrl"] ?>')
                });

                // Basic highlighting
                // TODO: Code cleanup
                // TODO: Firebug style highlighting
                // TODO: Highlight only while recoding
                $('body').mousemove(function(e) {
                    var selector = BrihaspatiUtils.getSelectorByPosition(e.pageX, e.pageY);
                    if(selector != null) {
                        $('.brihaspati-highlighted').removeClass('brihaspati-highlighted');
                        if(! $(selector).hasClass('brihaspati-selected')) {
                            $(selector).addClass('brihaspati-highlighted');
                        }
                    }
                });
                $('body').click(function(e) {
                    var selector = BrihaspatiUtils.getSelectorByPosition(e.pageX, e.pageY);
                    if(selector != null) {
                        $('.brihaspati-selected').removeClass('brihaspati-selected');
                        $(selector).addClass('brihaspati-selected');
                    }
                });
            <? } else { ?>
                new Brihaspati.Tutorial({
                    isRecording : false
                });
            <? } ?>
            </script>
    </body>
</html>