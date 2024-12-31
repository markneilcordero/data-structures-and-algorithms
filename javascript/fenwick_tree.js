class FenwickTree
{
    constructor(size)
    {
        this.size = size; // Number of elements
        this.tree = new Array(size + 1).fill(0); // Fenwick Tree array (1-indexed)
    }

    // Add value to the Fenwick Tree
    add(index, value)
    {
        index++; // Convert to 1-based index
        while (index <= this.size)
        {
            this.tree[index] += value;
            index += index & -index; // Move to the next index
        }
    }

    // Get prefix sum from 0 to index
    prefixSum(index)
    {
        index++; // Convert to 1-based index
        let sum = 0;
        while (index > 0)
        {
            sum += this.tree[index];
            index -= index & -index; // Move to the parent index
        }
        return sum;
    }

    // Update the value at a specific index
    update(index, newValue)
    {
        const currentValue = this.rangeSum(index, index);
        const delta = newValue - currentValue;
        this.add(index, delta);
    }

    // Range sum between two indices [left, right]
    rangeSum(left, right)
    {
        return this.prefixSum(right) - this.prefixSum(left - 1);
    }
}

const fenwick = new FenwickTree(6);

const values = [1, 3, 5, 7, 9, 11];
for (let i = 0; i < values.length; i++)
{
    fenwick.add(i, values[i]);
}

console.log("Fenwick Tree:", fenwick.tree);

console.log("Prefix sum up to index 3:", fenwick.prefixSum(3)); // Expected Output: 16 (1 + 3 + 5 + 7)

console.log("Range sum [2, 5]:", fenwick.rangeSum(2, 5)); // Expected Output: 32 (5 + 7 + 9 + 11)

fenwick.update(3, 10);
console.log("Updated Fenwick Tree:", fenwick.tree);

console.log("Prefix sum up to index 3 after update:", fenwick.prefixSum(3)); // Expected Output: 19 (1 + 3 + 5 + 10)

console.log("Range sum [2, 5] after update:", fenwick.rangeSum(2, 5)); // Expected Output: 35 (5 + 10 + 9 + 11)