#webrtc4two 
A framework for P2P communication using webRTC and Socket IO. Purpose is to make web-based P2P communication easily implemented.

## Installation
```bash
 npm install webrtc4two
```

## Getting started

### Starting the server
```bash
node app.js
```

### Opening the sample client
Use chrome and browse to http://localhost:3303/pc.html (note: you will need two clients to test this sample). Then, follow the screen to start the communication session.

## API
### Method
webcomm.start() // start local media stream
webcomm.call() // call anyone in the room
webcomm.hangup() // hangup call

### Properties
webcomm.url // web socket url
webcomm.room // name of the room to join

### Events
webcomm.onStart(function(){
	//your callback code
});

webcomm.onCall(function(){
	//your callback code
});

webcomm.onHangup(function(){
	//your callback code
});

webcomm.ongotStream(function(){
	//your callback code
});

## Example code

```html
<!DOCTYPE html>
<html>
<head>
<title>PeerConnection Demo 1</title>
<!-- Load the polyfill to switch-hit between Chrome and Firefox -->
<script src="lib/webrtc-adapter/js/adapter.js"></script>
<style>
video {
  border:5px solid black;
  width:480px;
  height:360px;
}
button {
  font: 18px sans-serif;
  padding: 8px;
}
textarea {
  font-family: monospace;
  margin: 2px;
  width:480px;
  height:640px;
}
</style>
</head>
<body>
<video id="vid1" autoplay="true" muted="true"></video>
<video id="vid2" autoplay></video>
<br>
<button id="btn1" onclick="webcomm.start()">Start</button>
<button id="btn2" onclick="webcomm.call()">Call</button>
<button id="btn3" onclick="webcomm.hangup()">Hang Up</button>
<br>
<xtextarea id="ta1"></textarea>
<xtextarea id="ta2"></textarea>
<script src="/socket.io/socket.io.js"></script>
<script src="lib/webcomm/js/webcomm-1.0.js"></script>

<script>
btn1.disabled = false;
btn2.disabled = true;
btn3.disabled = true;

webcomm.url='http://localhost:3303';
webcomm.room='default';
webcomm.onStart(function(){
	trace("Requesting local stream");
	btn1.disabled = true;
});
webcomm.onCall(function(){
  btn2.disabled = true;
  btn3.disabled = false;
  trace("Starting call");
});
webcomm.onHangup(function(){
  trace("Ending call");	
  btn3.disabled = true;
  btn2.disabled = false;
});
webcomm.ongotStream(function(){
	btn2.disabled = false;
});


</script>
</body>
</html>
```

##Dependencies
webrtc4two uses adapter.js, socket.io and express.

###Client

* adapter.js from: [https://code.google.com/p/webrtc/source/browse/stable/samples/js/base/adapter.js](https://code.google.com/p/webrtc/source/browse/stable/samples/js/base/adapter.js)

###Server

* socket.io from: [https://github.com/LearnBoost/socket.io](https://github.com/LearnBoost/socket.io)
* express from: [https://github.com/visionmedia/express](https://github.com/visionmedia/express)

##License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)