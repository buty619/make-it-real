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

LinkedList.prototype.addAt = function (j, value) {
    this.size++
    nodo = new Node(value);
    if (!this.head) {
        nodo.next = this.head;
        this.head = nodo;
        return this.head;
    }
    if (j == 0) {
        this.head = new Node(value, this.head);
        return this.head;
    }
    prev = this.getAt(j - 1);
    nodo.next = prev.next;
    prev.next = nodo;
    return this.head;
}

LinkedList.prototype.removeAt = function (j) {
    this.size--
    if (!this.head) {
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
LinkedList.prototype.valueAt = function (j) {
    valor = this.getAt(j);
    return valor.value
}
LinkedList.prototype.sizeList = function () {
    return this.size;
}
LinkedList.prototype.forEach = function (fun) {
    for (i = 0; i < this.size; i++) {
        nodo = this.getAt(i)
        fun(nodo.value, i);
    }
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

LinkedList.prototype.middle = function () {
    this.middle = this.getAt(Math.floor(this.size / 2));

    return this.middle.value;
}


module.exports = LinkedList;

//let arr = new LinkedList;

// arr.add('a');
// arr.add('b');
// arr.add('c');
// console.log(arr.reverse());
// console.log(arr.valueAt(0));
// arr.add('d');
// arr.add('e');
// arr.add('f');
// arr.addAt(3, 'X');
// //arr.removeAt(4);
// console.log(arr);
// arr.reverse();
// //arr.sizeList();
// arr.forEach((val, i) => {
//     console.log(`Value at position ${i}: ${val}`);
// });
// console.log(arr.middle());

