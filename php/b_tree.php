<?php
class BTreeNode
{
    public $keys; // Array of keys in the node
    public $children; // Array of child pointers
    public $isLeaf; // Boolean indicating if the node is a leaf

    public function __construct($isLeaf)
    {
        $this->isLeaf = $isLeaf;
        $this->keys = [];
        $this->children = [];
    }
}

class BTree
{
    private $root; // Root node
    private $t; // Minimum degree (defines order)

    public function __construct($t)
    {
        $this->t = $t;
        $this->root = new BTreeNode(true);
    }

    public function search($node, $key)
    {
        $i = 0;

        // Find the first key greater than or equal to the given key
        while ($i < count($node->keys) && $key > $node->keys[$i])
        {
            $i++;
        }

        // If the key is found, return true
        if ($i < count($node->keys) && $node->keys[$i] === $key)
        {
            return true;
        }

        // If the node is a leaf, the key is not present
        if ($node->isLeaf)
        {
            return false;
        }

        // Recur to the appropriate child
        return $this->search($node->children[$i], $key);
    }

    public function insert($key)
    {
        $root = $this->root;

        // If the root is full, split it
        if (count($root->keys) === 2 * $this->t - 1)
        {
            $newRoot = new BTreeNode(false);
            $newRoot->children[] = $root;
            $this->splitChild($newRoot, 0, $root);
            $this->root = $newRoot;
            $this->insertNonFull($newRoot, $key);
        }
        else
        {
            $this->insertNonFull($root, $key);
        }
    }

    private function insertNonFull($node, $key)
    {
        $i = count($node->keys) - 1;

        if ($node->isLeaf)
        {
            // Insert the key into the leaf node
            while ($i >= 0 && $key < $node->keys[$i])
            {
                $i--;
            }
            array_splice($node->keys, $i + 1, 0, [$key]);
        }
        else
        {
            // Find the child to which the key should be added
            while ($i >= 0 && $key < $node->keys[$i])
            {
                $i--;
            }
            $i++;
            $child = $node->children[$i];

            // Split the child if it is full
            if (count($child->keys) === 2 * $this->t - 1)
            {
                $this->splitChild($node, $i, $child);
                if ($key > $node->keys[$i])
                {
                    $i++;
                }
            }
            $this->insertNonFull($node->children[$i], $key);
        }
    }

    private function splitChild($parent, $i, $child)
    {
        $newChild = new BTreeNode($child->isLeaf);
        $mid = $this->t - 1;

        // Move the second half of the keys and children to the new node
        $newChild->keys = array_splice($child->keys, $mid + 1);
        if (!$child->isLeaf)
        {
            $newChild->children = array_splice($child->children, $mid + 1);
        }

        // Insert the median key into the parent
        array_splice($parent->keys, $i, 0, [$child->keys[$mid]]);
        unset($child->keys[$mid]);

        // Insert the new child into the parent's children array
        array_splice($parent->children, $i + 1, 0, [$newChild]);
    }

    public function traverse($node)
    {
        $i = 0;

        // Traverse through all keys and their corresponding children
        for (; $i < count($node->keys); $i++)
        {
            if (!$node->isLeaf)
            {
                $this->traverse($node->children[$i]);
            }
            echo $node->keys[$i] . " ";
        }

        // Traverse the last child
        if (!$node->isLeaf)
        {
            $this->traverse($node->children[$i]);
        }
    }

    public function getRoot()
    {
        return $this->root;
    }
}

$btree = new BTree(2);

$keysToInsert = [15, 25, 5, 10, 20, 30, 35, 40, 50];
echo "Inserting keys into the B-Tree:\n";
foreach ($keysToInsert as $key)
{
    echo "Inserting $key...\n";
    $btree->insert($key);
}

echo "\nInorder Traversal of the B-Tree:\n";
$btree->traverse($btree->getRoot()); // Expected Output: 5 10 15 20 25 30 35 40 50

$keysToSearch = [20, 45];
echo "\n\nSearching for keys:\n";
foreach ($keysToSearch as $key)
{
    $found = $btree->search($btree->getRoot(), $key) ? "Found" : "Not Found";
    echo "Key $key: $found\n";
}

$additionalKeys = [22, 55, 60];
echo "\nInserting additional keys to trigger splits:\n";
foreach ($additionalKeys as $key)
{
    echo "Inserting $key...\n";
    $btree->insert($key);
}

echo "\nInorder Traversal of the B-Tree after additional insertions:\n";
$btree->traverse($btree->getRoot());
?>