

<!-- Start src/document.js -->

# JSONDocument

Document and shadow.

## constructor(json)

### Params:

* **Object** *json* Information about and instructions for the document

## update(json)

Update the whole document

### Params:

* **Object** *json* Information about and instructions for the document

## merge(json)

Merge instructions

### Params:

* **Object** *json* Instructions for the document

## patch(patch)

### Params:

* **Object** *patch* Patch from jsondiffpatch

## diff(shadow)

### Params:

* **JSONDocument** *shadow* The shadow of this document

### Return:

* **Object** Diff created by jsondiffpatch

<!-- End src/document.js -->

