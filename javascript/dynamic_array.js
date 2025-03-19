class DynamicArray {
    constructor(capacity = 4) {
        this.capacity = capacity;
        this.length = 0;
        this.array = new Array(this.capacity);
    }

    resize(newCapacity) {
        let newArray = new Array(newCapacity);
        for (let i = 0; i < this.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
        this.capacity = newCapacity;
    }

    push(value) {
        if (this.length === this.capacity) {
            this.resize(this.capacity * 2);
        }
        this.array[this.length] = value;
        this.length++;
    }

    pop() {
        if (this.length === 0) return undefined;
        const removedElement = this.array[this.length - 1];
        this.array[this.length - 1] = undefined;
        this.length--;

        if (this.length > 0 && this.length === Math.floor(this.capacity / 4)) {
            this.resize(Math.floor(this.capacity / 2));
        }
        return removedElement;
    }

    get(index) {
        if (index < 0 || index >= this.length) throw new Error("Index out of bounds");
        return this.array[index];
    }

    set(index, value) {
        if (index < 0 || index >= this.length) throw new Error("Index out of bounds");
        this.array[index] = value;
    }

    insertAt(index, value) {
        if (index < 0 || index > this.length) throw new Error("Index out bounds");

        if (this.length === this.capacity) {
            this.resize(this.capacity * 2);
        }

        for (let i = this.length; i > index; i--) {
            this.array[i] = this.array[i - 1];
        }

        this.array[index] = value;
        this.length++;
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) throw new Error("Index out of bounds");

        const removedElement = this.array[index];

        for (let i = index; i < this.length - 1; i++) {
            this.array[i] = this.array[i + 1];
        }

        this.array[this.length - 1] = undefined;
        this.length--;

        if (this.length > 0 && this.length === Math.floor(this.capacity / 4)) {
            this.resize(Math.floor(this.capacity / 2));
        }  
        return removedElement;
    }

    indexOf(value) {
        for (let i = 0; i < this.length; i++) {
            if (this.array[i] === value) return i;
        }
        return -1;
    }

    contains(value) {
        return this.indexOf(value) !== -1;
    }

    toString() {
        return this.array.slice(0, this.length).join(", ");
    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.array[i], i);
        }
    }

    map(callback) {
        let result = new DynamicArray(this.length);
        for (let i = 0; i < this.length; i++) {
            result.push(callback(this.array[i], i));
        }
        return result;
    }

    filter(callback) {
        let result = new DynamicArray();
        for (let i = 0; i < this.length; i++) {
            if (callback(this.array[i], i)) {
                result.push(this.array[i]);
            }
        }
        return result;
    }

    reduce(callback, initialValue) {
        let accumulator = initialValue !== undefined ? initialValue : this.array[0];
        let startIndex = initialValue !== undefined ? 0 : 1;

        for (let i = startIndex; i < this.length; i++) {
            accumulator = callback(accumulator, this.array[i]);
        }
        return accumulator;
    }
}

let arr = new DynamicArray();

arr.push(10);
arr.push(20);
arr.push(30);
console.log(arr.toString());

arr.insertAt(1, 15);
console.log(arr.toString());

arr.pop();
console.log(arr.toString());

arr.removeAt(1);
console.log(arr.toString());

console.log(arr.contains(20));
console.log(arr.indexOf(10));

let doubledArray = arr.map(x => x * 2);
console.log(doubledArray.toString());

let filteredArray = arr.filter(x => x > 10);
console.log(filteredArray.toString());

let sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum);