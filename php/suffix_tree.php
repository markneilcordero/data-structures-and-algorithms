<?php
class SuffixTree
{
    private $root; // Root node of the suffix tree
    private $text; // Input string

    public function __construct($text)
    {
        $this->text = $text . "$"; // Append a unique character to mark the end
        $this->root = []; // Initialize the root node
        $this->buildSuffixTree();
    }

    private function buildSuffixTree()
    {
        $n = strlen($this->text);

        // Insert all suffixes into the tree
        for ($i = 0; $i < $n; $i++)
        {
            $this->insertSuffix(substr($this->text, $i), $i);
        }
    }

    private function insertSuffix($suffix, $index)
    {
        $currentNode = &$this->root;

        foreach (str_split($suffix) as $char)
        {
            if (!isset($currentNode[$char]))
            {
                $currentNode[$char] = ['#' => []]; // '#' marks the end of a branch
            }
            $currentNode = &$currentNode[$char]['#'];
        }
        // Store the starting index of the suffix
        $currentNode['$'][] = $index;
    }

    public function display()
    {
        $this->printTree($this->root, "");
    }

    private function printTree($node, $prefix)
    {
        foreach ($node as $char => $child)
        {
            if ($char === '$')
            {
                // echo $prefix . " -> starts at index " . $child . "\n";
                if (is_array($child))
                {
                    foreach ($child as $index)
                    {
                        echo $prefix . " -> starts at index " . $index . "\n";
                    }
                }
            }
            else
            {
                // $this->printTree($child['#'], $prefix . $char);
                echo "Warning: Unexpected data type for suffix indices.\n";
                var_dump($child);
            }
        }
    }

    public function search($pattern)
    {
        $currentNode = $this->root;

        foreach (str_split($pattern) as $char)
        {
            if (!isset($currentNode[$char]))
            {
                return false; // Pattern not found
            }
            $currentNode = $currentNode[$char]['#'];
        }
        return true; // Pattern found
    }
}

$text = "banana";
$suffixTree = new SuffixTree($text);

echo "Suffix Tree for '{$text}':\n";
$suffixTree->display();

$searchPatterns = ["ana", "ban", "nana", "xyz"];
foreach ($searchPatterns as $pattern)
{
    echo "Searching for '{$pattern}': " . ($suffixTree->search($pattern) ? "Found" : "Not Found") . "\n";
}
?>