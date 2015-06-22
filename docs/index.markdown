

<!-- Start src/index.js -->

# Client(socket, doc)

### Params:

**Socket.io** *socket* 
**JSONDocument** *doc* Optional param for creating the document

## update(json)

Update the whole document

### Params:

* **Object** *json* Information about and instructions for the document

### Return:

* **Boolean** false if the document is not changed and diff is not sent

## merge(json)

Merge instructions

### Params:

* **Object** *json* Instructions for the document

### Return:

* **Boolean** false if the document is not changed and diff is not sent

## on(event, listener)

Listen for events

### Events:

* update

### Params:

* **String** *event* 
* **Function** *listener* 

<!-- End src/index.js -->

