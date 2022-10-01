function Node(value = null, nextNode = null) {
  return { value, nextNode };
}

function LinkedList() {
  let linkedList = {};
  let length = 0;
  function append(value) {
    let node = Node(value);
    if (length === 0) linkedList = node;
    else {
      let temp = linkedList;
      while (temp.nextNode) temp = temp.nextNode;
      temp.nextNode = node;
    }
    length += 1;
  }

  function prepend(value) {
    let node = Node(value);
    // save original head of linked list
    let currentNode = linkedList;
    // insert new node with original head as next node
    linkedList = node;
    linkedList.nextNode = length ? currentNode : null;
    length += 1;
  }

  function getTail() {
    if (!length) return;
    let temp = linkedList;
    while (temp.nextNode !== null) temp = temp.nextNode;
    return temp;
  }

  function at(index) {
    if (!length || index < 0 || index > getSize() || isNaN(index)) return;
    let temp = linkedList;
    while (index--) temp = temp.nextNode;
    return temp;
  }

  function pop() {
    if (!length) return;
    let temp = linkedList;
    // if only one node
    if (length === 1) {
      linkedList = {};
      return;
    }
    while (temp.nextNode.nextNode) temp = temp.nextNode;
    temp.nextNode = null;

    length -= 1;
  }

  function find(value) {
    if (!length) return null;
    let temp = linkedList;
    let index = 0;
    while (temp !== null) {
      if (temp.value === value) return index;
      index += 1;
      temp = temp.nextNode;
    }
    return null;
  }

  function toString() {
    if (!length) return;
    let stringified = "";
    let temp = linkedList;
    while (temp !== null) {
      stringified += `${temp.value} -> `;
      temp = temp.nextNode;
    }
    return stringified + "null";
  }

  function insertAt(value, index) {
    // Check for bad input
    if (index < 0 || index > getSize() || isNaN(index)) return;
    // Check if index is at end of linked list or no length
    if (index === length || !length) append(value);
    else {
      let temp = linkedList;
      while (index--) temp = temp.nextNode;
      temp.nextNode = Node(value, temp.nextNode);
      length += 1;
    }
  }

  function removeAt(index) {
    if (index < 0 || index > getSize() || isNaN(index) || !length) return;
    length -= 1;
    // if only one node, remove it from linked list
    if (index === 0) {
      linkedList = linkedList.nextNode;
      return;
    }

    let prev = linkedList;
    let temp = linkedList;
    while (index--) {
      prev = temp;
      temp = temp.nextNode;
    }
    prev.nextNode = temp.nextNode;
  }

  const contains = (value) => find(value) !== null;
  const getHead = () => linkedList;
  const getSize = () => length;
  return {
    append,
    prepend,
    getHead,
    getTail,
    at,
    getSize,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
