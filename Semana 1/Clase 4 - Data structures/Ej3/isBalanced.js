//https://github.com/makeitrealcamp/top/blob/master/algorithms/4-data-structures.md

var LinkedList = function () {
    this.head = null;
    this.size = 0;
}

var Node = function (value, next = null) {
    this.value = value;
    this.next = next;
}

LinkedList.prototype.add = function (value) {
    this.size++
    nodo = new Node(value);
    if (!this.head) {
        nodo.next = this.head;
        this.head = nodo;
        return this.head;
    }
    else {
        last = this.head;
        while (last.next !== null) {
            last = last.next;
        }
        last.next = nodo;
    }
    return this.head;
}

LinkedList.prototype.getAt = function (j) {
    n = this.head
    for (i = 0; i < j; i++) {
        n = n.next;
    }
    return n
}

LinkedList.prototype.valueAt = function (j) {
    valor = this.getAt(j);
    return valor.value
}

function isBalanced(input){
    arr = input.split("");
    input1 = arr.slice(0, Math.floor((arr.length/2)));    
    input2 = arr.slice(Math.floor((arr.length/2)),(arr.length));
    //return input1,input2;
    linkedInput1 = new LinkedList();
    linkedInput2 = new LinkedList();
    for(i=0;i<input1.length;i++){
        linkedInput1.add(input1[i]);
        linkedInput2.add(input2[i]);
    }
    for(i = 0 ; i < input1.length;i++){
        if(linkedInput1.valueAt(i) == "(" && linkedInput2.valueAt(i)==")"){
            out=true;
        }
        else{
            out=false;
            return out;
        }
    }
    return out;    
   
}

console.log(isBalanced("(((())))"));
console.log(isBalanced("(((()))"));
console.log(isBalanced("())(()"));