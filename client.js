'use strict';
const WebSocketServer = require('ws').Server;
const WebRTC = require('webrtc-native');


const webrtcConfig = {};
const webrtcConstraints = {
    audio: true,
    video: true
};


const wss = new WebSocketServer({ port: 9999 });
console.log('WS server is listening on port 9999');

wss.on('connection', (ws) => {
  console.log('Peer Connected');
  
  var peer = new WebRTC.RTCPeerConnection(webrtcConfig, webrtcConstraints);
  
  ws.on('message', (msg) => {
    msg = JSON.parse(msg);

    switch (msg.type) {
      case 'disconnect':
        console.log('Peer Disconnected');
        peer.close();
        break;

      case 'icecandidate':
        if (msg.candidate && msg.candidate.sdpMid && msg.candidate.sdpMLineIndex) {
          peer.addIceCandidate(new WebRTC.RTCIceCandidate(msg.candidate));
        }
        break;

      case 'offer':
        console.log('Got an offer...', msg.offer);
        peer.setRemoteDescription(new WebRTC.RTCSessionDescription(msg.offer), function() {
          peer.createAnswer(function(sdp) {
            peer.setLocalDescription(sdp, function() {
              console.log('Sending an answer back...');
              ws.send(JSON.stringify({ type: 'answer', answer: sdp }));
            });
          });
        });
        break;

      // case 'answer':
      //   peer.setRemoteDescription(new WebRTC.RTCSessionDescription(msg.answer));
      //   break;
    }
  });
    
  peer.onicecandidate = function(event) {
    var candidate = event.candidate || event;
    ws.send(JSON.stringify({ type: 'icecandidate', candidate: candidate }));
  };
  
  peer.onaddstream = function(stream) {
    console.log('Peer: add mediaStream');
  };
  
  peer.onremovestream = function(stream) {
    console.log('Peer: remove mediaStream');
  };
  
  WebRTC.getUserMedia(webrtcConstraints, function(stream) {
    console.log('Sending Stream to Peer');
    peer.addStream(stream);
  });
});
