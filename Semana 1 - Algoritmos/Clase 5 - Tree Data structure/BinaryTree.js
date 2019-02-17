TreeNode = function (value, left, rigth) {
    this.value = value;
    this.left = left;
    this.rigth = rigth;
}
BinaryTree = function () {
    this.root = null;
    this.depth = 0;
}
BinaryTree.prototype.add = function (value) {
    let newNode = new TreeNode(value, null, null);
    if (!this.root) {
        this.root = newNode;
    }
    else {
        this.addRecursive(newNode, this.root);
    }
    console.log("valor a agregar " + this.depth);
}
BinaryTree.prototype.addRecursive = function (newNode, node) {
    //comprobar si el value es menor a root insertar a derecha o izquierda
    if (newNode.value < node.value) {
        if (!node.left) {
            node.left = newNode
        }
        else {
            this.addRecursive(newNode, node.left);
            this.depth++
        }
    }
    else if (newNode.value > node.value) {
        if (!node.rigth) {
            node.rigth = newNode
        }
        else {
            this.addRecursive(newNode, node.rigth);
            this.depth++
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

BinaryTree.prototype.traverseBFSRecursive = function (node, action) {
    action(node.value);
    while(this.depth>0){
        console.log("valor en el buscador " + this.depth);
        if(node.left){
           node.left.value;
            this.depth--
            this.traverseBFSRecursive(node,action);
        }
        if(node.rigth){
            node.rigth.value
            this.depth--
            this.traverseBFSRecursive(node,action);
        }
    }
    /*n = this.root
    action(n.value)
    n2 = n.left.value
    action(n2)
    n2 = n.rigth.value
    action(n2)
    n3 = n.left.left.value
    action(n3)
    n3 = n.left.rigth.value
    action(n3)
    n3 = n.rigth.left.value
    action(n3)
    */
}



let tree = new BinaryTree();
tree.add(4);
tree.add(2);
tree.add(7);
tree.add(1);
tree.add(3);
tree.add(5);
//tree.traverseDFS(function (e) { console.log(e); });
//console.log(tree.root)
tree.traverseBFS(function (e) { console.log(e); });