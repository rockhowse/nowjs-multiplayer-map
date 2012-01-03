
// interval used to run bot logic
var moveInterval;
// interval used to chat the bot
var chatInterval;

var chatPhrases = ['Lolz!', 'Can\'t catch me noob', 'I used to be a bot like you until I took an arrow in the knee', 'Meep! Meep!'];

// starts the bot loop
function turnOnAutoPilot() {
    moveInterval=setInterval(moveBot, 500);
    chatInterval=setInterval(chatbot, 5000);
}

// stops the bot loop
function turnOffAutoPilot() {
    clearInterval(moveInterval);
    clearInterval(chatInterval);
}

// run the bot code
function moveBot() {
    var whichDirection=Math.floor(Math.random()*4);

    var e = jQuery.Event("keydown");

    switch(whichDirection) {
        case 1:
            e.which = 37; // left
            break;
        case 2:
            e.which = 39; // right
            break;
        case 3:
            e.which = 38; // up
            break;
        case 4:
            e.which = 40; // down
            break;
    }

    $(document).trigger(e);
}

// run the bot's chat function
function chatbot() {
    var whichPhrase=Math.floor(Math.random()*chatPhrases.length)-1;

    $('#chat-input').val(chatPhrases[whichPhrase]);
    $("#send-button").trigger('click');
}

// configure bot button presses
$(document).ready(function() {
    // set up bot buttons
    $("#startBot").click(function() {
        turnOnAutoPilot();
    });

    $("#stopBot").click(function() {
       turnOffAutoPilot();
    });
})