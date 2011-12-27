nowjs-multiplayer-map
=====================

This is a simple test showing the multi-player map example from now.js
Being brand new to node.js, I found it tough to get it working (what is the HTML expected?, how do a serve a static javascript file? etc)

Hopefully this should help people who are new to node.js and now.js up and running quickly.

[now.js mutiplayer map] (http://nowjs.com/examples/map)

dependencies used
-----------------

In order to serve out the HTML, CSS and Javascript I am using the express web framework (http) combined with jade and stylus for html and css templating.

This project uses the package.json for depencies:

````javascript
  "dependencies": {
      "express": "2.5.2"
    , "stylus": ">= 0.0.1"
    , "jade": ">= 0.0.1"
    , "now": ">=0.7.4"
  }
````

Read about each dependency here:

[express] (http://expressjs.com)
[stylus] (http://learnboost.github.com/stylus)
[jade] (http://jade-lang.com)
[now] (http://nowjs.com)

basic installation
==================

Check out the project from github:

	git clone https://github.com/rockhowse/nowjs-multiplayer-map.git
	
Install dependencies using [npm](http://npmjs.org):

	cd mowjs-multiplayer-map
	npm i


* note for windows installation

run the example
---------------

Server:
	cd nowjs-mutiplayer-map
	node app.js

Client:
	Open browser of choice (Chrome!):
	http://localhost:3000
	Move the dot around the map
	
	Open another browser of choice (Firefox!):
	http://localhost:3000
	Move the dot around the map, and you should see it update in both browsers

-rOcK



