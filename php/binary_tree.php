<?php
class Node
{
    public $value;
    public $left;
    public $right;

    public function __construct($value)
    {
        $this->value = $value;
        $this->left = null;
        $this->right = null;
    }
}

class BinaryTree
{
    private $root;

    public function __construct()
    {
        $this->root = null; // Initialize an empty tree
    }

    public function insert($value)
    {
        $newNode = new Node($value);

        if ($this->root === null)
        {
            $this->root = $newNode; // If tree is empty, set the root
            echo "Inserted $value as root.\n";
        }
        else
        {
            $this->insertNode($this->root, $newNode);
        }
    }

    private function insertNode($current, $newNode)
    {
        if ($newNode->value < $current->value)
        {
            if ($current->left === null)
            {
                $current->left = $newNode; // Insert as left child
                echo "Inserted $newNode->value to the left of $current->value.\n";
            }
            else
            {
                $this->insertNode($current->left, $newNode); // Recurse left
            }
        }
        else
        {
            if ($current->right === null)
            {
                $current->right = $newNode;  // Insert as right child
                echo "Inserted $newNode->value to the right of $current->value.\n";
            }
            else
            {
                $this->insertNode($current->right, $newNode); // Recurse right
            }
        }
    }

    public function inorder()
    {
        echo "Inorder traversal:\n";
        $this->inorderTraversal($this->root);
        echo "\n";
    }

    private function inorderTraversal($node)
    {
        if ($node !== null)
        {
            $this->inorderTraversal($node->left);
            echo $node->value . " ";
            $this->inorderTraversal($node->right);
        }
    }

    public function preorder()
    {
        echo "Preorder traversal:\n";
        $this->preorderTraversal($this->root);
        echo "\n";
    }

    private function preorderTraversal($node)
    {
        if ($node !== null)
        {
            echo $node->value . " ";
            $this->preorderTraversal($node->left);
            $this->preorderTraversal($node->right);
        }
    }

    public function postorder()
    {
        echo "Postorder traversal:\n";
        $this->postorderTraversal($this->root);
        echo "\n";
    }

    private function postorderTraversal($node)
    {
        if ($node !== null)
        {
            $this->postorderTraversal($node->left);
            $this->postorderTraversal($node->right);
            echo $node->value . " ";
        }
    }

    public function search($value)
    {
        return $this->searchNode($this->root, $value);
    }

    private function searchNode($node, $value)
    {
        if ($node === null)
        {
            return false; // Value not found
        }

        if ($value < $node->value)
        {
            return $this->searchNode($node->left, $value); // Search left subtree
        }
        elseif ($value > $node->value)
        {
            return $this->searchNode($node->right, $value); // Search right subtree
        }
        else
        {
            return true; // Value found
        }
    }

    public function getHeight()
    {
        return $this->getHeightNode($this->root);
    }

    private function getHeightNode($node)
    {
        if ($node === null)
        {
            return -1; // Base case
        }

        $leftHeight = $this->getHeightNode($node->left);
        $rightHeight = $this->getHeightNode($node->right);

        return max($leftHeight, $rightHeight) + 1;
    }

    public function countNodes()
    {
        return $this->countNodesRecursively($this->root);
    }

    private function countNodesRecursively($node)
    {
        if ($node === null)
        {
            return 0; // Base case
        }

        return 1 + $this->countNodesRecursively($node->left) + $this->countNodesRecursively($node->right);
    }
}

$tree = new BinaryTree();

$valuesToInsert = [50, 30, 70, 20, 40, 60, 80];
echo "Inserting values into the tree:\n";
foreach ($valuesToInsert as $value)
{
    $tree->insert($value);
}

echo "\nTree Traversals:\n";
$tree->inorder(); // Expected Output: 20 30 40 50 60 70 80
$tree->preorder(); // Expected Output: 50 30 20 40 70 60 80
$tree->postorder(); // Expected Output: 20 40 30 60 80 70 50

echo "\nSearching for values:\n";
$searchValues = [40, 100];
foreach ($searchValues as $value)
{
    $found = $tree->search($value);
    echo "Is $value in the tree? " . ($found ? "Yes" : "No") . "\n";
}

echo "\nTree Height:\n";
echo "The height of the tree is: " . $tree->getHeight() . "\n"; // Expected Output: 2

echo "\nNode Count:\n";
echo "The total number of nodes in the tree is: " . $tree->countNodes() . "\n"; // Expected Output: 7
?>