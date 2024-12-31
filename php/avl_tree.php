<?php
class Node
{
    public $value;
    public $height;
    public $left;
    public $right;

    public function __construct($value)
    {
        $this->value = $value;
        $this->height = 1; // New nodes start with a height of 1
        $this->left = null;
        $this->right = null;
    }
}

class AVLTree
{
    private $root;

    public function __construct()
    {
        $this->root = null;
    }

    public function insert($value)
    {
        $this->root = $this->insertNode($this->root, $value);
    }

    private function insertNode($node, $value)
    {
        // Perform standard BST insertion
        if ($node === null)
        {
            return new Node($value);
        }

        if ($value < $node->value)
        {
            $node->left = $this->insertNode($node->left, $value);
        }
        elseif ($value > $node->value)
        {
            $node->right = $this->insertNode($node->right, $value);
        }
        else
        {
            // Duplicate values are not allowed
            return $node;
        }

        // Update height of the current node
        $node->height = 1 + max($this->getHeight($node->left), $this->getHeight($node->right));

        // Balance the node
        return $this->balanceNode($node);
    }

    private function balanceNode($node)
    {
        $balanceFactor = $this->getBalanceFactor($node);

        // Left-heavy case
        if ($balanceFactor > 1)
        {
            if ($this->getBalanceFactor($node->left) < 0)
            {
                $node->left = $this->rotateLeft($node->left); // Left-Right case
            }
            return $this->rotateRight($node); // Left-Left case
        }

        // Right-heavy case
        if ($balanceFactor < -1)
        {
            if ($this->getBalanceFactor($node->right) > 0)
            {
                $node->right = $this->rotateRight($node->right); // Right-Left case
            }
            return $this->rotateLeft($node); // Right-Right case
        }

        return $node; // Node is balanced
    }

    private function rotateRight($z)
    {
        $y = $z->left;
        $T3 = $y->right;

        // Perform rotation
        $y->right = $z;
        $z->left = $T3;

        // Update heights
        $z->height = 1 + max($this->getHeight($z->left), $this->getHeight($z->right));
        $y->height = 1 + max($this->getHeight($y->left), $this->getHeight($y->right));

        return $y;
    }

    private function rotateLeft($z)
    {
        $y = $z->right;
        $T2 = $y->left;

        // Perform rotation
        $y->left = $z;
        $z->right = $T2;

        // Update heights
        $z->height = 1 + max($this->getHeight($z->left), $this->getHeight($z->right));
        $y->height = 1 + max($this->getHeight($y->left), $this->getHeight($y->right));
    }

    private function getHeight($node)
    {
        return $node ? $node->height : 0;
    }

    private function getBalanceFactor($node)
    {
        return $node ? $this->getHeight($node->left) - $this->getHeight($node->right) : 0;
    }

    public function inorder()
    {
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
}

$avl = new AVLTree();

$valuesToInsert = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
echo "Inserting values into the AVL Tree:\n";
foreach ($valuesToInsert as $value)
{
    echo "Inserting $value...\n";
    $avl->insert($value);
}

echo "\nInorder Traversal of the AVL Tree:\n";
$avl->inorder(); // Expected Output: 10 20 25 30 35 40 45 50 60 70 80

echo "\nInserting additional nodes to demonstrate balancing:\n";
$additionalValues = [5, 65, 85];
foreach ($additionalValues as $value)
{
    echo "Inserting $value...\n";
    $avl->insert($value);
}

echo "\nInorder Traversal of the AVL Tree after additional insertions:\n";
$avl->inorder(); // Expected Output: 5 10 20 25 30 35 40 45 50 60 70 80 85
?>