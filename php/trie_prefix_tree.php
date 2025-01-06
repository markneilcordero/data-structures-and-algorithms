<?php
class TrieNode
{
    public $children = []; // Associative array to store child nodes
    public $isEndOfWord = false; // Boolean to indicate the end of a word
}

class Trie
{
    private $root;

    public function __construct()
    {
        $this->root = new TrieNode();
    }

    public function insert($word)
    {
        $node = $this->root;
        for ($i = 0; $i < strlen($word); $i++)
        {
            $char = $word[$i];
            if (!isset($node->children[$char]))
            {
                $node->children[$char] = new TrieNode(); // Create a new node if it doesn't exist
            }
            $node = $node->children[$char];
        }
        $node->isEndOfWord = true; // Mark the end of the word
        echo "Inserted \"$word\" into the Trie.\n";
    }

    public function search($word)
    {
        $node = $this->root;
        for ($i = 0; $i < strlen($word); $i++)
        {
            $char = $word[$i];
            if (!isset($node->children[$char]))
            {
                return false; // Word not found
            }
            $node = $node->children[$char];
        }
        return $node->isEndOfWord; // Return true if it's a complete word
    }

    public function startsWith($prefix)
    {
        $node = $this->root;
        for ($i = 0; $i < strlen($prefix); $i++)
        {
            $char = $prefix[$i];
            if (!isset($node->children[$char]))
            {
                return false; // Prefix not found
            }
            $node = $node->children[$char];
        }
        return true; // Prefix exists
    }

    public function delete($word)
    {
        if ($this->deleteHelper($this->root, $word, 0))
        {
            echo "Deleted \"$word\" from the Trie.\n";
        }
        else
        {
            echo "\"$word\" not found in the Trie.\n";
        }
    }

    private function deleteHelper($node, $word, $index)
    {
        if ($index === strlen($word))
        {
            if (!$node->isEndOfWord)
            {
                return false; // Word not found
            }
            $node->isEndOfWord = false; // Unmark the end of the word
            return count($node->children) === 0; // Check if the node has children
        }

        $char = $word[$index];
        if (!isset($node->children[$char]))
        {
            return false; // Character not found
        }

        $shouldDelete = $this->deleteHelper($node->children[$char], $word, $index + 1);
        if ($shouldDelete)
        {
            unset($node->children[$char]); // Delete the child node
            return count($node->children) === 0 && !$node->isEndOfWord;
        }
        return false;
    }

    public function listWords()
    {
        $words = [];
        $this->collectWords($this->root, "", $words);
        return $words;
    }

    private function collectWords($node, $prefix, &$words)
    {
        if ($node->isEndOfWord)
        {
            $words[] = $prefix;
        }
        foreach ($node->children as $char => $childNode)
        {
            $this->collectWords($childNode, $prefix . $char, $words);
        }
    }

    public function countWords()
    {
        return count($this->listWords());
    }
}

$trie = new Trie();

$trie->insert("apple");
$trie->insert("app");
$trie->insert("banana");
$trie->insert("band");
$trie->insert("bat");

echo "Search for 'apple': " . ($trie->search("apple") ? "Found\n" : "Not Found\n"); // Output: Found
echo "Search for 'bat': " . ($trie->search("bat") ? "Found\n" : "Not Found\n"); // Output: Found
echo "Search for 'cat': " . ($trie->search("cat") ? "Found\n" : "Not Found\n"); // Output: Not Found

$trie->delete("band");
$trie->delete("cat");

echo "Words in the Trie: \n";
print_r($trie->listWords());

echo "Total words in the Trie: " . $trie->countWords() . "\n"; // Output: 4
?>