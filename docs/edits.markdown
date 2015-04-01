

<!-- Start src/edits.js -->

# edits(socket, doc)

This function is called edits because takes the diffs and create
"edits" to send to the server. But this is all code shared by both server
and client, so maybe it's not the best name.

### Params:

**Socket.io** *socket* 
**JSONDocument** *doc* 
**StorageDriver** *storage* 
**EventEmitter** *eventemitter* Optional

, error

## sendDiff()

Send diff to clients/server

### Return:

* **als** if there is no diff, else true

## eventemitter

EventEmitter

### Events:

* update

<!-- End src/edits.js -->

