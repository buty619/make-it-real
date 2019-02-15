TreeNode = function (value, left, rigth) {
    this.value = value;
    this.left = left;
    this.rigth = rigth;
}
BinaryTree = function () {
    this.root = null;
}
BinaryTree.prototype.add = function (value) {
    this.size ++
    let newNode = new TreeNode(value, null, null);
    if (!this.root) {
        this.root = newNode;
    }
    else {
        this.addRecursive(newNode, this.root);
    }
}
BinaryTree.prototype.addRecursive = function (newNode, node) {
    //comprobar si el value es menor a root insertar a derecha o izquierda
    if (newNode.value < node.value) {
        if (!node.left) {
            node.left = newNode
        }
        else {
            this.addRecursive(newNode, node.left);
        }
    }
    else if (newNode.value > node.value) {
        if (!node.rigth) {
            node.rigth = newNode
        }
        else {
            this.addRecursive(newNode, node.rigth);
        }
    }
}
BinaryTree.prototype.traverseDFS = function (action) {
    this.traverseDFSRecursive(this.root, action);
}
BinaryTree.prototype.traverseDFSRecursive = function (node, action) {
    action(node.value);
    if (node.left) {
        this.traverseDFSRecursive(node.left, action);
    }
    if (node.rigth) {
        this.traverseDFSRecursive(node.rigth, action);
    }
}

BinaryTree.prototype.traverseBFS = function (action) {
    this.traverseBFSRecursive(this.root, action);
}
BinaryTree.prototype.traverseDFSRecursive = function (node, action) {
    action(node.value);
    if (node.left) {
        this.traverseDFSRecursive(node.left, action);
    }
    if (node.rigth) {
        this.traverseDFSRecursive(node.rigth, action);
    }
}



let tree = new BinaryTree();
tree.add(4);
tree.add(2);
tree.add(7);
tree.add(1);
tree.add(3);
tree.add(5);
tree.traverseDFS(function (e) { console.log(e); });
console.log(tree.root)