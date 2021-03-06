

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

## isEmpty()

Check if the document is empty

### Return:

* **Boolean** true if empty

## merge(json)

Merge instructions

### Params:

* **Object** *json* Instructions for the document

## patch(patch)

Patch the document using jsondiffpatch

### Params:

* **Object** *patch* Patch from jsondiffpatch

## diff(shadow)

Create a diff using jsondiffpatch

### Params:

* **JSONDocument** *shadow* The shadow of this document

### Return:

* **Object** Diff created by jsondiffpatch

## json()

Get JSON

#### Example output:

```javascript
{
  'name': 'fil1',
  'data': {
    'ett': 1,
    'tva': 'two',
    'tre': [1, 1, 1]
  }
}
```

### Return:

* **JSON** the document as JSON

<!-- End src/document.js -->

