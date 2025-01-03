class TrieNode
{
    constructor()
    {
        this.children = {}; // Store children nodes in an object (key: character, value: TrieNode)
        this.isEndOfWord = false; // Flag to mark the end of a word   
    }
}

class Trie
{
    constructor()
    {
        this.root = new TrieNode(); // Initialize the trie with an empty root node
    }

    // **Insert a word into the trie**
    insert(word)
    {
        let current = this.root; // Start from the root
        for (const char of word)
        {
            if (!current.children[char])
            {
                current.children[char] = new TrieNode(); // Create a new node if the character doesn't exist
            }
            current = current.children[char]; // Move to the child node
        }
        current.isEndOfWord = true; // Mark the end of the word
        console.log(`Inserted "${word}" into the trie.`);
    }

    // **Search for a word in the trie**
    search(word)
    {
        let current = this.root; // Start from the root
        for (const char of word)
        {
            if (!current.children[char])
            {
                return false; // If character not found, the word doesn't exist
            }
            current = current.children[char]; // Move the child node
        }
        return current.isEndOfWord; // Return true if it's the end of a valid word
    }

    // **Check if any word starts with the given prefix**
    startsWith(prefix)
    {
        let current = this.root; // Start from the root
        for (const char of prefix)
        {
            if (!current.children[char])
            {
                return false; // If character not found, no word starts with the prefix
            }
            current = current.children[char]; // Move to the child node
        }
        return true; // Prefix exists in the trie
    }

    // **List all words in the trie starting with a given prefix**
    listWordsWithPrefix(prefix)
    {
        let current = this.root;
        for (const char of prefix)
        {
            if (!current.children[char])
            {
                return []; // If the prefix doesn't exist, return an empty array
            }
            current = current.children[char];
        }
        const result = [];
        this._collectWords(current, prefix, result); // Helper function to collect words
        return result;
    }

    // **Helper function to collect words from a node**
    _collectWords(node, prefix, result)
    {
        if (node.isEndOfWord)
        {
            result.push(prefix); // Add the prefix as a word if it's the end of a word
        }
        for (const char in node.children)
        {
            this._collectWords(node.children[char], prefix + char, result); // Recur for each child node
        }
    }

    // **Delete a word from the trie**
    delete(word)
    {
        const deleteHelper = (node, word, depth = 0) => {
            if (!node)
            {
                return false; // Word not found
            }

            if (depth === word.length)
            {
                if (!node.isEndOfWord)
                {
                    return false; // Word doesn't exist
                }
                node.isEndOfWord = false; // Unmark the end of the word
                return Object.keys(node.children).length === 0; // If no children, delete the node
            }

            const char = word[depth];
            const shouldDeleteChild = deleteHelper(node.children[char], word, depth + 1);

            if (shouldDeleteChild)
            {
                delete node.children[char]; // Delete the child node
                return Object.keys(node.children).length === 0 && !node.isEndOfWord; // Delete if no more children
            }

            return false;
        };

        deleteHelper(this.root, word); // Call helper function
        console.log(`Deleted "${word}" from the trie.`);
    }
}

const trie = new Trie();

trie.insert("apple");
trie.insert("app");
trie.insert("apex");
trie.insert("bat");
trie.insert("batch");
trie.insert("banana");

console.log("Search 'apple':", trie.search("apple")); // Output: true
console.log("Search 'apex':", trie.search("apex")); // Output: true
console.log("Search 'bat':", trie.search("bat")); // Output: true
console.log("Search 'bats':", trie.search("bats")); // Output: false

console.log("Starts with 'ap':", trie.startsWith("ap")); // Output: true
console.log("Starts with 'bat':", trie.startsWith("bat")); // Output: true
console.log("Starts with 'cat':", trie.startsWith("cat")); // Output: false

console.log("Words with prefix 'ap':", trie.listWordsWithPrefix("ap")); // Output: ["apple", "app", "apex"]

console.log("Words with prefix 'ba':", trie.listWordsWithPrefix("ba")); // Output: ["bat", "batch", "banana"]

trie.delete("app");
console.log("Search 'app' after deletion:", trie.search("app")); // Output: false
console.log("Words with prefix 'ap' after deletion:", trie.listWordsWithPrefix("ap")); // ["apple", "apex"]