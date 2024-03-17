/*
 * Source: "Data Structures & Algorithms with JavaScript" by Michael McMillan
 */

/* Creating New Arrays from Existing Arrays */
// let cisDept = ["Mike", "Clayton", "Terrill", "Danny", "Jennifer"];
// let dmpDept = ["Raymond", "Cynthia", "Bryan"];
// let itDiv = cisDept.concat(dmpDept);
// console.log(itDiv);
// itDiv = dmpDept.concat(cisDept);
// console.log(itDiv);

let itDiv = ["Mike", "Clayton", "Terrill", "Raymond", "Cynthia", "Danny","Jennifer"];
let dmpDept = itDiv.splice(3, 3);
let cisDept = itDiv;
console.log(dmpDept);
console.log(cisDept);