/*
 * Source: "Data Structures & Algorithms with JavaScript" by Michael McMillan
 */

function HashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.showDistro = showDistro;
    this.put = put;
    // this.get = get;
}

function put(data) {
    let pos = this.simpleHash(data);
    this.table[pos] = data;
}

function simpleHash(data) {
    let total = 0;
    for (let i = 0; i < data.length; ++i) {
        total += data.charCodeAt(i);
    }
    return total % this.table.length;
}

function showDistro() {
    let n = 0;
    for (let i = 0; i < this.table.length; ++i) {
        if (this.table[i] != undefined) {
            console.log(i + ": " + this.table[i]);
        }
    }
}

let someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
let hTable = new HashTable();
for (let i = 0; i < someNames.length; ++i) {
    hTable.put(someNames[i]);
}
hTable.showDistro();

// Output:
// 35: Cynthia
// 45: Clayton
// 57: Donnie
// 77: David
// 95: Danny
// 116: Mike
// 132: Jennifer
// 134: Jonathan