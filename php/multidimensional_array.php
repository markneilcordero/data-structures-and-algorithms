<?php
// Define a 2D array (rows and columns)
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

echo "Multidimensional Array Created Successfully\n";

// Accessing element at row 1, column 2 (5 in this case)
echo "Element at [1][2]: " . $matrix[1][2] . PHP_EOL; // Output: 5

// Modify element at row 0, column 1
$matrix[0][1] = 20;
echo "Modified Element at [0][1]: " . $matrix[0][1] . PHP_EOL; // Output: 20

// Adding a new row
$newRow = [10, 11, 12];
$matrix[] = $newRow;

echo "New row added:\n";
print_r($matrix);

// Add a new column to each row
foreach ($matrix as $index => &$row)
{
    $row[] = 99; // Add 99 as the new column
}
unset($row); // Unset the reference to avoid side effects

echo "New column added:\n";
print_r($matrix);

// Iterating through the array
echo "Iterating through the array:\n";
foreach ($matrix as $row)
{
    foreach ($row as $value)
    {
        echo $value . " ";
    }
    echo PHP_EOL; // New line for each row
}

function searchElement($matrix, $value)
{
    foreach ($matrix as $rowIndex => $row)
    {
        foreach ($row as $colIndex => $element)
        {
            if ($element === $value)
            {
                return "Element $value found at [$rowIndex][$colIndex]";
            }
        }
    }
    return "Element $value not found";
}

echo searchElement($matrix, 5) . PHP_EOL; // Example search

// Delete row 1
unset($matrix[1]);
$matrix = array_values($matrix); // Re-index the array
echo "Row 1 deleted:\n";
print_r($matrix);

// Delete column 2
foreach ($matrix as &$row)
{
    unset($row[2]);
}
unset($row); // Unset the reference
echo "Column 2 deleted:\n";
print_r($matrix);

// Sort rows by the first element
usort($matrix, function($a, $b) {
    return $a[0] <=> $b[0];
});

echo "Rows sorted by the first element:\n";
print_r($matrix);
?>