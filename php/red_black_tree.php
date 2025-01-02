<?php
class RBTreeNode
{
    public $value;
    public $color;
    public $left;
    public $right;
    public $parent;

    const RED = "RED";
    const BLACK = "BLACK";

    public function __construct($value)
    {
        $this->value = $value;
        $this->color = self::RED; // New nodes are initially red
        $this->left = null;
        $this->right = null;
        $this->parent = null;
    }
}

class RBTree
{
    private $root;

    public function __construct()
    {
        $this->root = null; // Start with an empty tree
    }

    public function insert($value)
    {
        $newNode = new RBTreeNode($value);

        if ($this->root === null)
        {
            $this->root = $newNode;
            $this->root->color = RBTreeNode::BLACK; // Root is always black
        }
        else
        {
            $this->insertNode($this->root, $newNode);
        }

        $this->fixInsert($newNode); // Fix any Red-Black Tree violations
    }

    private function insertNode($current, $newNode)
    {
        if ($newNode->value < $current->value)
        {
            if ($current->left === null)
            {
                $current->left = $newNode;
                $newNode->parent = $current;
            }
            else
            {
                $this->insertNode($current->left, $newNode);
            }
        }
        else
        {
            if ($current->right === null)
            {
                $current->right = $newNode;
                $newNode->parent = $current;
            }
            else
            {
                $this->insertNode($current->right, $newNode);
            }
        }
    }

    private function fixInsert($node)
    {
        while ($node !== $this->root && $node->parent->color === RBTreeNode::RED)
        {
            $parent = $node->parent;
            $grandparent = $parent->parent;

            if ($parent === $grandparent->left)
            {
                $uncle = $grandparent->right;

                // Case 1: Uncle is red
                if ($uncle && $uncle->color === RBTreeNode::RED)
                {
                    $parent->color = RBTreeNode::BLACK;
                    $uncle->color = RBTreeNode::BLACK;
                    $grandparent->color = RBTreeNode::RED;
                    $node = $grandparent;
                }
                else
                {
                    // Case 2: Node is a right child
                    if ($node === $parent->right)
                    {
                        $node = $parent;
                        $this->rotateLeft($node);
                    }

                    // Case 3: Node is a left child
                    $parent->color = RBTreeNode::BLACK;
                    $grandparent->color = RBTreeNode::RED;
                    $this->rotateRight($grandparent);
                }
            }
            else
            {
                $uncle = $grandparent->left;

                // Case 1: Uncle is red
                if ($uncle && $uncle->color === RBTreeNode::RED)
                {
                    $parent->color = RBTreeNode::BLACK;
                    $uncle->color = RBTreeNode::BLACK;
                    $grandparent->color = RBTreeNode::RED;
                    $node = $grandparent;
                }
                else
                {
                    // Case 2: Node is a left child
                    if ($node === $parent->left)
                    {
                        $node = $parent;
                        $this->rotateRight($node);
                    }

                    // Case 3: Node is a right child
                    $parent->color = RBTreeNode::BLACK;
                    $grandparent->color = RBTreeNode::RED;
                    $this->rotateLeft($grandparent);
                }
            }
        }

        $this->root->color = RBTreeNode::BLACK;
    }

    private function rotateLeft($node)
    {
        $rightChild = $node->right;
        $node->right = $rightChild->left;

        if ($rightChild->left !== null)
        {
            $rightChild->left->parent = $node;
        }

        $rightChild->parent = $node->parent;

        if ($node->parent === null)
        {
            $this->root = $rightChild;
        }
        elseif ($node === $node->parent->left)
        {
            $node->parent->left = $rightChild;
        }
        else
        {
            $node->parent->right = $rightChild;
        }

        $rightChild->left = $node;
        $node->parent = $rightChild;
    }

    private function rotateRight($node)
    {
        $leftChild = $node->left;
        $node->left = $leftChild->right;

        if ($leftChild->right !== null)
        {
            $leftChild->right->parent = $node;
        }

        $leftChild->parent = $node->parent;

        if ($node->parent === null)
        {
            $this->root = $leftChild;
        }
        elseif ($node === $node->parent->right)
        {
            $node->parent->right = $leftChild;
        }
        else
        {
            $node->parent->left = $leftChild;
        }

        $leftChild->right = $node;
        $node->parent = $leftChild;
    }

    public function traverse($node)
    {
        if ($node !== null)
        {
            $this->traverse($node->left);
            echo $node->value . " (" . $node->color . ") ";
            $this->traverse($node->right);
        }
    }

    public function getRoot()
    {
        return $this->root;
    }
}

$tree = new RBTree();

$initialKeys = [20, 15, 30, 10, 18, 25, 40];
echo "Inserting keys into the Red-Black Tree:\n";
foreach ($initialKeys as $key)
{
    echo "Inserting $key...\n";
    $tree->insert($key);
}

echo "\nInorder Traversal of the Red-Black Tree (Initial Structure):\n";
$tree->traverse($tree->getRoot());

$additionalKeys = [35, 45, 5, 50];
echo "'\n\nInserting additional keys to demonstrate balancing:\n";
foreach ($additionalKeys as $key)
{
    echo "Inserting $key...\n";
    $tree->insert($key);
}

echo "\nInorder Traversal of the Red-Black Tree (After Additional Insertions):\n";
$tree->traverse($tree->getRoot());

echo "\n\nRoot Node Value: " . $tree->getRoot()->value . " (" . $tree->getRoot()->color . ")";
echo "\nRoot must always be black.\n";
?>