class BTreeNode
{
    constructor(isLeaf)
    {
        this.isLeaf = isLeaf; // True if the node is a leaf
        this.keys = []; // Array of keys in the node
        this.children = []; // Array of child pointers
    }
}

class BTree
{
    constructor(t)
    {
        this.root = new BTreeNode(true); // Initialize an empty root
        this.t = t; // Minimum degree (defines the order of the tree)
    }

    search (node, key)
    {
        let i = 0;

        // Find the first key greater than or equal to the given key
        while (i < node.keys.length && key > node.keys[i])
        {
            i++;
        }

        // If the key is found, return true
        if (i < node.keys.length && node.keys[i] === key)
        {
            return true;
        }

        // If the node is a leaf, the key is not present
        if (node.isLeaf)
        {
            return false;
        }

        // Recur to the appropriate child
        return this.search(node.children[i], key);
    }

    insert(key)
    {
        const root = this.root;

        // If the root is full, split it
        if (root.keys.length === 2 * this.t - 1)
        {
            const newRoot = new BTreeNode(false);
            newRoot.children.push(this.root);
            this.splitChild(newRoot, 0, root);
            this.root = newRoot;
            this.insertNonFull(newRoot, key);
        }
        else
        {
            this.insertNonFull(root, key);
        }
    }

    insertNonFull(node, key)
    {
        let i = node.keys.length - 1;

        if (node.isLeaf)
        {
            // Insert the key into the leaf node
            while (i >= 0 && key < node.keys[i])
            {
                i--;
            }
            node.keys.splice(i + 1, 0, key); // Insert key at the correct position 
        }
        else
        {
            // Find the child to which the key should be added
            while (i >= 0 && key < node.keys[i])
            {
                i--;
            }
            i++;
            const child = node.children[i];

            // Split the child if it is full
            if (child.keys.length === 2 * this.t - 1)
            {
                this.splitChild(node, i, child);
                if (key > node.keys[i])
                {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    splitChild(parent, i, child)
    {
        const newChild = new BTreeNode(child.isLeaf);
        const t = this.t;

        // Move the second half of the keys and children to the new node
        newChild.keys = child.keys.splice(t);
        if (!child.isLeaf)
        {
            newChild.children = child.children.splice(t);
        }

        // Insert the median key into the parent
        const median = child.keys.pop();
        parent.keys.splice(i, 0, median);

        // Insert the new child into the parent's children array
        parent.children.splice(i + 1, 0, newChild);
    }

    traverse(node)
    {
        let i = 0;

        // Traverse all keys and their corresponding children
        for (; i < node.keys.length; i++)
        {
            if (!node.isLeaf)
            {
                this.traverse(node.children[i]);
            }
            console.log(node.keys[i] + " ");
        }

        // Traverse the last child
        if (!node.isLeaf)
        {
            this.traverse(node.children[i]);
        }
    }
}

const btree = new BTree(2);

const keysToInsert = [50, 30, 20, 40, 70, 60, 80, 15, 25, 35, 45];
console.log("Inserting keys into the B-Tree:");
keysToInsert.forEach(key => {
    console.log(`Inserting ${key}...`);
    btree.insert(key);
});

console.log("\nInorder Traversal of the B-Tree:");
btree.traverse(btree.root); // Expected Output: 15 20 25 30 35 40 45 50 60 70 80

const keysToSearch = [25, 55, 70];
console.log("\n\nSearching for keys:");
keysToSearch.forEach(key => {
    const found = btree.search(btree.root, key) ? "Found" : "Not Found";
    console.log(`Key ${key}: ${found}`);
});

const additionalKeys = [65, 75, 85];
console.log("\nInserting additional keys to demonstrate splits:");
additionalKeys.forEach(key => {
    console.log(`Inserting ${key}...`);
    btree.insert(key);
});

console.log("\nInorder Traversal of the B-Tree after additional insertions:");
btree.traverse(btree.root);