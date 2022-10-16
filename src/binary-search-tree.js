const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;

  }

  add(data, node) {
    if (this.treeRoot == null) {
      const newNode = new Node();
      newNode.data = data;
      this.treeRoot = newNode;
      return this.treeRoot;
    }
    let currentNode = typeof (arguments[1]) != 'undefined' ? node : this.treeRoot;
    if (currentNode == null) {
      const newNode = new Node();
      newNode.data = data;
      currentNode = newNode;
    } else if (data < currentNode.data) {
      currentNode.left = this.add(data, currentNode.left)
    } else if (data > currentNode.data) {
      currentNode.right = this.add(data, currentNode.right)
    } else {
      return currentNode;
    }

    return currentNode;
  }

  has(data, node) {
    let result = false;
    let currentNode = typeof (arguments[1]) != 'undefined' ? node : this.treeRoot;
    if (currentNode == null) {
      return false;
    }
    if (currentNode.data == data) {
      result = true;
    } else if (data < currentNode.data) {
      result = this.has(data, currentNode.left)
    } else if (data > currentNode.data) {
      result = this.has(data, currentNode.right)
    }
    return result;
  }

  find(data, node) {
    let result = null;
    let currentNode = typeof (arguments[1]) != 'undefined' ? node : this.treeRoot;
    if (currentNode == null) {
      return null;
    }
    if (currentNode.data == data) {
      result = currentNode;
    } else if (data < currentNode.data) {
      result = this.find(data, currentNode.left)
    } else if (data > currentNode.data) {
      result = this.find(data, currentNode.right)
    }
    return result;
  }

  remove(data) {
    if (this.treeRoot == null) {
      return null;
    }
    this.treeRoot = this._deleteNode(data, this.treeRoot);
  }
  min(node) {
    let currentNode = typeof (arguments[0]) != 'undefined' ? node : this.treeRoot;
    if (currentNode.left == null) {
      return currentNode.data;
    } else {
      return this.min(currentNode.left);
    }
  }

  max(node) {
    let currentNode = typeof (arguments[0]) != 'undefined' ? node : this.treeRoot;
    if (currentNode.right == null) {
      return currentNode.data;
    } else {
      return this.max(currentNode.right);
    }
  }

  _deleteNode(data, node) {
    if (node.data === data) {
      if (node.left == null && node.right == null) {
        return null;
      }
      if (node.left == null) {
        return node.right;
      }
      if (node.right == null) {
        return node.left;
      }
      const minValue = this.min(node.right);
      node.data = minValue;
      node.right = this._deleteNode(minValue, node.right);
      return node;
    }
    if (node.data > data) {
      if (node.left === null) {
        return node;
      }
      node.left = this._deleteNode(data, node.left);
      return node;
    }
    if (node.data < data) {
      if (node.right === null) {
        return node;
      }
      node.right = this._deleteNode(data, node.right);
      return node;
    }
  }
}

module.exports = {
  BinarySearchTree
};