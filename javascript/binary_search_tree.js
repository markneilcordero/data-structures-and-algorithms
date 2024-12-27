class Node
{
    constructor(value)
    {
        this.value = value;
        this.left = null; // Left child
        this.right = null; // Righ child
    }
}

class BinarySearchTree
{
    constructor()
    {
        this.root = null; // The root node of the tree
    }

    insert(value)
    {
        const newNode = new Node(value);

        if (this.root === null)
        {
            this.root = newNode; // If the tree is empty, set the root
            console.log(`Inserted ${value} as root.`);
        }
        else
        {
            this.#insertNode(this.root, newNode);
        }
    }

    #insertNode(current, newNode)
    {
        if (newNode.value < current.value)
        {
            if (current.left === null)
            {
                current.left = newNode; // Insert as left child
                console.log(`Inserted ${newNode.value} to the left of ${current.value}`);
            }
            else
            {
                this.#insertNode(current.left, newNode); // Recursively find position
            }
        }
        else
        {
            if (current.right === null)
            {
                current.right = newNode; // Insert as right child
                console.log(`Inserted ${newNode.value} to the right of ${current.value}`);
            }
            else
            {
                this.#insertNode(current.right, newNode); // Recursively find position
            }
        }
    }

    search(value)
    {
        return this.#searchNode(this.root, value);
    }

    #searchNode(node, value)
    {
        if (node === null)
        {
            return false; // Value not found
        }

        if (value < node.value)
        {
            return this.#searchNode(node.left, value); // Search left subtree
        }
        else if (value > node.value)
        {
            return this.#searchNode(node.right, value); // Search right subtree
        }
        else
        {
            return true; // Value found
        }
    }

    inorder()
    {
        console.log("Inorder traversal:");
        this.#inorderTraversal(this.root);
        console.log();
    }

    #inorderTraversal(node)
    {
        if (node !== null)
        {
            this.#inorderTraversal(node.left); // Visit left subtree
            process.stdout.write(`${node.value} `); // Visit root
            this.#inorderTraversal(node.right); // Visit right subtree
        }
    }

    preorder()
    {
        console.log("Preorder traversal:");
        this.#preorderTraversal(this.root);
        console.log();
    }

    #preorderTraversal(node)
    {
        if (node !== null)
        {
            process.stdout.write(`${node.value} `); // Visit root
            this.#preorderTraversal(node.left); // Visit left subtree
            this.#preorderTraversal(node.right); // Visit right subtree
        }
    }

    postorder()
    {
        console.log("Postorder traversal:");
        this.#postorderTraversal(this.root);
        console.log();
    }

    #postorderTraversal(node)
    {
        if (node !== null)
        {
            this.#postorderTraversal(node.left); // Visit left subtree
            this.#postorderTraversal(node.right); // Visit right subtree
            process.stdout.write(`${node.value} `); // Visit root
        }
    }

    findMin()
    {
        let current = this.root;
        while (current && current.left !== null)
        {
            current = current.left; // Move to the leftmost node
        }
        return current ? current.value : null;
    }

    findMax()
    {
        let current = this.root;
        while (current && current.right !== null)
        {
            current = current.right; // Move to the rightmost node
        }
        return current ? current.value : null;
    }

    getHeight()
    {
        return this.#getHeight(this.root);
    }

    #getHeight(node)
    {
        if (node === null)
        {
            return -1; // Base case: empty tree has height -1
        }

        const leftHeight = this.#getHeight(node.left);
        const rightHeight = this.#getHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1; // Max height + 1 for the current node
    }
}

const bst = new BinarySearchTree();

const valuesToInsert = [50, 30, 70, 20, 40, 60, 80, 35, 65, 10];
console.log("Inserting values into the tree:");
valuesToInsert.forEach(value => bst.insert(value));

console.log("\nTraversals:");
bst.inorder(); // Expected Output: 10 20 30 35 40 50 60 75 70 80
bst.preorder(); // Expected Output: 50 30 20 10 40 35 70 60 65 80
bst.postorder(); // Expected Output: 10 20 35 40 30 65 60 80 70 50

console.log("\nSearch for values:");
[35, 100].forEach(value => {
    const found = bst.search(value);
    console.log(`Is ${value} in the tree? ${found ? "Yes" : "No"}`);
});

console.log("\nFinding minimum and maximum:");
console.log(`Minimum value in the tree: ${bst.findMin()}`); // Expected Output: 10
console.log(`Maximum value in the tree: ${bst.findMax()}`); // Expected Outpu: 80

console.log("\nTree Height");
console.log(`Height of the tree: ${bst.getHeight()}`); // Expected Output: 3

console.log("\nExploring tree structure:");
bst.insert(75);
console.log("After inserting 75:");
bst.inorder(); // Expected Output: 10 20 30 35 40 50 60 65 70 75 80
console.log(`Is 75 in the tree? ${bst.search(75) ? "Yes" : "No"}`);