<?php
class FenwickTree
{
    private $tree; // Fenwick Tree array (1-indexed)
    private $size; // Number of elements in the original array

    // **Constructor to initialize the Fenwick Tree**
    public function __construct($size)
    {
        $this->size = $size;
        $this->tree = array_fill(0, $size + 1, 0); // Initialize the tree with zeros
    }

    // Add a value to the Fenwick Tree at a specific index**
    public function add($index, $value)
    {
        $index++; // Convert to 1-based index
        while ($index <= $this->size)
        {
            $this->tree[$index] += $value; // Update the current position
            $index += $index & -$index; // Move to the next index
        }
    }

    // **Get the prefix sum from 0 to index (inclusive)**
    public function prefixSum($index)
    {
        $index++; // Convert to 1-based index
        $sum = 0;
        while ($index > 0)
        {
            $sum += $this->tree[$index]; // Add the value at the current position
            $index -= $index & -$index; // Move to the parent index
        }
        return $sum;
    }

    // **Range sum query between two indices [left, right]**
    public function rangeSum($left, $right)
    {
        return $this->prefixSum($right) - $this->prefixSum($left - 1);
    }

    // **Update the value at a specific index to a new value**
    public function update($index, $newValue)
    {
        $currentValue = $this->rangeSum($index, $index); // Get current value at the index
        $delta = $newValue - $currentValue; // Calculate the difference
        $this->add($index, $delta); // Update the tree with the difference
    }

    // **Display the internal state of the Fenwick Tree**
    public function displayTree()
    {
        echo "Fenwick Tree: ";
        for ($i = 1; $i <= $this->size; $i++)
        {
            echo $this->tree[$i] . " ";
        }
        echo "\n";
    }
}

$sales = [1200, 1500, 1700, 1100, 2000, 2500, 3000, 3200, 1800, 1600, 2400, 2800];

$fenwickTree = new FenwickTree(count($sales));

for ($i = 0; $i < count($sales); $i++)
{
    $fenwickTree->add($i, $sales[$i]); // Add sales data to the Fenwick Tree
}

echo "\n-- Sales Queries --\n";

echo "Total sales from January to March: " . $fenwickTree->rangeSum(0, 2) . " USD\n"; // 1200 + 1500 + 1700 = 4400
echo "Total sales from April to June: " . $fenwickTree->rangeSum(3, 5) . " USD\n"; // 1100 + 2000 + 2500 = 5600
echo "Total sales from July to December: " . $fenwickTree->rangeSum(6, 11) . " USD\n"; // Sum from July to December

echo "\n-- Updating Sales Data --\n";

$fenwickTree->update(3, 1300);
echo "Updated sales for April to 1300 USD.\n";
echo "Total sales from January to June after update: " . $fenwickTree->rangeSum(0, 5) . " USD\n"; // Re-query for updated sum

echo "\n-- Total Annual Sales --\n";
echo "Total annual sales after updates: " . $fenwickTree->rangeSum(0, 11) . " USD\n";

echo "\nFenwick Tree structure:\n";
$fenwickTree->displayTree();
?>