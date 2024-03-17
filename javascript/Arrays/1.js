/*
 * Source: "Data Structures & Algorithms with JavaScript" by Michael McMillan
 */

/* Creating Arrays from Strings */
let sentence = "the quick brown fox jumped over the lazy dog";
let words = sentence.split(" ");
for (let i = 0; i < words.length; ++i) {
    console.log("word " + i + ": " + words[i]);
}