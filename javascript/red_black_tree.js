const RED = "RED";
const BLACK = "BLACK";

class Node
{
    constructor(value)
    {
        this.value = value;
        this.color = RED; // New nodes are initially red
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree
{
    constructor()
    {
        this.root = null; // Start with an empty tree
    }

    insert(value)
    {
        const newNode = new Node(value);

        if (this.root === null)
        {
            this.root = newNode;
            this.root.color = BLACK; // Root is always black
            console.log(`Inserted ${value} as root (black).`);
        }
        else
        {
            this.#insertNode(this.root, newNode);
        }

        this.#fixInsert(newNode); // Fix any Red-Black Tree violations
    }

    #insertNode(current, newNode)
    {
        if (newNode.value < current.value)
        {
            if (current.left === null)
            {
                current.left = newNode;
                newNode.parent = current;
                console.log(`Inserted ${newNode.value} to the left of ${current.value}.`);
            }
            else
            {
                this.#insertNode(current.left, newNode);
            }
        }
        else if (newNode.value > current.value)
        {
            if (current.right === null)
            {
                current.right = newNode;
                newNode.parent = current;
                console.log(`Inserted ${newNode.value} to the right of ${current.value}`);
            }
            else
            {
                this.#insertNode(current.right, newNode);
            }
        }
    }

    #fixInsert(node)
    {
        while (node !== this.root && node.parent.color === RED)
        {
            const parent = node.parent;
            const grandparent = parent.parent;

            if (parent === grandparent.left)
            {
                const uncle = grandparent.right;

                // Case 1: Uncle is red
                if (uncle && uncle.color === RED)
                {
                    parent.color = BLACK;
                    uncle.color = BLACK;
                    grandparent.color = RED;
                    node = grandparent;
                }
                else
                {
                    // Case 2: Node is a right child
                    if (node === parent.right)
                    {
                        this.#rotateLeft(parent);
                        node = parent;
                    }

                    // Case 3: Node is a left child
                    parent.color = BLACK;
                    grandparent.color = RED;
                    this.#rotateRight(grandparent);
                }
            }
            else
            {
                const uncle = grandparent.left;

                // Case 1: Uncle is red
                if (uncle && uncle.color === RED)
                {
                    parent.color = BLACK;
                    uncle.color = BLACK;
                    grandparent.color = RED;
                    node = grandparent;
                }
                else
                {
                    // Case 2: Node is a left child
                    if (node === parent.left)
                    {
                        this.#rotateRight(parent);
                        node = parent;
                    }

                    // Case 3: Node is a right child
                    parent.color = BLACK;
                    grandparent.color = RED;
                    this.#rotateLeft(grandparent);
                }
            }
        }
        
        this.root.color = BLACK; // Ensure the root is always black
    }

    #rotateLeft(node)
    {
        const rightChild = node.right;
        node.right = rightChild.left;

        if (rightChild.left !== null)
        {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (node.parent === null)
        {
            this.root = rightChild;
        }
        else if (node === node.parent.left)
        {
            node.parent.left = rightChild;
        }
        else
        {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;

        console.log(`Performed left rotation on ${node.value}`);
    }

    #rotateRight(node)
    {
        const leftChild = node.left;
        node.left = leftChild.right;

        if (leftChild.right !== null)
        {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (node.parent === null)
        {
            this.root = leftChild;
        }
        else if (node === node.parent.left)
        {
            node.parent.left = leftChild;
        }
        else
        {
            node.parent.right = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;

        console.log(`Performed right rotation on ${node.value}`);
    }
}

const rbt = new RedBlackTree();

const valuesToInsert = [20, 15, 25, 10, 18, 30, 5];
console.log("Inserting values into the Red-Black Tree:");
valuesToInsert.forEach(value => rbt.insert(value));

console.log("\nInserting more values to trigger rotations:");
rbt.insert(8); // Causes balancing
rbt.insert(22); // Causes balancing
rbt.insert(35); // Causes balancing

console.log("\nAll insertions are complete. Check the debug messages for rotations and balancing.");