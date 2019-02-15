//https://github.com/makeitrealcamp/top/blob/master/algorithms/4-data-structures.md

var LinkedList =function()  {
    this.head = null;
    this.size = 0;
}

var Node = function (value, next = null) {
   this.value = value;
   this.next = next;
}

LinkedList.prototype.add = function(value){
    this.size++
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

LinkedList.prototype.getAt = function(j){
    n=this.head
    for(i=0;i<j;i++){
        n=n.next;
    }
    return n
}

LinkedList.prototype.addAt = function(j,value){
    this.size ++
    nodo = new Node(value);
    if(!this.head){
        nodo.next=this.head;
        this.head = nodo;
        return this.head;
    }
    if (j == 0) {
        this.head = new Node(value, this.head);
        return this.head;
    }
    prev=this.getAt(j-1);
    nodo.next = prev.next;
    prev.next = nodo;
    return this.head;
}

LinkedList.prototype.removeAt = function(j){
    this.size--
    if(!this.head){
        return this.head;
    }
    if (j == 0) {
        this.head = this.head.next;
        return this.head;
    }
    pre = this.getAt(j - 1);
    pre.next = pre.next.next;     
    return this.head;
}
LinkedList.prototype.valueAt= function(j){
    valor = this.getAt(j);
    return valor.value
}
LinkedList.prototype.sizeList= function(){
    return this.size;
}
LinkedList.prototype.forEach= function(fun){
    for(i=0;i<this.size;i++){
        nodo=this.getAt(i)
        fun(nodo.value,i);
    }
}

arr = new LinkedList();
arr.add('a');
arr.add('b');
arr.add('c');
arr.add('d');
arr.add('e');
arr.add('f');
arr.addAt(3,'X');
arr.removeAt(4);
console.log(arr);
//arr.valueAt(2);
//arr.sizeList();
arr.forEach((val, i) => {
    console.log(`Value at position ${i}: ${val}`);
});


