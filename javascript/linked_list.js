function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LinkedList() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.find = find;
    // this.findPrevious = findPrevious;
    this.insert = insert;
    this.remove = remove;
    this.findLast = findLast;
    this.display = display;
    this.displayReverse = displayReverse;
}

function find(item) {
    let currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
}

// function findPrevious(item) {
//     let currNode = this.head;
//     while (!(currNode.next == null) && (currNode.next.element != item)) {
//         currNode = currNode.next;
//     }
//     return currNode;
// }

function findLast() {
    let currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}

function displayReverse() {
    let currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        console.log(currNode.element);
        currNode = currNode.previous;
    }
}

function remove(item) {
    let currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}

function display() {
    let currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.element == "head")) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

let cities = new LinkedList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();
console.log();
cities.displayReverse();