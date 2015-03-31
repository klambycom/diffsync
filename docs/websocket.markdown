

<!-- Start src/websocket.js -->

# Websocket(socket, doc)

This function is called edits (TODO) because takes the diffs and create
"edits" to send to the server.

### Params:

**Socket.io** *socket* 
**JSONDocument** *doc* 
**EventEmitter** *eventemitter* Optional

## sendDiff()

Send diff to clients/server

### Return:

* **als** if there is no diff, else true

## eventemitter

EventEmitter

### Events:

* diff
* patch
* update

<!-- End src/websocket.js -->

