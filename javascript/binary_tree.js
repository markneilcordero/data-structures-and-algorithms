class Node
{
    constructor(value)
    {
        this.value = value; // Value of the node
        this.left = null; // Left child
        this.right = null; // Right child
    }
}

class BinaryTree
{
    constructor()
    {
        this.root = null; // The root node of the binary tree
    }

    insert(value)
    {
        const newNode = new Node(value);

        if (this.root === null)
        {
            this.root = newNode; // If tree is empty, set the root
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

        const leftHeight = this.#getHeight(node.left); // Height of left subtree
        const rightHeight = this.#getHeight(node.right); // Height of right subtree

        return Math.max(leftHeight, rightHeight) + 1; // Max height + 1 for current node
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
}

const tree = new BinaryTree();

tree.insert(50);
tree.insert(30);
tree.insert(70);
tree.insert(20);
tree.insert(40);
tree.insert(60);
tree.insert(80);

console.log("\nTree Traversal:");
tree.inorder(); // Expected Output: 20 30 40 50 60 70 80
tree.preorder(); // Expected Output: 50 30 20 40 70 60 80
tree.postorder(); // Expected Output: 20 40 30 60 80 70 50

console.log("\nSearch Operations:");
console.log(`Is 40 in the tree? ${tree.search(40)}`); // Expected Output: true
console.log(`Is 90 in the tree? ${tree.search(90)}`); // Expected Output: false

console.log("\nMin and Max:");
console.log(`Minimum value in the tree: ${tree.findMin()}`); // Expected Output: 20
console.log(`Maximum value in the tree: ${tree.findMax()}`); // Expected Output: 80

console.log("\nTree Height:");
console.log(`Height of the tree: ${tree.getHeight()}`); // Expected Output: 2