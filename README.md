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

    [express] (http://expressjs.com) - web framework for node.js
    [jade] (http://jade-lang.com) - html templates
    [stylus] (http://learnboost.github.com/stylus) - css templates
    [now] (http://nowjs.com) - allows RMI and real time data push between clients

basic installation
==================

Check out the project from github:

	git clone https://github.com/rockhowse/nowjs-multiplayer-map.git
	
Install dependencies using [npm](http://npmjs.org):

	cd mowjs-multiplayer-map
	npm i


* note for windows installation

If you do the command:

    C:\<path-to-project>\nowjs-multiplayer-map\npm i

You will most likely get an error with node-proxy as shown below:

    npm WARN node-proxy@0.5.2 package.json: bugs['web'] should probably be bugs['url']
    > node-proxy@0.5.2 install C:\<path-to-project>\nowjs-multiplayer-map\node_modules\now\node_modules\node-proxy
    > make
    'make' is not recognized as an internal or external command,
    operable program or batch file.
    npm ERR! error installing node-proxy@0.5.2
    npm ERR! error installing now@0.7.6
    npm ERR! error rolling back now@0.7.6 Error: UNKNOWN, unknown error 'C:\<path-to-project>\nowjs-multiplayer-map\node_modules\now\node_modules\___socket.io.npm\package\lib\transports\websocket'
    npm ERR! node-proxy@0.5.2 install: `make`
    npm ERR! `cmd "/c" "make"` failed with 1
    npm ERR!
    npm ERR! Failed at the node-proxy@0.5.2 install script.
    npm ERR! This is most likely a problem with the node-proxy package,
    npm ERR! not with npm itself.
    npm ERR! Tell the author that this fails on your system:
    npm ERR!     make
    npm ERR! You can get their info via:
    npm ERR!     npm owner ls node-proxy
    npm ERR! There is likely additional logging output above.

This has something to do with running node-proxy in native mode on windows instead of through cygwin.

now.js has a post detailing how to remedy this [here] (http://blog.nowjs.com/running-nowjs-natively-on-windows)

Basically you do the following:

    1. Install node.exe and NPM for Windows and make sure all your paths are correct
    2. Install Microsoft Visual C++ Runtime (4.8 MB)
    3. Download the NowJS Windows branch zip
    4. Rename `Flotype-now-XXXXXX` to `now` and put that in your node_modules folder

    * note * at this point you should already have an existing "now" folder inside node_modules.
    Overwrite it completely with the files from the .zip

    * note * the original instructions include the following

        or `git clone git://github.com/Flotype/now.git` and `git checkout windows`

    This works fine but if you are new to git and using different branches, the .zip method is probably the easiest.

run the example
---------------

Server:

	>cd nowjs-mutiplayer-map
	>node app.js
    Express server listening on port 3000 in development mode

    After people have been moving around a bit you should see something similar in the logs:

    user connected: 1821796301114701902
    user: 1821796301114701902 moved to (0, 0)
    user: 1821796301114701902 moved to (0, -5)
    user: 1821796301114701902 moved to (0, -10)

Client:

	Open browser of choice (Chrome!):
	http://localhost:3000
	Move the dot around the map
	
	Open another browser of choice (Firefox!):
	http://localhost:3000
	Move the dot around the map, and you should see it update in both browsers

I hope this helps someone else get the mutliplayer-map demo working off of nowjs faster than it took me =)
There are a lot of steps and things to learn when starting out with node.js. I am going to be posting a
step-by-step walkthrough on how I built the project on my [blog] (http://www.rockhowse.com).

-rOcK



