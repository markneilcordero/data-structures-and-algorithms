<?php
class NaryTreeNode
{
    public $value; // Value of the node
    public $children; // Array of child nodes

    public function __construct($value)
    {
        $this->value = $value;
        $this->children = []; // Initialize children as an empty array
    }
}

class NaryTree
{
    private $root; // Root of the tree

    public function __construct($value)
    {
        $this->root = new NaryTreeNode($value); // Create the root node
    }

    public function addChild($parentValue, $childValue)
    {
        $parentNode = $this->searchDFS($this->root, $parentValue); // Search for the parent node
        if (!$parentNode)
        {
            echo "Parent node with value $parentValue not found.\n";
            return;
        }
        $childNode = new NaryTreeNode($childValue);
        $parentNode->children[] = $childNode; // Add the child node
        echo "Added child $childValue to parent $parentValue.\n";
    }

    public function traverseDFS($node)
    {
        if (!$node) return;
        echo $node->value . " ";
        foreach ($node->children as $child)
        {
            $this->traverseDFS($child);
        }
    }

    public function traverseBFS()
    {
        $queue = [$this->root]; // Queue for BFS traversal

        while (count($queue) > 0)
        {
            $current = array_shift($queue); // Dequeue the front node
            echo $current->value . " ";

            // Enqueue all the children of the current node
            foreach ($current->children as $child)
            {
                $queue[] = $child;
            }
        }
    }

    public function searchDFS($node, $value)
    {
        if (!$node) return null;
        if ($node->value === $value) return $node;

        // Recursively search in the children
        foreach ($node->children as $child)
        {
            $result = $this->searchDFS($child, $value);
            if ($result) return $result;
        }
        return null;
    }

    public function countNodes($node)
    {
        if (!$node) return 0;

        $count = 1; // Count the current node
        foreach ($node->children as $child)
        {
            $count += $this->countNodes($child); // Add the count of child nodes
        }
        return $count;
    }

    public function getHeight($node)
    {
        if (!$node || empty($node->children)) return 0;

        $heights = [];
        foreach ($node->children as $child)
        {
            $heights[] = $this->getHeight($child);
        }
        return 1 + max($heights);
    }

    public function getRoot()
    {
        return $this->root;
    }
}

$tree = new NaryTree("A");

$tree->addChild("A", "B");
$tree->addChild("A", "C");
$tree->addChild("A", "D");

$tree->addChild("B", "E");
$tree->addChild("B", "F");

$tree->addChild("C", "G");

$tree->addChild("D", "H");

echo "\nDFS Traversal:\n";
$tree->traverseDFS($tree->getRoot()); // Output: A B E F C G D H

echo "\n\nBFS Traverse:\n";
$tree->traverseBFS(); // Output: A B C D E F G H

echo "\n\nSearching for node 'F':\n";
$searchResult = $tree->searchDFS($tree->getRoot(), "F");
if ($searchResult)
{
    echo "Node 'F' found.\n";
}
else
{
    echo "Node 'F' not found.\n";
}

echo "\nTotal number of nodes in the tree: " . $tree->countNodes($tree->getRoot()) . "\n"; // Output: 8

echo "Height of the tree: " . $tree->getHeight($tree->getRoot()). "\n"; // Output: 2
?>