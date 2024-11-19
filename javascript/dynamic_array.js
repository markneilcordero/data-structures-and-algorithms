// Dynamic Array Implementation and Example in JavaScript

// Step 1: Create an empty array
let dynamicArray = [];

// Step 2: Add elements dynamically using push()
dynamicArray.push(10); // Adds 10 to the array
dynamicArray.push(20); // Adds 20 to the array
dynamicArray.push(30); // Adds 30 to the array
console.log("After adding elements:", dynamicArray);

// Step 3: Remove the last element using pop()
let removedElement = dynamicArray.pop(); // Removes the last element (30)
console.log("Removed Element:", removedElement);
console.log("After removing last element:", dynamicArray);

// Step 4: Add elements at specific positions using splice()
dynamicArray.splice(1, 0, 15); // Adds 15 at index 1
console.log("After inserting 15 at index 1:", dynamicArray);

// Step 5: Remove an element at a specific index
dynamicArray.splice(0, 1); // Removes the element at index 0 (10)
console.log("After removing the first element:", dynamicArray);

// Step 6: Access elements using index
console.log("Element at index 0:", dynamicArray[0]); // 15