$(document).ready(function(){
    now.receiveMessage = function(name, message){
        $("#messages").append("<br>" + name + ": " + message);

        // scroll the div to the bottom
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    }

    // add in "enter" key press to trigger "send" click
    $("#chat-input").keyup(function(event){
        if(event.keyCode == 13){
            $("#send-button").click();
        }
    });

    // send the message then clear the text input
    $("#send-button").click(function(){
        now.distributeMessage($("#chat-input").val());
        $("#chat-input").val("");
    });

    $(".change").click(function(){
        now.changeRoom($(this).text());
    });

    now.name = prompt("What's your name?", "");
});