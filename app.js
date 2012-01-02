
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , nowjs = require('now')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// nowjs setup
var everyone = nowjs.initialize(app);

var actors = [];

// what happens on connect
nowjs.on('connect', function() {
    // map setup
    actors[this.user.clientId] = {x: 0, y: 0};
    console.log("user connected: " + this.user.clientId);

    // chat room setup
    this.now.room = "room 1";
    nowjs.getGroup(this.now.room).addUser(this.user.clientId);
    console.log(this.user.clientId + " joined: " + this.now.name);
});

// what happens on disconnect
nowjs.on('disconnect', function() {
    for(var i in actors) {
        if(i == this.user.clientId) {
            delete actors[i];
            console.log(this.user.clientId + " left: " + this.now.name);
            break;
        }
    }
});

// when an actor updates here is what happens
everyone.now.updateActor = function(x, y) {
    console.log("user: " + this.user.clientId + " moved to ("+ x + ", " + y + ")");
    actors[this.user.clientId].x = x;
    actors[this.user.clientId].y = y;
    var toUpdate = {};
    for(var i in actors) {
        if(Math.abs(x - actors[i].x) < 310 && Math.abs(y - actors[i].y) < 210) {
            toUpdate[i] = {x: actors[i].x, y: actors[i].y};
        }
    }
    for(var i in toUpdate) {
        nowjs.getClient(i, function(err) {
            this.now.drawActors(toUpdate);
        });
    }
}

// when a user changes group, lets show it
everyone.now.changeRoom = function(newRoom){
    nowjs.getGroup(this.now.room).removeUser(this.user.clientId);
    nowjs.getGroup(newRoom).addUser(this.user.clientId);
    this.now.room = newRoom;
    this.now.receiveMessage("SERVER", "You're now in " + this.now.room);
}

// make sure to send chat where it's needed
everyone.now.distributeMessage = function(message){
    nowjs.getGroup(this.now.room).now.receiveMessage(this.now.name, message);
};