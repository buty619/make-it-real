//https://github.com/makeitrealcamp/top/blob/master/algorithms/4-data-structures.md
var StackList = function () {
    this.head = null;
    this.size = 0;
}

var Node = function (value, next = null) {
    this.value = value;
    this.next = next;
    this.size = 0;
}

StackList.prototype.push = function (value) {
    this.size++;
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
StackList.prototype.pop = function () {
    if (!this.head) {
        return this.head;
    }
    if (!this.head.next) {
        valor = this.head.value;
        return valor;
    }
    prev = this.head;
    tail = this.head.next;
    while (tail.next !== null) {
        prev = tail;
        tail = tail.next;
    }
    valor = tail.value;
    prev.next = null;
    return valor;
}

arr = new StackList();
arr.push('a');
arr.push('b');
arr.push('c');
arr.push('d');
arr.push('e');
arr.push('f');
console.log(arr);
console.log(arr.pop());
console.log(arr.pop());
console.log(arr.pop());
console.log(arr.pop());


