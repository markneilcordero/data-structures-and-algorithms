/*
 * Source: "Data Structures & Algorithms with JavaScript" by Michael McMillan
 */

/* Searching for a Value */
let names = ["David", "Mike", "Cynthia", "Raymond", "Clayton", "Mike", "Jennifer"];
let name = "Mike";
let firstPos = names.indexOf(name);
console.log("First found " + name + " at position " + firstPos);
let lastPos = names.lastIndexOf(name);
console.log("Last found " + name + " at position " + lastPos);