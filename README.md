# webrtc-native-client

Simple nodejs WebRTC client based on webrtc-native module with WebSockets interface.

### Usage

Run `node client.js` command which will start WS server (by default on 9999 port).

### Supported commands

Server accepts the following JSON serialized messages:

To send an offer:
```
{
  type: 'offer',
  offer: <SDP>
}
```

To close connection:
```
{
  type: 'disconnect'
}
```

To send ICE candidate:
```
{
  type: 'icecandidate',
  candidate: <CANDIDATE>
}
```

### Outgoing messages

Once offer received answer is sent back:
```
{
  type: 'answer',
  answer: <SDP>
}
```

ICE candidate:
```
{
  type: 'icecandidate',
  candidate: <CANDIDATE>
}
```
