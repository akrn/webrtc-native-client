# webrtc-native-client

Simple nodejs WebRTC client based on webrtc-native module with WebSockets interface.

### Usage

Run `node client.js` command which will start WS server (by default on 9999 port).

### Supported commands

Server accepts the following JSON serialized messages:

To send an offer:
```json
{
  type: 'offer',
  offer: <SDP>
}
```

To close connection:
```json
{
  type: 'disconnect'
}
```

To send ICE candidate:
```json
{
  type: 'icecandidate',
  candidate: <CANDIDATE>
}
```

### Outgoing messages

Once offer received answer is sent back:
```json
{
  type: 'answer',
  answer: <SDP>
}
```

ICE candidate:
```json
{
  type: 'icecandidate',
  candidate: <CANDIDATE>
}
```