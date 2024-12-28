class Node
{
    constructor(value)
    {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // New node starts with height 1
    }
}

class AVLTree
{
    constructor()
    {
        this.root = null; // Initialize an empty tree
    }

    insert (value)
    {
        this.root = this.#insertNode(this.root, value);
    }

    #insertNode(node, value)
    {
        // Perform standard BST insertion
        if (node === null)
        {
            console.log(`Inserted ${value}`);
            return new Node(value);
        }

        if (value < node.value)
        {
            node.left = this.#insertNode(node.left, value);
        }
        else if (value > node.value)
        {
            node.right = this.#insertNode(node.right, value);
        }
        else
        {
            // Duplicate values are not allowed
            return node;
        }

        // Update the height of the node
        node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));

        // Balance the node
        return this.#balanceNode(node);
    }

    #balanceNode(node)
    {
        const balanceFactor = this.#getBalanceFactor(node);

        // Left-heavy case
        if (balanceFactor > 1)
        {
            if (this.#getBalanceFactor(node.left) < 0)
            {
                node.left = this.#rotateLeft(node.left); // Left-Right case
            }
            return this.#rotateRight(node); // Left-Left case
        }

        // Right-heavy case
        if (balanceFactor < -1)
        {
            if (this.#getBalanceFactor(node.right) > 0)
            {
                node.right = this.#rotateRight(node.right); // Right-Left case
            }
            return this.#rotateLeft(node); // Right-Right case
        }
        return node; // Node is balanced
    }

    #rotateRight(z)
    {
        const y = z.left;
        const T3 = y.right;

        // Perform rotation
        y.right = z;
        z.left = T3;

        // Update heights
        z.height = 1 + Math.max(this.#getHeight(z.left), this.#getHeight(z.right));
        y.height = 1 + Math.max(this.#getHeight(y.left), this.#getHeight(y.right));

        console.log(`Performed right rotation on ${z.value}`);
        return y;
    }

    #rotateLeft(z)
    {
        const y = z.right;
        const T2 = y.left;

        // Perform rotation
        y.left = z;
        z.right = T2;

        // Update heights
        z.height = 1 + Math.max(this.#getHeight(z.left), this.#getHeight(z.right));
        y.height = 1 + Math.max(this.#getHeight(y.left), this.#getHeight(y.right));

        console.log(`Performed left rotation on ${z.value}`);
        return y;
    }

    #getHeight(node)
    {
        return node ? node.height : 0;
    }

    #getBalanceFactor(node)
    {
        return node ? this.#getHeight(node.left) - this.#getHeight(node.right) : 0;
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
            this.#inorderTraversal(node.left);
            process.stdout.write(`${node.value} `);
            this.#inorderTraversal(node.right);
        }
    }
}

const avl = new AVLTree();

const valuesToInsert = [50, 20, 70, 10, 30, 60, 80, 5, 25, 65];
console.log("Inserting values into the AVL Tree:");
valuesToInsert.forEach(value => avl.insert(value));

console.log("\nInorder traversal after all insertions:");
avl.inorder(); // Expected Output: 5 10 20 25 30 50 60 65 70 80

console.log("\nInserting values that require rotations to maintain balance:");
avl.insert(1); // Left-heavy rotation expected
avl.insert(90); // Right-heavy rotation expected
avl.insert(15); // Left-Right rotation expected

console.log("\nInorder traversal after further insertions:");
avl.inorder(); // Expected Output: 1 5 10 15 20 25 30 50 60 65 70 80 90