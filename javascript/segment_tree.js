class SegmentTree
{
    constructor(arr)
    {
        this.arr = arr; // Input array
        this.tree = new Array(4 * arr.length).fill(0); // Segment Tree array
        this.buildTree(0, 0, arr.length - 1); // Build the tree
    }

    // Build the segment tree
    buildTree(index, start, end)
    {
        if (start === end)
        {
            // Leaf node: store the value of the array
            this.tree[index] = this.arr[start];
            return this.tree[index];
        }

        // Internal node: calculate mid, build left and right subtrees
        const mid = Math.floor((start + end) / 2);
        const leftChild = this.buildTree(2 * index + 1, start, mid);
        const rightChild = this.buildTree(2 * index + 2, mid + 1, end);

        // Store the sum of left and right child nodes
        this.tree[index] = leftChild + rightChild;
        return this.tree[index];
    }

    query(index, start, end, left, right)
    {
        if (start > right || end < left)
        {
            // Range completely outside
            return 0;
        }

        if (start >= left && end <= right)
        {
            // Range completely inside
            return this.tree[index];
        }

        // Partial overlap: query both subtrees
        const mid = Math.floor((start + end) / 2);
        const leftSum = this.query(2 * index + 1, start, mid, left, right);
        const rightSum = this.query(2 * index + 2, mid + 1, end, left, right);

        return leftSum + rightSum;
    }

    update(index, start, end, pos, value)
    {
        if (start === end)
        {
            // Update the value at the position
            this.arr[pos] = value;
            this.tree[index] = value;
            return;
        }

        // Calculate mid and update left of right subtree
        const mid = Math.floor((start + end) / 2);
        if (pos <= mid)
        {
            this.update(2 * index + 1, start, mid, pos, value);
        }
        else
        {
            this.update(2 * index + 2, mid + 1, end, pos, value);
        }

        // Update the current node after updating children
        this.tree[index] = this.tree[2 * index + 1] + this.tree[2 * index + 2]; 
    }
}

const arr = [2, 4, 6, 8, 10, 12];
const segTree = new SegmentTree(arr);

console.log("Initial Segment Tree:", segTree.tree);

const totalSum = segTree.query(0, 0, arr.length - 1, 0, arr.length - 1);
console.log(`Sum of the entire array: ${totalSum}`); // Expected Output: 42

const rangeSum = segTree.query(0, 0, arr.length - 1, 2, 4);
console.log(`Sum of range [2, 4]: ${rangeSum}`); // Expected Output: 24 (6 + 8 + 10)

segTree.update(0, 0, arr.length - 1, 3, 15);
console.log("Updated Segment Tree:", segTree.tree);

const updatedRangeSum = segTree.query(0, 0, arr.length - 1, 2, 4);
console.log(`Sum of range [2, 4] after update: ${updatedRangeSum}`); // Expected Output: 31 (6 + 15 + 10)

const singleElementSum = segTree.query(0, 0, arr.length - 1, 3, 3);
console.log(`Sum of single element at index 3: ${singleElementSum}`); // Expected Output: 15