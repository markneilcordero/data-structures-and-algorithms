<?php
class SegmentTree
{
    private $arr; // Original array
    private $tree; // Segment tree array
    private $size; // Size of the array

    // Constructor to initialize the array and tree
    public function __construct($arr)
    {
        $this->arr = $arr;
        $this->size = count($arr);
        $this->tree = array_fill(0, 4 * $this->size, 0); // Initialize segment tree with 0
        $this->buildTree(0, 0, $this->size - 1); // Build the tree
    }

    // Build the segment tree
    private function buildTree($index, $start, $end)
    {
        if ($start == $end)
        {
            // Leaf node: store the value of the array element
            $this->tree[$index] = $this->arr[$start];
        }
        else
        {
            // Internal node: calculate mid and recursively build left and right subtrees
            $mid = (int)(($start + $end) / 2);
            $this->buildTree(2 * $index + 1, $start, $mid);
            $this->buildTree(2 * $index + 2, $mid + 1, $end);

            // Store the sum of left and right child nodes
            $this->tree[$index] = $this->tree[2 * $index + 1] + $this->tree[2 * $index + 2];
        }
    }

    // Query the sum in a given range [left, right]
    public function querySum($left, $right)
    {
        return $this->query(0, 0, $this->size - 1, $left, $right);
    }

    private function query($index, $start, $end, $left, $right)
    {
        if ($start > $right || $end < $left)
        {
            // Range completely outside the query range
            return 0;
        }

        if ($start >= $left && $end <= $right)
        {
            // Range completely inside the query range
            return $this->tree[$index];
        }

        // Partial overlap: query both subtrees
        $mid = (int)(($start + $end) / 2);
        $leftSum = $this->query(2 * $index + 1, $start, $mid, $left, $right);
        $rightSum = $this->query(2 * $index + 2, $mid + 1, $end, $left, $right);

        return $leftSum + $rightSum;
    }

    // Update the value at a specific index in the original array
    public function update($pos, $newValue)
    {
        $this->updateTree(0, 0, $this->size - 1, $pos, $newValue);
    }

    private function updateTree($index, $start, $end, $pos, $value)
    {
        if ($start == $end)
        {
            // Leaf node: update the value
            $this->arr[$pos] = $value;
            $this->tree[$index] = $value;
        }
        else
        {
            $mid = (int)(($start + $end) / 2);
            if ($pos <= $mid)
            {
                // Update the left subtree
                $this->updateTree(2 * $index + 1, $start, $mid, $pos, $value);
            }
            else
            {
                // Update the right subtree
                $this->updateTree(2 * $index + 2, $mid + 1, $end, $pos, $value);
            }

            // Update the current node after updating children
            $this->tree[$index] = $this->tree[2 * $index + 1] + $this->tree[2 * $index + 2];
        }
    }
}

$sales = [1200, 1500, 1700, 1100, 2000, 2500, 3000, 3200, 1800, 1600, 2400, 2800];

$segmentTree = new SegmentTree($sales);

echo "\n-- Sales Queries --\n";
echo "Total sales from January to March: " . $segmentTree->querySum(0, 2) . " USD\n"; // Sum of sales for months 1 to 3
echo "Total sales from April to June: " . $segmentTree->querySum(3, 5) . " USD\n"; // Sum of sales for months 4 to 6
echo "Total sales from July to December: " . $segmentTree->querySum(6, 11) . " USD\n"; // Sum of sales for months 7 to 12

echo "\n-- Updating Sales Data --\n";
$segmentTree->update(3, 1300); // Update sales for April (index 3) to 1300 USD
echo "Updated sales for April to 1300 USD.\n";
echo "Total sales from January to June after update: " . $segmentTree->querySum(0, 5) . " USD\n"; // Re-query for updated sum

$segmentTree->update(10, 2600); // Update sales for November (index 10) to 2600 USD
echo "Updated sales for November to 2600 USD.\n";
echo "Total sales from July to December after update: " . $segmentTree->querySum(6, 11) . " USD\n"; // Re-query after second update

echo "\n-- Total Annual Sales --\n";
echo "Total annual sales after updates: " . $segmentTree->querySum(0, 11) . " USD\n"; // Sum of all months

echo "Sales for November (updated): " . $segmentTree->querySum(10, 10) . " USD\n"; // Should return 2600
?>