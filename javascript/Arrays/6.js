/*
 * Source: "Data Structures & Algorithms with JavaScript" by Michael McMillan
 */

/* Mutator Functions */

/* Adding at the beginning */
let nums = [2, 3, 4, 5];
let newnum = 1;
let N = nums.length;
for (let i = N; i >= 0; --i) {
    nums[i] = nums[i - 1];
}
nums[0] = newnum;
console.log(nums);