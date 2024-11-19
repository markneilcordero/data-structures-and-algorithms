// Multidimensional Arrays Example in JavaScript

// Step 1: Create  a 2D array (2 rows, 3 columns)
let multiArray = [
    [1, 2, 3],
    [4, 5, 6],
];

// Step 2: Access elements in the 2D array
console.log("Element at row 0, column 1:", multiArray[0][1]); // Output: 2
console.log("Element at row 1, column 2:", multiArray[1][2]); // Output: 6

// Step 3: Modify an element in the 2D array
multiArray[0][2] = 10; // Change the element at row 0, column 2 to 10
console.log("After modification:", multiArray);

// Step 4: Add a new row to the 2D array
multiArray.push([7, 8, 9]); // Adds a new row
console.log("After adding a new row:", multiArray);

// Step 5: Loop through the 2D array
console.log("Iterating through the 2D array:");
for (let i = 0; i < multiArray.length; i++)
{
    for (let j = 0; j < multiArray[i].length; j++)
    {
        console.log(`Element at row ${i}, column ${j}:`, multiArray[i][j]);
    }
}

// Step 6: Create a 3D array (2x2x2)
let threeDArray = [
    [ // Layer 1
        [1, 2], // Row 1
        [3, 4], // Row 2
    ],
    [ // Layer 2
        [5, 6], // Row 1
        [7, 8], // Row 2
    ]
];
console.log("3D Array:", threeDArray);
console.log("Element at layer 1, row 0, column 1:", threeDArray[1][0][1]);