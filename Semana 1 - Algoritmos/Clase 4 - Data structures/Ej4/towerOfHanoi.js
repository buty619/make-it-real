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

function towerOfHanoi(source, aux, dest, level) {
    if (level == 1) {
        dest.push(source.pop());
        level ++    
        console.log(source);
        console.log(aux);
        console.log(dest);
        console.log("---------*");
    }
    console.log(source);
    console.log(aux);
    console.log(dest);
    console.log("---------/");
    towerOfHanoi(source, aux, dest, level - 1);
    dest.push(source.pop());
    towerOfHanoi(aux, dest, source, level - 1);
}

//source = [1,2,3];
//aux = [];
//dest = [];

source = new StackList();
aux = new StackList();
dest = new StackList();
source.push(3);
source.push(2);
source.push(1);
towerOfHanoi(source, aux, dest, 3)
//console.log();