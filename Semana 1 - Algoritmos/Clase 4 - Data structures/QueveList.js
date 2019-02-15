//https://github.com/makeitrealcamp/top/blob/master/algorithms/4-data-structures.md
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


arr = new QueveList();
arr.push('a');
arr.push('b');
arr.push('c');
arr.push('d');
arr.push('e');
arr.push('f');
console.log(arr);
console.log(arr.get());
console.log(arr.get());
console.log(arr.get());
console.log(arr.get());


