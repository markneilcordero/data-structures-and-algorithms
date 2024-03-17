/*
 * Source: "Data Structures & Algorithms with JavaScript" by Michael McMillan
 */

/* Mutator Functions */

/* The mutator function for adding array elements to the beginning of an array is unshift(). */
let nums = [2, 3, 4, 5];
console.log(nums);
let newnum = 1;
nums.unshift(newnum);
console.log(nums);
nums = [3, 4, 5];
nums.unshift(newnum, 1, 2);
console.log(nums);
// TODO: Removing Elements from an Array