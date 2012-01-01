
// interval used to run bot logic
var moveInterval;

// starts the bot loop
function turnOnAutoPilot() {
    moveInterval=setInterval(runbot, 500);
}

// stops the bot loop
function turnOffAutoPilot() {
    clearInterval(moveInterval);
}

// run the bot code
function runbot() {
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