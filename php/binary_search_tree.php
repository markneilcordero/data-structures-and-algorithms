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

class BinarySearchTree
{
    private $root;

    public function __construct()
    {
        $this->root = null; // Initialize and empty tree
    }

    public function insert($value)
    {
        $newNode = new Node($value);

        if ($this->root === null)
        {
            $this->root = $newNode; // Set root if the tree is empty
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
                $this->insertNode($current->left, $newNode); // Recursively insert in left subtree
            }
        }
        else
        {
            if ($current->right === null)
            {
                $current->right = $newNode; // Insert as right child
                echo "Inserted $newNode->value to the right of $current->value.\n";
            }
            else
            {
                $this->insertNode($current->right, $newNode); // Recursively insert in right subtree
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
            return $this->searchNode($node->left, $value); // Search in left subtree
        }
        elseif ($value > $node->value)
        {
            return $this->searchNode($node->right, $value); // Search in right subtree
        }
        else
        {
            return true; // Value found
        }
    }

    public function findMin()
    {
        $current = $this->root;
        while ($current && $current->left !== null)
        {
            $current = $current->left;
        }
        return $current ? $current->value : null;
    }

    public function findMax()
    {
        $current = $this->root;
        while ($current && $current->right !== null)
        {
            $current = $current->right;
        }
        return $current ? $current->value : null;
    }
}

$bst = new BinarySearchTree();

$valuesToInsert = [40, 20, 60, 10, 30, 50, 70];
echo "Inserting values into the BST:\n";
foreach ($valuesToInsert as $value)
{
    $bst->insert($value);
}

echo "\nTree Traversals:\n";
$searchValues = [30, 80];
foreach ($searchValues as $value)
{
    $found = $bst->search($value);
    echo "Is $value in the BST? " . ($found ? "Yes" : "No") . "\n";
}

echo "\nMinimum and Maximum Values:\n";
echo "Minimum value in the BST: " . $bst->findMin() . "\n"; // Expected Output: 10
echo "Maximum value in the BST: " . $bst->findMax() . "\n"; // Expected Output: 70
?>