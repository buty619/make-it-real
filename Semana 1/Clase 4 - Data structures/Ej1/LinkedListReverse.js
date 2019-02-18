// Add a method called middle to the LinkedList that returns the value at the middle of the list.
//mirar como sacarlo con get y con valueAt
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

LinkedList.prototype.pop = function () {
    this.size--
    if (!this.head) {
        return this.head;
    }
    if (!this.head.next) {
        valor = this.head.value;
        this.head = null;
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


LinkedList.prototype.insertIni = function (value) {
    node = new Node(value);
    node.next = this.head;
    this.head = node;
    return this.head;
}

LinkedList.prototype.reverse = function () {
    n = this.head;
    this.arr = [];
    length = this.size;
    for (i = 0; i < (length); i++) {
        this.arr[i] = this.pop(n);
    }
    for (i = 0; i < (length); i++) {
        this.head = this.add(this.arr[i]);
    }
    this.arr = [];
    return this.head
}

arr = new LinkedList();
arr.add('a');
arr.add('b');
arr.add('c');
arr.add('d');
arr.add('e');
arr.add('f');
console.log(arr);
arr.reverse();
console.log(arr);



