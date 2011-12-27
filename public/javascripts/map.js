var context;
var viewport = {
  width: 500,
  height: 400,
  x: 0,
  y: 0
}

$(document).ready(function() {
  context = $('#map')[0].getContext('2d');
    console.log("setting up map")
      $(document).keydown( function(e) {
        console.log("key pressed:" + e)
        e.preventDefault();
        switch(e.which) {
          //left
          case 37:
            viewport.x -= 5;
            now.updateActor(viewport.x, viewport.y);
            break;
          //right
          case 39:
            viewport.x += 5;
            now.updateActor(viewport.x, viewport.y);
            break;
          //up
          case 38:
            viewport.y -= 5;
            now.updateActor(viewport.x, viewport.y);
            break;
          //down
          case 40:
            viewport.y += 5;
            now.updateActor(viewport.x, viewport.y);
            break;
        }
  });

  now.ready(function() {
    now.updateActor(viewport.x, viewport.y);
  });
});

now.drawActors = function(actors) {  
  context.clearRect(0, 0, 500, 400);
  context.beginPath();

  for(var i in actors) {
    if(i == now.core.clientId) {
      context.fillStyle = 'red';
      context.fillRect(viewport.width / 2 + actors[i].x - viewport.x, viewport.height / 2 + actors[i].y - viewport.y, 5, 5);
      for (var x = -actors[i].x % 40; x < 500; x += 40) {
        context.moveTo(x, 0);
        context.lineTo(x, 400);
      }
      for (var y = -actors[i].y % 40; y < 400; y += 40) {
        context.moveTo(0, y);
        context.lineTo(500, y);
      }
      context.strokeStyle = "#eee";
      context.stroke();   
    } else {
      context.fillStyle = 'black';
      context.fillRect(viewport.width / 2 + actors[i].x - viewport.x, viewport.height / 2 + actors[i].y - viewport.y, 5, 5);
    }
  }
}