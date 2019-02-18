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
    this.size++
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
    var queve = new QueveList();
    queve.push(this.root);
    while(queve){
        node=queve.get();
        if(node){
            action(node.value);
            if(node.left){
                queve.push(node.left);
            }
            if(node.rigth){
                queve.push(node.rigth);            
            }
        }
        else{
            return;
        }
    }
}


var QueveList =function()  {
    this.head = null;
    this.size = 0;
}

var Node = function (value, next = null) {
   this.value = value;
   this.next = next;
}

QueveList.prototype.push = function(value){
    nodo = new Node(value);
    if(!this.head){
        nodo.next=this.head;
        this.head = nodo;
        return this.head;
    }
    else{
    last = this.head;
    while(last.next !== null){
        last = last.next;
    }
    last.next = nodo;    
    }
    return this.head;
}

QueveList.prototype.get = function(){
    if(!this.head){
        return this.head;
    }
    valor = this.head.value
    this.head = this.head.next;
    return valor;
}



let tree = new BinaryTree();
tree.add(4);
tree.add(2);
tree.add(7);
tree.add(1);
tree.add(3);
tree.add(5);
tree.traverseDFS(function (e) { console.log(e); });
//console.log(tree.root)
tree.traverseBFS(function (e) { console.log(e); });