$(document).ready(function(){
    now.receiveMessage = function(name, message){
        $("#messages").append("<br>" + name + ": " + message);
    }

    $("#send-button").click(function(){
        now.distributeMessage($("#chat-input").val());
        $("#chat-input").val("");
    });

    $(".change").click(function(){
        now.changeRoom($(this).text());
    });

    now.name = prompt("What's your name?", "");
});